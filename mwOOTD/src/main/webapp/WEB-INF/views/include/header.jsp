<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% session.setAttribute("memidx", "2");
session.setAttribute("memnic", "테스트계정"); %>
 
     
    <header>
		<img src="image/logo/mwlogo.png" width="119px" class="logoimage">
		<input type="hidden" value="${memidx}" name="memidxsession" id="memidxsession">
		<input type="hidden" value="${memnic}" name="memnicsession" id="memnicsession">
	</header>
	
 