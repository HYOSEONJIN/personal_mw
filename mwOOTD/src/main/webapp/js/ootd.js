window.onload = function () {

    hashtagList();
    hashFalse();


};



var hashtagName = ''; // 해시태그 div 생성해주는 for문에 사용
var hashCheck = []; // hash태그 체크 여부 저장해주는 배열
var hashJSON = ''; // hash태그를 JSON형식의 String으로 저장
var ajax_last_num = 0;




// 메인 출력
function ootdMain() {

    hashJSON = '';



    var regModalHtml = '';
    regModalHtml += '<h1>리스트출력 페이지</h1>';


    regModalHtml += '<button type="button" class="btn btn-primary" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello">글쓰기버튼</button>';
    regModalHtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    regModalHtml += '<div class="modal-dialog" role="document"><div class="modal-content">'
    regModalHtml += '<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5>';
    regModalHtml += '<div class="modal-body"><form><div class="form-group">'
    regModalHtml += '<label for="recipient-name" class="col-form-label">TODAY OOTD</label>'
    regModalHtml += '<form id="photoform" method="POST" enctype="multipart/form-data">'
    regModalHtml += '<input type="file" id="ootdphoto" name="ootdphoto"></form></div><div class="form-group">'
    regModalHtml += '<input type="text" id="ootdtext" name="ootdtext" required> </div><div class="form-group">'
    regModalHtml += '<div class="ootd_hs">';

    // 해시태그 리스트 불러오기
    regModalHtml += hashtagName;

    ///////가짜로넣어주는값 나중에 지우고 ootdMain()안에 넣어서 넘겨줘야함///////
    regModalHtml += '<input type="hidden" id="memidx" value="1"><input type="hidden" id="ootdnic" value="메이웨더TEST">';
    console.log('ootdMain()안에 임시값있음 추후 삭제해야함')
    /////////////////////////////////



    regModalHtml += '</div></div></form></div><div class="modal-footer">';
    regModalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>'
    regModalHtml += '<button type="button" class="btn btn-primary" id="close_modal" onclick="reg();  this.onclick=null";>등록</button>'
    regModalHtml += '<button type="button" class="btn btn-primary" id="imagedetection" onclick="kakaoCall()">사진조회</button><img src="" id="imageTest" width="40"></div></div></div></div></div></div>';


    var content = document.querySelector('.content');
    content.innerHTML = regModalHtml;

}

// 해시태그 리스트 불러오기
function hashtagList() {

    $.ajax({
        url: 'http://localhost:8080/ootd/hashlist',
        type: 'GET',
        success: function (data) {
            for (var i = 1; i < 10; i++) {
                var tag = data[i - 1];
                hashtagName += '<div class="ootd_hashtag" onclick="hashtag(' + i + ')" id="ootd_hashtag' + i + '">' + tag.hash + '</div>';

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

// kakao API 상품검출 좌표값 얻기
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
    fd.append("attribute", "1");
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



        var current_ajax_num = ajax_last_num;

        var photoFile = $('#ootdphoto');
        var file1 = photoFile[0].files[0];

        if (file1.type == 'image/jpeg' || (file1.type == 'image/png') || file1.type == "") {


            hashtagJSON();

            var text = $('#ootdtext').val();
            console.log(text);

            var formData = new FormData();
            formData.append('ootdtext', $('#ootdtext').val());
            formData.append("ootdphoto", file1);
            formData.append('ootdhashtag', hashJSON);

            //임시값
            formData.append('ootdnic', $('#ootdnic').val());
            formData.append('memidx', $('#memidx').val());



            $.ajax({

                url: 'http://localhost:8080/ootd/reg',
                type: 'POST',
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: function (request) {
                    ajax_last_num = ajax_last_num + 1;
                },
                success: function (data) {
                    if (current_ajax_num == ajax_last_num - 1) {



                        if (data == 1) {
                            dataReset();
                            alert("등록완료");
                            ootdMain();

                            /////////// 원래 저장값 날려주는 처리 할 부분/////////////////
                            $("#ootdRegModal").modal("hide");
                        } else if (data == 0) {
                            hashJSON = '';

                            console.log(hashJSON);
                            dataReset();
                            alert("사진은 필수항목입니다");
                        } else if (data == 2) {
                            hashJSON = '';
                            console.log(hashJSON);
                            dataReset();
                            alert('내용을 입력하세요');
                        } else {
                            hashJSON = '';
                            console.log(hashJSON);
                            dataReset();
                            alert("알수없는 에러가 발생했습니다. 다시시도해주세요");

                        }

                    }
                }

            })

        }

    });
}


// 해시태그 배열 안에 false값 넣어주기
function hashFalse() {

    for (i = 0; i < 10; i++) {
        hashCheck[i] = false;

    }
    console.log(hashCheck);

}

// 해시태그 값 체크하기
function hashtag(idx) {
    // true=선택 , false=선택안함

    if (hashCheck[idx]) {
        // 선택되어있을 때 다시 눌러서 선택을 해제함
        $('#ootd_hashtag' + idx).removeClass('ootd_hasktag_true');
        $('#ootd_hashtag' + idx).addClass('ootd_hashtag_false');
        hashCheck[idx] = false;

    } else {
        // 선택함
        $('#ootd_hashtag' + idx).removeClass('ootd_hashtag_false');
        $('#ootd_hashtag' + idx).addClass('ootd_hasktag_true');
        hashCheck[idx] = true;


    }

}

// 모달창 끌때 데이터 리셋 해주는 기능들어있는 함수
function dataReset() {
    hashCheck.length = 0;
    $('#ootdtext').val(null);
    $('#ootdphoto').val(null);
    $('.ootd_hashtag').removeClass('ootd_hasktag_true');
    $('.ootd_hashtag').addClass('ootd_hashtag_false');
    hashJSON = '';
    hashFalse();
}

// hash태그를 JSON형식의 String으로 만들어기
function hashtagJSON() {

    hashJSON += '[{'

    for (i = 1; i < 9; i++) {
        hashJSON += '"hashtag' + i + '":';
        hashJSON += hashCheck[i] + ',';
    }

    hashJSON += '"hashtag9":' + hashCheck[9];
    hashJSON += '}]';

    console.log(hashJSON);


}

// 리스트 출력 함수
