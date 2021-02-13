package com.mw.ootd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Domain.ootdComment;
import com.mw.ootd.Service.ootdCommentService;
import java.util.List;

@RestController
@RequestMapping("/cmt")
public class ootdCommentController {
	
	
	
	@Autowired
	private ootdCommentService cmtService;
	
	//등록
	@PostMapping("/reg")
	public int cmtReg(
			@ModelAttribute("ootdcmt") ootdComment ootdcmt) {
		
		
		System.out.println(ootdcmt);
		return cmtService.cmtReg(ootdcmt);
	}
	
	
	//코멘트 리스트 출력
	@GetMapping("/list")
	public List<ootdComment> ootdCmtList(
			@RequestParam("ootdidx") int ootdidx){
		
		return cmtService.getCmtList(ootdidx);
	}

}
