package com.mw.ootd.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.hashtag;
import com.mw.ootd.Service.ootdHashService;

@RestController
@RequestMapping("/hashlist")
public class ootdHashListController {
	
	
	@Autowired
	private ootdHashService hashService;
	
	@CrossOrigin
	@GetMapping
	public List<hashtag> hashtagname(){
		
		return hashService.getHashName();
	}
	

}
