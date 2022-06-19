---
id: install_ansible
title: Install with Ansible.
---

## Clone the repo

```bash
git clone https://github.com/kdpuvvadi/Omada-Ansible.git && cd omada-ansible
```

## Supported repos

* Debian 8, 9 & 10
* CentOS 8, Rocky Linux 8, 8.4
* Ubuntu 18.04, 20.04

## Vars & Inventory

* Copy inventory sample file `cp inventory.ini.j2 inventory.ini`
* Change the ip address with actual IP address of the host server.
* Copy varible file with `cp vars.yml.j2 vars.ini`
* install requirements `ansible-galaxy collection install -r requirements.yml`

## Setup Ansible

* install python & pip with `sudo apt install python3 python3-pip -y`
* install ansible with `pip python3 -m pip install ansible`

## Test Connection

```bash
ansible all -m ping
```

If connection is good, output should be something like below.

```bash
server1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

## Install

Run the playbook with

```bash
ansible-playbook main.yml
```

If user needs password for elevation, append `-K` to the above.

```bash
ansible-playbook main.yml -K
```

## Post Installation

If playbook run was successfull and didn't encounter any error, controller will be install and Omada controller will be available on `http://HOST-IP:8088/` or `https://HOST-IP:8043/`.

### Ports

From `v5.0.29` Adoption port has been changed to `29814/tcp`. Omada controller needs these ports `8088`, `8043`, `27001`, `27002`, `29810`, `29811`, `29812`, `29813` and `29814` to work properly.
