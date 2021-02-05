<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% session.setAttribute("memidx", "1");
session.setAttribute("memnic", "메이웨더"); %>
 
     
    <header>
		<img src="image/logo/mwlogo.png" width="119px" class="logoimage">
		<input type="hidden" value="${memidx}" name="memidxsession" id="memidxsession">
	</header>
	
 