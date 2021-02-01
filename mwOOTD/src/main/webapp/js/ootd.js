window.onload = function () {

    hashtagList();

};


var hashtagName = '';


// 메인 출력
function ootdMain() {

    var mainhtml = '';
    mainhtml += '<h1>리스트출력 페이지</h1>';
    mainhtml += '<button type="button" class="btn btn-primary" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello">글쓰기버튼</button>';
    mainhtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5><div class="modal-body"><form><div class="form-group"> <label for="recipient-name" class="col-form-label">TODAY OOTD</label><form id="photoform" method="POST" enctype="multipart/form-data"> <input type="file" id="ootdphoto" name="ootdphoto"></form></div><div class="form-group"><input type="text" id="ootdtext" name="ootdtext"> </div><div class="form-group"><div class="ootd_hs">';

    // 해시태그 리스트 불러오기

    mainhtml += hashtagName;

    ///////가짜로넣어주는값 나중에 지우고 ootdMain()안에 넣어서 넘겨줘야함///////
    mainhtml += '<input type="hidden" id="memidx" value="1"><input type="hidden" id="ootdnic" value="메이웨더TEST">';
    console.log('ootdMain()안에 임시값있음 추후 삭제해야함')
    /////////////////////////////////



    mainhtml += '</div></div></form></div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button> <button type="button" class="btn btn-primary" id="close_modal" onclick="reg()">등록</button><button type="button" class="btn btn-primary" id="imagedetection" onclick="kakaoCall()">사진조회</button><img src="" id="imageTest" width="40"></div></div></div></div></div></div>';


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


function imageDetection() {
    //var file = document.querySelector('#ootdphoto');
    var base64First = 'data:image/gif;base64,';

    // Check for the File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('ootdphoto').addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }


    function handleFileSelect(evt) {
        var f = evt.target.files[0]; // FileList object
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                //Converting Binary Data to base 64
                var base64String = window.btoa(binaryData);
                //showing file converted to base64
                //document.getElementById('ootdtext').value = base64String;
                console.log('베이스64', base64String);
                $('#imageTest').attr('src', (base64First + base64String));
                alert('File converted to base64 successfuly!\nCheck in Textarea');
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsBinaryString(f);
    }

}



function kakaoCall() {
    var beforeKey = "KakaoAK ";
    var key = "0e5bc43cde12fc5035c512eca57aa8be";
    var apiUri = "https://dapi.kakao.com/v2/vision/product/detect"
    //+ "?image_url=https://t1.daumcdn.net/alvolo/_vision/openapi/r2/images/06.jpg";
    /*    
    var form = $('#photoform');
    				var formData = new FormData(form[0]);
    	console.log(typeof(formData));
    	console.log(formData);*/


    /*
      var form = $('#photoform')[0];
        
        var formData = new FormData(form);

    */


    var photoFile = $('#ootdphoto');
    var file1 = photoFile[0].files[0];
    //console.log("file",file1);
    var fd = new FormData();
    fd.append("attribute","1");
    fd.append("image", file1);
    

    $.ajax({
        type: "POST",
        beforeSend: function (request) {
            
            request.setRequestHeader("Authorization", (beforeKey + key));
            //request.setRequestHeader("Content-Type", "multipart/form-data");

        },
        url: apiUri,
        data: fd,
        contentType: false,
        processData: false,
        timeout: 1e4,
        enctype: 'multipart/form-data',
        success: function (msg) {
            console.log('카카오메세지', msg);
        },
        error: function (e) {
            console.log(formData);
            console.log("에러발생 : ", e);
        }


    });
}



// 모달창 닫는버튼 (데이터 전송)
function reg() {
    //모달창끄기
    $(".modal-footer").on('click', '#close_modal', function () {


        var photoFile = $('#ootdphoto');
        var file1 = photoFile[0].files[0];
        console.log(file1);
        console.log(file1.type);
        console.log(typeof (file1.type));

        if (file1.type == 'image/jpeg' || (file1.type == 'image/png')) {



            var text = $('#ootdtext').val();
            console.log(text);

            var formData = new FormData();
            formData.append('ootdtext', $('#ootdtext').val());
            formData.append("ootdphoto", file1);



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
                        $('#ootdtext').val('');
                        $('#ootdphoto').val('');
                        /////////// 원래 저장값 날려주는 처리 할 부분/////////////////
                        $("#ootdRegModal").modal("hide");
                    } else if (data == 1) {
                        alert("사진은 필수항목입니다");
                    } else if (data == 2) {
                        alert("내용을 입력해주세요");
                    } else {
                        alert("알수없는 에러가 발생했습니다. 다시시도해주세요");

                    }


                }

            })

        }

    });
}
