// app.js
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// Servir arquivos estáticos (CSS, JS) a partir de /public
app.use(express.static(path.join(__dirname, 'public')));

// Variável para armazenar se há um desligamento agendado (opcional, para tracking interno)
let currentShutdownTimer = null;

/**
 * Função para converter "HH:MM" em quantos segundos faltam até aquele horário.
 */
function calcularSegundosAteHorario(horaDesligamento) {
  const [horasStr, minutosStr] = horaDesligamento.split(':');
  const horasAlvo = parseInt(horasStr, 10);
  const minutosAlvo = parseInt(minutosStr, 10);

  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth();
  const dia = agora.getDate();

  let alvo = new Date(ano, mes, dia, horasAlvo, minutosAlvo, 0);

  // Se o horário alvo já passou hoje, adiciona 1 dia (amanhã)
  if (alvo <= agora) {
    alvo.setDate(alvo.getDate() + 1);
  }

  return Math.floor((alvo - agora) / 1000); // segundos
}

/**
 * Rota para servir a página inicial
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/**
 * Rota para agendar desligamento
 */
app.post('/schedule', (req, res) => {
  const { hora, tempoMinutos } = req.body;

  let totalSegundos;
  let message;

  if (hora) {
    // Usuário definiu um horário exato (HH:MM)
    totalSegundos = calcularSegundosAteHorario(hora);
    message = `Computador irá desligar no horário definido: ${hora}.`;
  } else if (tempoMinutos) {
    // Usuário definiu intervalo em minutos
    totalSegundos = parseInt(tempoMinutos, 10) * 60;
    message = `Computador irá desligar em ${tempoMinutos} minutos.`;
  } else {
    return res.status(400).json({
      message: 'Informe um horário (HH:MM) ou um intervalo de tempo em minutos.'
    });
  }

  // Executa comando de desligamento no Windows
  const comando = `shutdown /s /t ${totalSegundos}`;
  exec(comando, (error) => {
    if (error) {
      console.error('Erro ao executar comando de desligamento:', error.message);
      return res.status(500).json({ message: 'Falha ao agendar desligamento.' });
    }
    currentShutdownTimer = totalSegundos;
    return res.json({ message });
  });
});

/**
 * Rota para cancelar desligamento
 */
app.post('/cancel', (req, res) => {
  exec('shutdown /a', (error) => {
    if (error) {
      console.error('Erro ao cancelar desligamento:', error.message);
      return res.status(500).json({ message: 'Não há desligamento agendado ou ocorreu um erro.' });
    }
    currentShutdownTimer = null;
    return res.json({ message: 'Desligamento cancelado com sucesso.' });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
