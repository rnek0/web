---
layout: post
title:  "Gestión de software con Parrot"
date:   2023-02-20 17:36:44 +0100
categories: Parrot apt
author: "by rnek0"
lang: "es"
permalink: "/parrot/apt"
---

🇪🇸 Gestión de software con Parrot 

> <a href="#comandos">Ver los comandos apt</a>

Traducido de : <https://parrotlinux.org/docs/configuration/parrot-software-management/> al español;

En este capítulo, presentaremos el administrador de paquetes APT para Parrot. Un programa es una serie de instrucciones escritas en lenguajes de programación como C, Go, Nim o Rust (por nombrar algunos). Estas instrucciones se almacenan en archivos de texto llamados fuentes. Para trabajar en nuestros sistemas, los archivos fuentes deben estar convertidos a lenguaje máquina. Este paso se llama compilación. La compilación genera uno o varios archivos, que el sistema puede manejar, llamados binarios.

El usuario no necesita compilar las fuentes de cada programa ya que los desarrolladores son los responsables de compilar y generar los respectivos binarios. Un programa puede llevar no solo el ejecutable sino una serie de archivos. Los desarrolladores combinan dicho software en un archivo llamado paquete. Dos de los formatos de paquete más conocidos son los paquetes **RPM** y los paquetes **DEB**. RPM fue desarrollado por Red Hat y DEB por Debian. **Parrot utiliza el formato DEB**.

Para compilar programas, a menudo se necesitan bibliotecas de terceros y otros programas. Si intentáramos compilar un programa que tuviera dependencias con otras bibliotecas y otros programas, **instalaríamos estas "dependencias" antes de su compilación**. Asimismo, si queremos instalar un binario necesitaremos tener instaladas las dependencias necesarias para su correcto funcionamiento.

Para administrar estas dependencias y la instalación del "paquete", se han creado **gestores de paquetes**. Existen numerosos gestores de paquetes, algunos gráficos y otros a través de la línea **repositorios**de comandos. En este capítulo veremos uno de los más famosos, creado por los desarrolladores de Debian, y el que utiliza Parrot: **APT** .

Las principales funciones de un gestor de paquetes deben ser:

* Búsqueda de programas
* Instalación de software
* Actualización de software
* Actualizacion del sistema
* Gestión de dependencias
* Eliminación de programas
 
El administrador de paquetes debe verificar en una ubicación determinada (puede ser un directorio local o una dirección de red) la disponibilidad de dicho software. Las ubicaciones se denominan **repositorios**. El sistema mantiene archivos de configuración para verificar las ubicaciones de los repositorios.

## Lista de repositorios

Aunque en Parrot no es necesario (ni recomendable) añadir nuevos repositorios ni modificar los existentes, veremos dónde podemos configurarlos. En el sistema de archivos, en la ruta "**/etc/apt/sources.list.d**", encontramos el archivo **parrot.list**. El contenido de este archivo debe tener algo parecido a esto:

```bash
deb https://deb.parrot.sh/parrot parrot main contrib non-free
deb https://deb.parrot.sh/parrot rolling-security main contrib non-free
```

Con esto, nos aseguramos de tener la lista de repositorios correcta. En esta ubicación los desarrolladores de Parrot mantienen actualizados los paquetes.

<a id="comandos"></a>
## Gestor de paquetes (APT)

El gestor de paquetes de Parrot es **apt**. Entre otras cosas, este gestor es responsable de instalar paquetes, verificar dependencias y actualizar el sistema. Veamos qué podemos hacer con él. Veremos a continuación las opciones más habituales. Para obtener instrucciones más detalladas, consulte las páginas **man** de cada uno de los siguientes comandos: **apt**, **apt-get**, **apt-cache**, **dpkg**.

Buscar un paquete o cadena de texto:

```bash
apt search <text_string>
```

Mostrar información del paquete:

```bash
apt show <package>
```

Mostrar dependencias de paquetes:

```bash
apt depends <package>
```

Mostrar los nombres de todos los paquetes instalados en el sistema:

```
apt list --installed
```

Instalar un paquete:

```bash
apt install <package>
```

Desinstalar un paquete:

```bash
apt remove <package>
```

Eliminar un paquete, incluidos sus archivos de configuración:

```bash
apt purge <package>
```

Eliminar automáticamente aquellos paquetes que no se estén utilizando (tenga cuidado con este comando, debido a la dependencias internas de **apt** puede eliminar paquetes no deseados):

```bash
apt autoremove
```

Actualice la información de los repositorios:

```bash
apt update
```

Actualice un paquete a la última versión disponible en el repositorio:

```bash
apt upgrade <package>
```

Actualizar la distribución completa. Actualizará nuestro sistema a la siguiente versión disponible:

```bash
parrot-upgrade
```

Limpia cachés, paquetes descargados, etc:

```bash
apt clean && apt autoclean
```

Estos son solo algunos ejemplos. Si se requiere más información, debe consultar la página del manual (man 8 apt).

Parrot es una distribucion basada en Debian. Puedes consultar la documentacion de ["Gestión de paquetes Debian"](https://www.debian.org/doc/manuals/debian-reference/ch02.es.html#_basic_package_management_operations)
