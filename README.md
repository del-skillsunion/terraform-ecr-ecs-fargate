# Building and Deploying a Docker Application with Terraform and Amazon ECS

## Introduction

This guide provides a step-by-step walkthrough of building a Docker image, tagging it, pushing it to Amazon Elastic Container Registry (ECR), and deploying it to Amazon Elastic Container Service (ECS) using Terraform. We'll cover setting up the Docker image, ECR repository, ECS task definition, and ECS service.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account with the necessary permissions.
- Docker installed on your local machine. You can download Docker from [Docker's official website](https://www.docker.com/get-started).
- Terraform installed on your local machine. You can download Terraform from [Terraform's official website](https://www.terraform.io/downloads.html).

## Docker Image Creation and Push

### Step 1: Set Up the Docker Image

1. Create a directory for your Docker project and navigate to it in your terminal.

   ```sh
   mkdir terraform-ecr-ecs-fargate
   cd terraform-ecr-ecs-fargate
   ```

2. Inside this directory, create a `Dockerfile` with the following content:

   ```Dockerfile
   FROM node:14

   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .

   EXPOSE 8080
   CMD [ "node", "index.js" ]
   ```

3. Build the Docker image locally by running the following command:

   ```sh
   docker build -t tf-sample-application-image .
   ```

### Step 2: Push Docker Image to Amazon ECR

1. Log in to Amazon ECR using the AWS CLI:

   ```sh
   aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com
   ```

2. Tag the Docker image with your ECR repository URI:

   ```sh
   docker tag tf-sample-application-image:latest 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
   ```

3. Push the tagged Docker image to Amazon ECR:

   ```sh
   docker push 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
   ```

## ECS Deployment Using Terraform

### Step 3: Set Up the Terraform Configuration

1. Create a `main.tf` file in your project directory and add the following Terraform configuration:

   ```hcl
   provider "aws" {
     region = "ap-southeast-1"  # Update with your desired region
   }

   resource "aws_ecr_repository" "my_ecr_repo" {
     name = "tf-sample-application"
   }

   resource "aws_ecs_task_definition" "my_task_definition" {
     # ... rest of your ECS task definition configuration ...

     container_definitions = jsonencode([
       {
         name  = "tf-sample-application"
         image = "${aws_ecr_repository.my_ecr_repo.repository_url}:latest"
         portMappings = [
           {
             containerPort = 8080
             hostPort      = 8080
             protocol      = "tcp"
           }
         ]
         essential = true
       }
     ])

     # ... rest of your ECS task definition configuration ...
   }

   # ... rest of your Terraform configuration ...
   ```

### Step 4: Deploy ECS Service

1. Run the following Terraform commands to deploy the ECS service:

   ```sh
   terraform init
   terraform apply
   ```

## Conclusion

By following this guide, you've learned how to build a Docker image, push it to Amazon ECR, and deploy an ECS service using Terraform. This approach provides a streamlined way to manage your containerized applications on AWS.

Remember to replace placeholder values with your actual configuration details and paths. For more advanced scenarios, you can extend this configuration further.