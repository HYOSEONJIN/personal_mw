package com.mw.ootd.Service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.imgscalr.Scalr;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdRegService {
	// 글등록과 관련된 기능이 모여있는 서비스

	private ootdInterfaceDao dao;

	@Autowired
	private SqlSessionTemplate template;
	
	

	File newFile = null;
	String ootdphotoname = null;
	String saveDirPath = null;
	
	

	public int ootdWrite(ootdBoard ootd, HttpServletRequest request) throws Exception {
		int result = 5;
		// 성공은1 만약에 사진이없다면 0, 글 내용이 없다면 2를 반환하고 알려줄 것.

		if (ootd.getOotdtext().trim().isEmpty()) {
			result = 2;
			return result;
		}

		// 사진이 정상적인 파일인지 확인하기
		if (ootd.getOotdphoto() != null && !ootd.getOotdphoto().isEmpty()) {

			String uploadPath = "/fileupload/ootdimage";
			saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
			// 새로운 파일이름 만들어주기
			ootdphotoname = String.valueOf(System.nanoTime());
			newFile = new File(saveDirPath, ootdphotoname);

		} else {
			// 정상적인 사진이 없을 경우
			result = 0;
			return result;

		}

		// 파일저장하기 > s3 변경
		try {
			ootd.getOotdphoto().transferTo(newFile);

		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// 파일 이름 저장하기
		if (ootdphotoname != null) {
			ootd.setOotdphotoname(ootdphotoname);
		}

		// 썸네일 만들기
		makeThumbnail(saveDirPath, ootdphotoname, "png");

		// 데이터베이스에 저장하기
		try {
			dao = template.getMapper(ootdInterfaceDao.class);
			result = dao.ootdDocInsert(ootd);
			// 글번호값 리턴
			// int ootdidx = dao.ootdidxReturn(ootdphotoname);
			// System.out.println(ootdidx);
			// ootdidx에 맞는 좋아요 칼럼 생성
			// dao.makeLikeCol(ootdidx);

		} catch (Exception e) {
			e.printStackTrace();
			if (newFile != null && newFile.exists()) {
				newFile.delete();
			}
		}

		return result;

	}

	private void makeThumbnail(String filePath, String fileName, String fileExt) throws Exception {
		// 저장된 원본파일로부터 BufferedImage 객체를 생성합니다.
		BufferedImage srcImg = ImageIO.read(newFile);
		// 썸네일의 너비와 높이 입니다.
		int dw = 250, dh = 250;
		// 원본 이미지의 너비와 높이 입니다.
		int ow = srcImg.getWidth();
		int oh = srcImg.getHeight();

		// 원본 너비를 기준으로 하여 썸네일의 비율로 높이를 계산합니다.
		int nw = ow;
		int nh = (ow * dh) / dw;

		// 계산된 높이가 원본보다 높다면 crop이 안되므로
		// 원본 높이를 기준으로 썸네일의 비율로 너비를 계산합니다.
		if (nh > oh) {
			nw = (oh * dw) / dh;
			nh = oh;
		}
		// 계산된 크기로 원본이미지를 가운데에서 crop 합니다.
		BufferedImage cropImg = Scalr.crop(srcImg, (ow - nw) / 2, (oh - nh) / 2, nw, nh);

		// crop된 이미지로 썸네일을 생성합니다.
		BufferedImage destImg = Scalr.resize(cropImg, dw, dh);

		// 썸네일을 저장합니다. 이미지 이름 앞에 "THUMB_" 를 붙여 표시했습니다.
		String thumbName = filePath + "/THUMB_" + fileName;
		File thumbFile = new File(thumbName);
		//ImageIO.write(destImg, "PNG", thumbFile);
		//저장>s3
		ImageIO.write(destImg, fileExt.toUpperCase(), thumbFile);
	}
}
