package com.mw.ootd.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;

@RestController
@RequestMapping("/reg")
public class ootdRegController {

	
	@PostMapping
	public int ootdReg(
			@ModelAttribute("regData") ootdBoard ootd,
			HttpServletRequest request,
			Model model			
			) {
		int result = 1;
		
		System.out.println(ootd);
		
		
		
		return result;
	}

}
