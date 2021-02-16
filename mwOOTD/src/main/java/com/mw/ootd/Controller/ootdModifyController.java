package com.mw.ootd.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;

@RestController
@RequestMapping("/modify")
public class ootdModifyController {
	
	
	@PostMapping
	public int ootdModify(
			@ModelAttribute("regData") ootdBoard ootd,
			HttpServletRequest request		
			) throws Exception {
		
		
		
		System.out.println(ootd);

		return 0;
	}
	

}
