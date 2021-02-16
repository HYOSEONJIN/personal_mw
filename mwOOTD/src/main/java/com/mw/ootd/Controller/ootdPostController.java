package com.mw.ootd.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdPostService;

@RestController
@RequestMapping("postview")
public class ootdPostController {

	
	@Autowired
	private ootdPostService postService;
	
	//포스팅 idx에 맞는 게시물의 정보 한개 보내주기
	@GetMapping
	public List<ootdBoard> Postview(
			@RequestParam("ootdidx") int ootdidx){
		
		
		return postService.getPostView(ootdidx);
	}
	
	/* 삭제 */	
	@GetMapping("/delete")
	public int ootdPostDel(
			@RequestParam("ootdidx") int ootdidx,
			HttpServletRequest request	
			){
		
		System.out.println("삭제"+ ootdidx);		
		return postService.deletPost(ootdidx, request);
		
	}
}
