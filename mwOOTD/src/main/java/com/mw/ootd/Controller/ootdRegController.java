package com.mw.ootd.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdRegService;

@RestController
@RequestMapping("/reg")
public class ootdRegController {

	@Autowired
	private ootdRegService regService;
	
	@PostMapping
	public int ootdReg(
			@ModelAttribute("regData") ootdBoard ootd,
			HttpServletRequest request,
			Model model			
			) {
		
		
		
		System.out.println(ootd);
		// 성공은0 만약에 사진이없다면 1, 글 내용이 없다면 2를 반환하고 알려줄 것.	
		return 0;
				//regService.ootdWrite(ootd, request);
	}
	
	

}
