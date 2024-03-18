---
layout: post
title:  "Mise à jour de Peertube vers 6.0.3"
date:   2024-03-04 01:24:44 +0100
categories: Peertube upgrades
author: "by rnek0"
lang: "fr"
permalink: "/apps/upgrade_peertube"
---

🇫🇷 [Peertube](https://joinpeertube.org/){:target="_blank"}  est un **logiciel libre** crée par [Chocobozzz](https://blog.cpy.re/) et financé par [Framasoft](https://framasoft.org/fr/){:target="_blank"} qui permet de vous émanciper des plateformes video proprietaries. J'ai déjà fait [un autre post sur Peertube](https://web.lunarviews.net/apps/peertube){:target="_blank"} sur sa monitorisation.

Une petite vidéo en Live sur la mise à jour de mon instance Peertube [https://ptb.lunarviews.net](https://ptb.lunarviews.net){:target="_blank"}  

Le son n'est pas top, la musique est trop forte. Je l'ai faite assez tard dans la soirée, alors soyez indulgents 😉  Je vous ai mis des timecodes sur la barre de progression pour vous éviter les parties ennuyantes ou acceder plus rapidement a une explication.  


&nbsp;

<div style="vertical-align: baseline; display: flex; justify-content: center;">
    <iframe title="Live - Upgrade Peertube vers v6.0.3" width="800" height="415" src="https://ptb.lunarviews.net/videos/embed/4b8a859c-0754-471d-9fa6-8fb78c8ada71" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

&nbsp;

---

&nbsp;

Voici également les notes (pas à pas) de ma mise à jour ainsi que quelques explications sur la procedure. 
&nbsp;

Ma config initiale de Peertube v6.0.2 :

```bash
$ node --version
v18.17.1
$ yarn --version
1.22.19
$ psql --version
psql (PostgreSQL) 13.14 (Debian 13.14-0+deb11u1)
$ redis-server --version
Redis server v=7.0.9 sha=00000000:0 malloc=jemalloc-5.2.1 bits=64 build=f43e914120192099
$ ffmpeg --version
ffmpeg version 4.3.6-0+deb11u1
```

Pour voir les dependences de Peertube: [sur la doc officielle](https://docs.joinpeertube.org/support/doc/dependencies){:target="_blank"}  

La version de **Peertube 6.0.3** est sortie le 18 janvier 2024 , voici un des changements majeurs au niveau sécurité.

    Prevent nginx from serving private/internal/password protected HLS video static files

<br>
Il y a des bugfixes également.

- Comme d'habitude il faut regarder [le CHANGELOG](https://github.com/Chocobozzz/PeerTube/blob/develop/CHANGELOG.md){:target="_blank"} avant de faire quoi que ce soit.

&nbsp;

## 1. Modification de la config de nginx

La section **SECURITY** du changelog recommande de changer une ligne dans la config de nginx, donc on va éditer le fichier de config, une bonne pratique est de sauvegarder le fichier initial, pour pouvoir le reprendre, si on a fait une erreur qui génère un mauvais fonctionnement de nginx :

```bash
$ cd /etc/nginx/sites-available/ && sudo vim peertube
```

Une fois le changement effectué je fais un test nginx pour être sur avant de redémarrer.

```bash
$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Mon fichier semble avoir un syntaxe correcte, je peux donc redémarrer le service nginx.

```bash
$ sudo systemctl restart nginx
```

Puis verifier que tout va bien avec la commande :

```bash
$ systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
Active: active (running) since Sun 2024-03-03 18:10:04 UTC; 19s ago
...
```

Je vais sur l'url de mon instance et je vérifie le bon fonctionnement du serveur et de Peertube.

&nbsp;

## 2. Mise à jour

Peertube dispose d'un script pour effectuer la mise à jour, alors au lieu de la faire à la main on va s'en servir. Il est conçu pour cela et fonctionne tres bien, alors on va pas s'en priver, de toutes façons si quelque chose ne tourne pas rond on peut toujours revenir à l'ancienne version.

&nbsp;

#### 2.1 Savoir revenir en arrière au cas ou

> A regarder avant de faire la mise à jour si c'est la première fois que vous la faites, soit avec le script ou à la main.

On remplace la dernière destination Peertube (lien symbolique) par la version précédente (ici v6.0.2) et on restaure la sauvegarde SQL. Pour moi ce sera celle-ci "sql-peertube_prod-20240303-1836.bak" mais elle peut s’appeler différemment dans votre cas.

```bash
OLD_VERSION="v6.0.2" && SQL_BACKUP_PATH="/var/www/peertube/backup/sql-peertube_prod-20240303-1836.bak" && \
cd /var/www/peertube && sudo -u peertube unlink ./peertube-latest && \
sudo -u peertube ln -s "versions/peertube-$OLD_VERSION" peertube-latest && \
sudo -u postgres pg_restore -c -C -d postgres "$SQL_BACKUP_PATH" && \
sudo systemctl restart peertube
```

Maintenant que l'on sait comment revenir en arrière on peut faire la mise à jour.

&nbsp;

#### 2.2 Utiliser le script pour la mise à jour

Aller dans le dossier et verifier l'existence du script et les permissions.

```bash
$ cd /var/www/peertube/peertube-latest/scripts
$ ls -l
total 4
-rwxr-xr-x 1 peertube peertube 154 Dec 8 13:19 upgrade.sh
```

Puis on va lancer le script.

```bash
$ sudo -H -u peertube ./upgrade.sh
Backing up PostgreSQL database in /var/www/peertube/backup/sql-peertube_prod-20240303-1836.bak
Installing Peertube

...

warning Your current version of Yarn is out of date. The latest version is "1.22.19", while you're on "1.22.11".
info To upgrade, run the following command:
$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
$ test -n "$NOCLIENT" || (cd client && yarn install --pure-lockfile)
Done in 50.77s.

==========================================================

/var/www/peertube/config/production.yaml.new generated
You can review it and replace your existing production.yaml configuration

==========================================================

Please read the IMPORTANT NOTES on https://github.com/Chocobozzz/PeerTube/releases/tag/v6.0.3

Then restart PeerTube!
```

Si votre version actuelle de Yarn est obsolète vous aurez les commandes nécessaires à l'affichage (voir ci-dessus).

&nbsp;

#### 2.3 On redémarre peertube !

On redémarre peertube, puis on vérifie sur le web que tout va bien.

```bash
$ sudo systemctl restart peertube
```

&nbsp;

## 3. Régénérer les vignettes vidéo

La régénération des miniatures de vidéos locales pourrait être utile car les nouvelles versions de PeerTube peuvent augmenter la taille des miniatures :

```bash
$ cd /var/www/peertube/peertube-latest
$ sudo -u peertube NODE_CONFIG_DIR=/var/www/peertube/config NODE_ENV=production npm run regenerate-thumbnails
```

&nbsp;

## 4. Mise à jour des favicons (bonus)

Ceci est un bonus, ce n'est pas obligatoire; il me semble qu'il y a un plugin qui gère les favicons mais je ne suis pas sur. Ici je reprends les mêmes que j'avais dans la version précédente: peertube-v6.0.2

```bash
$ cd /var/www/peertube/versions/peertube-v6.0.2/client/dist/assets/images
$ sudo -Hu peertube cp favicon.png favicon.ico /var/www/peertube/peertube-latest/client/dist/assets/images/
```

Et voila ! la mise à jour est faite.

Happy Hacking !!!
