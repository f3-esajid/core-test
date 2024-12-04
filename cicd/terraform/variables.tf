variable "env_name" {
  description = "name of environment deploying to (config sourced from cicd.yml)"
}

variable "bucket_name" {
  description = "domain name (or application name if no domain name available)"
  default = "phamily-static-assets"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "tags for all the resources, if any"
}