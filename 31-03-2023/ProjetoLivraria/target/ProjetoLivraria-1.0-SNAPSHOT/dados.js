function ajax(recurso, mostrador) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = mostrador;
    xhr.open("get", recurso, true);
    xhr.send();
}

function mostrarXML() {
    if (this.readyState == 4 && this.status == 200) {
        const xmlDoc = this.responseXML;
        const raiz = xmlDoc.documentElement;
        const livros = raiz.getElementsByTagName("livro");

        let texto = "";
        let contador=1;        

        for (let livro of livros) {
            texto += livroParaTd(livro,contador);
            contador++;
        }
        document.querySelector("tbody").innerHTML = texto;
    }
}


function livroParaTd(livro,index) {    
    const categoria = livro.getAttribute("categoria"); //pegaAtributoDoLivro("titulo", livro);
    const titulo = pegaDadoDoLivro("titulo", livro);    
    const autor = pegaAutorLivro("autor", livro);
    const idioma = livro.getElementsByTagName("titulo")[0].getAttribute("lang");
    const ano = pegaDadoDoLivro("ano", livro);
    const preco = pegaDadoDoLivro("preco", livro);
    let cor='#C0C0C0';

        if (index % 2 === 0) {
            cor='#C0C0C0';
        } else {            
            cor='#F2F1F0';
        }

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
    } return listaAutor;

}


function pesquisaTitulo() {
    const titulo = document.getElementById("titulo").value;
    ajax(`pesquisaportitulo?titulo=${titulo}`, mostrarXML);
}

function listarTodos() {    
    ajax(`listartodos`, mostrarXML);
}

function pesquisaCategoria() {
    const categoria = document.getElementById("categoria").value;
    ajax(`pesquisaporcategoria?categoria=${categoria}`, mostrarXML);
}

function pesquisaAutor() {
    const autor = document.getElementById("autor").value;
    ajax(`pesquisaporautor?autor=${autor}`, mostrarXML);
}

function pesquisaAno() {
    const ano = document.getElementById("ano").value;
    const op=document.getElementById("selcAno").value;
    ajax(`pesquisaporano?ano=${ano}&operador=${op}`, mostrarXML);

}

function limpar(){
    document.querySelector("tbody").innerHTML = '';
}