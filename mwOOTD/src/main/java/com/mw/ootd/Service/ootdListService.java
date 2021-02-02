package com.mw.ootd.Service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.listPaging;
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
	
	public List<ootdBoard> Listpage(int pageNum){
		
		List<ootdBoard> ootdpaging  = null;
		
		try {
			
			int cntPerPage = 9; // 한페이지에 9개씩 보여줄것임
			int startRow = (pageNum -1) * cntPerPage; // 시작컬럼
			
			System.out.println("cnt"+cntPerPage);
			System.out.println("starrow"+ startRow);
			
			ootdpaging = dao.PagingView(startRow, cntPerPage);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
	
		return ootdpaging;
	}
}
