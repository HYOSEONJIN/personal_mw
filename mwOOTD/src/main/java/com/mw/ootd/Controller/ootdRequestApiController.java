package com.mw.ootd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdRequestApiService;

@RestController
@RequestMapping("/req")
public class ootdRequestApiController {
	// 다른 조원들이 필요한 API
	
	@Autowired
	private ootdRequestApiService reqService;
	

	//가장 좋아요 많은글 3개
	@CrossOrigin
	@GetMapping("/liketopthree")
	public List<ootdBoard> LiktTopThree(){		
		
		return reqService.LikeTopThree();		
	}
	
	// 특정 IDX가 쓴 글
//	@CrossOrigin
//	@GetMapping("/listbyidx")
//	
}
