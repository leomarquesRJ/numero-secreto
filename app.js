/*
Módulo: Logica de Programação 002 - Explorando funções e listas
Data de incio: 17/01/2025
Curso: Alura ONE
*/

//Variavel
let listaNumerosSorteado = [];
let numTentativas = 1;
let numLimite = 10;
let numSecreto = gerarNumeroAleatorio();
console.log("numSecreto", + numSecreto)
  

//Função para alterar o texto na tela
function exibirTextoNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});  
};


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo de adivinhação');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
};

exibirMensagemInicial();

// "function" cria uma função para algum objeto dentro do HTLM, "verificarChute" é a referencia dada para o objeto.
// assim ele sabe qual função usar.
function verificarChute() {
    let chute = document.querySelector('input').value; //".value" pega o valor inserido na tag "input" e armazena navriável "chute".
    let palavraTentativa = numTentativas > 1 ? "tentativas" : "tentativa";

    if (chute == numSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        exibirTextoNaTela('p', `Você acertou o número secreto com ${numTentativas} ${palavraTentativa}.`);
        document.getElementById("reiniciar").removeAttribute("disabled"); // Seleciona o botao reinicia pelo ID e remove o atributo "disabled" dsabilitando o botão.
        document.getElementById('btnChute').setAttribute('disabled', true); // Desabilita o botão 'Chutar'
    } 
    else if (chute > numSecreto) {
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}.`);
    }
    else {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}.`);   
    };

    numTentativas++;
    limparCampo();      
};


//Função gera um numero aleatorio entre 1 e 10.
function gerarNumeroAleatorio() {
    let numSorteado = parseInt(Math.random() * 10 + 1);
    let quantidadeNumerosLista = listaNumerosSorteado.length;
    console.log("Numero numSorteado", + numSorteado)
    
    if (quantidadeNumerosLista == numLimite) {
        listaNumerosSorteado = [];
    };

    if (listaNumerosSorteado.includes(numSorteado)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaNumerosSorteado.push(numSorteado);
        console.log(listaNumerosSorteado);
        return numSorteado;
    };
    
};

//Função seleciona a tag "input" e limpa o seu valor.
function limparCampo() {
    chute = document.querySelector('input').value = '';
    chute.value = '';
};

function reiniciarJogo() {
    numTentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('btnChute').removeAttribute('disabled'); // Habilita o botão 'Chutar' depois de ter ecolhido novo jogo.
    
};
