<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	
	
	<c:url value="/list" var="ootd_list"/>
    <footer>

		<table border="0" class="footer_menu_table">
			<tr>
				<td><img src="image/icon/home2.png" width="30"
					class="menuicons"></td>
				<td><img src="image/icon/ootd.png" width="30" class="menuicons" onclick="ootdMain()">
				</td>
				<td><img src="image/icon/closet.png" width="23"
					class="menuicons"></td>
				<td><img src="image/icon/market.png" width="30"
					class="menuicons"></td>
				<td><img src="image/icon/mypage2.png" width="23"
					class="menuicons"></td>
			</tr>
			<tr>
				<td>HOME</td>
				<td><a href="${ootd_list}">OOTD</a></td>
				<td>CLOSET</td>
				<td>MARKET</td>
				<td>MY</td>
			</tr>
		</table>

	</footer>