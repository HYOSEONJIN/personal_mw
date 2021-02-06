package com.mw.ootd.Domain;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ootdBoard {

   int ootdidx;
   int memidx;
   String ootdnic;
   String ootdloc;
   String ootdweather;
   MultipartFile ootdphoto;
   String ootdphotoname;
   String ootdthumnail;
   String ootdtext;
   int ootdlikecnt;
   int ootdbookcnt;
   int ootdcmtcnt;
   int ootdviewcnt;
   String ootdip;
   String ootdhashtag;
   String xyarr;
   String apiproductinfo;
   

   
   
}