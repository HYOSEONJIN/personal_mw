package com.mw.ootd.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdListService;

@RestController
@RequestMapping("/list")
public class ootdListController {
	
	@Autowired
	private ootdListService listService;

	
	
	/* 전체 게시글 리스트 형식으로 보내주기 */
	@CrossOrigin
	@GetMapping
	public List<ootdBoard> oodtMain()  {
		return listService.getootdList();	
	}

	/* 페이징 */
	@CrossOrigin
	@GetMapping("/paging")
	public List<ootdBoard> ootdPageList(
			@RequestParam("pageNum") int pageNum){
		
		System.out.println(pageNum);
	
		
		return listService.Listpage(pageNum);
		
	}
	
	/* 삭제 */	
	@CrossOrigin
	@GetMapping("/delete")
	public List<ootdBoard> ootdPostDel(
			@RequestParam("pageNum") int pageNum){
		
		System.out.println(pageNum);
	
		
		return listService.Listpage(pageNum);
		
	}
}
