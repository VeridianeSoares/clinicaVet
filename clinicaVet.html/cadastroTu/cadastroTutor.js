const formFuncinrio = document.querySelector("#formulario-cadastro-funcionario")


const sendFuncinario = async (event) =>{
    event.preventDefault();


    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var matricula = document.getElementById('matricula').value;
    var datadenascimento = document.getElementById('dataNascimento').value;
    var funcao = document.getElementById('funcao').value;
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;

    const funcionario = {
        nome,
        datadenascimento,
        cpf,
        telefone,
        email,
        login,
        senha,
        matricula,
        funcao,
        endereco: {
            rua,
            cidade,
            estado,
            bairro,
            numero,
            cep,
        }
    };

    try {
        const response = await fetch('http://localhost:8080/Funcionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        if (response.ok) {
            // Limpar campos e redirecionar se o cadastro for bem-sucedido
            alert('Cadastro realizado com sucesso!');
            window.location.href = "home.html";
        } else {
            const errorMessage = await response.text();
            alert(errorMessage); // Exibir mensagem de erro recebida do servidor
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
}








formFuncinrio.addEventListener("submit", sendFuncinario)

