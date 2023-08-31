docker build -t tf-sample-application-image .
docker tag tf-sample-application-image:latest 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
docker push 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com
