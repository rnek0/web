---
layout: post
title:  "Monitoring de Peertube - Prometheus & Grafana"
date:   2024-01-12 01:24:44 +0100
categories: Peertube Grafana Prometheus
author: "by rnek0"
lang: "fr"
permalink: "/apps/peertube"
---

Voici quelques notes pour pouvoir s'initier à [monitoriser Peertube](https://docs.joinpeertube.org/maintain/observability) avec :

- Prometheus
- Grafana
- Tempo
- Loki
- Promptail

[Peertube](https://joinpeetube.org/) est un logiciel **libre** crée par [Chocobozzz](https://blog.cpy.re/) et financé par [Framasoft](https://framasoft.org/fr/) qui permet de vous émanciper des plateformes video proprietaries.  

Vous disposez ainsi d'un environnement de partage et visualisation de vos vidéos sur vôtre serveur, mais c'est bien plus que cela : faire du live, importer des videos depuis d'autres plateformes, ajouter des plugins pour diverses fonctionnalités supplémentaires, mettre vos vidéos à disposition avec un mot de passe ou bien encore d'autres fonctionnalités, existent pour la grande joie des des petits et des grands.

Ce post existe car comme il est indiqué sur la documentation : 

"**Installing Prometheus, Tempo, Loki and Grafana is out of the scope of this guide**" :  
<< l'installation de l'environnement sort du cadre des explications données sur le guide >>.  
On dispose tout de même de toutes les infos nécessaires car la documentation de Peertube est très bien faite, je vais tenter donc de faire un peu d'initiation pour les neophytes en profitant des [infos disponibles sur la documentation officielle](https://docs.joinpeertube.org/maintain/observability).  

Ainsi nous allons mettre à profit le guide de la documentation de Peertube et tenter de mener à bien l'experience pour disposer d'un environnement de monitoring pour notre instance.  

**Ce guide prends du temps avant d'avoir le résultat escompté**, alors pensez à commencer avec la tête reposée et les idées claires, le but étant que vous finissiez avec un environnement en local qui fonctionne avec votre instance Peertube. 

#### A retenir
>  Pour les commandes du shell, si la ligne commence par : 
> -  un **$** (dollar) la commande se lance en '*mode utilisateur (user)*'; 
> - un **#** (dièse ou croisillon) la commande se lance '*en mode administrateur (root)*'.

#### Prérequis  
Si vous lisez ceci et 'voulez mettre ce guide en pratique' vous devez être **administrateur de votre instance** et avoir accès à votre serveur avec **ssh**.  

On admet que vous avez fait une [installation de Peertube (recommandée)](https://docs.joinpeertube.org/install/any-os) dans la documentation officielle.

## Installation de Prometheus

[Prometheus](https://prometheus.io) est un projet de la Cloud Native Computing Foundation, il s'agit d'un système de surveillance des systèmes et des services.   
Il collecte des métriques à partir de cibles configurées à des intervalles donnés, évalue les expressions de règles, affiche les résultats et peut déclencher des alertes lorsque des conditions spécifiées sont observées.  
Voir le [repo github](https://github.com/prometheus/prometheus)

Nous allons installer Prometheus pour faire de la monitorisation d'un serveur **Peertube**, mais dans un premier temps, pour se faire la main on va juste essayer de voir à quoi il ressemble en jouant avec lui. 

Avant toute chose nous allons créer un dossier de travail, pour moi ce sera :  

```bash
$ mkdir -p /home/rnek0/tests/prometheus_install
```

&nbsp;

### 1. Téléchargement, installation

[La page de téléchargement se trouve ici](https://prometheus.io/download/).  
Dans mon cas je vais installer la version : **prometheus-2.48.1.linux-amd64.tar.gz** ; une fois dans notre dossier de travail on télécharge, on décompresse et on entre dans le dossier qui contiens le binaire de Prometheus  : 

#### - Copier le lien de téléchargement sur le site

https://github.com/prometheus/prometheus/releases/download/v2.48.1/prometheus-2.48.1.linux-amd64.tar.gz


#### - Faire un wget pour télécharger dans notre dossier de travail :

```bash
$ wget https://github.com/prometheus/prometheus/releases/download/v2.48.1/prometheus-2.48.1.linux-amd64.tar.gz
```

#### - Décompresser avec tar et entrer dans le dossier 

On peu également effacer le tar après la decompression.



```bash
$ tar xvfz prometheus-2.48.1.linux-amd64.tar.gz
$ rm prometheus-2.48.1.linux-amd64.tar.gz
$ cd prometheus-2.48.1.linux-amd64
```

Voici le résultat :

![Dossier de Prometheus](/assets/peertube/config_prometheus.png "Dossier de Prometheus")



### 2. Configuration de Prometheus

Je vous rappelle qu'on essaie d'abord Prometheus, si vous connaissez déjà ceci vous pouvez passer passez à l'étape de la [configuration Prometheus pour Peertube](#peertubeconfig)

Nous allons sauvegarder le fichier de configuration initial et créer un autre pour que Prometheus surveille les métriques de son propre système d'exploitation pour l'instant:

```bash
$ mv prometheus.yml prometheus.yml.initial
```

Voici le contenu de notre nouveau fichier **prometheus.yml** écrit en [format yaml](https://yaml.org/)

```yaml
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
```

Jusqu'ici rien de magique, cela viens de la doc officielle de Prometheus: <https://prometheus.io/docs/prometheus/latest/getting_started/>

## Démarrage de Prometheus  

Pour démarrer Prometheus avec votre fichier de configuration nouvellement créé, accédez au répertoire contenant le binaire Prometheus et exécutez la commande :

```bash
# Start Prometheus.
# By default, Prometheus stores its database in ./data (flag --storage.tsdb.path).
$ ./prometheus --config.file=prometheus.yml
```
ou bien

```bash
$ ./prometheus --config.file=prometheus.yml 2>/dev/null &disown
```

N'hésitez pas à aller sur la doc pour experimenter et faire des requêtes sur les données (dans getting started on vous propose des activités pas à pas pour commencer).

## Surveillance des métriques d'un hôte avec "Prometheus Node Exporter"

Prometheus Node Exporter expose une grande variété de métriques liées au matériel et au noyau.

Nous allons :

- Démarrer un Node Exporter sur localhost (notre machine).
- Démarrer une instance Prometheus sur localhost configurée pour extraire les métriques du Node Exporter en cours d'exécution.

### Installation et execution du Node Exporter

Le Prometheus  [Node Exporter](https://github.com/prometheus/node_exporter) est un binaire statique unique que vous [trouverez ici](https://prometheus.io/download/#node_exporter) dans notre cas ce sera : **node_exporter-1.7.0.linux-amd64.tar.gz** .  

Une fois téléchargé depuis la page de téléchargement de Prometheus , extrayez-le dans notre dossier initial, entrez dans son dossier et exécutez-le :

```bash
$ wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
$ tar xvfz node_exporter-1.7.0.linux-amd64.tar.gz
$ cd node_exporter-1.7.0.linux-amd64
$ ./node_exporter
```

Vous devriez voir un résultat comme celui-ci indiquant que Node Exporter est maintenant en cours d'exécution et expose les métriques sur le port 9100 :

![Demarrage de Node Exporter](/assets/peertube/start_node_exporter.png)

Allez sur la [documentation officielle](https://prometheus.io/docs/guides/node-exporter/) pour mieux comprendre si vous avez un doute (en anglais).

**RESUME** : **Node exporter** va collecter les données et les mettre à disposition. **Prometheus** va aller chercher ces données pour son usage, l'emplacement de celles-ci à été renseigné dans le fichier de configuration **prometheus.yml**; ainsi il sait où il dot aller 'gratter' les données. 
Ces données pourraient être sur une autre machine que la notre, par exemple sur notre serveur Peertube.  
C'est ce que l'on va voir dans la prochaine section.

<a name="peertubeconfig"></a>
## OS/PeerTube metrics in Prometheus

Maintenant que l'on a réussi a installer Prometheus et le Node Exporter, et qu'on a joué un peu avec, nous allons nous attaquer à la **monitorisation de Peertube**.  

### Verifier le fichier de configuration de Peertube

Pour ce faire il faut dans un premier temps allez voir si le fichier [production.yaml de Peertube est configuré pour permettre les metriques](https://github.com/Chocobozzz/PeerTube/blob/2230b1571ff5ff9a5b0a83394a331bf1015ebfbc/config/production.yaml.example#L253).  

> La ligne avec le paramètre **enabled** doit être a **true**

Connectez vous en ssh à votre serveur Peertube, avec l’utilisateur **peertube** allez regarder dans votre fichier **production.yaml** pour verifier que les métriques sont activées dans la section **open_telemetry** : 

![open_telemetry](/assets/peertube/open_telemetry.png)
  
Si enabled est à false éditez le fichier production.yaml et passez enabled à true.  
Il faudra **redémarrer** votre instance Peertube pour que cela prenne effet.

**Question**: où est le end point ? 

Le end point, est l'endroit où le service Peertube Node exporter expose les données; même si vous ne le voyez pas "de l’extérieur" il est tout de même en fonctionnement, pour voir le résultat on doit être logué en ssh sur le serveur et taper ceci : 

```bash
$ curl http://localhost:9091/metrics
```

Exemple :  
![Peertube exporter](/assets/peertube/peertube_exporter.png)


On va pouvoir configurer le serveur pour venir gratter les données avec notre Prometheus installée à la maison, (il pourrait être sur une autre machine ou serveur)

### Sécurisation de l'accès et reverse proxy

On va sécuriser l'accès en créant un fichier .htaccess, et on exposera le service sur le net par la suite :

Nous allons mettre ceci dans le fichier de configuration de nginx  ```/etc/nginx/sites-enabled/peertube``` au tout debut :

```bash
# PeerTube Prometheus exporter
server {
  listen 9092;
  listen [::]:9092;

  auth_basic           "Auth";
  auth_basic_user_file /etc/nginx/htaccess/peertube_prometheus;

  location / {
    proxy_pass http://localhost:9091;
  }
}
```

Ceci permettra au service PeerTube_exporter d'exposer ses datas.

**Est-t-il protégé ?** , la ligne auth_basic renseigne à nginx qu'il va falloir filtrer les accès en fonction du mot de passe qui sera dans le fichier déclaré à la ligne suivante.   
C'est une protection en .htaccess mais sur nginx et non pas sur Apache.

Pour voir un tuto si c'est vague (en anglais) : <https://www.cyberciti.biz/faq/nginx-password-protect-directory-with-nginx-htpasswd-authentication/>

Nous devons donc créer ce fichier à l'aide de la commande **htpasswd**

Pourquoi je n'ai pas la commande **htpasswd** ?  
Sur Debian elle se trouve dans [apache2-utils](https://packages.debian.org/bullseye/apache2-utils) il faut donc installer ce paquet pour l'avoir dans vôtre PATH.

Ensuite on execute ceci pour créer le fichier pour un **utilisateur** nommé scraper (vous pouvez changer le nom) : 

```bash
# mkdir /etc/nginx/htaccess
# htpasswd -c /etc/nginx/htaccess/peertube_prometheus scraper
```

On tape un **mot de passe** pour ce compte.  

**Ces identifiants** seront ensuite à renseigner dans le fichier de configuration de Prometheus.

On teste la configuration de nginx :

```bash
# nginx -t
```

Il y a plus qu'a redémarrer Peertube et nginx

```bash
# systemctl restart peertube
# systemctl restart nginx
```

On oubliera pas de vérifier qu'on a **ouvert le port 9092**

```bash
$ sudo nmap -p9092 -sCV -n -Pn -vvv <votre-IP> -oG verif_port_9092
Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-11 21:44 CET
...

PORT     STATE SERVICE REASON         VERSION
9092/tcp open  http    syn-ack ttl 50 nginx
| http-auth: 
| HTTP/1.1 401 Unauthorized\x0D
|_  Basic realm=Auth
|_http-title: 401 Authorization Required

...

```

Les métriques seront donc exposées sur le 'end point' suivant:

```bash
http://ptb.lunarviews.net:9092 
```

![Login Prometheus](/assets/peertube/loginPrometheus.png)

Vous pouvez y aller (si votre navigateur le permet) et voir le résultat :

On va adapter maintenant le fichier de configuration de Prometheus (prometheus.yml) que nous avons utilisé déjà, pour qu'il aille chercher les datas sur notre serveur où se trouve notre instance Peertube, voir la section [Configure Prometheus](https://docs.joinpeertube.org/maintain/observability#configure-prometheus) de la documentation de Peertube : 

```yaml
scrape_configs:
  - job_name: 'peertube'

    basic_auth:
      username: scraper
      password: your-password

    static_configs:
      - targets: [ 'peertube.example.com:9092' ]
        labels:
          instance: 'peertube.example.com'
```

Comme vous pouvez le constater, il y a d'autres 'job_name' dans ce fichier qui correspondent aux autres exporters Prometheus (PostgreSQL, Redis et Node) utilisés pour monitoriser notre instance.

On pourra les configurer plus tard pour avoir leurs métriques, mais c'est le même principe que ce qu'on a fait jusqu'à present, sauf que chacun d'eux aura un peu de configuration supplémentaire; voir la section [Install other Prometheus exporters ](https://docs.joinpeertube.org/maintain/observability#install-other-prometheus-exporters)



**RESUME**:
- On vérifie le fichier production.yaml (open_telemetry.metrics.enabled sur true)
- On configure le service avec le reverse proxy dans nginx
- On crée le fichier pour l'authentication .htaccess
- On redémarre les services peertube et nginx
- On vérifie que le port est ouvert.
- On modifie en consequence le fichier prometheus.yml (avec les identifiants)

Voici ce que l'on pourra avoir pour commencer : 

![Peertube et Prometheus](/assets/peertube/peertube_prometheus.png)



## Installation de Grafana

On peut trouver Grafana dans les **repos extra d'ArchLinux** <https://archlinux.org/packages/extra/x86_64/grafana/>, moi je vais l'installer ainsi. 

Pour une distribution Debian et dérivées nous allons récupérer la clé gpg et l'ajouter aux clés de confiance, on ajoute le repository au source.list et on l'installe avec apt :

```bash
$ wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
$ sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
$ sudo apt update
$ sudo apt install grafana
```

Une fois installé on le démarre avec systemd :

```bash
$ sudo systemctl start grafana-server
```

et si on veut le démarrer au boot on active le service :

```bash
$ sudo systemctl enable grafana-server
```

Dans mon cas j'aurai le binaire installé dans mon système et je pourrais le lancer avec systemd, cela doit être certainement de même pour vous avec les paquets de vôtre distribution.  

![Start Grafana](/assets/peertube/grafana_enable_start.png)

> Pour les autres OS voir [la documentation officielle](https://grafana.com/docs/grafana/latest/?plcmt=learn-nav "Installer Grafana").

## Lancement de Grafana

Une fois Grafana démarré on peut le trouver en ouvrant http://127.0.0.1:3000 dans le navigateur.

Par défaut on a un formulaire de login avec les identifiants par défaut :

- user: **admin** 
- password: **admin**
  
La première chose à faire sera de changer au moins le mot de passe.

---

Je pense que c'est un bon morceau pour commencer, je vais laisser la suite pour un autre post. La prochaine fois on avancera avec l'install de :

- Tempo (to store and query PeerTube traces)
- Loki (to store and query PeerTube logs)
- Promtail (to send PeerTube logs to Loki)

J'espère que cela vous a dégrossi un peu la tâche.

Bientôt la suite.



