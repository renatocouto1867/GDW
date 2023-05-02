package com.livraria.projetolivraria.modelo;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import java.io.*;


public class ManipulaXML {
    private Document doc;
    private String caminho1;

    public ManipulaXML(String caminho) {
        caminho1 = caminho;
        try {
            File docXML = new File(caminho);

            // Cria um DocumentBuilder usando a DocumentBuilderFactory
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

            // Lê o arquivo XML e retorna um objeto Document
            doc = dBuilder.parse(docXML);

        } catch (Exception e) {
            e.printStackTrace();
        }


    }//lerXML

    public String retornarXML(Node docXML) {
        String xml = null;
        try {
            TransformerFactory tfFactory = TransformerFactory.newInstance();
            Transformer transformer = tfFactory.newTransformer();
            DOMSource docOrigem = new DOMSource(docXML);

            ByteArrayOutputStream fluxoSaida = new ByteArrayOutputStream();

            StreamResult saida = new StreamResult(fluxoSaida);
            transformer.transform(docOrigem, saida);
            xml = fluxoSaida.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return xml;
    }

    public String listarTodos() {
        //NodeList nodeList = doc.getElementsByTagName("titulo");
        return retornarXML(doc);
    }//todos

    public String pesquisaTitulo(String titulo) {
        NodeList nodeList = doc.getElementsByTagName("titulo");

        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            if (!nodeList.item(i).getFirstChild().getNodeValue().equalsIgnoreCase(titulo)) {
                nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
            }
        }//for

        return retornarXML(doc);
    }//pesTitulo

    public String pesquisaCateoria(String texto) {
        NodeList nodeList = doc.getElementsByTagName("livro");

        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            String textoPesquisado = nodeList.item(i).getAttributes().getNamedItem("categoria").getNodeValue();

            if (!textoPesquisado.equalsIgnoreCase(texto)) {
                nodeList.item(i).getParentNode().removeChild(nodeList.item(i));

            }
        }//for

        return retornarXML(doc);
    }//pesCategoria

    public String pesquisaAutor(String textoPesquisado) {
        NodeList nodeList = doc.getElementsByTagName("livro");

        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            int qt = 0;
            Element listaAutor = (Element) nodeList.item(i);
            NodeList autores = listaAutor.getElementsByTagName("autor");
            for (int x = 0; x < autores.getLength(); x++) {
                if (autores.item(x).getFirstChild().getNodeValue().equalsIgnoreCase(textoPesquisado)) {
                    qt++;
                }
            }

            if (qt == 0) {
                nodeList.item(i).getParentNode().removeChild(nodeList.item(i));
            }
        }//for

        return retornarXML(doc);
    }//pesAutor

    public String pesquisaAno(String operador, int ano) {
        NodeList nodeList = doc.getElementsByTagName("ano");

        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            int intNodeValue = Integer.parseInt(nodeList.item(i).getFirstChild().getNodeValue());


            switch (operador) {
                case "igual":
                    if (intNodeValue != ano) {
                        nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
                    }
                    break;
                case "menor":
                    if (intNodeValue >= ano) {
                        nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
                    }
                    break;
                case "maior":
                    if (intNodeValue <= ano) {
                        nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
                    }
                    break;
                default:
                    nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
                    break;
            }
        }//for

        return retornarXML(doc);
    }//pesAno

    public String deletarTitulo(String titulo) {
        NodeList nodeList = doc.getElementsByTagName("titulo");
        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            if (nodeList.item(i).getFirstChild().getNodeValue().equalsIgnoreCase(titulo)) {
                nodeList.item(i).getParentNode().getParentNode().removeChild(nodeList.item(i).getParentNode());
            }
        }//for

        try {
            serealizar();
        } catch (TransformerException e) {
            throw new RuntimeException(e);
        }

        return retornarXML(doc);
    }//Deletar

    public Element criarLivro(String livroXML) throws IOException, SAXException, ParserConfigurationException {
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        InputStream inputStreamFluxo = new ByteArrayInputStream(livroXML.getBytes());
        Document doc2 = dBuilder.parse(inputStreamFluxo);
        return doc2.getDocumentElement();
    }

    public int cadastrarLivros(String livro) throws IOException, ParserConfigurationException, SAXException, TransformerException {

        Element livro2 = criarLivro(livro);
        String novoTitulo = livro2.getElementsByTagName("titulo").item(0).getTextContent();
        int verificaTitulo = verificaLivroCadastrado(novoTitulo);

        if (livro2.getElementsByTagName("tituloAntigo").getLength() > 1) {
            livro2.getElementsByTagName("tituloAntigo").item(0).getParentNode().removeChild(livro2.getElementsByTagName("tituloAntigo").item(0));
        }
        if (verificaTitulo == 2) {
            return verificaTitulo;
        } else {
            Element novoLivro = (Element) doc.importNode(livro2, true);
            doc.getDocumentElement().appendChild(novoLivro);
            serealizar();
            return 1;
        }

    }

    public int verificaLivroCadastrado(String titulo) {
        NodeList nodeList = doc.getElementsByTagName("titulo");
        for (int i = (nodeList.getLength() - 1); i >= 0; i--) {
            if (nodeList.item(i).getFirstChild().getNodeValue().equalsIgnoreCase(titulo)) {
                return 2;
            }
        }//for

        return 1;
    }

    public void editarLivro(String livro) throws IOException, ParserConfigurationException, SAXException, TransformerException {
        Element livro2 = criarLivro(livro);
        String TituloAnterio = livro2.getElementsByTagName("tituloAntigo").item(0).getTextContent();
        deletarTitulo(TituloAnterio);
        cadastrarLivros(livro);

    }

    public void serealizar() throws TransformerException {
        TransformerFactory fabrica = TransformerFactory.newInstance();
        Transformer transformador = fabrica.newTransformer();
        DOMSource fonte = new DOMSource(doc);
        File f = new File(caminho1);
        StreamResult resultado = new StreamResult(f);
        transformador.transform(fonte, resultado);
    }
/*
    public static void main(String[] args) throws IOException, ParserConfigurationException, TransformerException, SAXException {
        String dados = "livro<livro categoria=\"web\"><titulo lang=\"pt_br\">teste</titulo><autor>jose</autor><autor>maria</autor><ano>2002</ano><preco>20.90</preco></livro>";
        ManipulaXML teste = new ManipulaXML("/livros.xml");
        teste.cadastrarLivros(dados);

    }*/
}//class

