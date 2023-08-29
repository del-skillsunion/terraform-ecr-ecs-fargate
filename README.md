# Building and Deploying a Docker Application with Terraform and Amazon ECS

This guide provides step-by-step instructions on building a Docker application, pushing it to Amazon Elastic Container Registry (ECR), deploying it to Amazon Elastic Container Service (ECS) using Terraform, and handling common errors.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Docker Image Creation and Push](#docker-image-creation-and-push)
- [ECS Deployment Using Terraform](#ecs-deployment-using-terraform)
- [Resource Destruction](#resource-destruction)
- [Handling ECR Image Deletion Error](#handling-ecr-image-deletion-error)
- [Conclusion](#conclusion)

## Prerequisites

Before you begin, ensure you have:

- An AWS account with the necessary permissions.
- Docker installed on your local machine. You can download Docker from [Docker's official website](https://www.docker.com/get-started).
- Terraform installed on your local machine. You can download Terraform from [Terraform's official website](https://www.terraform.io/downloads.html).

## Docker Image Creation and Push

1. **Set Up the Docker Image:**

   - Create a directory for your Docker project and navigate to it in your terminal:

     ```sh
     mkdir terraform-ecr-ecs-fargate
     cd terraform-ecr-ecs-fargate
     ```

   - Inside this directory, create a `Dockerfile` with the content in the [example Dockerfile](./Dockerfile).

   - Build the Docker image locally:

     ```sh
     docker build -t terraform-ecr-ecs-fargate .
     ```

2. **Push Docker Image to Amazon ECR:**

   - Log in to Amazon ECR using the AWS CLI:

     ```sh
     aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com
     ```

   - Tag the Docker image with your ECR repository URI:

     ```sh
     docker tag terraform-ecr-ecs-fargate:latest 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
     ```

   - Push the tagged Docker image to Amazon ECR:

     ```sh
     docker push 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
     ```

## ECS Deployment Using Terraform

1. **Set Up the Terraform Configuration:**

   - Create a `terraform.tf` file in your project directory and add the Terraform configuration from the [example Terraform configuration](./terraform.tf).

2. **Deploy ECS Service:**

   - Run the following Terraform commands to deploy the ECS service:

     ```sh
     terraform init
     terraform apply
     ```

![image](https://github.com/del-skillsunion/terraform-ecr-ecs-fargate/assets/106639884/e67db44e-56b5-4643-9ab3-e6a17a0dee6f)

![image](https://github.com/del-skillsunion/terraform-ecr-ecs-fargate/assets/106639884/0ebf2344-d98c-4e24-aa8d-26d818afb069)

## Resource Destruction

1. **Destroy Resources:**

   - If you no longer need the resources, navigate to the project directory and run:

     ```sh
     terraform destroy
     ```

## Handling ECR Image Deletion Error

1. **If You Encounter Deletion Error:**

   - If you encounter an error when trying to delete an ECR image with a specific tag, such as `latest`, you can use the following AWS CLI command to forcefully delete it:

     ```sh
     aws ecr batch-delete-image --repository-name tf-sample-application --image-ids imageTag=latest
     ```

## Conclusion

By following this guide, you've learned how to build a Docker image, push it to Amazon ECR, deploy an ECS service using Terraform, and manage resources effectively. This approach provides a streamlined way to manage your containerized applications on AWS.

Remember to replace placeholder values with your actual configuration details and paths. For more advanced scenarios, you can extend this configuration further.
