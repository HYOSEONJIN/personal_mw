package com.mw.ootd.dao;

import java.util.List;

import com.mw.ootd.Domain.hashtag;
import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Domain.ootdComment;

public interface ootdInterfaceDao {

	


	// 전체 리스트 가져오기
	List<ootdBoard> selectAllootdList();
	
	// 해시태그의 이름 반환 ex) 귀여운, 섹시한
	List<hashtag> selectHashName();
	
	// 글등록
	int ootdDocInsert(ootdBoard ootd);
	
	// 글 등록시 ootdidx를 반환
	int ootdidxReturn(String ootdphotoname);
	// 반환된 ootdidx값으로 좋아요칼럼생성
	void makeLikeCol(int ootdidx);
	
	// 전체 글의 수
	int selectMemberCount();
	
	// 페이징값
	List<ootdBoard> PagingView(int startRow, int cntPerPage);

	// ootdidx값에 따른 글 정보
	List<ootdBoard> postByIdx(int ootdidx);

	// ootdidx값에 따른 글 삭제
	int deletPost(int ootdidx);

	// 해당 글에 좋아요 했는지 안했는지 여부
	int likeChk(int ootdidx, int memidx);

	// 좋아요 해주기
	int onheart(int ootdidx, int memidx);

	// 좋아요 삭제
	int offheart(int ootdidx, int memidx);
	
	// 좋아요 갯수
	int likeAmount(int ootdidx);

	// 좋아요 값 삽입
	void ootdLikeCntInsert(int likeAmount, int ootdidx);

	// 댓글 등록
	int ootdCmtInsert(ootdComment ootdcmt);

	// 댓글 갯수
	int cmtAmount(int ootdidx);

	// 댓글 갯수 삽입
	void ootdCmtCntInsert(int cmtAmount, int ootdidx);

	// 댓글 리스트 반환
	List<ootdComment> getCmtList(int ootdidx);

	// 댓글 삭제 (해당IDX)
	int deleteCommentByIdx(int ootdcmtidx);

	// 댓글 수정
	int modifyComment(String oodtcmttext, int ootdcmtidx);



}
