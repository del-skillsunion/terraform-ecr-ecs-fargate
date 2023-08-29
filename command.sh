docker build -t tf-sample-application-image .
docker tag delfrinando-sample-image:latest 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest
docker push 255945442255.dkr.ecr.ap-southeast-1.amazonaws.com/tf-sample-application:latest