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

@WebServlet(name = "EditarLivro", value = "/editarlivro")
public class EditarLivro extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String caminho = getServletContext().getRealPath("/WEB-INF/livros.xml");
        PrintWriter out=response.getWriter();
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/xml");
        String dadosXML=request.getParameter("dados");


       // System.out.println("teste impressao livro"+dadosXML);

        ManipulaXML manipulador=new ManipulaXML(caminho);
        try {
            manipulador.editarLivro(dadosXML);
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        } catch (TransformerException e) {
            throw new RuntimeException(e);
        }

            out.print("<mensagem>Editado com sucesso</mensagem>");

    }
}
