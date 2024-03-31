---
id: pkcs
title: Convert PEM certificate to PKCS
---

Convert `pem` certificates to legacy pkcs using [openssl](https://www.openssl.org/)

```shell
openssl.exe pkcs12 -export -out cert.p12 -in cert.pem -inkey key.pem -passout pass:password
```

:::note
Replace `password` at `pass:password` with the desired password or left it empty to disable password.
:::
