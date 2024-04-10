#!/bin/bash

while true
do
  # Executar o git fetch
  git fetch origin master

  # Verificar se há atualizações
  if git status | grep "Your branch is behind" &> /dev/null; then
    # Há atualizações, então execute git pull e outras ações
    git pull origin master
    npm install
    npx prisma generate
    npm run build
  else
    # Não há atualizações
    echo "Nenhuma atualização disponível."
  fi

  # Esperar 30 segundos antes de verificar novamente
  sleep 30
done

