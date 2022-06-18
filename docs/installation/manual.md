---
id: install_manual
title: Manual Installation
sidebar_position: 3
---

## Prerequisites

Omada Controller required following packages to work.

* Java 8 SDK
* Mongo DB 3 or 4
* jsvc
* curl

## Install Prerequisites

### java 8 on debian

```bash
sudo apt install openjdk-8-jre-headless -y
```

### java 8 on RHEL

```bash
sudo yum install java-1.8.0-openjdk-headless.x86_64 -y
```

### jsvc on debian

```bash
sudo apt install jsvc -y
```

### jsvc on RHEL

```bash
sudo rpm --import http://repo.iotti.biz/RPM-GPG-KEY-LUX
sudo yum install http://repo.iotti.biz/CentOS/8/x86_64/apache-commons-daemon-jsvc-1.2.2-5.el8.lux.x86_64.rpm -y
```

### Install mongodb on debian

```bash
sudo apt install mongodb -y
```

### Install mongodb on RHEL

```bash
sudo rpm import https://www.mongodb.org/static/pgp/server-4.0.asc
sudo yum install https://repo.mongodb.org/yum/redhat/8/mongodb-org/4.0/x86_64/RPMS/mongodb-org-server-4.0.27-1.el8.x86_64.rpm -y
```

### Install curl on debian

```bash
sudo apt install curl -y
```

### Install curl on RHEL

```bash
sudo yum install curl -y
```

## Install

### Download the controller

As of this writing latest version of the controller is `v5.3.1`. Create a directory, Download the install and extract the installer from the tarball.

```bash
mkdir omada -m 0755
curl -L https://static.tp-link.com/upload/software/2022/202205/20220507/Omada_SDN_Controller_v5.3.1_Linux_x64.tar.gz | tar -xz -C omada/ --strip-components=1
```

Change the current directory to `omada`.

Make the installer as executable.

```bash
sudo chmod a+x install.sh
```

### Install the controller

```bash
sudo ./install.sh -y -n
```

Follow the prompts and controller will be installing at `/opt/tplink/EAPController`.

## Post Installation

Omada controller will be available on `http://HOST-IP:8088/` or `https://HOST-IP:8043/`.

### Ports

From `v5.0.29` Adoption port has been changed to `29814/tcp`.
Omada controller needs these ports `8088`, `8043`, `27001`, `27002`, `29810`, `29811`, `29812`, `29813` and `29814` to work properly.

### Omada Service

#### Status of the controller

```bash
sudo tpeap status
```

#### start the Controller

```bash
sudo tpeap start
```

#### Stop the controller

```bash
sudo tpeap stop
```

## Uninstall

To uninstall Omada Controller

```bash
sudo ./uninstall.sh
```
