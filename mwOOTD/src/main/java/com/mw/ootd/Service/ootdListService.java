package com.mw.ootd.Service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdListService {
	// 리스트출력 (글목록) 관련된 서비스
	
	private ootdInterfaceDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public List<ootdBoard> getootdList(){
		
		dao = template.getMapper(ootdInterfaceDao.class);
		
		return dao.selectAllootdList();
	}

}
