---
layout: post  
title:  "Retouches dans le .Xmodmap"
date:   2023-02-11 00:14:44 +0100
categories: gnu linux
author: "by rnek0"
lang: "fr"
permalink: "/xorg/xmodmap"
---

J'ai un clavier azerty en ce moment et je voudrais pouvoir taper en espagnol, je suis en Archlinux avec i3 et Xorg donc voici donc mes manips pour changer les keycodes et pouvoir avoir des jolies ñ (avec win right,n,altgr+2)

## Création de mon ~/.Xmodmap

Pour créer mon ~/.Xmodmap dans mon $USER : 

```
$ xmodmap -pke > ~/.Xmodmap
```

Après on va faire des modifs dans les keycodes puis pour tester les modifs : 

```
$ xmodmap ~/.Xmodmap
```

## Modifications des keycodes

J'ai associé la touche de composition à (win droite)

```
keycode 134 = Multi_key Alt_R Meta_R Alt_R Meta_R
```

et mis pour le n tilde (ñ)

```
!keycode  57 = n N n N deviens  
keycode  57 = n N ntilde Ntilde n N n
```

Notez que le signe d'exclamation sert de commentaire dans le fichier ./Xmodmap.

Je mets à jour xmodmap : 

```
xmodmap ~/.Xmodmap
```

Tadaaaa!!! Et voila !!!

win(right) n 'alt-gr 2' pour le ~ j'ai enfin mon ñ  ;) En fait je peux aussi faire winR + n, alt-gr 2 

C'est bien mais, pareil je m'achette un querty voir si je saute en faisant des loadkeys fr/en ...

La doc de archlinux et un lien en espagnol qui en parle  : 

=> https://wiki.archlinux.org/title/Xmodmap xmodmap dans le Wiki Archlinux

=> https://blog.desdelinux.net/modifica-la-configuracion-de-tu-teclado-con-xmodmap/ "un articulo en español"

Voici quelques keymaps à modifier pour avoir le clavier espagnol avec mon azerty (à regarder attentivement pour pas faire sauter n'importe quoi)

```
keycode  24 = a A aacute Aacute ae AE ae
keycode  26 = e E eacute Eacute EuroSign cent EuroSign
keycode  30 = u U uacute Uacute downarrow uparrow downarrow
keycode  31 = i I iacute Iacute rightarrow idotless rightarrow
keycode  32 = o O oacute Oacute oslash Oslash oslash
keycode  57 = n N ntilde Ntilde n N n
keycode  58 = comma question comma questiondown dead_acute dead_doubleacute dead_acute
keycode  61 = exclam section exclamdown section dead_belowdot dead_abovedot dead_belowdot
```

> Pour que mon ~/.Xmodmap soit pris en compte au demarrage il doit être défini dans le .xinitrc : 

```
usermodmap=$HOME/.Xmodmap

if [ -f "$usermodmap" ]; then
    xmodmap "$usermodmap"
fi
```
