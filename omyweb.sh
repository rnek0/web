#!/usr/bin/bash
#
# script  : omyweb.sh
# date    : 27-02-23
# author  : rnek0
# licence : Open my website © 2023 by Tony Simoes is licensed under CC BY-NC 4.0 
# ------------------------------------------------------------------------------

# Colors
RED=$(printf '\033[31m')
BLUE=$(printf '\033[34m')
RESET=$(printf '\033[m')

web="https://web.lunarviews.net"
regex='(https?|ftp|file)://[-[:alnum:]\+&@#/%?=~_|!:,.;]*[-[:alnum:]\+&@#/%=~_|]'

# Yes or not ?
function yes_or_no() {
  while true; do
    read -p "$* [y/n]: " yn
      case $yn in
        [Yy]*) return 0  ;;  
        [Nn]*) echo " Proceso anulado." ; exit 0 ;;
      esac
  done
}

cat <<End-of-message
${RED}
                                        __  
   ____  ____ ___  __  ___      _____  / /_  
  / __ \/ __ \`__ \/ / / / | /| / / _ \/ __ \ 
 / /_/ / / / / / / /_/ /| |/ |/ /  __/ /_/ / 
 \____/_/ /_/ /_/\__  / |__/|__/\___/_____/  
                /____/                       
${BLUE}         https://web.lunarviews.net               
${RESET}                                    
End-of-message

if [ -z $1 ]; then
  echo " Abrir la web ${web} ?";
  yes_or_no
  xdg-open ${web} &
else 
  if [[ $1 =~ $regex ]]; then
    echo " Abrir la web $1 ?"; 
    yes_or_no
    xdg-open $1 &
  else
    echo -e " ${RED}[!] Debes introducir una URL válida.${RESET}\n"
  fi
fi
