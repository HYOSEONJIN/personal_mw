package com.mw.ootd.Service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdRequestApiService {

	// 팀원들의 요청 API 관련 서비스

	private ootdInterfaceDao dao;

	@Autowired
	private SqlSessionTemplate template;
	

	// 조아요 탑쓰리
	public List<ootdBoard> LikeTopThree(){
		
		List<ootdBoard> ootdLikeTop = null;
		
		try {
			dao = template.getMapper(ootdInterfaceDao.class);
			
			ootdLikeTop = dao.LikeTopThree();
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	
		return ootdLikeTop;
	}

	// idx가 좋아한 게시물
	public List<ootdBoard> likeListbyIdx(int memidx) {
		
		List<ootdBoard> idxLikelist = null;
		try {
		dao = template.getMapper(ootdInterfaceDao.class);
		
		idxLikelist = dao.likeListbyIdx(memidx);
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return idxLikelist;
	}
}
