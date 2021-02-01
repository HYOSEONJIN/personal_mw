window.onload = function () {
    hashtagList();

};


var hashtagName = '';


// 메인 출력
function ootdMain() {

    var mainhtml = '';
    mainhtml += '<h1>리스트출력 페이지</h1>';
    mainhtml += '<button type="button" class="btn btn-primary" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello">글쓰기버튼</button>';
    mainhtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5><div class="modal-body"><form><div class="form-group"> <label for="recipient-name" class="col-form-label">TODAY OOTD</label> <input type="file" id="ootdphoto" name="ootdphoto"></div><div class="form-group"><input type="text" id="ootdtext" name="ootdtext"> </div><div class="form-group"><div class="ootd_hs">';

    // 해시태그 리스트 불러오기

    mainhtml += hashtagName;
	
    ///////가짜로넣어주는값 나중에 지우고 ootdMain()안에 넣어서 넘겨줘야함///////
    mainhtml += '<input type="hidden" id="memidx" value="1"><input type="hidden" id="ootdnic" value="메이웨더TEST">';
    console.log('ootdMain()안에 임시값있음 추후 삭제해야함');
    /////////////////////////////////
    


    mainhtml += '</div></div></form></div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button> <button type="button" class="btn btn-primary" id="close_modal" onclick="reg()">등록</button> </div></div></div></div></div></div>';


    var content = document.querySelector('.content');
    content.innerHTML = mainhtml;

}

// 해시태그 리스트 불러오기
function hashtagList() {

    $.ajax({
        url: 'http://localhost:8080/ootd/hashlist',
        type: 'GET',
        success: function (data) {
            for (var i = 1; i < 10; i++) {
                var tag = data[i - 1];
                hashtagName += '<div class="ootd_hashtag" id="ootd_hashtag' + i + '">' + tag.hash + '</div>';

            }

        },
        error: function (e) {
            console.log("해시태그 불러오기 에러발생: ", e);
        }
    })

}

// 모달창 닫는버튼 (데이터 전송)
function reg() {
    //모달창끄기
    $(".modal-footer").on('click', '#close_modal', function () {
        

        var photoFile = $('#ootdphoto');
        var file1 = photoFile[0].files[0];
        console.log(file1);
        console.log(file1.type);
        console.log(typeof(file1.type));
        
        if(file1.type=='image/jpeg' || (file1.type=='image/png')){
       


        var text = $('#ootdtext').val();
        console.log(text);

        var formData = new FormData();
        formData.append('ootdtext', $('#ootdtext').val());
        formData.append("ootdphoto", file1);
        formData.append("memidx", $('#memidx').val());
        formData.append("ootdnic", $('#ootdnic').val());
        
      

        $.ajax({

            url: 'http://localhost:8080/ootd/reg',
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                
                if (data == 0) {
                    alert("등록완료");
                    $("#ootdRegModal").modal("hide");
                    /////////// 원래 저장값 날려주는 처리 할 부분/////////////////
                } else if (data == 1) {
                    alert("사진은 필수항목입니다. 정상적인 업로드를 부탁드립니다.");
                } else if (data == 2) {
                    alert("내용을 입력해주세요");
                } else {
                    alert("알수없는 에러가 발생했습니다. 다시시도해주세요");
                    
                }


            }

        })

	} else {
		alert('JPG와 PNG파일만 첨부가능합니다');
	}

    });
}
