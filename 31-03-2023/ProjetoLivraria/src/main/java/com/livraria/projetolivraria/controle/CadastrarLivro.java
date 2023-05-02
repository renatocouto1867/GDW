package com.livraria.projetolivraria.controle;

import com.livraria.projetolivraria.modelo.ManipulaXML;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "CadastrarLivro", value = "/cadastrarlivro")
public class CadastrarLivro extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String caminho = getServletContext().getRealPath("/WEB-INF/livros.xml");
        PrintWriter out=response.getWriter();
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/xml");
        String dadosXML=request.getParameter("dados");
        int statusGravacao=0;

       // System.out.println("teste impressao livro"+dadosXML);

        ManipulaXML manipulador=new ManipulaXML(caminho);
        try {
            statusGravacao=manipulador.cadastrarLivros(dadosXML);
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        } catch (TransformerException e) {
            throw new RuntimeException(e);
        }
        if (statusGravacao==1) {
            out.print("<mensagem>Inserido com sucesso</mensagem>");
        } else if (statusGravacao==2) {
            out.print("<mensagem>Já existe livro com o mesmo titulo cadastrado</mensagem>");
        }
    }
}
