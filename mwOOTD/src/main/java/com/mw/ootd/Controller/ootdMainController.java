package com.mw.ootd.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.listPaging;
import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdListService;

@RestController
@RequestMapping("/list")
public class ootdMainController {
	
	@Autowired
	ootdListService listService;

	
	
	/* 전체 게시글 리스트 형식으로 보내주기 */
	@GetMapping
	public List<ootdBoard> oodtMain()  {
		return listService.getootdList();	
	}

	@GetMapping("/paging")
	public List<ootdBoard> ootdPageList(
			@RequestParam(value = "p", defaultValue = "1") int pageNum){
		
		System.out.println(pageNum);
	
		
		return listService.Listpage(pageNum);
		
	}
}
