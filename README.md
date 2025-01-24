# AutoDesliga

Bem-vindo(a) ao **AutoDesliga**!  
Este repositório contém uma aplicação web que permite agendar o desligamento automático do computador, de maneira simples, intuitiva e com um design moderno. Atualmente, o projeto foca em sistemas Windows, mas pode ser facilmente adaptado para Linux ou macOS.

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-Requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Funciona](#como-funciona)
- [Personalização](#personalização)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## Visão Geral

Este projeto tem como objetivo facilitar o desligamento automático do computador em um horário específico (HH:MM) ou após um intervalo determinado (em minutos). É especialmente útil para:

- Pessoas que assistem vídeos antes de dormir e não querem deixar o PC ligado a noite toda.
- Quem deseja economizar energia ao programar um desligamento após um tempo ocioso.
- Usuários que fazem download ou backup e querem desligar o PC ao final do processo.

A aplicação pode ser acessada via navegador, executando um **servidor Node.js** localmente.

---

## Funcionalidades

1. **Agendamento por Horário**: O usuário informa um horário exato (formato HH:MM), e o PC desliga automaticamente quando o tempo chegar.
2. **Agendamento por Intervalo**: O usuário informa um valor em minutos (por exemplo, 30), e o computador desliga após este período.
3. **Cancelamento**: É possível cancelar o desligamento agendado a qualquer momento com apenas um clique.
4. **Interface Moderna**: Layout responsivo com cores, gradientes e efeitos de hover.
5. **Explicação do Conceito**: Seções de texto que explicam o propósito do app, como funciona e como configurá-lo.

---

## Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** para executar o servidor de back-end.
- **[Express](https://expressjs.com/)** para gerenciar as rotas HTTP.
- **HTML5/CSS3/JavaScript** para o front-end (interface web).
- **[Git](https://git-scm.com/)** para controle de versão.
- **Possível uso de [GitHub](https://github.com/)** para hospedar o código-fonte.

---

## Pré-Requisitos

- [Node.js](https://nodejs.org/) instalado (versão 12+ recomendada).
- [Git](https://git-scm.com/) instalado (caso queira clonar via linha de comando).
- Sistema **Windows** (para uso imediato dos comandos `shutdown` e `shutdown /a`).  
  *(Para outros sistemas, é necessário adaptar o comando de desligamento.)*

---

## Instalação

1. **Clonar o repositório** (ou baixe o ZIP):
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
