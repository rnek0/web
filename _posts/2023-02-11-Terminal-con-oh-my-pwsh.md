---
layout: post  
title:  "Terminal con oh-my-pwsh"
date:   2023-02-13 11:15:28 +0100
categories: powershell windows
---

## Instalar Windows Terminal y configurar Oh My Posh

![windows Terminal](/assets/nimSurWindows.PNG)

El terminal en Windows siempre ha sido una decepción en comparación con el shell de Gnu-Linux (por citar un ejemplo), ha habido algunas mejoras desde Powershell, pero todavía se sentía demasiado austero.  

Con Windows Terminal esto ha cambiado y puedes agregarle temas como lo haces con ohmyzsh en Gnu-Linux y zsh. Viendo la images se comprende mejor de lo que estoy hablando, quien diria que esto es un terminal en Windows ?.

De donde sale esta magia ? , pues de **Oh My Posh** con **Windows Terminal**.

Esta es una guía con los pasos que han sido efectuados en Win 10 que tambien funciona en una cuenta anónima, pocos comandos requieren de privilegios de administrador (pero hay que tenerlos).  

Utilizamos igualmente **winget** : la herramienta de línea de comandos winget permite a los usuarios detectar, instalar, actualizar, quitar y configurar aplicaciones en equipos con Windows 10 y Windows 11. Esta herramienta es la interfaz cliente para el servicio del Administrador de paquetes de Windows.

Por lo tanto, es necesario, para estos pasos : 

* Powershell
* Winget
* Una font NerdFont

---

&nbsp;  
&nbsp;

## A) Instalar "Terminal Windows"

Abrir una ventana Powershell, y manos a la obra:

1. Instalacion de Terminal

```powershel
winget install --id Microsoft.WindowsTerminal -e
```

El repo esta aqui : [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)

---

&nbsp;  
&nbsp;

## B) Instalar "Oh My Posh"

Cerrar la PowerShell, ya puedes abrir **Terminal**

Abrimos Terminal y tecleamos :

```powershel
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Esto instala un par de cosas:

* oh-my-posh.exe - ejecutable de Windows
* themes - Los últimos temas de Oh My Posh

Para saber donde se ubica el $PATH :  

```powershel
(Get-Command oh-my-posh).Source
```

La Documentacion de Oh My Posh : [https://ohmyposh.dev/](https://ohmyposh.dev/)

---

&nbsp;  
&nbsp;

## C) Instalar una font

De typo NerdFont, concretamente **Meslo** por ejemplo :  

### 1.*Instalacion*

Descargar  

>https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip

dezipear, seleccionar todos los ficheros, click con el bonton derecho e instalar en el sistema.

### 2.*Instalar la font en el Terminal*

Despues de que este disponible en el sistema se le debe instalar a la Terminal con estos paso :

```powershel
oh-my-posh font install
```

### 3.*Configurar la font en Windows Terminal*

Una vez que haya instalado una fuente Nerd, deberá configurar la Terminal de Windows para usarla. Esto se puede hacer fácilmente modificando la configuración de la Terminal de Windows (shortcut: CTRL + SHIFT + ,). En su archivo settings.json, agregue el atributo font.face debajo del atributo predeterminado en los perfiles:

```json
{
    "profiles":
    {
        "defaults":
        {
            "font":
            {
                "face": "MesloLGM NF"
            }
        }
    }
}
```

---

&nbsp;  
&nbsp;

## D). Instalar Terminal-Icons

```powershel
Install-Module -Name Terminal-Icons -Repository PSGallery
```

---

&nbsp;  
&nbsp;

## E) Aplicar el tema "Oh My Posh"

Para ver todos los temas disponibles  :  

```powershel
Get-PoshThemes
```

__Un ejemplo__ : aplicamos el tema __*paradox*__

```powershel
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression
```

---

&nbsp;  
&nbsp;

## F) Modification del perfil de PowerShell.

doc : [about_Profiles](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3)

```powershel
notepad $PROFILE
```

Poniendo esta linea en tu profile, el tema se tomara en cuenta cada vez que abriras el Terminal.

```powershel
 oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression
```

Terminal tiene muchos parametros que se pueden modificar, solo queda experimentar.

Et Voila !


![windows Terminal](/assets/pwsh.PNG)
