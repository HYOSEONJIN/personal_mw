package com.mw.ootd.Service;

import java.io.File;
import java.io.IOException;

import javax.imageio.IIOException;
import javax.servlet.http.HttpServletRequest;

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
   
   public int ootdWrite(ootdBoard ootd, HttpServletRequest request) {
      int result = 0;
      // 성공은1 만약에 사진이없다면 0, 글 내용이 없다면 2를 반환하고 알려줄 것.	
      

      if(ootd.getOotdtext().trim().isEmpty()) {
         result = 2;
         return result;
      }
      
      
      
      File newFile = null;;
      String ootdphotoname = null;
      
      
      
      // 사진이 정상적인 파일인지 확인하기
      if(ootd.getOotdphoto() != null & !ootd.getOotdphoto().isEmpty()) {
         
         String uploadPath = "/fileupload/ootdimage";
         String saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
         //새로운 파일이름 만들어주기
         ootdphotoname = ootd.getOotdnic() + System.currentTimeMillis();
         newFile = new File(saveDirPath, ootdphotoname);
         
         
         
      } else {
         //정상적인 사진이 없을 경우
         result = 0;
         return result;
         
      }
      
   
      // 파일저장하기
      try {
         ootd.getOotdphoto().transferTo(newFile);
      } catch (IllegalStateException e) {
         e.printStackTrace();
      } catch (IOException e) {
         e.printStackTrace();
      }
      
      // 파일 이름 저장하기
      if(ootdphotoname != null) {
         ootd.setOotdphotoname(ootdphotoname);
      }
      
      // 데이터베이스에 저장하기
      
      try {
      dao=template.getMapper(ootdInterfaceDao.class);
      result= dao.ootdDocInsert(ootd);
      System.out.println(dao.ootdDocInsert(ootd));
      } catch(Exception e) {
         e.printStackTrace();
         if(newFile!=null && newFile.exists()) {
            newFile.delete();
         }
      }
      
      
      
      
      
      
      return result;
      
   }

}