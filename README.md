
# MAYWEATHER
![55](https://user-images.githubusercontent.com/71997946/109094404-3e8ca280-775d-11eb-8b00-06a02562accc.PNG)

---------------------
##### 실시간 날씨와 지역을 기반으로 한 사용자 간 코디 공유 & 커뮤니티 서비스의 OOTD 게시판 페이지
+ 담당자 : 진효선
+ 페이지 테스트 링크 : http://ec2-13-125-232-157.ap-northeast-2.compute.amazonaws.com:8080/ootd/

----------------------

### 1. 기술/구조

+ 웹 표준
  + HTML 5
  + CSS3
  + JavaScript
  + JQuery
+ TOMCAT
+ DBMS - MySQL
+ 사용 언어 및 프레임워크
  + Spring FrameWork
  + Java
  + Python
  + jsp, EL
+ API
  + KAKAO VISION API : 상품 이미지 인식 후 좌표값 검출
  + NAVER SHOPPING SEARCH API : 사용자가 입력한 정보를 토대로 쇼핑검색 후 정보제공
+ open source
  + Cropper.js : https://github.com/Druid-of-Luhn/cropper.js/blob/master/cropper.js
+ AWS 배포
  + EC2
  + RDS

----------------

### 2. 겪었던 어려움

+ 크롭된 이미지의 저장 여부와 재사용 방법
  + 제품 이미지를 크롭해서 보여줘야하는데 그때마다 제품 이미지를 따로 저장해야 하는가에 대해서 고민했음.

    좌표값만 데이터베이스에 저장하여 재 크롭해서 보여주는 방식으로 처리함
    
  + 크롭에 사용되는 오픈소스에서 요구하는 파일의 형태가 정해져있어서 재사용시 변경해주어야 했음.
   
    저장된 이미지 URL을 다시 blob 형태로 변환하여 사용하는 것으로 해결.

+ API 예제가 파이썬 뿐이라 자바스크립트에 적용하기 어려웠던 점
    

-------------------

### 3. 주요 구현 내용 및 화면구성

![KakaoTalk_20210225_115208815](https://user-images.githubusercontent.com/71997946/109095928-f91da480-775f-11eb-99b9-bf38f87a856f.png)
![KakaoTalk_20210225_114930081](https://user-images.githubusercontent.com/71997946/109095738-a9d77400-775f-11eb-94b7-0aa302ef1c62.png)
![KakaoTalk_20210225_114936523](https://user-images.githubusercontent.com/71997946/109095767-b5c33600-775f-11eb-890a-02976542f5b0.png)
![KakaoTalk_20210225_114944588](https://user-images.githubusercontent.com/71997946/109095775-b78cf980-775f-11eb-91b7-4065be887d67.png)
![KakaoTalk_20210225_114951461](https://user-images.githubusercontent.com/71997946/109095778-b8be2680-775f-11eb-997c-100bb4c6e356.png)

----------------

