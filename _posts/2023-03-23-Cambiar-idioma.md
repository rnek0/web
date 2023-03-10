---
layout: post
title:  "Como cambiar el idioma en VSCodium"
date:   2023-03-23 14:46:44 +0100
categories: espanol idioma 
author: "by rnek0"
lang: "es"
---

# Como cambiar el idioma en VSCodium

[VSCodium](https://github.com/VSCodium/vscodium "VSCodium en Github") es la version de VSCode libre, "Free/Libre Open Source Software Binaries of VS Code", si no conoces este editor de código *no hay que confundirlo* con el IDE propietario Visual Studio de Microsoft. Ver explicación [Visual Studio vs Visual Studio Code](https://www.freecodecamp.org/espanol/news/visual-studio-vs-visual-studio-code-cual-es-la-diferencia-entre-estos-editores-de-codigo-ide/) 

Me gusta trabajar con Archlinux y el window manager i3 y como escribo posts en diferentes idiomas me interesa el tema, aquí les explico como se puede resolver.

&nbsp;

## El language Pack extension (Visual Studio Code Language Packs)

Primero instalo la extensión para cambiar el idioma del editor.

[Spanish Language Pack for Visual Studio Code](https://github.com/microsoft/vscode-loc), para otros idiomas ver [aquí](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs)

![El Pack](/_site/assets/idiomas/Es-Language-Pack.png)  
Sus instrucciones de uso son bastante claras, he aquí algunas imágenes para ir mas rápido.

&nbsp;

### Abre la Paleta de comandos.

Presiona "Ctrl+Maj+P" para que aparezca la instancia de "Paleta de comandos" y empieza a escribir "display" para filtrar y mostrar el comando "Configure Display Language".

![Configure Display Language](/assets/idiomas/ctrl-alt-p-disp.png "Paleta de comandos")

&nbsp;

### Valida y vuelve a arrancar VSCodium para que lo tome en cuenta.

Valida el mensaje abajo a la derecha para volver a arrancar.

![Cambio de idioma efectuado](/assets/idiomas/cambio-efectuado.png)

El cambio de idioma esta efectuado, si no lo vés pulsa **alt** para ver el menu.

&nbsp;

## Activar la corrección ortográfica.

Ahora, para la corrección ortográfica.

[Aquí el repo de la extension](https://github.com/streetsidesoftware/vscode-cspell-dict-extensions)

Cuando quiero hacer una corrección me situó con el cursor encima de la palabra, le doy a la tecla del **menu contextual** (la tecla que esta entre win y ctrl derecho) , **s** para que entre en Spelling suggestions + **enter**.

![Spelling](../_site/assets/idiomas/es-spelling.png)

> Selecciono la mejor opción para la corrección.

![Corrección](../_site/assets/idiomas/es-spelling-choice.png)

> Si no se reconoce la palabra se puede agregar a su diccionario  
> como lo harías con **Open Office** o otras suites ofimáticas.

&nbsp;

## Desactivar la corrección

Podemos hacerlo de dos formas

    usando F1, CTRL + SHIFT + P o View -> Command Palette

    * Disable Spanish Spell Checker Dictionary, para desactivarlo globalmente.
    * Disable Spanish Spell Checker Dictionary in Workspace, para desactivarlo en el workspace que estamos trabajando.

También se deshabilitar de nuestro panel de extensiones.

Bien, digamos que por ahora es la mejor solución que tengo antes de comprarme un querty.

Happy hacking.