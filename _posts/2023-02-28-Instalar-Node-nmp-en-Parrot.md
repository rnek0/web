---
layout: post
title:  "Instalar Node y npm con nvm en Parrot"
date:   2023-02-28 13:30:00 +0100
categories: Node npm nvm
author: "by rnek0"
lang: "es"
permalink: "/parrot/node"
---

Guía rápida sobre cómo instalar la última versión de [Node.js](https://es.wikipedia.org/wiki/Node.js "Node.js en wikipedia") y [npm](https://es.wikipedia.org/wiki/Npm "Npm en wikipedia") en Parrot.  
Realizado en una VM VirtualBox (Version 7.0.6 r155176)

```bash
rnek0$lsb_release -a
No LSB modules are available.
Distributor ID:	Parrot
Description:	Parrot OS 5.2 (Electro Ara)
Release:	5.2
Codename:	ara
```

[**nvm**](https://github.com/nvm-sh/nvm "nvm en Github") (Node Version Manager) es un administrador de versiones para Node.js, diseñado para ser instalado en modo usuario e invocado por el shell. **nvm** se ejecuta en cualquier shell compatible con POSIX (sh, dash, ksh, zsh, bash), especialmente en estas plataformas: unix, macOS y Windows WSL.  
&nbsp;

### 1. Instalación de nvm :  

La instalacion con el script es simple  
> ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash```

```bash
rnek0$curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 15916  100 15916    0     0  50803      0 --:--:-- --:--:-- --:--:-- 50849
=> Downloading nvm from git to '/home/rnek0/.nvm'
=> Clonage dans '/home/rnek0/.nvm'...
remote: Enumerating objects: 358, done.
remote: Counting objects: 100% (358/358), done.
remote: Compressing objects: 100% (304/304), done.
remote: Total 358 (delta 40), reused 164 (delta 28), pack-reused 0
Réception d'objets: 100% (358/358), 219.04 Kio | 2.70 Mio/s, fait.
Résolution des deltas: 100% (40/40), fait.
* (HEAD détachée sur FETCH_HEAD)
  master
=> Compressing and cleaning up git repository

=> Appending nvm source string to /home/rnek0/.zshrc
=> Appending bash_completion source string to /home/rnek0/.zshrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```  
&nbsp;

### 2. Verificación 

Cierra el terminal y vuelvelo a abrir, entra estos comandos ; 

```bash
rnek0$command -v nvm && nvm --version
nvm
0.39.3
```  
&nbsp;

### 3. Descargar, compilar e instalar la última versión de Node.js

Con **nvm** haz lo siguiente ("node" es un alias para la última versión):

```bash
rnek0$nvm install node 
Downloading and installing node v19.7.0...
Downloading https://nodejs.org/dist/v19.7.0/node-v19.7.0-linux-x64.tar.xz...
############################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v19.7.0 (npm v9.5.0)
Creating default alias: default -> node (-> v19.7.0)
```

Verificamos la instalación y las versiones

```bash
┌[rnek0-parrot]─[13:07-28/02]─[/home/rnek0]
└╼rnek0$node --version && npm --version
v19.7.0
9.5.0
```  
&nbsp;

### 4. A saber

**npm** (Node package manager) ya viene con la última versión de Node.js.

Documentación : <https://github.com/nvm-sh/nvm#usage>

Eso es todo.

Happy hacking !