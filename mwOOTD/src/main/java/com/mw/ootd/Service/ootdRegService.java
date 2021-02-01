package com.mw.ootd.Service;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdRegService {
	// 글등록과 관련된 기능이 모여있는 서비스
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public int ootdWrite(ootdBoard ootd, HttpServletRequest request) {
		int result = 0;
		// 성공은0 만약에 사진이없다면 1, 글 내용이 없다면 2를 반환하고 알려줄 것.
		
		
		return result;
		
	}

}
