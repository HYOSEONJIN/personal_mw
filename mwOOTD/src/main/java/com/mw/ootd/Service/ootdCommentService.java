package com.mw.ootd.Service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.mw.ootd.Domain.ootdComment;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdCommentService {
	
	// 코멘트와 관련된 서비스 모음
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	//코멘트 등록
	public int cmtReg(ootdComment ootdcmt) {
		
		int cmtAmount = 0 ;
		
		try {
		dao = template.getMapper(ootdInterfaceDao.class);
		//댓글등록
		dao.ootdCmtInsert(ootdcmt);
		//댓글 갯수 반환
		cmtAmount = dao.cmtAmount(ootdcmt.getOotdidx());
		//댓글 갯수 등록
		dao.ootdCmtCntInsert(cmtAmount, ootdcmt.getOotdidx());
		
	
		
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return cmtAmount;
	}

	
	public List<ootdComment> getCmtList(int ootdidx){
		
		List<ootdComment> ootdCmt = null;
		
		try {
		dao = template.getMapper(ootdInterfaceDao.class);
		ootdCmt = dao.getCmtList(ootdidx);
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return ootdCmt;
	}
}
