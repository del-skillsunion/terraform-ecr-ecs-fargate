provider "aws" {
  region = "ap-southeast-1"
}

locals {
  application_name = "tf-sample-application"
}

# Create Amazon ECR repository
resource "aws_ecr_repository" "my_ecr_repo" {
  name = local.application_name
}
