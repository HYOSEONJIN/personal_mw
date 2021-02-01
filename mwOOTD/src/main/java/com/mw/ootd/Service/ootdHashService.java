package com.mw.ootd.Service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.hashtag;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdHashService {
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	//해시태그 이름 반환 메서트
	public List<hashtag> getHashName(){
		
		dao = template.getMapper(ootdInterfaceDao.class);
		
		return dao.selectHashName();
	}
	

}
