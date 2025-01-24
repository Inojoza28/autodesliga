// public/js/script.js

async function agendarDesligamento() {
    const horaInput = document.getElementById('horaDesligamento').value;
    const tempoInput = document.getElementById('tempoDesligamento').value;
  
    const body = {
      hora: horaInput || null,
      tempoMinutos: tempoInput || null
    };
  
    try {
      const response = await fetch('/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      document.getElementById('statusArea').textContent = data.message || 'Agendamento realizado.';
    } catch (error) {
      console.error(error);
      alert('Erro ao agendar desligamento. Verifique o console.');
    }
  }
  
  async function cancelarDesligamento() {
    try {
      const response = await fetch('/cancel', {
        method: 'POST'
      });
      const data = await response.json();
      document.getElementById('statusArea').textContent = data.message || 'Desligamento cancelado.';
    } catch (error) {
      console.error(error);
      alert('Erro ao cancelar desligamento. Verifique o console.');
    }
  }
  