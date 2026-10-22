require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
});

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
    
});

conexao.connect((erro) => {
    if (erro) {
        console.log('deu erro:', erro);
    } else {
        console.log('conectou!');
        
    }
});

app.get('/clientes', (req, res) => {
    conexao.query('SELECT * FROM clientes', (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).send('Erros ao buscar clientes')
        }

        res.json(resultados);
    });
});

app.post('/clientes', (req, res) => {
    conexao.query('INSERT INTO clientes (nome, email, telefone, data_nascimento, status) VALUES (?, ?, ?, ?, ?)', [req.body.nome, req.body.email, req.body.telefone, req.body.data_nascimento, req.body.status], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).send('Erro no cadastrado do cliente')
        }

        res.status(201).send('Cliente cadastrado com sucesso')
    });
});

app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    conexao.query('UPDATE clientes SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, status = ? WHERE id = ?', [req.body.nome, req.body.email, req.body.telefone, req.body.data_nascimento, req.body.status, id], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).send('Erro na alteração do cliente')
        }

        res.send('Cliente foi Atualizado')
    })
})

app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    conexao.query('DELETE FROM clientes WHERE id = ?', [id], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).send('Erro ao excluir um cliente')
        }

        res.send('Cliente excluido com sucesso')
    })
})