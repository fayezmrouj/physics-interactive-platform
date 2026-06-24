#!/bin/bash
cd /home/z/my-project
pkill -9 -f "next-server" 2>/dev/null
pkill -9 -f "next dev" 2>/dev/null
sleep 1
while true; do
  bun run dev > dev.log 2>&1
  echo "[$(date)] dev server exited, restarting in 2s..." >> dev.log
  sleep 2
done
