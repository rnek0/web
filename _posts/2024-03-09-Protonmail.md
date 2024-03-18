---
layout: post
title:  "ProtonVPN dans le shell avec Archlinux"
date:   2024-03-08 01:24:44 +0100
categories: email vpn archlinux protonmail
author: "by rnek0"
lang: "fr"
permalink: "/apps/protonvpn"
---

🇫🇷 Ce post es un peu technique, si vous cherchez une recette de cuisine passez vôtre chemin, ce n'est pas que l'on se fiche de bien manger, mais que ce n'est pas l'orientation de ce blog. 

[Protonmail](https://fr.wikipedia.org/wiki/Proton_Mail){:target="_blank"} est une messagerie web chiffrée [de bout en bout](https://fr.wikipedia.org/wiki/Chiffrement_de_bout_en_bout){:target="_blank"}. 📬 🔐

Les services de Protonmail ont un fonctionnement un peu particulier. Si tu veux récupérer [ton courier](https://account.proton.me/login){:target="_blank"} sur ta machine il faut 'un bridge' donc tu as a disposition une application qui est prevue pour cela.  
Pour ce qui est du [vpn](https://account.protonvpn.com/){:target="_blank"} nous avons également à disposition une application qui permet de se connecter au tunnel mais on ne la traite pas dans ce post.

Protonmail propose des formules gratuites et payantes, en fonction de celle que tu as choisi tu auras à disposition au moins un courrier et... tu peux aussi utiliser un vpn.

Comment cela fonctionne puisque ce sont des services chiffrés ? Et bien avec l'application pour le **courrier** tu dois mettre les mêmes identifiants que ceux que tu utilises pour ton compte mail sur le site web, elle va se charger donc de t'offrir un service en localhost avec des identifiants pour te connecter en **IMAP** et **SMTP** avec **STARTTLS** et **SSL** respectivement.

Pour ce qui est du **vpn** ce serait la même chose, c'est à dire qu'il faut mettre les identifiants pour se logguer dans l'application et elle se charge de configurer le tunnel sur ton interface reseau. Pour moi _le hic_ est là 🤔 ; pour la gestion des paramètres du tunnel, l'application se sert de NetworkManager (et pas moi).

ProtonVPN fonctionne avec **openvpn** donc si tu ne peut utiliser la GUI tu peux te connecter avec le shell.
C'est la solution que j'ai adoptée, certes la GUI est plus pratique mais il y a toujours moyen de faire, et limite je préfère le terminal, il me prendra moins de ressources.  

&nbsp;

## 1. Faire tourner protonVPN sur Archlinux

 Voyons comment faire sur Archlinux.


#### 1.1. Installer openvpn

```bash
sudo pacman -S openvpn
```

&nbsp;

#### 1.2. Installer openresolv

```bash
sudo pacman -S openresolv
```

&nbsp;

#### 1.3. Télécharger le fichier de connection openvpn 

>On doit se loguer sur [la web de protonVPN](https://account.protonvpn.com/) avec les identifiants de ton compte Protonmail, puis aller dans la section **Téléchargements**.

&nbsp;

- Sélectionner la plateforme
- Sélectionner le protocole
- Sélectionner le fichier

&nbsp;

![Télécharger le fichier .ovpn](/assets/proton/open_vpn_file_down.png)

&nbsp;

#### 1.4. Récupérer les identifiants OpenVPN/IKEv2

Les identifiants pour la connection en openvpn se trouvent dans la section **Compte** 

![Récupérer les identifiants](/assets/proton/pVPN.png)

&nbsp;

#### 1.5. Lancer openvpn

```
$ sudo openvpn us-free-114043.protonvpn.udp.ovpn
[sudo] Mot de passe de rnek0 : 
...
```

Voici une joli capture pour les curieux :

![Session openvpn avec ProtonVPN](/assets/proton/pVPN-resultado.png)

Et voila !

---

&nbsp;

Je pensais montrer la partie pour le mail, mais ce sera pour le prochain post.  
Prenez soin de vous, et à la prochaine :wink:
