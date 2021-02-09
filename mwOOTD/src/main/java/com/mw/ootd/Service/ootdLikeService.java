package com.mw.ootd.Service;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdlike;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdLikeService {
	
	// 좋아요 관련 서비스
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
		
	
	// MEMIDX 좋아요 했는지 안했는지 여부
	public ootdlike likeChk(int ootdidx, int memidx) {
		
		ootdlike like = new ootdlike();
		
		dao = template.getMapper(ootdInterfaceDao.class);
		// 0 이면 좋아요 X 1이면 좋아요 O
		int likeChk= dao.likeChk(ootdidx, memidx);
		int likeAmount = dao.likeAmount(ootdidx);
		
		like.setLikeChk(likeChk);
		like.setLikeAmount(likeAmount);
		
		return like;
	}



	// 좋아요 ON/OFF
	public ootdlike likeOnOff(int chk, int ootdidx, int memidx) {
		
		ootdlike like = new ootdlike();
		
		dao = template.getMapper(ootdInterfaceDao.class);
		int result = 0;
		// 좋아요해주기
		if(chk==1) {
			dao.onheart(ootdidx, memidx);
			result=1;
		}else if (chk==0) {
			// 좋아요 삭제
			dao.offheart(ootdidx, memidx);
			result=0;
		}
		
		int likeAmount = dao.likeAmount(ootdidx);
		like.setLikeOnOff(result);
		like.setLikeAmount(likeAmount);
		
		return like;
	}

}
