// app.js

// Importa as dependências necessárias
const express = require('express');    // Framework web para Node.js
const path = require('path');          // Módulo para manipulação de caminhos de arquivos
const { exec } = require('child_process'); // Função para executar comandos do sistema

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Middleware para servir arquivos estáticos (CSS, JS, imagens) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Variável para armazenar o tempo restante do desligamento agendado (opcional, para tracking interno)
let currentShutdownTimer = null;

/**
 * Função para converter uma string no formato "HH:MM" para o número de segundos
 * restantes até aquele horário.
 * 
 * @param {string} horaDesligamento - Horário específico no formato "HH:MM"
 * @returns {number} - Segundos restantes até o horário alvo
 */
function calcularSegundosAteHorario(horaDesligamento) {
  // Separa a string "HH:MM" em horas e minutos
  const [horasStr, minutosStr] = horaDesligamento.split(':');
  
  // Converte as strings para números inteiros
  const horasAlvo = parseInt(horasStr, 10);
  const minutosAlvo = parseInt(minutosStr, 10);

  // Obtém a data e hora atual
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth(); // Mês em JavaScript é 0-indexado
  const dia = agora.getDate();

  // Cria um objeto Date para o horário alvo no mesmo dia
  let alvo = new Date(ano, mes, dia, horasAlvo, minutosAlvo, 0);

  // Se o horário alvo já passou hoje, adiciona um dia para agendar para amanhã
  if (alvo <= agora) {
    alvo.setDate(alvo.getDate() + 1);
  }

  // Calcula a diferença em segundos entre o horário alvo e o atual
  return Math.floor((alvo - agora) / 1000);
}

/**
 * Rota para servir a página inicial da aplicação.
 * Quando o usuário acessa a raiz ('/'), envia o arquivo 'index.html'.
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/**
 * Rota para agendar o desligamento do computador.
 * Recebe dados via método POST contendo 'hora' (HH:MM) ou 'tempoMinutos' (em minutos).
 * Executa o comando de desligamento no sistema operacional.
 */
app.post('/schedule', (req, res) => {
  // Extrai 'hora' e 'tempoMinutos' do corpo da requisição
  const { hora, tempoMinutos } = req.body;

  let totalSegundos; // Tempo total em segundos para o desligamento
  let message;       // Mensagem de confirmação a ser enviada ao cliente

  if (hora) {
    // Se o usuário definiu um horário específico (HH:MM)
    totalSegundos = calcularSegundosAteHorario(hora); // Calcula segundos até o horário
    message = `Computador irá desligar no horário definido: ${hora}.`;
  } else if (tempoMinutos) {
    // Se o usuário definiu um intervalo em minutos
    totalSegundos = parseInt(tempoMinutos, 10) * 60; // Converte minutos para segundos
    message = `Computador irá desligar em ${tempoMinutos} minutos.`;
  } else {
    // Se nenhum parâmetro válido foi fornecido, retorna erro 400 (Bad Request)
    return res.status(400).json({
      message: 'Informe um horário (HH:MM) ou um intervalo de tempo em minutos.'
    });
  }

  // Comando de desligamento para o Windows com o tempo especificado
  const comando = `shutdown /s /t ${totalSegundos}`;

  // Executa o comando no sistema operacional
  exec(comando, (error) => {
    if (error) {
      // Em caso de erro, loga no console e retorna erro 500 (Internal Server Error)
      console.error('Erro ao executar comando de desligamento:', error.message);
      return res.status(500).json({ message: 'Falha ao agendar desligamento.' });
    }

    // Atualiza a variável tracking (opcional)
    currentShutdownTimer = totalSegundos;

    // Retorna a mensagem de confirmação ao cliente
    return res.json({ message });
  });
});

/**
 * Rota para cancelar o desligamento agendado.
 * Recebe requisições via método POST e executa o comando de cancelamento.
 */
app.post('/cancel', (req, res) => {
  // Comando de cancelamento de desligamento no Windows
  exec('shutdown /a', (error) => {
    if (error) {
      // Em caso de erro, loga no console e retorna erro 500
      console.error('Erro ao cancelar desligamento:', error.message);
      return res.status(500).json({ message: 'Não há desligamento agendado ou ocorreu um erro.' });
    }

    // Reseta a variável tracking (opcional)
    currentShutdownTimer = null;

    // Retorna a mensagem de sucesso ao cliente
    return res.json({ message: 'Desligamento cancelado com sucesso.' });
  });
});

/**
 * Inicia o servidor na porta especificada.
 * Após iniciar, exibe uma mensagem no console com o endereço do servidor.
 */
const PORT = 3000; // Porta em que o servidor irá escutar
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
