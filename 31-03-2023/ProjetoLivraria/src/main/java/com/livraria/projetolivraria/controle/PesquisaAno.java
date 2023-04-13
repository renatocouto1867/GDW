package com.livraria.projetolivraria.controle;

import com.livraria.projetolivraria.modelo.ManipulaXML;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "PesquisaAno", value = "/pesquisaporano")
public class PesquisaAno extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String caminho=getServletContext().getRealPath("/WEB-INF/livros.xml");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/xml");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        int anoPesq = Integer.parseInt(request.getParameter("ano"));
        String operador= request.getParameter("operador");

        ManipulaXML manipulaXML = new ManipulaXML(caminho);
        out.println(manipulaXML.pesquisaAno(operador,anoPesq));

    }
}