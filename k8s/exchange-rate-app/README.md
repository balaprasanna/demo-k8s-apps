### Steps

*Creating Base64 encoded string for secrets*
```
echo -n "SOME SECRET" | base64
```

*To get data back for verification*
```
echo -n "encodes base64 string" | base64 -D
```