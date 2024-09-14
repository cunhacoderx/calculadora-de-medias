const form = document.getElementById('form-atividade'); // Seleciona o formulário que adiciona atividades.
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji-celebrando"/>'; // Imagem que será exibida ao lado de atividades aprovadas.
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji-triste"/>'; // Imagem que será exibida ao lado de atividades reprovadas.
const atividades = []; // Array para armazenar o nome das atividades adicionadas.
const notas = []; // Array para armazenar as notas das atividades adicionadas.
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // Texto que será exibido se a média final for maior ou igual à nota mínima.
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'; // Texto que será exibido se a média final for menor que a nota mínima.
const notaMinima = parseFloat(prompt('Digite a nota mínima')); // Solicita ao usuário a nota mínima para aprovação.

let linhas = ''; // Variável para armazenar as linhas da tabela que exibirão as atividades e notas.

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário.

    adicionaLinha(); // Função para adicionar uma nova linha na tabela.
    atualizaTabela(); // Função para atualizar a tabela com as atividades inseridas.
    atualizaMediaFinal(); // Função para calcular e exibir a média final após inserir uma nova atividade.
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade'); // Captura o nome da atividade inserido pelo usuário.
    const inputNotaAtividade = document.getElementById('nota-atividade'); // Captura a nota da atividade inserida pelo usuário.

    // Verifica se a atividade já foi adicionada anteriormente.
    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi adicionada`); // Exibe um alerta se a atividade já existir.
    } else {
        atividades.push(inputNomeAtividade.value); // Adiciona a nova atividade ao array 'atividades'.
        notas.push(parseFloat(inputNotaAtividade.value)); // Adiciona a nova nota ao array 'notas' convertida em número.

        // Cria uma nova linha da tabela com a atividade e sua nota.
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; // Coluna do nome da atividade.
        linha += `<td>${inputNotaAtividade.value}</td>`; // Coluna da nota da atividade.
        // Verifica se a nota é maior ou igual à nota mínima e insere a imagem correspondente.
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        linhas += linha; // Adiciona a linha criada à variável 'linhas'.
    }

    inputNomeAtividade.value = ''; // Limpa o campo do nome da atividade após a inserção.
    inputNotaAtividade.value = ''; // Limpa o campo da nota da atividade após a inserção.
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody'); // Seleciona o corpo da tabela onde as atividades serão exibidas.

    corpoTabela.innerHTML = linhas; // Insere as linhas criadas no corpo da tabela.
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal(); // Calcula a média final das notas.

    // Exibe a média calculada na célula correspondente.
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    // Verifica se a média final é maior ou igual à nota mínima e exibe a mensagem correspondente.
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0; // Variável para acumular a soma de todas as notas.

    // Percorre o array de notas para somar todas as notas.
    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i]; // Soma cada nota ao total.
    }

    return somaDasNotas / notas.length; // Retorna a média das notas (soma dividida pelo número de atividades).
}