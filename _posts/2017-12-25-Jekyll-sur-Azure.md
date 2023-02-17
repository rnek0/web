---
layout: post
title:  "Création de site statique avec Jekyll sur Windows 10 et hébergement sur Azure HTML"
date:   2017-12-25 19:22:14 +0100
categories: jekyll Azure
---
# Création de site statique avec Jekill sur Windows 10 et hébergement sur Azure HTML.

Un petit blog sympa et pratique ? voici un petit tuto qui va vous plaire.

J'adore ASP.NET et les langages dynamiques qui permettent de faire de très belles applications fonctionnelles s'appuyant sur des back-ends et web services, mais pour un petit blog de développeur comme moi, je trouve que ce n'est pas très bien adapté. 

Je dispose d'un abonnement Visual Studio Dev Essentials donc d'un compte Azure :) quelques fichiers markdown que j'écris de temps en temps et une install fraiche de Jekyll...

Si vous ne connaissez pas encore Jekyll c'est peut être le moment de voir un peu a quoi ça ressemble pour la même occasion.

Jekyll est un générateur de site statiques écrit en Ruby. Il va se charger de la plomberie et générer vôtre site au format html et on n'aura plus qu'a l'uploader sur le serveur.

Il est configurable a souhait pour gérer tous les assets du site, on peut utiliser des layouts et dispose de thèmes et autres friandises pour quelqu'un qui aime mettre les mains sous le capot et faire quelque chose de perso. Le contenu se rédige en markdown on compile et on uploade.

En gros voila pour la présentation.

## Etape1: Création de site HTML5 statique sur Azure

Dans le tableau de bord du [portail Azure](https://portal.azure.com/) cliquer sur + et entrer le nom du Template " HTML5 Empty Web App " dans le moteur de recherche. Cliquez su créer et suivez la procédure habituelle (entrez le nom de vôtre application, choisissez vôtre abonnement et vôtre groupe de ressources, emplacement de App Service et créer)

Le site sera crée et déployé a partir d'un Template situé sur Git.

### Création des identifiants pour uploader le site en ftps 

**USER & PASS :**

Aller dans DEPLOIEMENT > Informations d'identification de déploiement App Service et créer le  Nom d'utilisateur FTP/Déploiement (user) et le Mot de passe (pass)

**ADDRESS FTPS :**

Paramètres > Propriétés > Nom de l'hôte ftps : ftps://xxxxxxxxxx.ftp.azurewebsites.windows.net 

Si vous ne voyez pas l'adresse de vôtre ftps dans la vue d'ensemble de vôtre App Service il faut enlever le déploiement github qui est par defaut et vous verrez alors propriétés du ftps.

La doc officielle si vous avez des soucis? 

cf: [Déployer votre application dans Azure App Service avec FTP/S](https://docs.microsoft.com/fr-fr/azure/app-service/app-service-deploy-ftp)

Dans la doc on vous parle de Filezilla, moi je préfère l'explorateur Windows, chacun ses gouts...

---

## Étape 2: Installer Ruby sur Windows 10

Une partie se fait sur la console Windows ou PowerShell, il faut donc patienter le temps que les downloads se fassent et se mettent en place...

Aller chercher l'installer ici: [RubyInstallers for windows](https://rubyinstaller.org/downloads/) et démarrer l'installation.

### installer MSYS2 64bit: laisser cochée l'option a la fin de rubyinstaller

Quelques images de la procédure d'installation MSYS2

![Alt Screenshot](/assets/Install_MSYS2.PNG?raw=true "Debut d'installation")

![Alt Screenshot](/assets/Install_MSYS2_2.PNG?raw=true "Bien laisser coché pour installer MSYS2 !")

![Alt Screenshot](/assets/Install_MSYS2_3.PNG?raw=true "MiniAsteroids")

![Alt Screenshot](/assets/Install_MSYS2_4.PNG?raw=true "MiniAsteroids")

### Installer Jekyll et bundler 

```bash
> gem install jekyll bundler
```

Donner l'accès au pare feu, et c'est ok.

### Création d’un nouveau site

```bash
> cd C:!CODES\Mon_Blog\ 
```

La commande >jekyll new jekyllblog permet d’obtenir le code source d’un site dans le dossier jekyllblog qui sera utilisé pour configurer et générer le blog.

Aller dans vôtre nouveau dossier.

```bash
> cd jekyllblog 
```

Compiler (générer) le site :

```bash
> bundle exec jekyll serve
```

Avec l'option -w (watch) nous avons le possibilité de voir les changements en mode modification des pages.

Regarder dans: http://localhost:4000

Tada !

### Quelques explications sur le contenu de cette génération

**Organisation du blog:**

Suite à la génération, Jekyll a créé un blog minimal. 

Le fichier **_config** contient la configuration générale du blog, le dossier **_layout** contient les Template qui serviront à générer les pages. Le dossier **_post** contient les articles et le dossier **_site** contient le blog généré. Ce dernier dossier sera uploadé sur votre serveur pour la publication.

Plus d'infos sur Jekyll : [jekyll sur Github](https://github.com/jekyll/jekyll)

---

Happy coding !
