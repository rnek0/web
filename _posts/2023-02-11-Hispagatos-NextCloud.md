---
layout: post
title:  "Conectando al Nextcloud de Hispagatos."
date:   2023-02-11 1:05:44 +0100
categories: NextCloud bash
author: "by rnek0"
lang: "es"
---
<div style="vertical-align: baseline; display: flex; justify-content: center;">
<iframe title="Conectando al Nextcloud de Hispagatos." src="https://ptb.lunarviews.net/videos/embed/a03b4831-c2cf-4a39-b5b9-c6989a4c2bac" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" width="560" height="315" frameborder="0"></iframe>
</div>
# Conectando al NextCloud de Hispagatos

Vamos a ver como crear montajes WebDAV con la shell para conectarnos al __NextCloud de Hispagatos__ en un entorno [Arch Linux](https://archlinux.org/).  
Esto es útil para acceder al cloud de la misma forma que cualquier otro montaje de sistema de archivos remoto.

## Tu cuenta

Necesitas obtener las __credenciales (Habla con rek2)__  

Un ejemplo de NEXTCLOUD_SERVER USERNAME PASSWORD sería :

* NEXTCLOUD_SERVER="https://nextcloud.hispagatos.org/"
* USERMANE="rnek0"
* PASSWORD="TuPasswd"

## Instalación de __davfs2__ en Arch Linux

Utiliza tu gestor de paquetes para instalar __davfs2__ , por ejemplo paru.

```bash
paru -S davfs2
```

## Créando los directorios requeridos

Vamos a créar el directorio en __~/NextCloud__ donde haremos el montage, el directorio __~/.davfs2__ es necesario a davfs2 para su buen funcionamiento.

```bash
mkdir ~/NextCloud ~/.davfs2
```

Para no tener que poner tus credenciales cada vez, vamos a utilizar el fichero __secrets__.

```bash
sudo cp /etc/davfs2/secrets ~/.davfs2/secrets
```

```bash
chown rnek0:rnek0 ~/.davfs2/secrets
```

Vamos a éditar el fichero para ponerle esto al final :

```bash
#NEXTCLOUD_SERVER/nextcloud/remote.php/dav/files/USERNAME/ USERNAME PASSWORD
https://nextcloud.hispagatos.org/remote.php/dav/files/rnek0/  rnek0 TuPasswd 
```

O asi :

```bash
echo "https://nextcloud.hispagatos.org/remote.php/dav/files/rnek0/ rnek0  TuPasswd" >> /home/user/.dav2fs/secrets
```

## Permisos para secrets

Para que nadie vea tu password. (Si quieres hacerlo con root , hazlo en /etc/davfs2/secrets y no crées el secrets en .davfs2)

```bash
chmod 600 ~/.davfs2/secrets
```

## Declaración de la unidad de disco que sera montada

Editando el __/etc/fstab__

```bash
#NEXTCLOUD_SERVER/nextcloud/remote.php/dav/files/USERNAME/ /home/YOUR_LOGIN_USERNAME/NextCloud davfs user,rw,noauto 0 0                              │
https://nextcloud.hispagatos.org/remote.php/dav/files/rnek0/  /home/rnek0/NextCloud davfs user,rw,noauto 0 0
```

## Añadir el user a el grupo network

```bash
sudo usermod -a -G network rnek0
```

## Montando el volumen

```bash
mount ~/NextCloud 
```

## Desmontando el volumen

Antes de desmontar el volumen no olvides hacer un __sync__ para syncronizar los cambios en tus datos.

```bash
sync
umount ~/NextCloud
```

## Verificar

```bash
cat /etc/mtab | grep hispagatos
```

## Enlaces

* [Hispagatos](https://hispagatos.org)
* [Arch Linux wiki: davfs2](https://wiki.archlinux.org/index.php/Davfs2)
* [Nextcloud](https://nextcloud.com)

