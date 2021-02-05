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
	
	@RequestMapping("/istrue")
	@GetMapping
	public int likechk(
			@RequestParam("memidx") int memidx) {
			
		System.out.println(likeService.likeChk(memidx));	
		return likeService.likeChk(memidx);
	}

}
