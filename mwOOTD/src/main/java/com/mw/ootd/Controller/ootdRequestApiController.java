package com.mw.ootd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	// idx가 좋아요 한 글 리스트
	@CrossOrigin
	@GetMapping("/likeListbyIdx")
	public List<ootdBoard> likeListbyIdx(
			@RequestParam("memidx") int memidx){		
		
		return reqService.likeListbyIdx(memidx);		
	}
	
//	
}
