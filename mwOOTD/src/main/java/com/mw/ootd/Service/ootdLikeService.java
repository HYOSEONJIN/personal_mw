package com.mw.ootd.Service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdLikeService {
	
	// 좋아요 관련 서비스
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
		
	
	// MEMIDX 좋아요 했는지 안했는지 여부
	public int likeChk(int ootdidx, int memidx) {
		
		dao = template.getMapper(ootdInterfaceDao.class);
		// 0 이면 좋아요 X 1이면 좋아요 O
		int result = dao.likeChk(ootdidx, memidx);
		
		
		return result;
	}



	// 좋아요 ON/OFF
	public int likeOnOff(int chk, int ootdidx, int memidx) {
		
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
		
		return result;
	}

}
