document.addEventListener('DOMContentLoaded', function() {
    carregarDadosTabela();
});

function carregarDadosTabela() {
    fetch('http://localhost:8080/Funcionario')
        .then(response => response.json())
        .then(data => {
            let tableBody = document.querySelector('#userTable tbody');
            tableBody.innerHTML = ''; // Limpar a tabela antes de recarregar

            data.forEach(user => {
                // Linha para os dados principais
                let mainRow = document.createElement('tr');
                mainRow.innerHTML = `
                    <td>${user.nome}</td>
                    <td>${user.datadenascimento}</td>
                    <td>${user.cpf}</td>
                    <td>${user.telefone}</td>
                    <td>${user.email}</td>
                    <td>${user.login}</td>
                    <td>${user.senha}</td>
                    <td>${user.matricula}</td>
                    <td>${user.funcao}</td>
                    <td class="cep">${user.endereco.cep}</td>
                    <td>
                        <button class="edit-btn" data-id="${user.id}">Editar</button>
                        <button class="delete-btn" data-id="${user.id}">Excluir</button>
                    </td>
                `;

                // Linha para o endereço
                let addressRow = document.createElement('tr');
                addressRow.innerHTML = `
                    <td colspan="9">
                        <div>
                            <strong>Endereço completo:</strong>
                            <p>${user.endereco.rua}, 
                            ${user.endereco.numero},
                            ${user.endereco.bairro},
                            ${user.endereco.cidade},
                            ${user.endereco.estado}
                            </p>
                        </div>
                    </td>
                `;
                addressRow.style.display = 'none'; // Oculta a linha inicialmente

                tableBody.appendChild(mainRow);
                tableBody.appendChild(addressRow);

                // Adiciona um evento de clique na linha principal para mostrar/ocultar a linha de endereço
                mainRow.addEventListener('click', function() {
                    let isVisible = addressRow.style.display === 'table-row';
                    addressRow.style.display = isVisible ? 'none' : 'table-row';
                });

                // Adiciona eventos aos botões de edição e exclusão
                mainRow.querySelector('.edit-btn').addEventListener('click', function(event) {
                    event.stopPropagation();
                    let id = this.getAttribute('data-id');
                    abrirModal(id);
                });

                mainRow.querySelector('.delete-btn').addEventListener('click', function(event) {
                    event.stopPropagation();
                    let id = this.getAttribute('data-id');
                    // Lógica para excluir o registro com o ID `id`
                    if (confirm('Tem certeza que deseja excluir este registro?')) {
                        fetch(`http://localhost:8080/pessoa/check-relations/${id}`)
                            .then(response => response.json())
                            .then(hasRelations => {
                                if (hasRelations) {
                                    alert('Não é possível excluir este registro, pois a pessoa está relacionada a outras entidades.');
                                } else {
                                    fetch(`http://localhost:8080/pessoa/${id}`, {
                                        method: 'DELETE'
                                    })
                                    .then(response => {
                                        if (response.ok) {
                                            console.log('Registro excluído com sucesso');
                                            alert('Registro excluído com sucesso!');
                                            location.reload(); // Recarregar a página
                                        } else {
                                            console.error('Erro ao excluir o registro:', response.statusText);
                                        }
                                    })
                                    .catch(error => console.error('Error deleting user data:', error));
                                }
                            })
                            .catch(error => console.error('Error checking user relations:', error));
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
}