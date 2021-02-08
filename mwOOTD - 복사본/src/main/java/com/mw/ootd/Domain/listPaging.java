package com.mw.ootd.Domain;

import java.util.List;

import lombok.Getter;

@Getter
public class listPaging {
	
	
	private int pageNum; // 입력받을 페이지 번호
	private int totalPost; // 전체게시물
	private int cntPerpage; // 노출할 게시물의 갯수 =9
	private int startRow; // 시작점
	private int totalPageCnt; // 전체 페이지 갯수
	private List<ootdBoard> ootdList;
	
	public listPaging(int pageNum, int totalPost, int cntPerpage, int startRow, List<ootdBoard> ootdList) {
		this.pageNum = pageNum;
		this.totalPost = totalPost;
		this.cntPerpage = cntPerpage;
		this.startRow = startRow;
		this.ootdList = ootdList;
		
		this.totalPageCnt = totalPost/cntPerpage;
		if(totalPost%cntPerpage>0) {
			totalPageCnt++;
		}
		
		
	}

	
	
	
	

}
