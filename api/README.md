# Pet Match API

If you want to expand the Pet Match API, you can replicate it and make it your
own by importing the included swagger file into [Amazon API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1#/apis/create)

## Pre-requisites

*  ARN for a role with access to API Gateway.

## Import Instructions

1.  If you've never created an API Gateway before you'll need to click on 
**Get Started**

2.  If this is your first time creating an API Gateway, you'll see a modal that
says, **Create API Example**. Click on **OK**.

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/api-gateway-modal._TTH_.png" height="60%" width="60%" />  
3.  Select **Import from Swagger**

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/api-gateway-import-from-swagger._TTH_.png" height="80%" width="80%" />  
4.  Open or copy the contents of [Pet Match API Swagger](./petmatch-swagger-apigateway.json) definition file into a text editor.  
5.  Find the lines that say `"credentials": "replace with your own role"` 
and paste your APIGateway Role's ARN it should look something like:  

`"credentials": "arn:aws:iam::123456789123:role/APIgateway"`    
6.  Paste the contents into the field.

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/api-gateway-swagger._TTH_.png"  />  
7.  Click on the **Import** button.  
8.  You will want to take note of the hostname and update you Pet Match lambda
function accordingly.