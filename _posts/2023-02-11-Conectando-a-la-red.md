---
layout: post
title:  "Conectando a la red."
date:   2023-02-11 23:24:44 +0100
categories: red bash
author: "by rnek0"
---

![La co](/assets/cable-ethernet.webp)

Me levanto y mi ordenador me esta esperando, se podría decir casi que está en la interrupción **"rnek0 díme algo"**...  
¡ que fuerte ! mi colegui el ordenata me va a llevar a dar la vuelta al mundo y ...  
mucho más lejos pienso yo, si pasamos por la estación internacional. jajaja
<a name="la co"></a>
## La Red y la co
<div style="vertical-align: baseline; display: flex; justify-content: center;">
<iframe title="¡Dame la co! - connexión con el comando ip en el terminal" src="https://ptb.lunarviews.net/videos/embed/7a46ca03-0107-4c2a-b9c0-cd0c0c6f2385" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" width="560" height="315" frameborder="0"></iframe>
</div>
> La co ? la conexión a internet claro esta. 

A veces con mi pc me gustaría tener el comando de desconexión !!! Si señor, cierra la puerta y quedate en casa sin que esto se ponga a sonar por todos lados, y enfin podré concentrarme en lo que me gusta sin tener miedo que un delincuente transeunte encuentre **el puerto abierto**  por donde entraba la corriente de aire.  
Señorita porfa, **donde esta el boton desconecta en el teclado ?**  
Como señorita no responde nos lo vamos a créar. Enfin poco mas o menos.

Se me viene à la mente de decir al principio que hay una utilidad [NetworkManager](https://es.wikipedia.org/wiki/NetworkManager) prevista para simplificar el uso de redes de computadoras en Linux. No es que no me guste, lo hace muy bien pero no te aprende a hacerlo por ti mismo. Asi aprendes como funciona todo esto, esto hace parte de las [**4 libertades del software libre**](https://www.gnu.org/philosophy/free-sw.es.html#four-freedoms)

&nbsp;

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

El kernel de Linux distingue universalmente entre dos tipos de **interfaces** de red de software, **física** o **virtual**: 

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

# ¡¡¡ Quiero la CO !!!

Vale antes de hablar de [la **co**](#la co), hay que saber sobre lo que estoy hablando:

* En este articulo te hablo sobre todo de [**Ethernet**](https://es.wikipedia.org/wiki/Ethernet) (conexión por cable).  
* No hablo de [**DHCP**](https://es.wikipedia.org/wiki/Protocolo_de_configuraci%C3%B3n_din%C3%A1mica_de_host), es decir que logicamente en tu casa conectas el ordenador con el cable y el router te da la IP automaticamente, y ya !
* Hablo de **como conectar tu tarjeta de red** por el terminal con **una [IP fija](https://es.wikipedia.org/wiki/Direcci%C3%B3n_IP#IP_fija)**

El router proporciona a los clientes con DHCP, una dirección IP dinámica, la máscara de subred, la dirección IP de la puerta de enlace predeterminada y, opcionalmente, también servidores de nombres DNS.

Eso es el plug and play, no veo porque ando escribiendo todo esto si funciona así de rapido :D  
Bueno con la frase mas arriva ya ves que aunque parezca magico hay muchas cosas que suceden por detras de esa simple acción, y de ello va lo que cuento aqui.


## Activando la interfaz de red

La interfaz de red debe tener su dirección IP, concretamente para esta maquina ya hemos pasado por la configuracion del router y le hemos dado una IP fija (192.168.1.18).

Bueno, ya iva siendo hora de activar esa interfaz de red, y para ello:  
> el comando magico : **ip**

El comando **ip** te brinda su ayuda con el comando **man**, eso ya lo sabiamos pero nunca esta de mas de repetirlo.

```bash
❯ man ip | grep -E "^NAME" -A2
NAME
       ip - show / manipulate routing, network devices, interfaces and tunnels
```

&nbsp;

A continuacion el script de **co** que se conectara con la ip 192.168.1.18 (*leelo atentivamente antes de ejecutar*)

```bash
#! /bin/bash
# Connectar el dispositivo a la red.

SUCCES=0
IP=192.168.1.18
DEVICE=$(ip link show | grep "altname" | awk '{print $NF}')

# Colors
RED=$(printf '\033[31m')
BLUE=$(printf '\033[34m')
BOLD=$(printf '\033[1m')
RESET=$(printf '\033[m')
BELL=$(printf '\a')

function title(){
  echo ""
  echo "$BLUE❯ $1$RESET"
}

function yes_or_no() {
  while true; do
    read -p "$* [y/n]: " yn
      case $yn in
        [Yy]*) return 0  ;;  
        [Nn]*) echo "Proceso anulado." ; exit $SUCCES ;;
      esac
  done
}

echo "==========================================================================="
echo "                       $RED>>> NETWORK CONFIGURATION <<<$RESET                       "
echo "==========================================================================="

if [ "$EUID" -ne 0 ]; then
    echo $BELL
    echo "$RED Ejecute el script con sudo.$RESET"
    echo "La IP sera 192.168.1.18 puede cambiarla pasandosela en parametro (ipv4)"
    echo "El router debe haber asignado la ip estaticamente."
    echo
    exit
fi

if [ -z $1 ]; then 
  echo "La direccion IP de la maquina sera : $IP";
  yes_or_no
else 
  echo "La direccion IP de la maquina sera : '$1'"; 
  yes_or_no
  IP=$1
fi

title "Activando el dispositivo $BOLD$DEVICE"

function validCmd(){
$1
if [ $? -eq 0 ]; then
  echo "procesando ..."
else
  echo "$RED:($RESET fallo inesperado con el comando $1"
fi
sleep 2
}

# Activa la interfaz
sudo ip link set dev $DEVICE up

# Borra la direccion ip sin poner la interfaz fuera de servicio
validCmd "ip addr flush dev $DEVICE"

title "Connectandose a la red local..."
# Le pone la direccion ip a la interfaz
validCmd "sudo ip addr add $IP/24 dev $DEVICE"
validCmd "ping -c3 192.168.1.1"

title "Conectandose a internet..."
validCmd "sudo ip route add default via 192.168.1.1 dev $DEVICE"

sleep 1

title "Terminado exitosamente."
exit $SUCCES
```

Con el script de arriba me conecto à la red, seria la parte ON de nuestro boton.

&nbsp;

## Enroutamiento

En el script anterior **se supone** que la maquina esta en una red local y que el [router](https://es.wikipedia.org/wiki/Router) esta en la ip ```192.168.1.1```

Por otra parte, quien es el administrador de resolución de nombres de red de mi sistema ?  
[**systemd-resolved**](https://man.archlinux.org/man/systemd-resolved.8) es un servicio systemd que proporciona resolución de nombres de red a aplicaciones locales a través de una interfaz D-Bus 

```bash
uranus# systemctl status systemd-resolved
● systemd-resolved.service - Network Name Resolution
     Loaded: loaded (/usr/lib/systemd/system/systemd-resolved.service; enabled; preset: enabled)
     Active: active (running) since Fri 2023-02-10 10:01:06 CET; 2 days ago
       Docs: man:systemd-resolved.service(8)
             man:org.freedesktop.resolve1(5)
             https://www.freedesktop.org/wiki/Software/systemd/writing-network-configuration-managers
             https://www.freedesktop.org/wiki/Software/systemd/writing-resolver-clients
```

Por otra parte, si no teneis resolucion DNS haciendo un ```ping -c1 google.com``` teneis que habrir el fichero ```/etc/resolv.conf``` y poner dentro una linea con nameserver ip del resolver :

```
└╼rnek0$cat /etc/resolv.conf
───────┬─────────────────────────────
       │ File: /etc/resolv.conf
───────┼─────────────────────────────
   1   │ nameserver 192.168.1.1
───────┴─────────────────────────────
```

Como saber que no tienes resolucion de dns ? pues pingueas una ip externa y si te lo devuelve tienes acceso a la red externa pero si con el nombre de dominio no te lo devuelve pues ya lo sabes.

&nbsp;

## Il el boton off ? Donde esta ?

Bien esto lo he dejado para el final, asi si has llegado hasta aqui eso quiere decir que estas interesado en la solución y te puedo dejar el script de deconnexión para que juegues con todo esto. Imagina que haces esto al principio y te quedas a dos velas, ¡ hé, que paso !? ¡¡¡Auxilio!!!

(*leelo atentivamente antes de ejecutar*)

```bash
#!/bin/bash
# Desconnectar la interfaz de la red.

SUCCES=0
IP=192.168.1.19
DEVICE=$(ip link show | grep "altname" | awk '{print $NF}')

# Colors
RED=$(printf '\033[31m')
BLUE=$(printf '\033[34m')
BOLD=$(printf '\033[1m')
RESET=$(printf '\033[m')
BELL=$(printf '\a')

function title(){
  echo "❯ $BLUE$1$RESET"
}

function yes_or_no() {
  while true; do
    read -p "$* [y/n]: " yn
      case $yn in
        [Yy]*) return 0  ;;
        [Nn]*) echo "Proceso anulado." ; exit $SUCCES ;;
      esac
  done
}

title "Desconectar el PC de la red"

if [ "$EUID" -ne 0 ]; then
  echo $BELL
    echo "$RED Ejecute el script con sudo.$RESET"
    exit $SUCCES
fi

echo "Desea desconnectar el pc de la red ?"
yes_or_no

sudo ip link set dev $DEVICE down && echo "PC desconectado."
```

Una **co** Ethernet sin **NetworkManager** personalizada.

> Pregunta: que hay del arranque ?

Eso tambien se puede automatizar y para ello mas adelante veremos la creacion de scripts systemd. Asi puedes poner el de la **co** en el arranque del systèma.

Et voila !