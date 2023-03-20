function ajax(recurso, mostrador) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = mostrador;
    xhr.open("get", recurso, true);
    xhr.send();
}

function chamaMenu(opcao) {
    //console.log(opcao)
    const titulo = document.getElementById("titulo")
    const autor = document.getElementById("autor")
    ajax(opcao, function () {

        if (this.readyState == 4 && this.status == 200) {
            const poesias = this.responseXML.getElementsByTagName("poesia");
            titulo.innerHTML = poesias[0].getElementsByTagName("titulo")[0].firstChild.nodeValue;
            autor.innerHTML = poesias[0].getElementsByTagName("autor")[0].firstChild.nodeValue;
            let caminhoImg="imagens/"+poesias[0].getElementsByTagName("imagem")[0].textContent;            
            let estrofes = poesias[0].getElementsByTagName("estrofe");
            const corpoPoesia = document.getElementById("corpoPoesia");
            let textoHtml = '';
            for (let i = 0; i < estrofes.length; i++) {
                textoHtml += "<section>"
                let versos = estrofes[i].getElementsByTagName("verso");                
                for (let y = 0; y < versos.length; y++) {
                    textoHtml += "<p>" + versos[y].textContent + "</p>";
                }
                textoHtml += "</section>";
            }
            corpoPoesia.innerHTML = textoHtml;
            document.getElementById("imgPoema").src=caminhoImg;
        }

    })
}

onload = function () {
    ajax("menu.xml", function () {
        if (this.readyState == 4 && this.status == 200) {
            const menu = this.responseXML.getElementsByTagName("item")
            const criaMenu = document.getElementById("menuLista");
            let criaBotao = '';

            for (let index = 0; index < menu.length; index++) {
                texto = menu[index].firstChild.nodeValue;
                chamada = 'chamaMenu("Poesias/' + texto + '.xml")';
                criaBotao += '<li><input type="button" id="btProximo" value=" Poesia ' + (index + 1) + '" onclick=' + chamada + '></li>';

            }
            criaMenu.innerHTML = criaBotao;

        }
    })
}

