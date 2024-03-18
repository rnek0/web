---
layout: post
title:  "Kali Linux & WSL2 (quick guide)"
date:   2024-03-18 14:24:44 +0100
categories: Kali Linux WSL2 Windows
author: "by rnek0"
lang: "en"
permalink: "/apps/kali-wsl"
---

![Kali Linux](/assets/kali/Image_Blogpost.png){: .center-image }

🇬🇧 Kali Linux & WSL2 with Windows 11 (quick guide)   


Microsoft **Windows Subsystem for Linux** (WSL) allow us to run some linux distributions on top of Hyper-V. 

[**Kali Linux**](https://www.kali.org/){:target="_blank"} is a distribution that needs no introduction, it is a Linux distribution designed for digital forensics and penetration testing. It is maintained and funded by [**Offensive Security**](https://www.offsec.com/){:target="_blank"}. Kali Linux is based on the Debian Testing branch: most of the packages used by Kali are imported from Debian repositories.

Here are some quick steps I followed to install Kali Linux on Windows 11.

## 1. Open Terminal Windows as administrator

With cmd :

> Win + R and type **wt** , then type Ctrl + Shift + Enter

and run on your [**Terminal Windows**](https://learn.microsoft.com/en-us/windows/terminal/){:target="_blank"} :

```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
```

---
&nbsp;
## 2. Restart when prompt

---
&nbsp;
## 3. Install the WSL 2 Linux Kernel

Download from here: [https://aka.ms/wsl2kernel](https://aka.ms/wsl2kernel){:target="_blank"}

- msi link : [WSL2 Linux kernel update package for x64 machines](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi){:target="_blank"}

![Windows Subsystem for Linux Update Setup](/assets/kali/wsl2.png)

&nbsp;

## 4. Restart

---
&nbsp;
## 5. Open a command prompt and run:

```
wsl --set-default-version 2
```

This command set wsl2 as default. Comparing WSL Versions [https://learn.microsoft.com/en-us/windows/wsl/compare-versions](https://learn.microsoft.com/en-us/windows/wsl/compare-versions){:target="_blank"}

![Set WSL 2 as default](/assets/kali/setDefaultToWSL2.png)

---
&nbsp;
## 6. Install from the Microsoft Store

Install from the Microsoft Store: [Kali Linux](https://apps.microsoft.com/store/detail/kali-linux/9PKR34TNCV07){:target="_blank"}
NOTE: If there is an existing Kali WSL 1, upgrade it by running: 

```
wsl --set-version kali-linux 2
```

![Kali Linux on Windows store](/assets/kali/InstallFromStore.png)

Run kali to finish the initial setup of creating a new user.
	
![Start Kali Linux](/assets/kali/StartKali.png)


---
&nbsp;
## 7. Have some problems ?

**WSL2** runs with **Hyper-V** so you need to install-it.

![Hyper-V](/assets/kali/HyperV.png)


After Hyper-V install this works fine... otherwise check [here](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting?source=recommendations){:target="_blank"}

You got a system with minimum install, check [kali documentation here](https://www.kali.org/docs/troubleshooting/common-minimum-setup/){:target="_blank"}

---
&nbsp;
## 8. Going to the GUI 

[**Win-KeX**](https://www.kali.org/docs/wsl/win-kex/){:target="_blank"} provides a GUI desktop experience for Kali Linux in Windows Subsystem for Linux (WSL 2) with the following features:

* Window mode: start a Kali Linux desktop in a dedicated window
* Seamless mode: share the Windows desktop between Windows and Kali application and menus
* Enhanced session mode: Similar to Hyper-V, uses RDP for a more feature rich experience
* Sound support
* Shared clipboard for cut and paste support between Kali Linux and Windows
* Root & unprivileged session support
* Multi-session support: root window & non-privileged window & seamless sessions concurrently
* Fully compatible with WSLg

---
&nbsp;
## 9. Install Win-KeX

Inside of Kali WSL, install Win-KeX via:

```bash
kali@kali:~$ sudo apt update
kali@kali:~$
kali@kali:~$ sudo apt install -y kali-win-kex # More than 600 packages ! so you can take a nice pizza
```

To start Win-KeX in Window mode with sound support, run either:

* Inside of Kali WSL: ```kex --win -s```
* On Window’s command prompt: ```wsl -d kali-linux kex --win -s```

![Start Win-KeX](/assets/kali/Start_kex2.png)

&nbsp;

TADA !!!

![Kali Linux](/assets/kali/pelada2.png)


We need to perform some extra steps to finish the installation. Because we get this error : "System has not been booted with systemd as init system (PID 1)"

As you can see the **network is not enabled**. NetworkManager is disabled, so ```Ctrl + Alt + T``` to open a terminal and check systemd status

![Kali Linux](/assets/kali/pelada.png)

---
&nbsp;
## 10. How can you get systemd on your machine?

### Ensuring you are on the right WSL version  

```wsl --version```

### Set the systemd flag set in your WSL distro settings

You will need to edit the **wsl.conf file** to ensure systemd starts up on boot.

Add these lines to the **/etc/wsl.conf** (note you will need to run your editor with sudo privileges, e.g: sudo nano /etc/wsl.conf):

```
[boot]
systemd=true
```

Close your WSL distro Windows and run ```wsl.exe --shutdown``` from PowerShell to restart your WSL instances

[More explanations on this page](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/){:target="_blank"}  (Thanks to Craig Loewen for his post.)

---
&nbsp;
## 11. Stop wsl kali and restart it

Commands:

```
$ wsl --list --verbose
$ wsl -t kali-linux
$ wsl --list --verbose
```

![Running distros](/assets/kali/Reboot_distro.png)


After restarting Kali Linux systemd will be operational.

![systemd is working](/assets/kali/GG.png)

---
&nbsp;
## 12. Configure your Kali Linux

Kali Linux is a Rolling distribution, check for updates and go to Tools page : <https://www.kali.org/tools/> 

![Update](/assets/kali/up_to_date.png)

&nbsp;

Windows Subsystem for Linux also allows you to install other distributions, you will find them in the store.

![](/assets/kali/WSL4Win.png)

&nbsp;

---

Happy Hacking !
