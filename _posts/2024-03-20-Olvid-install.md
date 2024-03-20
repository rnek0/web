---
layout: post
title:  "Installación de Olvid en Linux"
date:   2024-03-20 12:00:00 +0100
categories: Archlinux Linux Olvid
author: "by rnek0"
lang: "es"
permalink: "/apps/olvid"
---
<a name="inicio"></a>
![Olvide App for Linux](/assets/olvid/Olvid-Linux.png){: .center-image }

&nbsp;

🇪🇸 : [**Olvid**](https://www.olvid.io){:target="_blank"} es una aplicación de mensajería instantánea cifrada, publicada desde 2019 por la empresa francesa del mismo nombre. La agencia [**ANSSI**](https://cyber.gouv.fr/){:target="_blank"} <small>[[1]](#anssi)</small> certificó una aplicación móvil específica en 2020 y 2021, y las administraciones francesas recomiendan su uso internamente. 

- La empresa francesa Olvid (quien publica Olvid) afirma tener un alto nivel de seguridad utilizando protocolos criptográficos diseñados específicamente. 
- Es de código abierto. El código fuente se distribuye bajo la licencia AGPL v3 .
- Actualmente es la única aplicación de mensajería instantánea segura certificada por la ANSSI.
- Es gratuita (excepto llamadas seguras). La gestión multi dispositivo y las llamadas seguras requieren la versión de pago a 4,99 € al mes.


Para mi es el momento idóneo para empezar a probar el funcionamiento de esta mensajería, ya que estoy acostumbrado a tener interfaces en el escritorio y en el móvil. Por otra parte la recomendación a nivel de la administración francesa de usar Olvid esta motivada por una política que busca una reconciliación con la soberanía digital.  
Para los que vivimos en Europa y conociendo el panorama de la privacidad en estos días, no hace daño por lo menos el probar a ser un poco menos dependientes del 'todo USA', sin embargo no todo esta tan claro y la adopción de esta plataforma ha generado [algunas polémicas](https://fr.wikipedia.org/wiki/Olvid#Critiques_en_France){:target="_blank"}, por temas de CLOUD Act <small>[[2]](#cloud_act)</small>.  

> Olvid publicó recientemente un artículo detallado sobre la [seguridad y soberanía de los datos intercambiados](https://www.olvid.io/faq/questions-d-actualite/){:target="_blank"} en su aplicación.

Empecemos pues con la instalación.

## Instalación de Olvid en Linux

En mi caso mi distribución Linux es una Archlinux pero la instalación debería funcionar de la misma manera en todas las distribuciones, a menos de una rara excepción.

#### 1. Creamos un directorio donde vamos a descargar Olvid y nos situamos dentro.

```bash
❯ mkdir -p ~/appInstalls/olvid
❯ cd !$
❯ cd ~/appInstalls/olvid
```

&nbsp;

#### 2. Descargamos el comprimido (que pesa 112M) con wget.

```bash
❯ wget https://static.olvid.io/linux/olvid-1.5.1.tar.gz
--2024-03-20 12:15:03--  https://static.olvid.io/linux/olvid-1.5.1.tar.gz
Certificat de l’autorité de certification « /etc/ssl/certs/ca-certificates.crt » chargé
Résolution de static.olvid.io (static.olvid.io) … 
Connexion à static.olvid.io (static.olvid.io)| … connecté.
requête HTTP transmise, en attente de la réponse … 200 OK
Taille : 117262328 (112M) [application/x-tar]
Sauvegarde en : « olvid-1.5.1.tar.gz »

olvid-1.5.1.tar.gz                    100%[=========================================================================>] 111,83M  33,8MB/s    ds 3,3s    

2024-03-20 12:15:07 (33,8 MB/s) — « olvid-1.5.1.tar.gz » sauvegardé [117262328/117262328]
```

&nbsp;

#### 3. Extraemos la aplicación en el directorio /opt/ 

```bash
❯ sudo tar xzf olvid-1.5.1.tar.gz -C /opt/
[sudo] Mot de passe de rnek0 : 
```

&nbsp;

#### 4. Añadimos Olvid al $PATH

```bash
❯ sudo ln -sf /opt/olvid/bin/olvid /usr/bin/olvid
```

&nbsp;

#### 5. Configuramos xdg para abrir Olvid automáticamente con ciertas URL

```bash
❯ xdg-desktop-menu install /opt/olvid/share/olvid-olvid.desktop
```

&nbsp;

#### 6. Ponemos al dia el caché de tipos MIME manejados por archivos de escritorio

```bash
❯ update-desktop-database $HOME/.local/share/applications/
```

&nbsp;

![Instalación de Olvid en la Terminal](/assets/olvid/install.png){: .center-image }
Una captura de pantalla de la instalación.

---

&nbsp;

## Creación de una cuenta en la mensajería  

Abrimos por primera vez Olvid y creamos una cuenta, si no es que ya tenemos una.  

![Lanzando Olvid por primera vez](/assets/olvid/first_start2.png){: .center-image }


A partir de aquí les dejo el enlace de la [documentación oficial de Olvid](https://olvid.io/faq/create-your-first-olvid-profile/){:target="_blank"} para la creación su primer perfil de Olvid si nunca antes ha usado Olvid.

&nbsp;

## Mantener Olvid al dia con la última versión

La última versión de Olvid para Linux es 1.5.1. a dia de hoy (20/03/2024)

Al instalar Olvid desde el archivo tar.gz, solo se necesita reemplazar la instalación anterior. Se supone que puede ejecutar comandos en modo root con sudo y que Olvid se ha instalado en /opt como vimos mas arriba.

Asegúrese de **detener cualquier instancia de Olvid en ejecución** antes de iniciar la actualización.

Ejecute los siguientes comandos:

```bash
     # Elimina la instalación anterior
     sudo rm -rf /opt/olvid/
```

```bash
     # Descomprime el nuevo archivo
     sudo tar xzf olvid-1.5.1.tar.gz -C /opt/
```

---

&nbsp;

Saludos, y hasta la proxima.  
Happy Hacking !!!

```bash
curl -s https://www.rfc-editor.org/rfc/rfc1983.txt | grep -F 'hacker' --context=5 | sed -n 19,24p
   hacker
      A person who delights in having an intimate understanding of the
      internal workings of a system, computers and computer networks in
      particular.  The term is often misused in a pejorative context,
      where "cracker" would be the correct term.  See also: cracker.
```

&nbsp;

---

<a name="anssi"></a>
[[1]](#inicio "Retornar al enlace inicial") Agencia nacional de seguridad de sistemas de información.  
<a name="cloud_act"></a>
[[2]](#inicio "Retornar al enlace inicial") El [CLOUD Act](https://en.wikipedia.org/wiki/CLOUD_Act) es una ley promulgada en los Estados Unidos.