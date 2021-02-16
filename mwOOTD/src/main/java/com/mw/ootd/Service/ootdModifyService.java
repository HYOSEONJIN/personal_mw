package com.mw.ootd.Service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.imgscalr.Scalr;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdModifyService {
	// 글 수정과 관련된 서비스

	private ootdInterfaceDao dao;

	@Autowired
	private SqlSessionTemplate template;

	File newFile = null;
	String ootdphotoname = null;
	String saveDirPath = null;

	public int ootdModify(ootdBoard ootd, HttpServletRequest request) throws Exception {

		// 글내용, 해시태그, 사진이 수정 가능하다.
		// 글내용은 기본 입력 사항이 있어서 무조건 받아줘야함

		dao = template.getMapper(ootdInterfaceDao.class);
		// 삭제하기전 파일명 받아오기
		String delFilename = dao.deleteFileName(ootd.getOotdidx());

		int result = 5;
		boolean chk = false;

		// 내용없으면 2 반환
		if (ootd.getOotdtext().trim().isEmpty()) {
			result = 2;
			return result;
		}

		// 사진이 정상적인 파일인지 확인한다 [1. 사진있을 경우 저장방식 ]
		if (ootd.getOotdphoto() != null & !ootd.getOotdphoto().isEmpty()) {

			String uploadPath = "/fileupload/ootdimage";
			saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
			// 새로운 파일이름 만들어주기
			ootdphotoname = ootd.getOotdnic() + System.currentTimeMillis();
			newFile = new File(saveDirPath, ootdphotoname);

			// 파일저장하기
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

			// 데이터베이스에 수정하기
			try {
				// 사진이름, 사진좌표값들, 사진정보들, 내용, 해시태그 새로저장
				result = dao.updatePhoto(ootd);
				chk =true;

			} catch (Exception e) {
				e.printStackTrace();
				if (newFile != null && newFile.exists()) {
					newFile.delete();
				}
			}
		} else {
			// 사진이 없다면 해시태그 정보와 내용만 저장해준다
			
			result = dao.updateNoPhoto(ootd);			
			

		}
		
		
		
		

		// 입력이 제대로 되고나면 원래 있던 사진을 삭제해준다!
		if (chk) {
			// 사진삭제
			String uploadPath = "/fileupload/ootdimage";
			String DirPath = request.getSession().getServletContext().getRealPath(uploadPath);

			// 기본 사진 삭제
			File file = new File(DirPath, delFilename);
			if (file.exists()) {
				if (file.delete()) {
					System.out.println("파일삭제 성공");
				} else {
					System.out.println("파일삭제 실패");
				}
			} else {
				System.out.println("파일이 존재하지 않습니다.");
			}

			// 썸네일사진 삭제
			String thumnail = "THUMB_" + delFilename;
			File thumFile = new File(DirPath, thumnail);
			if (thumFile.exists()) {
				if (thumFile.delete()) {
					System.out.println("파일삭제 성공");
				} else {
					System.out.println("파일삭제 실패");
				}
			} else {
				System.out.println("파일이 존재하지 않습니다.");
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
		// ImageIO.write(destImg, "PNG", thumbFile);
		ImageIO.write(destImg, fileExt.toUpperCase(), thumbFile);
	}
}
