# 📌 Backend — Projeto Integrador (Clínica Veterinária)

API em Node.js para gerenciamento de uma clínica veterinária. A API permite o controle de **tutores**, **animais**, **serviços** e **agendamentos**.

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **PostgreSQL**

## ✅ Requisitos

- **Node.js 18+**
- **PostgreSQL** (local) *ou* Postgres via Docker
- **npm**

## 📦 Instalação

Na raiz do projeto:

```bash
npm install
```

## 🔐 Configuração do ambiente (`.env`)

1) Crie um arquivo `.env` na raiz do projeto baseado no exemplo:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
```

2) Ajuste as variáveis conforme seu banco:

- `DB_DIALECT` (ex: `postgres`)
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`

As variáveis são carregadas em `src/config/database.js`.

## 🐳 Subindo Postgres com Docker (opcional)

Se você preferir, pode usar um Postgres via Docker. Exemplo:

```bash
docker run --name projeto-integrador-db ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=postgres ^
  -e POSTGRES_DB=projeto_integrador ^
  -p 5432:5432 ^
  -d postgres:16-alpine
```

> Se você já tem Postgres instalado localmente, pode pular esta etapa.

## 🗄️ Rodando as migrations

```bash
npx sequelize-cli db:migrate
```

## ▶️ Rodando o servidor

```bash
node src/server.js
```

Servidor padrão:

- `http://localhost:3000`

## 📌 Rotas principais

As rotas estão registradas em `src/server.js`.

### 👤 Tutores (`/tutores`)

- `POST /tutores`
- `GET /tutores`
- `PUT /tutores/:id`
- `DELETE /tutores/:id`

### 🐶 Animais (`/animais`)

- `POST /animais`
- `GET /animais`
- `PUT /animais/:id`
- `DELETE /animais/:id`

### 🏥 Serviços (`/servico`)

- `POST /servico`
- `GET /servico`
- `PUT /servico/:id`
- `DELETE /servico/:id`

### 📅 Agendamentos (`/agendamento`)

- `POST /agendamento`
- `GET /agendamento`
- `PUT /agendamento/:id`
- `DELETE /agendamento/:id`

## 🧠 Regras de Negócio

- Um animal pertence a um tutor
- Um agendamento deve conter: animal, tutor, serviço e data
- Um animal só pode ser agendado pelo seu próprio tutor
- Não é permitido conflito de horários

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos.
