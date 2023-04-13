package com.livraria.projetolivraria.controle;

import com.livraria.projetolivraria.modelo.ManipulaXML;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "PesquisaCategoria", value = "/pesquisaporcategoria")
public class PesquisaCategoria extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String caminho=getServletContext().getRealPath("/WEB-INF/livros.xml");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String tituloPesq = request.getParameter("categoria");

        ManipulaXML manipulaXML = new ManipulaXML(caminho);
        out.println(manipulaXML.pesquisaCateoria(tituloPesq));

    }
}