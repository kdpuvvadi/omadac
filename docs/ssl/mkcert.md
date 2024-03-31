---
id: mkcert
title: SSL certificates with mkcert
---

## Intro

Remove SSL sign signed certificate warning with local CA(Certificate Authority) with [mkcert](https://github.com/FiloSottile/mkcert).

## Prerequisites

minica written in [go](https://go.dev/)

### Go

Install `go` by following instructions [here](https://go.dev/doc/install).

### certutil

```shell
sudo apt install libnss3-tools # Debian

sudo yum install nss-tools # rhel/fedora
    
sudo pacman -S nss # Arch

sudo zypper install mozilla-nss-tools # openSUSE 
```

## Install mkcert

`mkcert` is cross-platform tool so, it can be installed on most of the boxes.

### Homebrew

mkcert can be install on `Mac OS` and `Linux` using `homebrew`

```shell
brew install mkcert
```

Choice of browser on mac is `Firefox`,  install nss

```shell
brew install nss # for Firefox
```

### from source

Building from source requires Go 1.13+

```shell
git clone https://github.com/FiloSottile/mkcert && cd mkcert
go build -ldflags "-X main.Version=$(git describe --tags)"
```

### Linux

for Arch linux

```shell
sudo pacman -Syu mkcert
```

for Debian/Ubuntu

```shell
sudo apt install mkcert
```

### Windows

Using `WinGet`

```powershell
winget install FiloSottile.mkcert
```

Using `Chocolatey`

```powershell
choco install mkcert
```

Using `Scoop`

```powershell
scoop bucket add extras
scoop install mkcert
```

## Generate Certificate

### CA Root Certificate

First root certificates needs to be generated,

```shell
mkcert -install
```

This will generate and install certificate in system root store.

```shell
The local CA is now installed in the system trust store! ⚡️
```

To check the location of CA, run

```shell
mkcert -CAROOT
```

Defaults are

```bash
$env:LOCALAPPDATA # Windows
~/.local/share/mkcert # Linux
~/Library/Application Support/mkcert # Mac OS
```

### Certificate for Controller

To generate certificate, run

```shell
mkcert -key-file key.pem -cert-file cert.pem 192.168.0.2
```

Here `192.168.0.2` is the ip address of the controller.

```shell
Created a new certificate valid for the following names 📜
 - "192.168.0.2"

The certificate is at "cert.pem" and the key at "key.pem" ✅

It will expire on 18 January 2025 🗓
```

### PKCS

```shell
mkcert -pkcs12 192.168.0.2
```

Output should be something similar

```shell
Created a new certificate valid for the following names 📜
 - "192.168.0.2"

The PKCS#12 bundle is at "./192.168.0.2.p12" ✅

The legacy PKCS#12 encryption password is the often hardcoded default "changeit" ℹ️

It will expire on 18 January 2025 🗓
```

> Default password for `pkcs` certificate is `changeit`.

## Install certificate

To install freshly generated certificate,

- go to `Controller Settings` >> `Controller` >> `HTTPS Certificate`
- Change `File Format` to `PEM`
- Select `SSL Certificate` and `SSL Key` and Click save.

![Omada Controller SSL Cert Selection](/img/omada-ssl-settings.png)

## Install CA Certificate

mkcert installs root Certs in proper store depending on the operating system but does not install in Firefox in Windows, in that case install it manually

### Firefox

Firefox manages it's own store for certificates. To add certificates

- Go to `about:preferences#privacy`.
- Scroll down to `Certificates`.
- Select `View Certificates`.
- Select `Import`.
- Select `PKCS` file `192.168.0.2.p12`.
- Enter the password or leave it empty if not applicable.

> 1. Reboot the controller/PC/Browser to update and changes to take effect.
