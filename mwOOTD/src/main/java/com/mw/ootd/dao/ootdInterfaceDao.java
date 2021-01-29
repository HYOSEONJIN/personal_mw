package com.mw.ootd.dao;

import java.util.List;

import com.mw.ootd.Domain.ootdBoard;

public interface ootdInterfaceDao {

	
	// 전체 리스트 가져오기
	List<ootdBoard> selectAllootdList();
}
