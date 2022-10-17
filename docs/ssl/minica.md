---
id: minica
title: SSL certificates with minica
---

## Intro

Remove SSL sign signed certificate warning with local CA(Cerificate Authority) with [minica](https://github.com/jsha/minica).

## Prerequisites

minica written in [go](https://go.dev/) and can be installed with `go tools`. Install go by following instructins [here](https://go.dev/doc/install).

## Install minica

Install with `go tools`

```shell
go install github.com/jsha/minica@latest
```

Install with `HomeBrew`

```shell
brew install minica
```

Install with `apt`

```shell
sudo apt update minica
```

## Generate cert

On first run, minica will generate a keypair and a root certificate in the
current directory, and will reuse that same keypair and root certificate
unless they are deleted.

To generate certificate, run

```shell
minica -ip-addresses 192.168.0.2
```

Here `192.168.0.2` is the ip address of the controller.

> Replace `ip` with actual controller's ip address.

Directory structure would look like this

```tree
project
├── 192.168.0.2
│   ├── cert.pem
│   └── key.pem
├── minica-key.pem
└── minica.pem
```

## Install certificate

To install freshly generated certificate,

- goto `Controller Settings` >> `Controller` >> `HTTPS Certificate`
- Change `File Format` to `PEM`
- Select `SSL Certificate` and `SSL Key` and Click save.

![Omada Controller SSL Cert Selection](/img/omada-ssl-settings.png)

## Convert PEM certificate to PKCS/PFX/P12

To convert `pem` certificate and key files to `pkcs`, run the following

```shell
openssl.exe pkcs12 -export -out minica.p12 -in minica.pem -inkey minica-key.pem -passout pass:password
```

> Replace `passowrd` at `pass:password` with the desired password or left it eampty to disable password.

## Install CA Certificate

To trust self generated Cert, we need to out CA certs to our systems root store.

### Windows

```cmd
certutil -addstore -f "ROOT" minica.pem
```

### Debian

```bash
sudo cp minica.pem /usr/local/share/ca-certificates/minica.pem
```

### RHEL/Fedora

```bash
sudo dnf install install ca-certificates
sudo cp minica.pem /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust extract
```

### Firefox

Firefox manages it's own store for certificates. To add certificates

- Go to `about:preferences#privacy`.
- Scrole down to `Certificates`.
- Select `View Certificates`.
- Select `Import`.
- Select `PKCS` file `minica.p12`.
- Enter the password or leave it empty if not applicable.

> 1. Reboot the controller/PC/Browser to update and changes to take effect.
> 2. Replace minica.pem with `minica.p12` to use `pkcs`
