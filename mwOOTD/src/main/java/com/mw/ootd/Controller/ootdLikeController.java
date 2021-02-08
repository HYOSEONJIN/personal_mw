package com.mw.ootd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Service.ootdLikeService;

@RestController
@RequestMapping("/like")
public class ootdLikeController {
	
	@Autowired
	private ootdLikeService likeService;
	
	
	@GetMapping("/chk")
	public int likechk(
			@RequestParam("ootdidx") int ootdidx,
			@RequestParam("memidx") int memidx) {
			
			System.out.println("좋아요" + ootdidx + "ㅇㅇ" +memidx);
		return likeService.likeChk(ootdidx, memidx);
	}

}
