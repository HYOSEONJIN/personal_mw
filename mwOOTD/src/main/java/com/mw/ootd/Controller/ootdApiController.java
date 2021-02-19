package com.mw.ootd.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reg")
public class ootdApiController {

	private final Logger logger = LoggerFactory.getLogger(ootdApiController.class);
	
	@CrossOrigin
	@GetMapping("/kkoApiTest")
	public String kakaoImageApi() {
		String json = "";
		try {
			URL url =  new URL("https://dapi.kakao.com/v2/vision/product/detect"
					+ "?image_url=https://t1.daumcdn.net/alvolo/_vision/openapi/r2/images/06.jpg");
			
			HttpURLConnection  conn = (HttpURLConnection)url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Authorization","KakaoAK 0e5bc43cde12fc5035c512eca57aa8be");//api key
			conn.setDoOutput(true);
			
			OutputStream out = conn.getOutputStream();
			
			out.write("".getBytes("utf-8"));
			out.close();
			
			int code = conn.getResponseCode();
			logger.info("msg"+code);
			
			//BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"utf-8"));
			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
			json = br.readLine();
			
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	
}
