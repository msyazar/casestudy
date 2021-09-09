# casestudy
Görev 1: kops klasörü altında kops_aws.sh ile aws üzerinde kubernetes cluster oluşturulur. 
Cluster oluşturmak için : bash -x kops_aws.sh create
Cluster silmek için : bash -x kops_aws.sh delete

Requirements: aws hesabı öncesinden oluşturulmalı ve "aws configure" ile aws hesap bilgileri (KEY ID,Secret,region) ayarlanmalıdır.

Cluster oluşturulduktan sonra oluşturulan node ların listesi için : "kubectl get nodes" 

