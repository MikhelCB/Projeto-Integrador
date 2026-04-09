# 📌 Backend - Projeto Integrador (Clínica Veterinária)

Este é o backend de uma aplicação para gerenciamento de uma clínica
veterinária. A API permite o controle de tutores, animais, serviços e
agendamentos.

------------------------------------------------------------------------

# 🚀 Tecnologias utilizadas

-   Node.js
-   Express
-   Sequelize
-   PostgreSQL
-   Docker

------------------------------------------------------------------------

# ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

-   Node.js (versão 18 ou superior)
-   Docker e Docker Compose
-   npm ou yarn

------------------------------------------------------------------------

# 📦 Instalação

Clone o repositório:

``` bash
git clone <url-do-repositorio>
cd Projeto-Integrador
```

Instale as dependências:

``` bash
npm install
```

------------------------------------------------------------------------

# 🐳 Banco de Dados (PostgreSQL com Docker)

Suba o container do banco:

``` bash
docker-compose up -d
```

------------------------------------------------------------------------

# 🔐 Configuração do Banco

Configure o arquivo:

    src/config/database.js

------------------------------------------------------------------------

# 🗄️ Rodando as migrations

``` bash
npx sequelize-cli db:migrate
```

------------------------------------------------------------------------

# ▶️ Rodando o projeto

``` bash
npm run dev
```

Servidor rodando em:

http://localhost:3000

------------------------------------------------------------------------

# 📌 Rotas principais

## 👤 Tutores

-   POST /tutores
-   GET /tutores
-   PUT /tutores/:id
-   DELETE /tutores/:id

## 🐶 Animais

-   POST /animais
-   GET /animais
-   DELETE /animais/:id

## 🏥 Serviços

-   POST /servicos
-   GET /servicos

## 📅 Agendamentos

-   POST /agendamentos
-   GET /agendamentos

------------------------------------------------------------------------

# 🧠 Regras de Negócio

-   Um animal pertence a um tutor
-   Um agendamento deve conter: animal, tutor, serviço e data
-   Um animal só pode ser agendado pelo seu próprio tutor
-   Não é permitido conflito de horários

------------------------------------------------------------------------

# 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos.
