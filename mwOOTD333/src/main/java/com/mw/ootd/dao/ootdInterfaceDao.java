package com.mw.ootd.dao;

import java.util.List;

import com.mw.ootd.Domain.hashtag;
import com.mw.ootd.Domain.ootdBoard;

public interface ootdInterfaceDao {

	


	// 전체 리스트 가져오기
	List<ootdBoard> selectAllootdList();
	
	// 해시태그의 이름 반환 ex) 귀여운, 섹시한
	List<hashtag> selectHashName();
	
	// 글등록
	int ootdDocInsert(ootdBoard ootd);
	
	// 전체 글의 수
	int selectMemberCount();
	
	// 페이징값
	List<ootdBoard> PagingView(int startRow, int cntPerPage);

	// ootdidx값에 따른 글 정보
	List<ootdBoard> postByIdx(int ootdidx);

	// ootdidx값에 따른 글 삭제
	int deletPost(int ootdidx);

	// memidx 좋아요를 했는지 안했는지 여부 
	int likeChk(int memidx);
}
