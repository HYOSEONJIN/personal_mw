package com.mw.ootd.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.commons.codec.binary.Base64;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/base64")
public class ootdBase64Controller {

	@CrossOrigin
	@GetMapping
	public String toBase64(@RequestParam("ootdphotoname") String ootdphotoname) {
		String base64 = null;

		// 절대경로
		String realPath = ootdBase64Controller.class.getResource("/").getPath().replaceAll("/WEB-INF/classes/", "/");
		// 사진파일 이름
		String filePath = realPath + "fileupload/ootdimage/" + ootdphotoname;
		File imagefile = new File(filePath);

		try {
			FileInputStream input = new FileInputStream(imagefile);
			System.out.println(input);
			// 이미지 파일을 byte[] 로 읽어온다.
			byte[] b = new byte[input.available()];
			input.read(b);

			byte[] encoded = Base64.encodeBase64(b);
			// byte[] 형태의 base64 데이터를 String으로 변환.
			base64 = new String(encoded);
			System.out.println(base64);
			

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return base64;
	}

}
