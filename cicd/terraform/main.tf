terraform {
  required_version = ">= 1.2.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    bucket = "phamily-terraform-state"
    region = "us-east-1"
    #key    = "${var.env_name}/${local.app_name}-terraform.tf-state"
  }
}

provider "aws" {
}

provider "aws" {
  region = "us-east-1"
  alias = "us-east-1"
}

locals {
  app_name     = "core-web"
  cicd_config = yamldecode(file("${path.module}/../cicd.yml"))
  env_config  = lookup(local.cicd_config.environments, var.env_name)
  domain_name = local.env_config.domain_name
  bucket_name = local.domain_name
}

data "aws_route53_zone" "primary" {
  name = "phamily-dev.com"
}