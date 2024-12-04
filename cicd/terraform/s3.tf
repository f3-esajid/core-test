resource "aws_s3_bucket" "s3_bucket" {
  bucket = local.bucket_name
  #tags   = var.tags
}

resource "aws_s3_bucket_website_configuration" "bucket_web_config" {
  bucket = aws_s3_bucket.s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}