// public/js/script.js

/**
 * Função para agendar o desligamento do computador.
 * Esta função coleta os valores dos campos de horário e tempo em minutos,
 * envia uma requisição POST para o servidor para agendar o desligamento,
 * e atualiza a área de status com a resposta do servidor.
 */
async function agendarDesligamento() {
    // Obtém o valor do campo de horário (formato HH:MM)
    const horaInput = document.getElementById('horaDesligamento').value;
    
    // Obtém o valor do campo de tempo em minutos
    const tempoInput = document.getElementById('tempoDesligamento').value;
  
    // Prepara o corpo da requisição com os dados coletados
    const body = {
      hora: horaInput || null,           // Define 'hora' como o valor inserido ou null se vazio
      tempoMinutos: tempoInput || null   // Define 'tempoMinutos' como o valor inserido ou null se vazio
    };
  
    try {
        // Envia uma requisição POST para a rota '/schedule' com os dados de agendamento
        const response = await fetch('/schedule', {
            method: 'POST',                      // Método HTTP utilizado
            headers: { 'Content-Type': 'application/json' }, // Cabeçalhos da requisição
            body: JSON.stringify(body)           // Corpo da requisição convertido para JSON
        });
        
        // Obtém a resposta do servidor em formato JSON
        const data = await response.json();
        
        // Atualiza a área de status na interface com a mensagem recebida ou uma mensagem padrão
        document.getElementById('statusArea').textContent = data.message || 'Agendamento realizado.';
    } catch (error) {
        // Em caso de erro, exibe no console e alerta o usuário
        console.error(error);
        alert('Erro ao agendar desligamento. Verifique o console.');
    }
}

/**
 * Função para cancelar o desligamento agendado do computador.
 * Esta função envia uma requisição POST para o servidor para cancelar o desligamento,
 * e atualiza a área de status com a resposta do servidor.
 */
async function cancelarDesligamento() {
    try {
        // Envia uma requisição POST para a rota '/cancel' para cancelar o desligamento
        const response = await fetch('/cancel', {
            method: 'POST' // Método HTTP utilizado
        });
        
        // Obtém a resposta do servidor em formato JSON
        const data = await response.json();
        
        // Atualiza a área de status na interface com a mensagem recebida ou uma mensagem padrão
        document.getElementById('statusArea').textContent = data.message || 'Desligamento cancelado.';
    } catch (error) {
        // Em caso de erro, exibe no console e alerta o usuário
        console.error(error);
        alert('Erro ao cancelar desligamento. Verifique o console.');
    }
}
