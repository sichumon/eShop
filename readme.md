# .Net Core Microservices using Clean Architecture Implementation

### Installing
Follow these steps to get your development environment set up: (Before Run Start the Docker Desktop)
1. Clone the repository
2. Once Docker for Desktop is installed, go to the **Settings > Advanced option**, from the Docker icon in the system tray, to configure the minimum amount of memory and CPU like so:
* **Memory: 7 GB**
* CPU: 5
3. At the root directory which include **docker-compose.yml** files, run below command:
```csharp
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

![image](https://user-images.githubusercontent.com/3886381/206482808-d3505e9f-c20b-4749-a56f-305b0285baf2.png)

![image](https://user-images.githubusercontent.com/3886381/206483689-ad757a3b-648c-4e9e-8f7c-33da66ab6a05.png)

![image](https://user-images.githubusercontent.com/3886381/206484352-c9944f29-f0bf-41b0-a2b0-acd9717485aa.png)

* In the above diagram as we can see before checkout event created basket gets deleted from Redis database.

![image](https://user-images.githubusercontent.com/3886381/208604620-9ca24002-e961-4bff-9779-fbc7c40a3e4c.png)

## API Gateway Routing Pattern

![image](https://user-images.githubusercontent.com/3886381/206836028-442575f4-c9bd-4387-9cac-aa04e8944fa9.png)

## Elastic Search
![image](https://user-images.githubusercontent.com/3886381/208603245-44687ec3-629c-4a1d-a7f4-87bcc5baa1f6.png)

## Status Check 
![image](https://user-images.githubusercontent.com/3886381/209166943-3457364f-d2f4-4328-b7e8-43b45e71a7ac.png)

## Tracing using Jaeger
![image](https://user-images.githubusercontent.com/3886381/209193107-e9e7ab3a-0060-49f9-9a7d-bb81147a4bf3.png)

## AKS Workloads

![image](https://user-images.githubusercontent.com/3886381/210868687-3ce72999-1187-4826-94f3-14db9d79bde5.png)

## AKS Monitoring
![image](https://user-images.githubusercontent.com/3886381/210528612-9b8a8211-abc8-4a86-806a-c94d3f0dfb96.png)

## Pods Overview Kube Lens
![image](https://user-images.githubusercontent.com/3886381/210942031-14a2b935-a7f2-48f1-b97d-affe199030fe.png)

![image](https://user-images.githubusercontent.com/3886381/210942401-39084590-7670-4067-956b-772c28f2f508.png)

## Deployments

![image](https://user-images.githubusercontent.com/3886381/210942812-fe244069-5aba-4b48-9c68-9b503b540854.png)

## ConfigMaps

![image](https://user-images.githubusercontent.com/3886381/210943017-97b65ee3-5b70-4d5f-972c-5b75ff92ba7b.png)

## Secrets

![image](https://user-images.githubusercontent.com/3886381/210944092-68c586ff-528e-48f6-81f5-df07fc2bf2d1.png)

## HPA (Horizontal Pods AutoScaler)

![image](https://user-images.githubusercontent.com/3886381/210944313-4f33e12d-dcf2-475c-9bc6-9abb4f56f4a7.png)

## Kibana

kubectl port-forward service/kibana 5602:5601

![image](https://user-images.githubusercontent.com/3886381/210946644-63d6ade6-71f0-458e-a823-632619ba6c11.png)

## Istio

After Installing Istioctl and Addons its pods will look like 
### kubectl get pod -n istio-system

![image](https://user-images.githubusercontent.com/3886381/211144670-d76a2c50-effe-4686-97f0-e28fe8a807fb.png)

And its services will look like this
### kubectl get svc -n istio-system

![image](https://user-images.githubusercontent.com/3886381/211144715-4f24b04f-77e7-4506-bcef-155b91d7fbc0.png)

## Kiali (Service Mesh Management for Istio)

In order to access the same, we need to port forward the kiali like 
### kubectl port-forward svc/kiali -n istio-system 20002:20001

This will bring Kiali UI like 

![image](https://user-images.githubusercontent.com/3886381/211145703-1c96806f-c9b6-41a4-8aaa-64ce47784590.png)

## Kiali Workloads

![image](https://user-images.githubusercontent.com/3886381/211145786-802b6080-227c-49b8-b7b1-6c9d271095c3.png)

## Kiali Workload Overview

![image](https://user-images.githubusercontent.com/3886381/211146477-5071ca5f-30a0-47a3-bebb-bc9a3db3881c.png)

## Graphana Visualization

![image](https://user-images.githubusercontent.com/3886381/211147911-88fd9853-cf3b-48d9-82e5-453ec0ab7fb2.png)