resource "aws_acm_certificate" "cert" {
  provider          = aws.us-east-1
  domain_name       = local.domain_name
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation_records" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      value = dvo.resource_record_value
      type  = dvo.resource_record_type
    }
  }

  zone_id         = data.aws_route53_zone.primary.zone_id
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.value]
  ttl             = 60
  type            = each.value.type
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider          = aws.us-east-1
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_records : record.fqdn]
}

resource "aws_cloudfront_origin_access_control" "oac" {
	name                              = local.domain_name
	description                       = ""
	origin_access_control_origin_type = "s3"
	signing_behavior                  = "always"
	signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [
    aws_s3_bucket.s3_bucket
  ]

  origin {
    domain_name = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
    origin_id   = "s3-cloudfront"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [local.domain_name]

  default_cache_behavior {
    allowed_methods = [ "GET", "HEAD", "OPTIONS" ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "s3-cloudfront"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"

    # https://stackoverflow.com/questions/67845341/cloudfront-s3-etag-possible-for-cloudfront-to-send-updated-s3-object-before-t
    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations = []
    }
  }
  viewer_certificate {
    #cloudfront_default_certificate = true
    acm_certificate_arn   = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method    = "sni-only"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    error_caching_min_ttl = 0
    response_page_path    = "/index.html"
  }

  wait_for_deployment = false
  tags                = var.tags
}

data "aws_iam_policy_document" "s3_cloudfront_policy" {
	statement {
		actions = ["s3:GetObject"]

		resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]

		principals {
			type        = "Service"
			identifiers = ["cloudfront.amazonaws.com"]
		}
		condition {
			test     = "StringEquals"
			variable = "AWS:SourceArn"
			values   = [aws_cloudfront_distribution.s3_distribution.arn]
		}
	}
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket  = aws_s3_bucket.s3_bucket.id
  policy  = data.aws_iam_policy_document.s3_cloudfront_policy.json
}

resource "aws_route53_record" "record" {
  zone_id   = data.aws_route53_zone.primary.zone_id
  name      = local.domain_name
  type      = "A"

  alias {
    name    = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}