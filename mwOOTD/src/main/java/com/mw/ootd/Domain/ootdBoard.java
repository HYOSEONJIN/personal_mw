package com.mw.ootd.Domain;

import lombok.Data;

@Data
public class ootdBoard {

	int ootd_idx;
	int mem_idx;
	String ootd_nic;
	String ootd_loc;
	String ootd_weather;
	String ootd_photo;
	String ootd_thumnail;
	String ootd_text;
	int ootd_likecnt;
	int ootd_bookcnt;
	int ootd_cmtcnt;
	int ootd_viewcnt;
	String ootd_ip;
	
}
