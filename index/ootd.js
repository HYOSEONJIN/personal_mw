window.onload = function () {

    hashtagList();
    hashFalse();

    var file1


};



var hashtagName = ''; // 해시태그 div 생성해주는 for문에 사용
var hashCheck = []; // hash태그 체크 여부 저장해주는 배열
//var hashJSON = ''; // hash태그를 JSON형식의 String으로 저장
var hashAmount = 0; // 해시태그 갯수 체크

var ajax_last_num = 0;
var pageNum = 1;
var filebase64 = ''; // file의 사진값 저장할 base64
var image1 = '';
var apiNum = 0;
//var image1base64 = '';

var x = 131;
var y = 131;
var w = 176;
var h = 328;
// Auto-resize the cropped image

var dimensions = {
    width: 128,
    height: 128
};

//이미지의 상품 좌표 검출
var xyarr = [];
//입력받은 상품 정보
var apiProductInput = [];

// 메인 출력
function ootdMain() {

    var content = document.querySelector('.content');
    content.innerHTML = '';
    pageNum = 1;
    //hashJSON = '';
    pageView(pageNum);
    addregButton();



    /*이미지를 베이스 64로 바꾸고 저장하지 않아도 썸네일로 보여줌*/

    var ootdphoto = document.getElementById('ootdphoto')
    var preview = document.querySelector('#preview')

    /* FileReader 객체 생성 */
    var reader = new FileReader();

    /* reader 시작시 함수 구현 */
    reader.onload = (function () {

        image1 = document.createElement('img');
        var vm = this;

        return function (e) {
            /* base64 인코딩 된 스트링 데이터 */
            // image1base64 = e.target.result
            vm.image1.src = e.target.result
            //console.log(vm);
            //console.log(image1base64);
            //alert('돌아가고있음')
            $('.img-upload-label').css({

                "background-image": "url(" + e.target.result + ")"

            })
            kakaoCall();
        }
    })()

    ootdphoto.addEventListener('change', function (e) {
        var get_file = e.target.files;

        if (get_file) {
            reader.readAsDataURL(get_file[0]);
        }



        // $('.img-upload-label').style.backgroundImage= 'url('+image1+')'

        //preview.appendChild(image1);
    })

    /*이미지를 베이스 64로 바꾸고 저장하지 않아도 썸네일로 보여줌 여기까지*/


}

/*글쓰기*/
function addregButton() {


    var regModalHtml = '';
    regModalHtml += '<button type="button" class="test" onclick="pageView(pageNum)">ㅇㅇ</button>'


    regModalHtml += '<button type="button" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello"/>';
    regModalHtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    regModalHtml += '<div class="modal-dialog" role="document"><div class="modal-content">'
    regModalHtml += '<div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5>';
    regModalHtml += '<div class="modal-body"><form><div class="form-group">'
    regModalHtml += '<label for="recipient-name" class="col-form-label">TODAY OOTD</label><br>'


    regModalHtml += ' <table class="ootdregTable"><td width="100px">';
    /* regModalHtml += '<form id="photoform" method="POST" enctype="multipart/form-data">'*/
    regModalHtml += '<div class="ootdfilebox"><label class="img-upload-label"><input type="file" class="ootdphoto img-upload" accept="image/jpeg,image/png,image/gif" id="ootdphoto" name="ootdphoto"></label></div></td>' /*</form>*/
    regModalHtml += '</div><td><div class="form-group">'
    regModalHtml += '<input type="text" id="ootdtext" name="ootdtext" required> </div></td></table></form>'

    regModalHtml += '<div class="kakaoAPI"></div>'



    regModalHtml += '<div class="form-group"><div class="ootd_hs">';

    // 해시태그 리스트 불러오기
    regModalHtml += hashtagName;

    ///////가짜로넣어주는값 나중에 지우고 ootdMain()안에 넣어서 넘겨줘야함///////
    regModalHtml += '<input type="hidden" id="memidx" value="1"><input type="hidden" id="ootdnic" value="메이웨더TEST">';
    console.log('ootdMain()안에 임시값있음 추후 삭제해야함')
    /////////////////////////////////



    regModalHtml += '</div></div></form></div><div class="modal-footer">';
    regModalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="dataReset()">닫기</button>'
    regModalHtml += '<button type="button" class="btn btn-primary" id="close_modal" onclick="reg(); this.onclick=null;">등록</button>'
    regModalHtml += '</div></div></div></div></div></div>';
    regModalHtml += '<canvas class="js-editorcanvas" style="display: none"></canvas>';
    regModalHtml += '<canvas class="js-previewcanvas" style="display: none"></canvas>';


    $(".content").append(regModalHtml);

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





// kakao API 상품검출 좌표값 얻기
function kakaoCall() {
    apiNum = 0;

    var content = document.querySelector('.kakaoAPI');
    content.innerHTML = '';


    var beforeKey = "KakaoAK ";
    var key = "0e5bc43cde12fc5035c512eca57aa8be";
    var apiUri = "https://dapi.kakao.com/v2/vision/product/detect"

    var photoFile = $('#ootdphoto');
    file1 = photoFile[0].files[0];

    //console.log("file",file1);
    var fd = new FormData();
    fd.append("attribute", "1");
    fd.append("image", file1);


    $.ajax({
        type: "POST",
        beforeSend: function (request) {

            request.setRequestHeader("Authorization", (beforeKey + key));


        },
        url: apiUri,
        data: fd,
        contentType: false,
        processData: false,
        timeout: 1e4,
        enctype: 'multipart/form-data',
        success: function (apidata) {
            console.log('카카오메세지', apidata);
            var data = apidata.result.objects;
            var dataheight = apidata.result.height;
            var datawidth = apidata.result.width;



            for (i = 0; i < 4; i++) {

                /*    if (!data[i].includes(score)) {
                    return fasle;
                }
*/

                if (data[i].score > 0.95) {

                    // 이미지가 줄어드는 비율처리해줄 변수
                    var per = 1;

                    // 이미지의 높이가 600보다 크면 600으로 줄어들기 때문에 처리해준다.
                    if (dataheight > 600) {
                        per = 600 / dataheight
                        datawidth = datawidth * per
                        dataheight = 600;
                    }

                    var tableNum = i;

                    console.log(data[i])
                    var w1 = Math.floor(datawidth * (data[i].x2 - data[i].x1));
                    var w2 = Math.floor(dataheight * (data[i].y2 - data[i].y1));
                    var xy = 0
                    if (w1 > w2) {
                        xy = w1
                    } else {
                        xy = w2
                    }

                    /*/이미지지점/*/
                    h = Math.floor(data[i].y1 * dataheight) // 위쪽에서얼마나떨어지는지 px
                    w = Math.floor(data[i].x1 * datawidth) // 왼쪽에서얼마나떨어지는지 px


                    /*크기*/
                    x = xy; // 정방형으로 맞춰주기 위해 그냥 똑같이했다.
                    y = xy;
                    console.log('크기', x, y, '시작점', w, h);
                    xyarr.push([x, y, w, h]);
                    console.log(xyarr);

                    function exceptionHandler(message) {
                        alert('에러메세지', message);
                    }


                    try {
                        // alert('try1');
                        var www = document.querySelector('.ootdphoto');
                        console.log(www);
                        var uploader = new Uploader({
                            input: document.querySelector('.ootdphoto'),
                            types: ['gif', 'jpg', 'jpeg', 'png']

                        });
                        // alert('try2');
                        var editor = new Cropper({
                            size: dimensions,
                            canvas: document.querySelector('.js-editorcanvas'),
                            preview: document.querySelector('.js-previewcanvas')
                        });

                        // Make sure both were initialised correctly
                        if (uploader && editor) {
                            //alert('try3');
                            // Start the uploader, which will launch the editor
                            uploader.listen(editor.setImageSource.bind(editor), (error) => {
                                throw error;
                            });
                        }

                    } catch (error) {
                        console.log("에러", error);
                        exceptionHandler(error.message);
                    }

                } else {
                    console.log('일치가 구린 데이터밖에 없음~')
                }

            }

        },
        error: function (e) {
            console.log(formData);
            console.log("KAKAO API AJAX 에러발생 : ", e);
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

        if (file1.type == 'image/jpeg' || (file1.type == 'image/png') || file1.type == "undefined") {


            // hashtagJSON();

            var text = $('#ootdtext').val();
            console.log(text);

            var formData = new FormData();
            formData.append('ootdtext', $('#ootdtext').val());
            formData.append("ootdphoto", file1);
            formData.append('ootdhashtag', hashCheck.toString());
            formData.append('xyarr', xyarr.toString());
            for (i = 0; i < apiNum; i++) {
                // 값에 ,이 들어가있으면 생략해줘야함 (처리) var result = test.replace( /가/gi, '나');
                var result = $('.apitable' + i).val().replace(/,/gi, '');
                console.log('변경결과', result);
                apiProductInput.push(result);

            }

            console.log(apiProductInput);
            formData.append('apiproductinfo', apiProductInput);

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
                            //hashJSON = '';

                            //console.log(hashJSON);
                            dataReset();
                            alert("사진은 필수항목입니다");
                        } else if (data == 2) {
                            hashJSON = '';
                            //console.log(hashJSON);
                            dataReset();
                            alert('내용을 입력하세요');
                        } else {
                            hashJSON = '';
                            //console.log(hashJSON);
                            dataReset();
                            alert("알수없는 에러가 발생했습니다. 다시시도해주세요");

                        }

                    }
                }

            })

        } else {
            // hashJSON = '';
            //console.log(hashJSON);
            dataReset();
            alert('JPG 또는 PNG 형식의 파일만 첨부해주세요 ');
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
        hashAmount = hashAmount - 1;

    } else {
        // 선택함
        if (hashAmount < 3) {
            $('#ootd_hashtag' + idx).removeClass('ootd_hashtag_false');
            $('#ootd_hashtag' + idx).addClass('ootd_hasktag_true');
            hashCheck[idx] = $('#ootd_hashtag' + idx).text();
            console.log(hashCheck[idx]);
            hashAmount++;
        } else {
            alert('해시태그는 3개까지만 가능합니다')
        }

    }

}

// 모달창 끌때 데이터 리셋 해주는 기능들어있는 함수
function dataReset() {

    var content = document.querySelector('.kakaoAPI');
    content.innerHTML = '';

    hashAmount = 0;
    hashCheck.length = 0;
    xyarr.length = 0;
    apiProductInput.length = 0;
    $('#ootdtext').val(null);
    $('#ootdphoto').val(null);
    $('.ootd_hashtag').removeClass('ootd_hasktag_true');
    $('.ootd_hashtag').addClass('ootd_hashtag_false');
    //hashJSON = '';
    hashFalse();
    $('.img-upload-label').css({

        "background-image": "url(http://localhost:8080/ootd/image/icon/fileuploadbutton.png)"

    })
}

// hash태그를 JSON형식의 String으로 만들어기
/*function hashtagJSON() {

    hashJSON = '';
    hashJSON += '{'

    for (i = 1; i < 9; i++) {
        hashJSON += '"hashtag":';
        hashJSON += '"' + hashCheck[i] + '"' + ',';
    }

    hashJSON += '"hashtag": "' + hashCheck[9] + '"';
    hashJSON += '}';

    console.log(hashJSON);


}*/


// 리스트 출력 함수
function pageView(idx) {

    $(".bottomArea").remove();
    console.log('들어온페이지번호', idx)
    $.ajax({
        url: 'http://localhost:8080/ootd/list/paging',
        type: 'get',
        data: {
            pageNum: idx
        },
        success: function (data) {
            console.log(data);

            var listhtml = '<form><div class="ootdlistarea"><div class="ootdlistline">';


            for (i = 0; i < data.length; i++) {
                /*나중에멤버 현재 로그인된 idx받아줘야함, 현재 헤더안에 있는 값으로 하고 있음*/
                listhtml += '<div onclick="viewPost(' + data[i].ootdidx + ',' + $('#memidxsession').val() + '); this.onclick=null;">';
                listhtml += '<table class="ootdposttable">';
                listhtml += '<tr><td><img src="https://media.allure.com/photos/58657e62327f28075707a5ca/1:1/w_354%2Cc_limit/slack-imgs.com.jpeg" class="postthumnail"></td></tr>';
                listhtml += '<tr><td><a1 class="ootdwriter">' + data[i].ootdnic + '</a1></td></tr>';
                listhtml += '<tr><td><a1 class="ootdlocation">' + data[i].ootdloc + '</a1></td></tr>';
                listhtml += '<tr><td><a1 class="ootdlistlike">♥ ' + data[i].ootdlikecnt + '</a1></td></tr></table></div>';


            }

            listhtml += '</div></div></form>';

            listhtml += '<div class="bottomArea"><img src="/ootd/image/background.PNG" width="90"></div>';

            $(".content").append(listhtml);
            pageNum++;
            console.log('삭제할 값 있음 function pageView');

        },
        error: function (e) {
            console.log('페이징 ajax 에러', e)
        }

    });



}

/*게시물 출력*/
function viewPost(data, idx) {


    var likeheart = '';

    $.ajax({
        url: 'http://localhost:8080/ootd/like/chk',
        type: 'get',
        data: {
            ootdidx: data,
            memidx: idx
        },
        success: function (result) {


            if (result == 1) {
                likeheart = '<img src="image/icon/heart.png" width="20" onclick="ootdlike(0,' + data + ',' + idx + '); this.onclick=null;">';
            } else {
                likeheart = '<img src="image/icon/emptyheart.png" width="20" onclick="ootdlike(1,' + data + ',' + idx + '); this.onclick=null;">';
            }

            console.log('하트여부', likeheart);

        },
        error: function (e) {
            console.log('좋아요 정보 ajax 에러', e)
        }
    });




    var postviewhtml = '';

    $(".bottomArea").remove();
    $.ajax({
        url: 'http://localhost:8080/ootd/postview',
        type: 'get',
        data: {
            ootdidx: data
        },
        success: function (data) {
            console.log(data);
            console.log(data[0]);

            var rs = data[0];

            postviewhtml += '<div class="ootddrop" id="ootddrop" name="ootddrop">';
            postviewhtml += '<div class="ootddropcontent">수정</div>';
            postviewhtml += '<div class="ootddropcontent" onclick="ootdPostDelete(' + rs.ootdidx + ')">삭제</div></div>';

            postviewhtml += '<div class="postviewarea" id="postviewarea" name="postviewarea">';
            postviewhtml += '<table class="ootdpostviewtable"  width="100%">';
            postviewhtml += '<tr><td class="ootdposttable_side"> </td>';
            postviewhtml += ' <td colspan="2"><img src="image/icon/location.png" width="10">&nbsp&nbsp';
            postviewhtml += rs.ootdloc
            postviewhtml += '</td><td></td><td></td><td colspan="2" class="ootdbmk">';
            postviewhtml += '<img src="image/icon/usefulbutton.png" onclick="itemClick(event);" ></td>';
            postviewhtml += '</tr><tr><td colspan="7">';
            postviewhtml += '<img class="ootdpostphoto" src="http://localhost:8080/ootd/fileupload/ootdimage/';
            postviewhtml += rs.ootdphotoname
            postviewhtml += '" width="100%"></td></tr><tr class="ootdpostviewlinethree"><td></td><td colspan="2"><pv1>';
            postviewhtml += rs.ootdnic
            postviewhtml += '</pv1></td><td colspan="2"><pv2>';
            postviewhtml += rs.ootdlikecnt
            postviewhtml += '명이 좋아합니다&nbsp&nbsp</pv2></td><td><div class="likediv">';


            postviewhtml += likeheart;

            postviewhtml += '</div></td><td></td></tr><tr><td class="ootdposthashtag" colspan="7">';


            var strArray = rs.ootdhashtag.split(',');
            console.log(strArray);

            var hash = '';

            for (i = 0; i < 10; i++) {
                if (strArray[i] != 'false') {
                    hash += '#' + strArray[i] + ' '
                }
            }
            postviewhtml += hash


            postviewhtml += '</td><tr><td></td>';
            postviewhtml += '<td><img src="image/icon/closet.png" width="80"></td>';
            postviewhtml += '<td><img src="image/icon/closet.png" width="80"></td>';
            postviewhtml += '<td><img src="image/icon/closet.png" width="80"></td>';
            postviewhtml += '<td><img src="image/icon/closet.png" width="80"></td>';
            postviewhtml += '<td></td><td class="ootdposttable_side"></td></tr>';
            postviewhtml += '<tr class="ootdpostviewtext"><td></td><td class="needborder" colspan="5"><pv3>';
            postviewhtml += rs.ootdtext
            postviewhtml += '</pv3></td><td ></td></tr><tr><td></td><td class="ootdcommenttd" colspan="4"><img src="image/icon/comment.png" width="20">&nbsp&nbsp';
            postviewhtml += rs.ootdcmtcnt
            postviewhtml += '</td><td></td><td></td></tr></table>';
            postviewhtml += '<div class="bottomArea"><img src="/ootd/image/background.PNG" width="90"></div>';


            var content = document.querySelector('.content');
            content.innerHTML = postviewhtml;


        }
    });



}


/*수정 삭제 창 팝업*/
function itemClick(event) {
    var ootddrop = document.getElementById('ootddrop');


    x = event.pageX;
    y = event.pageY;

    if (ootddrop.style.display == 'block') {
        ootddrop.style.display = 'none';
    } else {
        ootddrop.style.display = 'block';
        ootddrop.style.left = (x - 54) + "px";
        ootddrop.style.top = y + "px";
    }
}

/*게시글 삭제*/
function ootdPostDelete(idx) {

    if (confirm('정말로 삭제하시겠습니까?')) {

        $.ajax({
            url: 'http://localhost:8080/ootd/postview',
            type: 'get',
            data: {
                ootdidx: idx
            },
            success: function (data) {


            }

        });
    }
}


function ootdlike(chk, ootdidx, memidx) {

    $.ajax({
        url: 'http://localhost:8080/ootd/like/onoff',
        type: 'get',
        data: {
            chk: chk,
            ootdidx : ootdidx,
            memidx : memidx

        },
        success: function (result) {


        },
        error: function (e) {
            console.log('좋아요 더하기 빼기 ajax 에러', e)
        }
    });



}
