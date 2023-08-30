const cron = require('node-cron');
const { exec } = require('child_process');

// Esta função será executada a cada minuto
cron.schedule('* * * * *', () => {
  console.log('Executando "git fetch" a cada minuto...');

  // Execute o comando 'git fetch'
  exec('git fetch', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar "git fetch": ${error}`);
      return;
    }

    console.log(`Saída de "git fetch": ${stdout}`);
    console.error(`Erros de "git fetch": ${stderr}`);

    // Aqui você pode adicionar o código para lidar com o resultado do "git fetch"
    // Por exemplo, você pode verificar se há atualizações e executar "git pull" e o processo de construção se necessário.
  });
});
