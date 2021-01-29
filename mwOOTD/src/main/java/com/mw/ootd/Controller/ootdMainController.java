package com.mw.ootd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.Service.ootdListService;

@RestController
@RequestMapping("/list")
public class ootdMainController {
	
	@Autowired
	ootdListService listService;

	
	
	@GetMapping
	public List<ootdBoard> oodtMain() {
		
		ootdBoard ootd = new ootdBoard();
		
		
		return listService.getootdList();	
	}

}
