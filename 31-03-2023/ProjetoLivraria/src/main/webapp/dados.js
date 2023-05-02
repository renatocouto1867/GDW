function ajaxGet(recurso, mostrador) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = mostrador;
    xhr.open("get", recurso, true);
    xhr.send();
}

function ajaxPost(recurso, conteudoXML, funcao) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", recurso, true);
    xhr.onreadystatechange = funcao;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("dados=" + conteudoXML);
}

function mostrarXML(edita) {
    if (this.readyState == 4 && this.status == 200) {
        const xmlDoc = this.responseXML;
        const raiz = xmlDoc.documentElement;
        const livros = raiz.getElementsByTagName("livro");

        let texto = "";
        let contador = 1;

        for (let livro of livros) {
            texto += livroParaTd(livro, contador, edita);
            contador++;
        }
        document.querySelector("tbody").innerHTML = texto;
    }
}

let tipo = 0;

function livroParaTd(livro, index) {
    const categoria = livro.getAttribute("categoria"); //pegaAtributoDoLivro("titulo", livro);
    const titulo = pegaDadoDoLivro("titulo", livro);
    const autor = pegaAutorLivro("autor", livro);
    const idioma = livro.getElementsByTagName("titulo")[0].getAttribute("lang");
    const ano = pegaDadoDoLivro("ano", livro);
    const preco = pegaDadoDoLivro("preco", livro);
    let cor = '#C0C0C0';

    if (index % 2 === 0) {
        cor = '#E7DEEE;';
    } else {
        cor = '#fff';
    }
    if (tipo === 1) {
        return `<tr style="background-color: ${cor};">
                <td>${categoria}</td>            
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${idioma}</td>
                <td>${ano}</td>
                <td>${preco}</td>
                <td><button id="butEdita" type="button" onclick="editar('${titulo}','${categoria}','${autor}','${idioma}','${ano}','${preco}')">editar</button></td>
                <td><button id="butDeleta" type="button" onclick="deletar('${titulo}')">deletar</button></td>
            </tr>
            `;

    } else {
        return `<tr style="background-color: ${cor};">
                <td>${categoria}</td>            
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${idioma}</td>
                <td>${ano}</td>
                <td>${preco}</td>
            </tr>
            `;
    }

}

const pegaDadoDoLivro = (tag, livro) => livro.getElementsByTagName(tag)[0].firstChild.nodeValue;

const pegaAtributoDoLivro = (tag, livro) => livro.getAttribute("categoria");

function pegaAutorLivro(tag, livro) {
    let listaAutor = "";
    const autor = livro.getElementsByTagName(tag);
    if (autor.length == 1) {
        listaAutor = livro.getElementsByTagName(tag)[0].firstChild.nodeValue;

    } else {
        listaAutor = "<ul>"
        for (let i = 0; i < autor.length; i++) {
            listaAutor = listaAutor + "<li>" + autor[i].firstChild.nodeValue + "</li>"
        }
        listaAutor = listaAutor + "</ul>"
    }
    return listaAutor;

}

function pesquisaTitulo() {
    tipo = 2;
    const titulo = document.getElementById("titulo").value;
    ajaxGet(`pesquisaportitulo?titulo=${titulo}`, mostrarXML);
}

function listarTodos() {
    tipo = 1;
    ajaxGet(`listartodos`, mostrarXML);
}

function pesquisaCategoria() {
    tipo = 2;
    const categoria = document.getElementById("categoria").value;
    ajaxGet(`pesquisaporcategoria?categoria=${categoria}`, mostrarXML);
}

function pesquisaAutor() {
    tipo = 2;
    const autor = document.getElementById("autor").value;
    ajaxGet(`pesquisaporautor?autor=${autor}`, mostrarXML);
}

function pesquisaAno() {
    tipo = 2;
    const ano = document.getElementById("ano").value;
    const op = document.getElementById("selcAno").value;
    ajaxGet(`pesquisaporano?ano=${ano}&operador=${op}`, mostrarXML);

}

function limpar() {
    document.querySelector("tbody").innerHTML = '';
}

function deletar(x) {
    ajaxGet(`deletarportitulo?titulo=${x}`, mostrarXML);
}

function editar(titulo, categoria, autor, idioma, ano, preco) {
    document.getElementById('formCadastro').reset();

    const autoresHTML = `<html>${autor}</html>`;
    const parser = new DOMParser();
    const documentAutores = parser.parseFromString(autoresHTML, "text/html");
    const autores = documentAutores.getElementsByTagName('li');

    this.document.getElementById("divCadastro").style.display = 'block';
    this.document.getElementById("divResultado").style.display = 'none';
    this.document.getElementById("inputCategoria").value = categoria;
    this.document.getElementById("inputTitulo").value = titulo;
    this.document.getElementById("tituloAnterior").value = titulo;

    if (autores.length > 0) {
        for (let i = 0; i < (autores.length - 1); i++) {
            addAutores();
        }

        for (let i = 0; i < (autores.length); i++) {
            this.document.getElementById("inputAutor" + (i + 1)).value = autores.item(i).textContent;
        }
    } else {
        this.document.getElementById("inputAutor1").value = autor;
    }

    this.document.getElementById("inputIdioma").value = idioma;
    this.document.getElementById("inputAno").value = ano;
    this.document.getElementById("inputPreco").value = preco;
    this.document.getElementById("butCadastrar").textContent = "Salvar Alteração";
    this.document.getElementById("butCadastrar").onclick = editarLivro;
}

function salvarLivro() {
    const categoria = document.getElementById('inputCategoria').value;
    const titulo = document.getElementById('inputTitulo').value;
    const idioma = document.getElementById('inputIdioma').value;
    const ano = document.getElementById('inputAno').value;
    const preco = document.getElementById('inputPreco').value;
    const autores = document.getElementsByClassName('classInputAutores');

    let livroXML = `<livro categoria="${categoria}"><titulo lang="${idioma}">${titulo}</titulo>`;

    for (let i = 0; i < autores.length; i++) {
        livroXML += `<autor>${autores[i].value}</autor>`;
    }

    livroXML += `<ano>${ano}</ano><preco>${preco}</preco></livro>`;

    ajaxPost("cadastrarlivro", livroXML, function () {

        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseXML.documentElement.firstChild.nodeValue);
        }
    });
}//salvar

function editarLivro() {
    const categoria = document.getElementById('inputCategoria').value;
    const tituloSemAlteracao = document.getElementById('tituloAnterior').value;
    const titulo = document.getElementById('inputTitulo').value;
    const idioma = document.getElementById('inputIdioma').value;
    const ano = document.getElementById('inputAno').value;
    const preco = document.getElementById('inputPreco').value;
    const autores = document.getElementsByClassName('classInputAutores');

    let livroXML = `<livro categoria="${categoria}"><tituloAntigo>${tituloSemAlteracao}</tituloAntigo><titulo lang="${idioma}">${titulo}</titulo>`;
    for (let i = 0; i < autores.length; i++) {
        livroXML += `<autor>${autores[i].value}</autor>`;
    }

    livroXML += `<ano>${ano}</ano><preco>${preco}</preco></livro>`;

    ajaxPost("editarlivro", livroXML, function () {

        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseXML.documentElement.firstChild.nodeValue);
        }
    });
}//editar