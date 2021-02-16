package com.mw.ootd.Service;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.ootd.Domain.ootdBoard;
import com.mw.ootd.dao.ootdInterfaceDao;

@Service
public class ootdPostService {
	// 포스트1개 보여주는 페이지 관련 서비스 (글1개의 상세정보/코멘트 불러오기 좋아요 등등)

	private ootdInterfaceDao dao;

	@Autowired
	private SqlSessionTemplate template;

	// idx값에 따른 게시물 1개의 정보
	public List<ootdBoard> getPostView(int ootdidx) {

		List<ootdBoard> ootdlist = null;
		dao = template.getMapper(ootdInterfaceDao.class);
		ootdlist = dao.postByIdx(ootdidx);

		return ootdlist;
	}

	// idx값에 따른 게시글 삭제
	public int deletPost(int ootdidx, HttpServletRequest request) {
		// 0 실패 1 성공

		dao = template.getMapper(ootdInterfaceDao.class);
		// 삭제하기전 파일명 받아오기
		String delFilename = dao.deleteFileName(ootdidx);
		
		// 삭제
		int result = dao.deletPost(ootdidx);

		if (result == 1) {

			// 코멘트 정보와 좋아요 정보 삭제
			dao.deleteCommentData(ootdidx);
			dao.deleteLikeData(ootdidx);

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
}
