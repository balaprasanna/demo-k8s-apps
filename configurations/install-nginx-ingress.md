## Apply the following yaml files

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml

kubectl get svc -n ingress-nginx
```


## Result

```
Balas-MacBook-Air:configurations std-user01$ kubectl apply -f mandatory.yaml
namespace "ingress-nginx" created
configmap "nginx-configuration" created
configmap "tcp-services" created
configmap "udp-services" created
serviceaccount "nginx-ingress-serviceaccount" created
clusterrole "nginx-ingress-clusterrole" created
role "nginx-ingress-role" created
rolebinding "nginx-ingress-role-nisa-binding" created
clusterrolebinding "nginx-ingress-clusterrole-nisa-binding" created
deployment "nginx-ingress-controller" created
Balas-MacBook-Air:configurations std-user01$ kubectl apply -f cloud-generic.yaml
service "ingress-nginx" created
```