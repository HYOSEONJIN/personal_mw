package com.mw.ootd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdlike;
import com.mw.ootd.Service.ootdLikeService;

@RestController
@RequestMapping("/like")
public class ootdLikeController {
	
	@Autowired
	private ootdLikeService likeService;
	
	
	// 좋아요 여부 체크
	@GetMapping("/chk")
	public ootdlike likechk(
			@RequestParam("ootdidx") int ootdidx,
			@RequestParam("memidx") int memidx) {

		
		return likeService.likeChk(ootdidx, memidx);
	}
	
	// 좋아요 on/off
	@GetMapping("/onoff")
	public ootdlike likeOnOff(
			@RequestParam("chk") int chk,
			@RequestParam("ootdidx") int ootdidx,
			@RequestParam("memidx") int memidx) {
			
			
		return likeService.likeOnOff(chk, ootdidx, memidx);
	}

}
