---
layout: post
title:  "Accèder à Liberachat avec WeeChat"
date:   2024-01-18 01:24:44 +0100
categories: WeeChat IRC
author: "by rnek0"
lang: "fr"
permalink: "/apps/weechat"
---

**IRC** : Internet Relay Chat (IRC ; en français : « discussion relayée par Internet ») est [un protocole de communication textuel sur Internet](https://datatracker.ietf.org/doc/html/rfc1459). Il sert à la communication instantanée principalement sous la forme de discussions en groupe par l’intermédiaire de canaux de discussion, mais il peut aussi être utilisé pour de la communication entre deux personnes seulement. Il peut par ailleurs être utilisé pour faire du transfert de fichier. On peut dire que c'est l’ancêtre de plateformes telles que [Discord](https://fr.wikipedia.org/wiki/Discord_(logiciel)) par exemple, sauf que ce dernier est distribué avec une licence propriétaire.  
- Voir [IRC sur Wikipedia](https://fr.wikipedia.org/wiki/Internet_Relay_Chat "IRC sur Wikipedia")

**[Liberachat](https://libera.chat/)** dispose d'un réseau de serveurs IRC. Un réseau IRC est un ensemble de serveurs IRC connectés l’un à l’autre relayant si nécessaire les messages, formant ainsi une architecture répartie. 

**WeeChat** est un client IRC (internet relay chat) qui s'execute en ligne de commande, donc dans un shell, mais il y a également des accès sur certaines pages web.
- Voir : <a href="https://weechat.org/" target="_blank" rel="noopener noreferrer">https://weechat.org/</a>  

Ce post en dehors de la presentation, est __un guide pour accélérer mes installs__, 'fonctionnel' si vous savez ce que vous faites.

## Installation rapide sur Debian

Ceci et prévu pour une Debian Buster (Debian 10) en [LTS](https://wiki.debian.org/fr/LTS), autant dire que ce n'est plus la plus récente. Puisque l'on va renseigner les **sources.list** dans un premier temps il vaut mieux que vous l'installiez en fonction de votre version de Debian. **N'oubliez pas de remplacer buster** par le nom de code de votre version (voir https://wiki.debian.org/fr/DebianReleases).

```bash
echo "deb [signed-by=/usr/share/keyrings/weechat-archive-keyring.gpg] https://weechat.org/debian buster main" | sudo tee /etc/apt/sources.list.d/weechat.list
```

### On installe les dependences

```bash
apt-get install ca-certificates dirmngr gpg-agent apt-transport-https
```

### Creation des dossiers pour les clés gpg, puis import de la clé 

```bash
mkdir /root/.gnupg
chmod 700 /root/.gnupg
mkdir -p /usr/share/keyrings
gpg --no-default-keyring --keyring /usr/share/keyrings/weechat-archive-keyring.gpg --keyserver hkps://keys.openpgp.org --recv-keys 11E9DE8848F2B65222AA75B8D1820DB22A11534E
```

### Enfin on installe WeeChat

```bash
sudo apt update
apt-get install weechat-curses weechat-plugins weechat-python weechat-perl
which weechat #on verifie le path
/usr/bin/weechat
```

### On ajoute liberachat à notre liste de serveurs

```bash
/server add libera irc.libera.chat/6697 -tls
```

### Se connecter automatiquement (au prochain demarrage)

```bash
/set irc.server.libera.autoconnect on
```

### Ajouter ses nicks

```bash
/set irc.server.libera.nicks "rnek0,oggy"
```

### Commande d'identification pour votre compte sur Liberachat

```bash
/set irc.server.libera.command "/msg nickserv identify xxxxxxx"
```

### Connecter avec Liberachat et joindre un canal

Les commandes commencent toujours par un slash '/' pour se connecter :
- /connect libera

Pour joindre un canal :

- /join #nom_du_canal

**Netiquette** : sur IRC on aplique certaines regles implicites qui font partie du savoir vivre en communauté. Je vous conseille d'aller lire **[cet guide chez Sourcehut](https://man.sr.ht/chat.sr.ht/etiquette.md)** qui est une reference. 

### RTFM (Read the friendly manual)

<https://weechat.org/files/doc/stable/weechat_quickstart.en.html#add_irc_server>


Amusez vous bien.
