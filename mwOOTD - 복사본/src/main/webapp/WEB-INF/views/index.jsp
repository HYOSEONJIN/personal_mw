<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<title>+WEATHER WEAR+</title>
<%@ include file="/WEB-INF/views/include/basicset.jsp"%>
<link rel="styleSheet" href="<c:url value="/css/default.css"/>">
 <script src="<c:url value="/js/ootd.js"/>"></script>


</head>

<body bgcolor="#f5f5f5">

<div id="container">
	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="content" id="content" name="content">
       여기는 콘텐츠 영역입니다 각 페이지 별로 자유롭게 사용하세요~! 
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>
</div>
</body>
</html>