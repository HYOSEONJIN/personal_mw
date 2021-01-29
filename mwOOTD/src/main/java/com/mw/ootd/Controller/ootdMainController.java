package com.mw.ootd.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ootdMainController {
	

	@RequestMapping("/Main")
	public String oodtMain() {
		
		
		return "ootd/main";		
	}

}
