package com.mw.ootd.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdModifyService;

@RestController
@RequestMapping("/modify")
public class ootdModifyController {
	
	@Autowired
	private ootdModifyService modifySerivce;
	
	@PostMapping
	public int ootdModify(
			@ModelAttribute("regData") ootdBoard ootd,
			HttpServletRequest request		
			) throws Exception {
		
		
		
		return modifySerivce.ootdModify(ootd, request);
	}
	

}
