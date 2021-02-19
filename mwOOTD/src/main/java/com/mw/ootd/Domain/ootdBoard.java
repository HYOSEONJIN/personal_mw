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
   String ootdtext;
   int ootdlikecnt;  
   int ootdcmtcnt;
   String ootdhashtag;
   String xyarr;
   String apiproductinfo;
public int getOotdidx() {
	return ootdidx;
}
public void setOotdidx(int ootdidx) {
	this.ootdidx = ootdidx;
}
public int getMemidx() {
	return memidx;
}
public void setMemidx(int memidx) {
	this.memidx = memidx;
}
public String getOotdnic() {
	return ootdnic;
}
public void setOotdnic(String ootdnic) {
	this.ootdnic = ootdnic;
}
public String getOotdloc() {
	return ootdloc;
}
public void setOotdloc(String ootdloc) {
	this.ootdloc = ootdloc;
}
public String getOotdweather() {
	return ootdweather;
}
public void setOotdweather(String ootdweather) {
	this.ootdweather = ootdweather;
}
public MultipartFile getOotdphoto() {
	return ootdphoto;
}
public void setOotdphoto(MultipartFile ootdphoto) {
	this.ootdphoto = ootdphoto;
}
public String getOotdphotoname() {
	return ootdphotoname;
}
public void setOotdphotoname(String ootdphotoname) {
	this.ootdphotoname = ootdphotoname;
}

public String getOotdtext() {
	return ootdtext;
}
public void setOotdtext(String ootdtext) {
	this.ootdtext = ootdtext;
}
public int getOotdlikecnt() {
	return ootdlikecnt;
}
public void setOotdlikecnt(int ootdlikecnt) {
	this.ootdlikecnt = ootdlikecnt;
}
public int getOotdcmtcnt() {
	return ootdcmtcnt;
}
public void setOotdcmtcnt(int ootdcmtcnt) {
	this.ootdcmtcnt = ootdcmtcnt;
}
public String getOotdhashtag() {
	return ootdhashtag;
}
public void setOotdhashtag(String ootdhashtag) {
	this.ootdhashtag = ootdhashtag;
}
public String getXyarr() {
	return xyarr;
}
public void setXyarr(String xyarr) {
	this.xyarr = xyarr;
}
public String getApiproductinfo() {
	return apiproductinfo;
}
public void setApiproductinfo(String apiproductinfo) {
	this.apiproductinfo = apiproductinfo;
}
   

   
   
}