---
id: upgrade_manual
title: Manual Upgrade
---

If there's an update for controller available, displays the notification on logon to controller. If the controller is hardware controller from TP-Link like `OC 200` or `OC 300`, it'll upgrade the controller or update can be triggered at `settings >> Controller Settings >> Maintenance >> Firmware` and and check for upgrade.

But self hosted controller can't be upgraded in this method. It need's to be upgraded by uninstalling the existing one.

## Backup

Before proceeding with upgrade, please backup the controller at `settings >> Controller Settings >> Maintenance >> Backup & Restore >> backup` and Download the backup to the secure location.

## Stop the controller

First, Stop the controller with `sudo tpeap stop`. Output should be something like below.

```bash
Stopping Omada Controller
Stop successfully.
```

## Download old installer

To make a complete backup before uninstall, current version installer is needed. Create a directory, download the installer and extract the installer from the tar ball.

To download old version visit [https://www.tp-link.com/en/support/download/omada-software-controller/](https://www.tp-link.com/en/support/download/omada-software-controller/)

```bash
mkdir ~/omada-old -m 0755
curl -L https://static.tp-link.com/upload/software/2023/202309/20230920/Omada_SDN_Controller_v5.12.7_linux_x64.tar.gz | tar -xz -C ~/omada-old/ --strip-components=1
```

## Uninstall

Change the directory with `cd ~/omada-old`.

Make uninstall script executable by running `sudo chmod a+x ./uninstall.sh`

and run the following to uninstall the controller.

```bash
sudo ./uninstall.sh
```

Output should be similar to below

```bash
Omada Controller will be uninstalled from [/opt/tplink/EAPController] (y/n): 
```

Select `Y` and hit `Enter` uninstall the controller.

```bash
Do you want to backup database [/opt/tplink/EAPController/data/db] (y/n): 
```

Select `Y` and hit `Enter` to backup the controller.

```bash
Uninstall Omada Controller successfully.
```

## Download new installer

Download and extract latest version of the controller with following.

```bash
mkdir ~/omada-new -m 0755
curl -L https://static.tp-link.com/upload/software/2024/202402/20240227/Omada_SDN_Controller_v5.13.30.8_linux_x64.tar.gz | tar -xz -C ~/omada-new/ --strip-components=1
```

## Upgrade

Change the directory with `cd ~/omada-new`.

Make install script executable by running `sudo chmod a+x ./install.sh`

and run the following to uninstall the controller.

```bash
sudo ./install.sh
```

Output should be similar to below

```bash
Omada Controller will be installed in [/opt/tplink/EAPController] (y/n):
```

Select `Y` and hit `Enter` install the controller.

```bash
======================
Installation start ...
Install Omada Controller succeeded!
==========================
Omada Controller detects that you have backup previous setting before, will you import it (y/n):
```

Select `Y` and hit `Enter` to import the backup.

you should see something similar to the following

```bash
Import previous setting success.
Omada Controller will start up with system boot. You can also control it by [/usr/bin/tpeap].
Starting Omada Controller. Please wait.......................
Started successfully.
You can visit http://localhost:8088 on this host to manage the wireless network.
```

Visit [http://controller_ip:8088](http://controller_ip:8088) to check whether the controller is running or not.
