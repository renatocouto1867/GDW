onload = function () {
    this.document.getElementById("secPesTitulo").style.display = 'none';
    this.document.getElementById("secPesAno").style.display = 'none';
    this.document.getElementById("secPesAutor").style.display = 'none';
    this.document.getElementById("secPesCategoria").style.display = 'none';
    this.document.getElementById("secPesTodos").style.display = 'none';
    this.document.getElementById("secCadastro").style.display = 'none';
    this.document.getElementById("divCadastro").style.display = 'none';
}

function estilizaButton(botao) {
    this.document.getElementById(botao).style.width = '95%';
    this.document.getElementById(botao).style.float = 'right';
    this.document.getElementById(botao).style.background = 'var(--fundoPesquisa)';
    this.document.getElementById(botao).style.color = 'var(--fundoMenu)';
    this.document.getElementById(botao).style.fontWeight = 'bold';
    limpaButton(botao);
}

function limpaButton(botao) {
    const limpa = document.getElementsByClassName('butPesquisa');

    for (let index = 0; index < limpa.length; index++) {
        if (botao != limpa[index].id) {
            this.document.getElementById(limpa[index].id).style.width = '90%';
            this.document.getElementById(limpa[index].id).style.float = 'center';
            this.document.getElementById(limpa[index].id).style.background = 'var(--fundoMenu)';
            this.document.getElementById(limpa[index].id).style.color = 'white';
            this.document.getElementById(limpa[index].id).style.fontWeight = 'normal';
        }
    }

}

function OpcaoPesquisa(opcao, botao) {
    const pesOpcao = document.getElementsByClassName('opcaoPesquisa');

    for (let index = 0; index < pesOpcao.length; index++) {
        if (opcao != pesOpcao[index].id) {
            this.document.getElementById(pesOpcao[index].id).style.display = 'none';
        } else {
            this.document.getElementById(pesOpcao[index].id).style.display = 'block';
        }
    }
    document.querySelector("tbody").innerHTML = '';
    estilizaButton(botao);
    if (botao == "butTodos") {
        listarTodos();
        document.getElementById('formCadastro').reset();
    }
    if (botao == "butCadastro") {
        document.getElementById("divResultado").style.display = 'none';
        document.getElementById("divCadastro").style.display = 'block';
        remuveAutores();
        document.getElementById('formCadastro').reset();
        this.document.getElementById("butCadastrar").textContent="Cadastrar";
        this.document.getElementById("butCadastrar").onclick=salvarLivro;
    } else {
        document.getElementById("divResultado").style.display = 'block';
        document.getElementById("divCadastro").style.display = 'none';
        remuveAutores();
    }

}

// botão mais autores
function addAutores() {
    let ultimoAutor = (document.getElementById('divAutores')).lastElementChild;
    let novoAutor = ultimoAutor.cloneNode(true);
    let numAutores = (document.getElementById('divAutores')).getElementsByTagName('input').length;
    numAutores++; // Incrementa o índice do campo para criar id
    let novoAutorInput = novoAutor.querySelector('input');
    (document.getElementById('divAutores')).appendChild(novoAutor);
    (document.getElementById('divAutores')).getElementsByTagName('input').item(numAutores-1).setAttribute('id', 'inputAutor' + numAutores);
    (document.getElementById('divAutores')).getElementsByTagName('input').item(numAutores-1).setAttribute('class', 'classInputAutores');
    (document.getElementById('divAutores')).getElementsByTagName('input').item(numAutores-1).value='';

}

function remuveAutores() {
    let qtAutores = (document.getElementById('divAutores')).getElementsByTagName('input').length;

    for (;qtAutores>1 ; qtAutores--) {
        nId=(qtAutores);
        nomeNone="inputAutor"+nId;
        noRemovido = document.getElementById(`${nomeNone}`)
        //console.log(noRemovido);
        document.getElementById('divAutores').removeChild(noRemovido);
    }
    qtAutores=0;
}