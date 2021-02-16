package com.mw.ootd.Service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdPostService {
	// 포스트1개 보여주는 페이지 관련 서비스 (글1개의 상세정보/코멘트 불러오기 좋아요 등등)
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	
	// idx값에 따른 게시물 1개의 정보
	public List<ootdBoard> getPostView(int ootdidx){
		
		List<ootdBoard> ootdlist= null;
		dao = template.getMapper(ootdInterfaceDao.class);		
		ootdlist = dao.postByIdx(ootdidx);
		
		
		return ootdlist;
	}
	
	// idx값에 따른 게시글 삭제
	public int deletPost(int ootdidx) {
		// 0 실패 1 성공
		
		dao = template.getMapper(ootdInterfaceDao.class);
		int result = dao.deletPost(ootdidx);
		
		if(result==1) {
			
			dao.deleteCommentData(ootdidx);
			dao.deleteLikeData(ootdidx);
		}
		
		
		return result;
		
	}
}
	
