---
layout: post
title:  "Conectando a la red."
date:   2023-02-11 23:24:44 +0100
categories: red bash
---

![La co](/assets/cable-ethernet.webp)

Me levanto y mi ordenador me esta esperando, se podria decir casi que esta en la interrupcion **"rnek0 dime algo"**; que fuerte ! mi colegui el ordenata me va a llevar a dar la vuelta al mundo !!!  
y ...  
mucho mas me digo yo, si pasamos por la estacion internacional... jajaja

## La Red y la co

> La co ? la conexión a internet claro esta. 

A veces con mi pc me gustaria tener un comando desconecta !!! Si señor, cierra la puerta y quedate en casa sin que esto se ponga a sonar por todos lados, y enfin poder concentrarme en lo que me gusta sin tener miedo que un delincuente transeunte encuentre **el puerto** habierto por donde entraba la corriente de aire.  
Señorita porfa, **donde esta el boton desconecta en el teclado ?**  
Como señorita no responde nos lo vamos a créar. Enfin poco mas o menos.

## La Tarjeta de red  

Para entrar en este mundillo de la red hay que tener por lo menos algo que sepa hablar **tcp/ip** y que haga de **interfaz** entre tu y la red para poder enviar o recibir un [paquete de datos](paquete de datos), pero primeramente si tu pc no puede conectarse a ese dispositivo y hablar con el no te enteraras de nada; el constructor del dispositivo con toda su amabilidad a pensado en poner a disposicion del universo entero un **piloto o driver** para que tu ordenador sepa utilizar la targeta. 

> La pregunta es : **"El driver de mi tarjeta esta en su sitio y funciona correctamente?"**

* El que me pregunte si el cable esta enchufado es un listillo

Vamos a ver con **udev** que es el encargado de saber cual es tu dispositivo y cargar el modulo del kernel necesario para el.  
Para ello primero buscamos el dispositivo en el sistema con ```lspci```

```bash
❯ lspci -v | grep Ethernet -A 6
00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection (2) I219-V
	DeviceName: Onboard - Ethernet
	Subsystem: ASRock Incorporation Device 15b8
	Flags: bus master, fast devsel, latency 0, IRQ 130
	Memory at df100000 (32-bit, non-prefetchable) [size=128K]
	Capabilities: <access denied>
	Kernel driver in use: e1000e
	Kernel modules: e1000e
```

Al parecer, la tarjeta anda que va zumbando, pues muy bien pero eso no es todo, vamos a por la fase 2 :  
hacemos un listing de los mensajes del kernel sobre **e1000e** con dmseg

```bash
❯ sudo dmesg | grep e1000e
[    3.783252] e1000e: Intel(R) PRO/1000 Network Driver
[    3.783254] e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
[    3.783546] e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
[    4.021513] e1000e 0000:00:1f.6 0000:00:1f.6 (uninitialized): registered PHC clock
[    4.089459] e1000e 0000:00:1f.6 eth0: (PCI Express:2.5GT/s:Width x1) xx:xx:xx:xx:xx:xx (mi MAC)
[    4.089468] e1000e 0000:00:1f.6 eth0: Intel(R) PRO/1000 Network Connection
[    4.089545] e1000e 0000:00:1f.6 eth0: MAC: 12, PHY: 12, PBA No: FFFFFF-0FF
[    4.251647] e1000e 0000:00:1f.6 eno1: renamed from eth0
[  369.233824] e1000e 0000:00:1f.6 eno1: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: Rx/Tx
[90727.210384] e1000e 0000:00:1f.6 eno1: NIC Link is Down
[132746.073884] e1000e 0000:00:1f.6 eno1: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: Rx/Tx
```

Bien, ya os habeis dado cuenta de que el nombre del modulo del kernel es **e1000e**, y de pasage aqui el [enlace del driver](https://www.kernel.org/doc/html/latest/networking/device_drivers/ethernet/intel/e1000e.html) en kernel.org

Con esta linea ya podemos decir que la tarjeta funciona :

> NIC **Link is Up** 1000 Mbps Full Duplex, Flow Control: Rx/Tx

&nbsp;

---

## Las interfaces

![Interfaces](/assets/interfaces.png)

Vale, la tarjeta funciona pero como la puedo utilizar ?

El kernel de Linux distingue universalmente entre dos tipos de interfaces de red de software, física o virtual: 

### Interfaces de red física
eth0, eth8, radio0, wlan19, .. **siempre representan un dispositivo de hardware de red real**, como una NIC , WNIC o algún otro tipo de módem . Tan pronto como el controlador del dispositivo se carga en el kernel, la interfaz de red física correspondiente se vuelve presente y está disponible.

Cualquier interfaz de red física es una representación de software nombrada por el sistema operativo para el usuario para permitirle configurar el dispositivo de red de hardware y también para integrarlo en programas y scripts.

### Interfaces de red virtual
**lo**, eth0:1, eth0.1, vlan2, br0, pppoe-dsl, gre0, sit0 **tun0**, imq0, teql0, .. son interfaces de red virtual **que NO representan un dispositivo de hardware existente sino que están vinculados a uno** (de lo contrario, serían inútiles). Las interfaces de red virtual se inventaron para brindar al administrador del sistema la máxima flexibilidad al configurar un sistema operativo basado en Linux. Una interfaz de red virtual generalmente se asocia con una interfaz de red física (eth6) u otra interfaz virtual (eth6.9) o es independiente, como la interfaz de bucle invertido lo .

Entonces ya sabes cual es la diferencia cuando haces un ```ip addr``` o un ```ls /sys/class/net``` [](https://oldwiki.archive.openwrt.org/doc/networking/network.interfaces) entre **eno1** y [**lo**](https://en.wikipedia.org/wiki/Loopback#Virtual_loopback_interface) (loopback) por ejemplo, o que tipo de interface es **tun0** cuando te conectas a [HTB](https://www.hackthebox.com/).

Pregunta 2 : **cuales sont mis interfaces ?**

Vamos a ver con ```ls /sys/class/net``` , con ```ip addr``` tienes todos los détalles

```bash
❯ ls /sys/class/net
docker0  eno1  lo
```

Aqui vemos 3 interfaces, la unica que me da accèso a internet es **eno1**

En général, si no tienes la **co** haces un ping para saber que pasa, digamos que mandamos un paquete al router y esperamos que nos devuelva una respuesta, asi de sencillo, para ello esta echo el comando ping. Si hay una respuesta esta claro que hay una **co**

```bash
❯ ping -c3 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) octets de données.
64 octets de 192.168.1.1 : icmp_seq=1 ttl=64 temps=0.701 ms
64 octets de 192.168.1.1 : icmp_seq=2 ttl=64 temps=0.509 ms
64 octets de 192.168.1.1 : icmp_seq=3 ttl=64 temps=0.553 ms

--- statistiques ping 192.168.1.1 ---
3 paquets transmis, 3 reçus, 0% packet loss, time 2041ms
rtt min/avg/max/mdev = 0.509/0.587/0.701/0.082 ms
```

&nbsp;

---

# Quiero la CO !!!

Vale antes de hablar de la **co**, a saber sobre lo que esoty hablando:

* En este articulo te hablo sobre todo de **Ethernet** (conexión por cable).  
* Tampoco hablo de **dhcp** es decir que logicamente en tu casa conectas el ordenador con el cable y el router te da la ip automaticamente, y ya !

El router proporciona a los clientes una dirección IP dinámica, la máscara de subred, la dirección IP de la puerta de enlace predeterminada y, opcionalmente, también servidores de nombres DNS.

Eso es el plug and play, no veo porque ando escribiendo todo esto si funciona asi de rapido :D ... Bueno con la frase mas arriva ya ves que aunque parezca magico hay muchas cosas que suceden por detras de esa simple acción, y de ello va lo que cuento aqui.





