<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.png"/>
    <title>Livraria Modelo</title>

    <script src="menuButton.js"></script>
    <script src="dados.js"></script>

    <link rel="stylesheet" href="principal.css">

</head>

<body>
<div id="divPrincipal">
    <div id="divMenu">
        <img src="livroAzul.jpeg" alt="Livro" width="200px" height="200px">
        <button class="butPesquisa" id="butPesTitulo" type="button"
                onclick="OpcaoPesquisa('secPesTitulo', 'butPesTitulo')">Pesquisar por Titulo
        </button>
        <button class="butPesquisa" id="butPesAno" type="button" onclick="OpcaoPesquisa('secPesAno', 'butPesAno')">
            Pesquisar por Ano
        </button>
        <button class="butPesquisa" id="butPesAutor" type="button" onclick="OpcaoPesquisa('secPesAutor','butPesAutor')">
            Pesquisar por Autor
        </button>
        <button class="butPesquisa" id="butPesCategoria" type="button"
                onclick="OpcaoPesquisa('secPesCategoria','butPesCategoria')">Pesquisar por Categoria
        </button>
        <button class="butPesquisa" id="butTodos" type="button" onclick="OpcaoPesquisa('secPesTodos','butTodos')">Listar
            Todos os Livros
        </button>
        <button class="butPesquisa" id="butCadastro" type="button" onclick="OpcaoPesquisa('secCadastro','butCadastro')">
            Cadastrar Livros
        </button>
    </div>
    <div id="divPesquisa">
        <div id="divOpcoes">
            <section class="opcaoPesquisa" id="secOpcao">
                <h1>Selecione uma opção</h1>
            </section>

            <section class="opcaoPesquisa" id="secPesTitulo">
                <fieldset>
                    <legend>Pesquisa por Titulo</legend>
                    <form>
                        <input type="text" id="titulo" name="titulo">
                        <button type="button" onclick="pesquisaTitulo()">Pesquisar</button>

                    </form>
                </fieldset>
            </section>

            <section class="opcaoPesquisa" id="secPesAno">
                <fieldset>

                    <legend>Pesquisa por Ano</legend>
                    <select name="" id="selcAno">
                        <option value="opcao">Opções</option>
                        <option value="maior">maior que</option>
                        <option value="menor">menor que</option>
                        <option value="igual">igual</option>
                    </select>
                    <input type="text" id="ano" name="ano">

                    <button type="button" onclick="pesquisaAno()">Pesquisar</button>
                    <button type="button" onclick="limpar()">Limpar</button>
                </fieldset>

            </section>

            <section class="opcaoPesquisa" id="secPesAutor">
                <fieldset>
                    <legend>Pesquisa por Autor</legend>
                    <input type="text" id="autor" name="autor">
                    <button type="button" onclick="pesquisaAutor()">Pesquisar</button>
                </fieldset>

            </section>

            <section class="opcaoPesquisa" id="secPesCategoria">
                <fieldset>
                    <legend>Pesquisa por Categoria</legend>
                    <input type="text" id="categoria" name="categoria">
                    <button type="button" onclick="pesquisaCategoria()">Pesquisar</button>
                </fieldset>
            </section>

            <section class="opcaoPesquisa" id="secPesTodos">

                <h1>Lista de todos os Livros</h1>

            </section>

            <section class="opcaoPesquisa" id="secCadastro">

                <h1>Cadastrar novo Livros</h1>

            </section>

        </div>

        <div id="divResultado">
            <table id="tabResultado">
                <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Idioma</th>
                    <th>Ano</th>
                    <th>Preço</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div id="divCadastro">
            <form id="formCadastro" action="">
                <input type="hidden" id="tituloAnterior" value="seu_valor_aqui">
                <label for="inputCategoria">Categoria</label>
                <input id="inputCategoria" required type="text">
                <label for="inputTitulo">Título</label>
                <input id="inputTitulo" required type="text">
                <label for="inputIdioma">Idioma</label>
                <input id="inputIdioma" required type="text">
                <label for="inputAno" >Ano</label>
                <input id="inputAno" required type="text">
                <label for="inputPreco">Preço</label>
                <input id="inputPreco" required type="text">

                <label>Autores:</label>
                <div id="divAutores">
                    <input id="inputAutor1" class="classInputAutores" type="text" required placeholder="Nome do autor">
                </div>
                <button type="button" id="add-autor" onclick="addAutores()">Adicionar novo autor</button>
            </form>
            <button type="button" id="butCadastrar" onclick="salvarLivro()">Cadastrar</button>
        </div>


    </div>

</div>
</body>

</html>