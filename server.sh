#!/bin/bash

KILL=false
OPEN=false

usage() {
  echo ""
  echo "Local Server"
  echo ""
  echo "Options:"
  echo ""
  echo "    -k    Kill all local servers."
  echo "    -o    Open browser after starting servers."
  echo "    -h    This help message."
  echo ""
}

while getopts lpkoh: OPTION; do
  case $OPTION in
    k) KILL=true ;;
    o) OPEN=true ;;
    h) usage; exit 0 ;;

    \?)
      echo ""
      echo "Invalid option: -$OPTARG" >&2
      usage
      exit 1
      ;;

    :)
      echo ""
      echo "Option -$OPTARG requires an argument." >&2
      usage
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

kill_servers() {
  JEKYLL_PID=`ps aux | grep ruby | grep jekyll | awk '{print $2}'`

  if [ ! -z $JEKYLL_PID ]; then
    kill -9 $JEKYLL_PID
  fi
}

run_servers() {
  kill_servers

  jekyll server --config _config.yml,_ipad.yml --future --drafts &
}

if [ $KILL == true ]; then
  kill_servers
else
  run_servers
fi
