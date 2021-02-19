package com.mw.ootd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Service.ootdNaverApiService;

@RestController
@RequestMapping("/naverapi")
public class ootdNaverApiController {
	
	@Autowired
	private ootdNaverApiService naverService;
	
	@GetMapping(produces="text/plain;charset=UTF-8")
	@CrossOrigin
	public String naverShopSearch(
			@RequestParam("word") String word) {
			
		System.out.println(word);
		
		
		return naverService.shoppingSearch(word);
	}
	

}
