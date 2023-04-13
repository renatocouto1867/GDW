package com.livraria.projetolivraria.controle;

import java.io.*;

import com.livraria.projetolivraria.modelo.ManipulaXML;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "PesquisaTitulo", value = "/pesquisaportitulo")
public class PesquisaTitulo extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String caminho=getServletContext().getRealPath("/WEB-INF/livros.xml");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String tituloPesq = request.getParameter("titulo");

        ManipulaXML manipulaXML = new ManipulaXML(caminho);
        out.println(manipulaXML.pesquisaTitulo(tituloPesq));

    }
}