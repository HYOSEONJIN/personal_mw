package com.mw.ootd.Service;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdModifyService {
	// 글 수정과 관련된 서비스
	
	
	
	private ootdInterfaceDao dao;

	@Autowired
	private SqlSessionTemplate template;
	
	
	public int ootdModify(ootdBoard ootd, HttpServletRequest request) {
		
		// 글내용, 해시태그, 사진이 수정 가능하다.		
		// 글내용은 기본 입력 사항이 있어서 무조건 받아줘야함
		
				
		File newFile = null;
		String ootdphotoname = null;
		String saveDirPath = null;
		
		
		
		// 사진을 새로 첨부했는가 여부
		if(ootd.getOotdphoto()!=null) {
			
			
		}
		
		return 0;
	}

}
