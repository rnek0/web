---
layout: post
title:  "Un shortcut para Flameshot con xbindkeys, Parrot, y bspwm"
date:   2023-05-06 15:32:44 +0100
categories: Parrot Flameshot
author: "by rnek0"
lang: "es"
permalink: "/redes/"
---

# Un shortcut para Flameshot con xbindkeys, Parrot, y bspwm

Una pequenia presentacion :

[Flameshot](https://flameshot.org/) es un programa que permite hacer capturas de pantalla, es [Free](https://github.com/flameshot-org/flameshot/blob/master/LICENSE) con [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) & [open source](https://opensource.org/) software. 

[xbindkeys](https://www.nongnu.org/xbindkeys/) es un programa que permite lanzar comandos shell con teclado o con el ratón (mouse).

El entorno en el que esto esta hecho es una distribución Gnu-Linux **Parrot** con [bspwm](https://github.com/baskerville/bspwm) en una maquina virtual, como se puede aprender en la academia de [hack4u](https://hack4u.io/cursos/personalizacion-de-entorno-en-linux/). Al principio la creé con WMware en windows y mas tarde exportada a VirtualBox en Archlinux.

Como hacer un shortcut para Flameshot en este entorno ? aquí tenéis los pasos a ejecutar :

## 1. Instalar xbindkeys

Lo normal en un ambiente Parrot.

```bash
sudo apt update
# sudo parrot-upgrade (si necesario)
sudo apt install flameshot xbindkeys
```

## 2. Comprobamos que xbindkeys y Flameshot estan instalados.

Para estar seguros.

```bash
$ which xbindkeys
/usr/bin/xbindkeys
$ command -v flameshot
/usr/bin/flameshot
```

command -v para variar de which.

## 3. Configuracion del shortcut

Debemos crear un fichero .xbindkeysrc

❯ echo '' > .xbindkeysrc

4. Executer :

❯ xbindkeys --key
Press combination of keys or/and click under the window.
You can use one of the two lines after "NoCommand"
in $HOME/.xbindkeysrc to bind a key.
"NoCommand"
    m:0x10 + c:107
    Print
    
5. Abrir ..config/bspwm/bspwmrc y poner dentro (para que sea permanente)

```bash
# Arranca xbindkeys (para flameshot)
/usr/bin/xbindkeys
```

6. Salir de la session y volver a entrar
sudo kill -9 -1

6. # Arranca xbindkeys
/usr/bin/xbindkeys

7. Test dandole à la tecla IMPR ECRAN

![]()



Comentarios finales:

Despues del primer arranque de flameshot, este queda en funcionamiento como se puede apreciar con este commando.

```bash
❯ ps aux | grep flameshot
rnek0       6045  2.2  2.6 1499540 107460 ?      Sl   14:52   0:03 /usr/bin/flameshot
rnek0       7116  0.0  0.0   6260   648 pts/0    S+   14:55   0:00 grep --color=auto flameshot
```

