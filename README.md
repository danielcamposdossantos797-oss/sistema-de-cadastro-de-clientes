# Sistema de Cadastro de Clientes

Aplicação web para gerenciamento de clientes, desenvolvida como projeto de estudo para praticar desenvolvimento front-end, back-end e integração com banco de dados MySQL.

## Funcionalidades

- Cadastrar novos clientes
- Listar clientes cadastrados
- Editar informações de clientes
- Excluir clientes
- Gerenciar o status dos clientes
- Alternar entre tema claro e escuro
- Interface responsiva

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- MySQL
- Git e GitHub

## Como executar o projeto

### 1. Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/installer/) ou [WampServer](https://www.wampserver.com/)

Você também precisará do Git para clonar o repositório.

### 2. Baixar o projeto

Clone o repositório e entre na pasta do projeto:

```bash
git clone URL_DO_SEU_REPOSITORIO
cd sistema-de-cadastro-de-clientes
```

Substitua `URL_DO_SEU_REPOSITORIO` pelo endereço real do repositório no GitHub.

### 3. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 4. Criar o banco de dados

Abra seu cliente MySQL, como o DBeaver ou o MySQL Workbench, e execute o conteúdo do arquivo `banco.sql`.

Esse script cria o banco de dados e a tabela necessários para a aplicação.

### 5. Configurar as variáveis de ambiente

Crie um arquivo chamado `.env` na pasta principal, utilizando o `.env.example` como modelo.

Preencha as variáveis com as configurações do seu MySQL:

```ini
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=cadastro_clientes
PORT=3000
```

Substitua os valores de exemplo pelos dados da sua instalação. Se o MySQL não tiver senha configurada para esse usuário, deixe `DB_PASSWORD=` vazio.

**Importante:** o arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub.

### 6. Iniciar o servidor

Execute:

```bash
node server.js
```

Quando o servidor estiver funcionando, acesse no navegador:

http://localhost:3000

## Estrutura do projeto

- `server.js` — servidor e rotas da API
- `banco.sql` — script de criação do banco e da tabela
- `public/` — arquivos HTML, CSS e JavaScript da interface
- `.env.example` — modelo das variáveis de ambiente
- `package.json` — dependências e informações do projeto

## Objetivo do projeto

Projeto desenvolvido para consolidar conhecimentos em JavaScript, APIs REST, Node.js, Express, MySQL e controle de versão com Git.