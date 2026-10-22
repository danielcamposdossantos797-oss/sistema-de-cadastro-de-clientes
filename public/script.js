
const botaoTema = document.getElementById('btnTema');

// Recupera o tema salvo quando a página abre
const temaSalvo = localStorage.getItem('tema');

if (temaSalvo === 'escuro') {
    document.body.classList.add('escuro');
}

// Atualiza o texto do botão conforme o tema atual
function atualizarTextoTema() {
    if (document.body.classList.contains('escuro')) {
        botaoTema.textContent = 'Tema claro';
    } else {
        botaoTema.textContent = 'Tema escuro';
    }
}

atualizarTextoTema();

// Alterna o tema ao clicar no botão
botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('escuro');

    const temaAtual = document.body.classList.contains('escuro')
        ? 'escuro'
        : 'claro';

    localStorage.setItem('tema', temaAtual);

    atualizarTextoTema();
});


const modal = document.getElementById('modalCliente')
const cadastra = document.getElementById('btnNovoCliente')
const cancela = document.getElementById('btnCancelar')
let idEditando = null;

cadastra.addEventListener('click', () => {
    modal.classList.add('aberto'); 
    idEditando = null;
    formCliente.reset();
});


cancela.addEventListener('click', () => {
    modal.classList.remove('aberto');
    idEditando = null;
    formCliente.reset();
});

const listaClientes = document.getElementById('listaClientes')

function formatarData(texto) {
    if (!texto) {
        return '';
    }

    const partesData = texto.split(' ');
    const partes = partesData[0].split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function carregarClientes() {
    
    fetch('/clientes')
        .then(resposta => resposta.json())
        .then(clientes => {
            listaClientes.innerHTML = ''
            clientes.forEach(cliente => {

                console.log(cliente);

                const linha = document.createElement('tr');
                const celulaNome = document.createElement('td')
                celulaNome.textContent = cliente.nome
                linha.appendChild(celulaNome);

                const celulaEmail = document.createElement('td')
                celulaEmail.textContent = cliente.email
                linha.appendChild(celulaEmail);

                const celulaTelefone = document.createElement('td')
                celulaTelefone.textContent = cliente.telefone
                linha.appendChild(celulaTelefone);

                const celulaData_nascimento = document.createElement('td')
                celulaData_nascimento.textContent = formatarData(cliente.data_nascimento)
                linha.appendChild(celulaData_nascimento);

                const celulaData_cadastro = document.createElement('td')
                celulaData_cadastro.textContent = formatarData(cliente.data_cadastro)
                linha.appendChild(celulaData_cadastro);

                const celulaStatus = document.createElement('td')
                celulaStatus.textContent = cliente.status
                linha.appendChild(celulaStatus);

                const celulaAcoes = document.createElement('td')
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Apagar'
                botaoExcluir.classList.add('btn', 'btn-perigo');

                botaoExcluir.addEventListener('click', () => {
                    if (confirm('Tem certeza que deseja excluir este cliente?')) {
                        fetch(`/clientes/${cliente.id}`, {
                            method: 'delete'
                        }).then(resposta => {
                            if (resposta.ok) {
                                carregarClientes()
                            } else {
                                alert('Não foi possível excluir o cliente')
                            }
                        })
                    }
                })

                const botaoEditar = document.createElement('button')
                botaoEditar.textContent = 'Editar'
                botaoEditar.classList.add('btn', 'btn-secundario');

                botaoEditar.addEventListener('click', () => {
                    document.getElementById('nome').value = cliente.nome
                    document.getElementById('email').value = cliente.email
                    document.getElementById('telefone').value = cliente.telefone
                    document.getElementById('data_nascimento').value = cliente.data_nascimento || ''
                    document.getElementById('status').value = cliente.status

                    idEditando = cliente.id;
                    modal.classList.add('aberto');
                })
                celulaAcoes.appendChild(botaoEditar);

                celulaAcoes.appendChild(botaoExcluir);
                linha.appendChild(celulaAcoes);

                listaClientes.appendChild(linha);
            });
        });
}

carregarClientes();

const formCliente = document.getElementById('formCliente')

formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const metodo = idEditando !== null ? 'PUT' : 'POST';
    const url = idEditando !== null
    ? `/clientes/${idEditando}`
    : '/clientes';

    const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        data_nascimento: document.getElementById('data_nascimento').value || null,
        status: document.getElementById('status').value
    };

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }).then(resposta => {
        if (resposta.ok) {
            formCliente.reset();
            carregarClientes();
            modal.classList.remove('aberto');
            idEditando = null;
        } else {
            resposta.text().then(mensagem => {
                alert(mensagem);
            });
        }
    });
});