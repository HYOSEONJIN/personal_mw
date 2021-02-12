package com.mw.ootd.Domain;

import lombok.Data;

@Data
public class ootdlike {

	public int getLikeChk() {
		return likeChk;
	}
	public void setLikeChk(int likeChk) {
		this.likeChk = likeChk;
	}
	public int getLikeAmount() {
		return likeAmount;
	}
	public void setLikeAmount(int likeAmount) {
		this.likeAmount = likeAmount;
	}
	public int getLikeOnOff() {
		return likeOnOff;
	}
	public void setLikeOnOff(int likeOnOff) {
		this.likeOnOff = likeOnOff;
	}
	int likeChk;
	int likeAmount;
	int likeOnOff;

}
