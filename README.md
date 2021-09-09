# casestudy
<b>Görev 1: Kubernetes Cluster</b>
```
kops klasörü altında kops_aws.sh ile aws üzerinde kubernetes cluster oluşturulur. 
aws hesabı öncesinden oluşturulmalı ve "aws configure" ile aws hesap bilgileri (KEY ID,Secret,region) ayarlanmalıdır.

1- bash -x kops_aws.sh create (Cluster oluşturmak için)
2- bash -x kops_aws.sh create (Cluster silmek için)

Cluster oluşturulduktan sonra oluşturulan node ların listelemek için 
3- "kubectl get nodes" 
```
<b>Görev 2: Monitoring</b>
```
Tamamlanmadı.
```
<b>Görev 3: Application</b>
```
Node.js uygulaması oluşturulur. github repo altında uygulama ve helm chart oluşturulmuş durumdadır. 
Uygulama clone u alınarak docker image oluşturulur ve docker.hub a gönderilir. 
1- git clone https://github.com/msyazar/casestudy.git
2- docker build --tag msyazar1/casestudy --file Dockerfile-run .
3- docker push msyazar1/casestudy
4- helm chart içerisindeki values.yaml dosyasında image ın hangi repodan alınacağı belirtilmelidir.
   image:
     repository: <b>msyazar1/casestudy</b>
     tag: latest
     pullPolicy: Always
     resources:
       requests:
       cpu: 200m
       memory: 300Mi
       
 5- helm install nodeserver chart/nodeserver
 
 ÜCRETSİZ BİR DOMAIN ALINIR. https://www.freenom.com/ 
 Alınan domain kalahari.cf
 Amazon hesabından "Route53" servisi kullanılarak "Hosted Zone" oluşturulur. Oluşturulan hosted zone nameserver bilgileri freenom hesabındaki domain üzerinde   
 güncellenir.
 
 6- nginx-ingress oluşturulur. Bu komut ile aynı zamanda aws heabında "Load Balancer" da oluşacaktır.
 
  - helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
  - helm repo update
  - helm install nginx-ingress ingress-nginx/ingress-nginx --set controller.publishService.enabled=true

 7- github repo da bulunan ingress.yaml yüklenir. Dışarıdan gelen isteklerin yönlendirilmesi için .
  
  - kubectl apply -f ingress.yaml

 8- Oluşturulan "Load Balancer" DNS bilgisi koopyalanarak "Route53" servisinde bir A kaydı oluşturulur ve Load Balancer seçilir.
 9- Browserdan https://msyazar.kalahari.cf/ girildiğinde sitenin geldiği görülür. 
```
![image](https://user-images.githubusercontent.com/22852682/132680449-7ae7d2c7-45df-4773-ae3e-a3c37b3104a7.png)
<b>Görev 4: CI/CD</b>
```
1- Azure devops üzerinden bir hesap oluşturulur. Yeni bir proje açılır ve bir pipeline oluşturulur.
2- Azure devops üzerinde github, docker.hub ve kubernetes cluster için servisler oluşturulur.
3- Gitgub repoda bulunan azure-pipelines.yml dosyası içeriği kopyalanarak pipeline güncellenir. 
Böylelikle github repoda yapılan değişiklik sonrası azure pipeline da sırası ile
 - Yeni docker image oluşturulur.
 - Docker.hub repo da image güncellenir.
 - helm char ile uygulama kubernetes cluster a deploy edilir.
```
<b>Görev 5: LB ve HTTP REQUEST</b>
```
Görev 3 te oluşturulan LB ve ingress.yaml içerisindeki config ile beraber sağlanmıştır.
msyazar.kalahari.cf browserdan görüntülenebilir olmasına karşın msyazar2.kalahari.cf hata alacaktır.
```
 
