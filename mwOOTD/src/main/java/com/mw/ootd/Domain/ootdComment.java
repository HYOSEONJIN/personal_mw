package com.mw.ootd.Domain;

public class ootdComment {

	int ootdcmtidx;
	int ootdidx;
	int memidx;
	String ootdcmtnic;
	String ootdcmttext;
	
	
	public int getOotdcmtidx() {
		return ootdcmtidx;
	}
	public void setOotdcmtidx(int ootdcmtidx) {
		this.ootdcmtidx = ootdcmtidx;
	}
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

	public String getOotdcmtnic() {
		return ootdcmtnic;
	}
	public void setOotdcmtnic(String ootdcmtnic) {
		this.ootdcmtnic = ootdcmtnic;
	}
	public String getOotdcmttext() {
		return ootdcmttext;
	}
	public void setOotdcmttext(String ootdcmttext) {
		this.ootdcmttext = ootdcmttext;
	}
	@Override
	public String toString() {
		return "ootdComment [ootdidx=" + ootdidx + ", memidx=" + memidx + ", ootdcmtnic=" + ootdcmtnic
				+ ", ootdcmttext=" + ootdcmttext + "]";
	}
	
	
}
