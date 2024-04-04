---
layout: post
title:  "Servidor ssh con Parrot"
date:   2024-04-03 12:00:00 +0100
categories: Parrot ssh open-ssh
author: "by rnek0"
lang: "es"
permalink: "/apps/openssh"
---

![Enable ssh server](/assets/ssh/ssh-parrot-post.png){: .center-image }

<a name="inicio"></a>

:es: [**OpenSSH**](https://www.openssh.com/){:target="_blank"} (Open Secure Shell) es un conjunto de aplicaciones que permiten realizar comunicaciones cifradas a través de una red, usando el [protocolo SSH](https://www.rfc-editor.org/rfc/rfc4253){:target="_blank"}. Fue creado como una alternativa libre y abierta al programa Secure Shell, que es software propietario. El proyecto está liderado por Theo de Raadt.   

- [Ver las ultimas release notes](https://www.openssh.com/releasenotes.html){:target="_blank"}  o [los manuales](https://www.openssh.com/manual.html){:target="_blank"}.  

La suite OpenSSH consta de las siguientes herramientas:

* Las operaciones remotas se realizan mediante [ssh](https://man.openbsd.org/ssh.1){:target="_blank"} , [scp](https://man.openbsd.org/scp.1){:target="_blank"} y [sftp](https://man.openbsd.org/sftp.1){:target="_blank"} .
* Gestión de claves con ssh-add , ssh-keysign , ssh-keyscan y ssh-keygen .
* El lado del servicio consta de sshd , sftp-server y ssh-agent .

Veamos como activar el servicio sshd en Parrot y como conectarnos a el con ssh.

&nbsp;
![Enable ssh server](/assets/separateur.png){: .center-image }
&nbsp;

<a name="sshd-alias"></a>
## Parrot y el metapaquete ssh

En [Parrot](https://www.parrotsec.org/){:target="_blank"} (aunque el métapaquete ssh) ya esté instalado, el servicio **sshd** (gestionado por [**systemd**](https://0pointer.de/blog/projects/instances.html){:target="_blank"}) no esta activo por defecto. La razón es que al principio se escribió como **ssh.service**, **el sshd esta establecido con un nombre de alias** <small>[[1]](#alias)</small>.



Por ello cuando queremos lanzar  o verificar su estado nos dice que no lo encuentra...

```bash
❯ systemctl status sshd
Unit sshd.service could not be found.
```

Sin embargo, al verificar con ```apt-cache policy openssh-server | head -n2``` (en Debian like distros) se vé que esta instalado.

&nbsp;

### 1. Activando el servicio ssh

Para activarlo hay que activar **ssh (y no sshd)** con ```sudo systemctl enable ssh```: 

```bash
❯ sudo systemctl enable ssh
Synchronizing state of ssh.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable ssh
Use of uninitialized value $service in hash element at /usr/sbin/update-rc.d line 26, <DATA> line 44.
Use of uninitialized value $service in hash element at /usr/sbin/update-rc.d line 26, <DATA> line 44.
Created symlink /etc/systemd/system/sshd.service → /lib/systemd/system/ssh.service.
Created symlink /etc/systemd/system/multi-user.target.wants/ssh.service → /lib/systemd/system/ssh.service.

```

### 2. Verificamos el status

Ahora ya podemos ver el status con ```systemctl status ssh``` :

```bash
❯ systemctl status ssh
○ ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; disabled; preset: enabled)
     Active: inactive (dead)
       Docs: man:sshd(8)
             man:sshd_config(5)

```

### 3. Lanzamos el servidor ssh (ahora con sshd)

Solo nos queda arrancar el servicio con ```systemctl start sshd.service``` : 

```bash
❯ sudo systemctl start sshd.service
❯ sudo systemctl status sshd.service
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; preset: enabled)
     Active: active (running) since Wed 2024-04-03 13:53:56 CEST; 12s ago
       Docs: man:sshd(8)
             man:sshd_config(5)
    Process: 46022 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
   Main PID: 46023 (sshd)
      Tasks: 1 (limit: 9417)
     Memory: 1.4M
        CPU: 20ms
     CGroup: /system.slice/ssh.service
             └─46023 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"

avril 03 13:53:56 parrot systemd[1]: Starting ssh.service - OpenBSD Secure Shell server...
avril 03 13:53:56 parrot sshd[46023]: Server listening on 0.0.0.0 port 22.
avril 03 13:53:56 parrot sshd[46023]: Server listening on :: port 22.
avril 03 13:53:56 parrot systemd[1]: Started ssh.service - OpenBSD Secure Shell server.
```

Una captura del terminal:

![Enable ssh server](/assets/ssh/enable-ssh-server.png){: .center-image }

Si no lo utilizas constantemente lo puedes apagar para no correr servicios innecesarios. ```systemctl stop sshd.service```

&nbsp;
![Enable ssh server](/assets/separateur.png){: .center-image }
&nbsp;

## Configuración básica del servidor ssh

> La configuracion esta establecida en el fichero ```/etc/ssh/sshd_config```

### Puerto de escucha

Por defecto el puerto 22, se puede descomentar y cambiar el número de puerto.

```bash
#Port 22
```

### Conexión de la cuenta root

No se aconseja permitir la conexión con la cuenta root, pero se puede establecer en esta línea pasándola a yes.

```bash
#PermitRootLogin prohibit-password
```

```bash
PermitRootLogin yes
```

Para prohibir el acceso a root :

```bash
PermitRootLogin no
```

### Cuentas de acceso

Se puede filtrar y otorgar acceso solamente a cuentas definidas en la sección AllowUsers, añadiendo una linea por usuario (si se necesita)

```bash
AllowUsers <nombre_usuario>
AllowUsers <nombre_usuario_2>
```

### Aplicar los cambios

Después de hacer las modificaciones hay que volver a arrancar el servicio para que se tomen en cuenta.

```bash
systemctl restart sshd
```

### Seguridad de acceso

Una identificación con usuario y contraseña es valida pero una buena medida de seguridad recomienda hacerlo mediante [claves SSH](https://www.ssh.com/academy/ssh-keys) . 

&nbsp;
![Enable ssh server](/assets/separateur.png){: .center-image }
&nbsp;

## Conexión al servidor ssh

Para conectar con el servidor se utiliza el comando [**ssh**](https://man.openbsd.org/ssh.1){:target="_blank"}

![Connexion con el servidor ssh](/assets/ssh/enable-ssh-server2.png){: .center-image }

&nbsp;

**Pregunta :** Me sale este mensaje por consola, ¿cómo lo puedo solucionar ?

![Connexion con el servidor ssh](/assets/ssh/enable-ssh-server3.png){: .center-image }

Eso quiere decir que el servidor ha cambiado su llave publica o que ya has conectado con otro servidor que tenia la misma ip, pero también puede ser por un tema de [MITM](https://www.ssh.com/academy/attack/man-in-the-middle){:target="_blank"} . Se trata del proceso de identificación entre cliente y servidor.



Para solucionarlo puedes :

  1. Abrir tu fichero ```~/ssh/known_hosts``` , buscar por la ip y suprimir la entrada (linea). 
  2. Recuperar la key con el comando : ```ssh-keyscan -t rsa <ip_del_servidor>``` y ponerla al final del dicho fichero.

Es posible que si no la pones en tu know_hosts, a la primera conexión esto se haga automáticamente. 

Pero eso no es suficiente.

### Hacer la verificación correctamente.

Para hacer la verificación correctamente y no validar a ciegas lo mejor es buscar las keys en el servidor con los comandos y comparar con lo recibido a la conexión.

```bash
❯ ssh-keygen -l -f /etc/ssh/ssh_host_rsa_key.pub
❯ ssh-keygen -l -f /etc/ssh/ssh_host_ed25519_key.pub
❯ ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
```

&nbsp;

¿ Cómo saber si el servidor esta à la escucha por el puerto 22 ? con ```ss -lntp | grep "22"```

```bash
❯ sudo systemctl stop sshd
❯ ss -lntp |grep "22"
❯ sudo systemctl start sshd
❯ ss -lntp |grep "22"
LISTEN 0      128          0.0.0.0:22        0.0.0.0:*          
LISTEN 0      128             [::]:22           [::]:* 
```

&nbsp;
![Enable ssh server](/assets/separateur.png){: .center-image }
&nbsp;

## Utilizando scp y sftp

SSH también ofrece dos servicios de transferencia de archivos. **scp** es una herramienta para la terminal que se puede utilizar como cp excepto que cualquier ruta a otro equipo utilizará un prefijo con el nombre de la máquina seguido de dos puntos («:»). 

Por ejemplo:

Con este comando mandamos una copia del fichero **COCO** al servidor **192.168.1.16** poniéndolo en el repertorio **/home/rnek0**

```bash
❯ echo "Este es el fichero del COCO" > COCO
❯ scp COCO 192.168.1.16:/home/rnek0/
```

&nbsp;

### ¿Cómo funciona SFTP?

SFTP mantiene los archivos seguros mediante el uso del flujo de datos de Secure Shell. Autentica tanto al usuario como al servidor y luego utiliza funciones de cifrado y hash criptográfico para hacer que los datos sean ilegibles durante la transferencia. 

&nbsp;

### ¿Cuál es la diferencia entre SFTP y SCP?

No hay que confundir SFTP con SCP, ambos funcionan a través del protocolo SSH, lo que les proporciona una protección confiable. Los dos protocolos son muy diferentes y aplicables a circunstancias opuestas. Estas son algunas de las principales diferencias entre los dos.

#### 1. Transferencias de archivos.

- **SFTP**:  permite transferencias de archivos, reanudación de transferencias interrumpidas, listados de directorios y eliminación remota de archivos.  
- **SCP**:  Sólo permite transferencias de archivos.  

#### 2. Disponibilidad.

- **SFTP**:  disponible en la mayoría de las plataformas compatibles con GUI y herramientas de línea de comandos (CLI)  
- **SCP**:  más comúnmente disponible en Unix.

#### 3. Sesión.

- **SFTP** : la transferencia de archivos puede finalizar sin finalizar la sesión.  
- **SCP**:  Para finalizar una transferencia de archivos, también se debe finalizar la sesión.

#### 4. Velocidad.

- **SFTP**:  más lento en la transferencia de archivos que SCP porque debe esperar el reconocimiento del paquete.  
- **SCP** : utiliza un algoritmo más eficiente que transfiere archivos más rápido.  
  
En general, SFTP es mejor cuando una persona no requiere la velocidad de transferencia más rápida pero necesita una solución multi-funcional y disponible en cualquier plataforma. SCP es mejor cuando un usuario tiene un único objetivo: transferir un archivo de cualquier tamaño lo más rápido posible.

Este post es un recordatorio y no contiene nada de particular, pero es bastante explicito para aclarar algunos conceptos importantes a la hora de lanzar el servidor ssh y utilizarlo con algunas herramientas. 

SSH también se usa para otras tareas, por ejemplo : [¿Qué es un túnel SSH?](https://www.sombreroblanco.es/2018/10/tunel-ssh-for-dummies-una-explicacion-sencilla/){:target="_blank"}

&nbsp;
![Enable ssh server](/assets/separateur.png){: .center-image }
&nbsp;

Happy Hacking !!!

---

&nbsp;

<a name="alias"></a>
[[1]](#sshd-alias "Retornar al enlace inicial")  Lo que se puede verificar leyendo la ultima linea del comando ```systemctl cat sshd.service```

```bash
❯ systemctl cat sshd.service 
# /lib/systemd/system/ssh.service
[Unit]
Description=OpenBSD Secure Shell server
After=network.target auditd.service
ConditionPathExists=!/etc/ssh/sshd_not_to_be_run

[Service]
EnvironmentFile=-/etc/default/ssh
ExecStart=/usr/sbin/sshd -D $SSHD_OPTS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartPreventExitStatus=255
Type=notify

[Install]
WantedBy=multi-user.target
Alias=sshd.service
```
