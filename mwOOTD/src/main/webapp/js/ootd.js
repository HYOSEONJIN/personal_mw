window.onload = function () {

    hashtagList();
    hashFalse();

    // ootdList에서만 무한 스크롤이 작동하도록 만드는 변수
    var ootdlistScroll = false;





};

$(document).ready(function () {

    // 무한스크롤
    $(document).scroll(function () {
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        console.log(ootdlistScroll)
        if (maxHeight <= currentScroll && ootdlistScroll) {

            //if (scrollchk) {
            setTimeout(function () {
                // $(".bottomArea").remove();
                pageView(pageNum);
            }, 200)
            // }
        }

    })
})




// 무한스크롤 변수
//var scrollchk = true;
var scrollchk2 = true;
var contentTemp = '';

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

//이미지의 상품 좌표 검출 & 상품 정보
var xyarr = [];
var productData;

//입력받은 상품 정보
var apiProductInput = [];
var fileData = '';
var fileArr = [];

//게시글정보
var rs


var count = $('#rank-list li').length;
var height = $('#rank-list li').height();


// 메인 출력
function ootdMain() {






    var content = document.querySelector('.content');
    content.innerHTML = '';
    pageNum = 1;
    //scrollchk = true;
    scrollchk2 = true;
    ootdlistScroll = true;
    //hashJSON = '';
    pageView(pageNum);
    addregButton();



    if ($('#memidxsession').val() == "") {
        $('.regFormButton').css({

            "display": "none"

        })
    }



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

function step(index) {
    count = $('#rank-list li').length;
    height = $('#rank-list li').height();

    $('#rank-list ol').delay(1000).animate({
        top: -height * index,
    }, 500, function () {
        step((index + 1) % count);
    });
}

/*글쓰기*/
function addregButton() {


    var regModalHtml = '';

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
    regModalHtml += '<textarea id="ootdtext" name="ootdtext" required></textarea></div></td></table></form>'

    regModalHtml += '<div class="kakaoAPI"></div>'



    regModalHtml += '<div class="form-group"><div class="ootd_hs">';

    // 해시태그 리스트 불러오기
    regModalHtml += hashtagName;


    regModalHtml += '</div></div></form></div><div class="modal-footer">';
    regModalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="dataReset()">닫기</button>'
    regModalHtml += '<button type="button" class="btn btn-primary" data-dismiss="modal"  id="close_modal" onclick="reg(); this.onclick=null;">등록</button>'
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
    var file1 = photoFile[0].files[0];

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
                        console.log('첨부파일은 ', www);
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
    //$(".modal-footer").on('click', '#close_modal', function () {



    var current_ajax_num = ajax_last_num;

    var photoFile = $('#ootdphoto');
    var file1 = photoFile[0].files[0];

    console.log(photoFile[0].files.length == 0);

    if (photoFile[0].files.length == 0) {
        alert('파일을 첨부해주세요')
        return false;
    }

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
        formData.append('ootdnic', $('#memnicsession').val());
        formData.append('memidx', $('#memidxsession').val());



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


                    } else if (data == 0) {


                        dataReset();
                        alert("사진은 필수항목입니다");
                    } else if (data == 2) {
                        hashJSON = '';

                        dataReset();
                        alert('내용을 입력하세요');
                    } else {
                        hashJSON = '';

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

    //});
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


    console.log('들어온페이지번호', idx)


    $.ajax({
        url: 'http://localhost:8080/ootd/list/paging',
        type: 'get',
        data: {
            pageNum: idx
        },
        success: function (data) {
            console.log(data);

            if (data.length != 0) {

                var listhtml = '<div class="ootdlistarea">';

                listhtml += '<table><tr><td>무신사 브랜드 랭킹</td><td><dl id="rank-list"><dt>무신사 브랜드 랭킹 순위 1-10</dt><dd><ol></ol></dd></dl></td></tr></table>';

                for (i = 0; i < data.length; i++) {
                    /*나중에멤버 현재 로그인된 idx받아줘야함, 현재 헤더안에 있는 값으로 하고 있음*/
                    listhtml += '<div onclick="viewPost(' + data[i].ootdidx + '); this.onclick=null;">';
                    listhtml += '<table class="ootdposttable">';
                    listhtml += '<tr><td><img src="http://localhost:8080/ootd/fileupload/ootdimage/THUMB_';
                    listhtml += data[i].ootdphotoname;
                    listhtml += '" class="postthumnail"></td></tr>';
                    listhtml += '<tr><td><a1 class="ootdwriter">' + data[i].ootdnic + '</a1></td></tr>';
                    listhtml += '<tr><td><a1 class="ootdlocation">' + data[i].ootdloc + '</a1></td></tr>';
                    listhtml += '<tr><td><a1 class="ootdlistlike">♥ ' + data[i].ootdlikecnt + '</a1></td></tr></table></div>';


                }
                $(".bottomArea").remove();
                listhtml += '<div class="bottomArea"><img src="/ootd/image/background.PNG" width="90"></div></div>';

                $(".content").append(listhtml);
                pageNum++;
                console.log('삭제할 값 있음 function pageView', pageNum);
                
                callBrandRank();
                step(1);
                

                // 무한스크롤 : 세로길이가 길 경우 처리
                if ($(".body").height() < $(window).height() && scrollchk2) {

                    scrollchk2 = false;
                    pageView(pageNum);

                }


            }

            var content = document.querySelector('.content');
            contentTemp = content.innerHTML;



        },
        error: function (e) {
            console.log('페이징 ajax 에러', e)
        }

    });



}


/*게시물 출력*/
function viewPost(data) {

    ootdlistScroll = false;

    var likeCnt
    var likeheart = '';
    var idx = 0;
    var useful = '';


    if ($('#memidxsession').val() == "") {
        idx = 0;
    } else {
        idx = $('#memidxsession').val();
    }

    console.log(idx)

    $.ajax({
        url: 'http://localhost:8080/ootd/like/chk',
        type: 'get',
        data: {
            ootdidx: data,
            memidx: idx
        },
        success: function (result) {
            // 로그인 했다면
            if ($('#memidxsession').val() != "") {


                if (result.likeChk > 0) {
                    likeheart = '<img src="image/icon/heart.png" width="20" onclick="ootdlike(0,' + data + ',' + idx + '); this.onclick=null;">';
                } else {
                    likeheart = '<img src="image/icon/emptyheart.png" width="20" onclick="ootdlike(1,' + data + ',' + idx + '); this.onclick=null;">';
                }

                // useful = '<img src="image/icon/usefulbutton.png" onclick="itemClick(event);" ></td>';


            }

            likeCnt = result.likeAmount


        },
        error: function (e) {
            console.log('좋아요 정보 ajax 에러', e)
        }
    });



    setTimeout(function () {

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

                rs = data[0];

                //게시물 주인에게만 보이는 수정/삭제 아이콘 :
                if ($('#memidxsession').val() == rs.memidx) {
                    useful = '<img src="image/icon/usefulbutton.png" onclick="itemClick(event);" ></td>';

                }


                postviewhtml += '<div class="ootddrop" id="ootddrop" name="ootddrop">';
                postviewhtml += '<div class="ootddropcontent" data-toggle="modal" data-target="#ootdModifyModal" data-what="hello" onclick="ootdPostModify()">수정</div>';
                postviewhtml += '<div class="ootddropcontent" onclick="ootdPostDelete(' + rs.ootdidx + ',' + rs.memidx + ')">삭제</div></div>';




                postviewhtml += '<div class="modal fade" id="ootdModifyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                postviewhtml += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD 수정하기</h5><div class="modal-body"><div class="ootdmodifybody">'



                postviewhtml += '</div>'; /*modifybody*/
                postviewhtml += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="dataReset()">닫기</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="close_modal" onclick="ootdmodify(' + rs.ootdidx + '); this.onclick=null;">수정</button></div>'
                postviewhtml += '</div></div></div></div>';
                postviewhtml += '</div>';
                postviewhtml += '<canvas class="js-editorcanvas" style="display: none"></canvas>';
                postviewhtml += '<canvas class="js-previewcanvas" style="display: none"></canvas>';




                postviewhtml += '<div class="postviewarea" id="postviewarea" name="postviewarea">';
                postviewhtml += '<table class="ootdpostviewtable"  width="100%">';
                postviewhtml += '<tr><td class="ootdposttable_side">&nbsp<img onclick="ootdPageBack()" src="image/icon/back.png" width="10px"></td>';
                postviewhtml += '<td colspan="2">&nbsp&nbsp<img src="image/icon/location.png" width="10">&nbsp&nbsp';
                postviewhtml += rs.ootdloc
                postviewhtml += '</td><td></td><td></td><td colspan="2" class="ootdbmk">';
                postviewhtml += useful
                //postviewhtml += '<img src="image/icon/usefulbutton.png" onclick="itemClick(event);" ></td>';
                postviewhtml += '</tr><tr><td colspan="7">';
                postviewhtml += '<img class="ootdpostphoto" src="http://localhost:8080/ootd/fileupload/ootdimage/';
                postviewhtml += rs.ootdphotoname
                postviewhtml += '" width="100%"></td></tr><tr class="ootdpostviewlinethree"><td></td><td colspan="2"><pv1>';
                postviewhtml += rs.ootdnic
                postviewhtml += '</pv1></td><td colspan="2"><pv2>';
                postviewhtml += likeCnt
                postviewhtml += '명이 좋아합니다&nbsp&nbsp</pv2></td><td><div class="ootdlikediv">';


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
                postviewhtml += '</td></tr></table>';

                postviewhtml += '<div class="ootdproductdiv"></div>'

                postviewhtml += '<table class="ootdpostviewtable"  width="100%">';
                postviewhtml += '<tr class="ootdpostviewtext"><td class="ootdposttable_side"></td><td class="needborder" colspan="5"><pv3>';
                postviewhtml += rs.ootdtext
                postviewhtml += '</pv3></td><td ></td></tr><tr><td></td><td class="ootdcommenttd" colspan="4">';
                postviewhtml += '<img class="cmticon" src="image/icon/comment.png" data-toggle="modal" data-target="#ootdcmtmodal" data-what="hello" width="20">&nbsp&nbsp';
                postviewhtml += rs.ootdcmtcnt
                postviewhtml += '</td><td></td><td class="ootdposttable_side"></td></tr></table>';
                postviewhtml += '<canvas class="js-editorcanvas" style="display: none"></canvas>';
                postviewhtml += '<canvas class="js-previewcanvas" style="display: none"></canvas>';
                postviewhtml += '<div class="bottomArea"><img src="/ootd/image/background.PNG" width="90"></div>';

                postviewhtml += ' <div class="modal fade" id="ootdcmtmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';


                postviewhtml += '<table width="100%"><tr><td> <h5 class="modal-title" id="exampleModalLabel">';
                postviewhtml += '<a class="cmtalign1" onclick="viewCommentList(' + rs.ootdidx + ',1)">시간순</a> <a class="cmtalign2" onclick=" viewCommentList(' + rs.ootdidx + ',2)">최신순</a></h5>';
                postviewhtml += '</td><td> <h5 class="ootdclose" data-dismiss="modal" aria-label="Close"><span onclick="cmtClose();" aria-hidden="true" class="ootdclosespan">X</span></h5></td></tr></table>';

                postviewhtml += '<div class="modal-body"><div class="ootdcmtbody"></div></div><div class="modal-footer"><textarea rows="10" cols="5" class="ootdcmtinput" id="ootdcmtinput" required></textarea>';
                postviewhtml += '<button class="ootdcmntsubmit" onclick="ootdCmtReg(' + rs.ootdidx + ')">등록</button></div></div></div></div>';

                var content = document.querySelector('.content');
                content.innerHTML = postviewhtml;


                callProduct(rs.ootdphotoname, rs.xyarr, rs.apiproductinfo);
                viewCommentList(rs.ootdidx, 1);


            }
        });
    }, 100)





}


// 코멘트 닫을 때 적어논 댓글 초기화
function cmtClose() {
    $('#ootdcmtinput').val(null);
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
function ootdPostDelete(ootdidx, memidx) {
    // 글번호, 글쓴이 idx

    if ($('#memidxsession').val() != "") {

        if (rs.memidx == $('#memidxsession').val()) {

            if (confirm('정말로 삭제하시겠습니까?')) {
                $.ajax({
                    url: 'http://localhost:8080/ootd/postview/delete',
                    type: 'get',
                    data: {
                        ootdidx: ootdidx
                    },
                    success: function (data) {
                        if (data = 1) {
                            alert('삭제완료')
                            ootdMain();
                        }

                    }

                });
            } else {
                alert('글 작성자만 가능합니다.')
            }
        } else {
            alert('로그인 후에 가능합니다.')
        }

    }
}

/*게시글수정창띄움*/
function ootdPostModify(ind) {
    // 글번호, 글쓴이 idx


    console.log(rs)

    var modifyhtml = '<label for="recipient-name" class="col-form-label">TODAY OOTD</label><br>';


    modifyhtml += '<table class="ootdregTable"><tbody><tr><td width="100px">';
    modifyhtml += '<div class="ootdfilebox"><label class="img-upload-label"><input type="file" class="ootdphoto img-upload" accept="image/jpeg,image/png,image/gif" id="ootdphoto" name="ootdphoto"></label></div></td><td><div class="form-group">';

    modifyhtml += '<textarea id="ootdtext" name="ootdtext" required="">' + rs.ootdtext + '</textarea>'

    modifyhtml += '</div></td></tr></tbody></table><div class="kakaoAPI"></div><div class="form-group"><div class="ootd_hs">';
    modifyhtml += hashtagName;
    modifyhtml += '</div></div>'
    var ootdmodifybody = document.querySelector('.ootdmodifybody');
    ootdmodifybody.innerHTML = modifyhtml




    /*BASE64 미리보기*/

    var ootdphoto = document.getElementById('ootdphoto')
    var preview = document.querySelector('#preview')

    /* FileReader 객체 생성 */
    var reader = new FileReader();

    /* reader 시작시 함수 구현 */
    reader.onload = (function () {

        image1 = document.createElement('img');
        var vm = this;

        return function (e) {
            vm.image1.src = e.target.result
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
    })
    /*이미지를 베이스 64로 바꾸고 저장하지 않아도 썸네일로 보여줌 여기까지*/
}



/*좋아요 ON/OFF*/
function ootdlike(chk, ootdidx, memidx) {



    $.ajax({
        url: 'http://localhost:8080/ootd/like/onoff',
        type: 'get',
        data: {
            chk: chk,
            ootdidx: ootdidx,
            memidx: memidx

        },
        success: function (result) {

            console.log(result)
            console.log(result.likeChk)
            var pv2html = '';
            pv2html += result.likeAmount
            pv2html += '명이 좋아합니다&nbsp&nbsp';

            var pv2 = document.querySelector('pv2');
            pv2.innerHTML = pv2html



            if (result.likeOnOff == 1) {
                likeheart = '<img src="image/icon/heart.png" width="20" onclick="ootdlike(0,' + ootdidx + ',' + memidx + '); this.onclick=null;">';


            } else if (result.likeOnOff == 0) {

                likeheart = '<img src="image/icon/emptyheart.png" width="20" onclick="ootdlike(1,' + ootdidx + ',' + memidx + '); this.onclick=null;">';
            }

            var ootdlikediv = document.querySelector('.ootdlikediv');
            ootdlikediv.innerHTML = likeheart;


        },
        error: function (e) {
            console.log('좋아요 더하기 빼기 ajax 에러', e)
        }
    });



}

// 상품 정보 불러오기
function callProduct(imgname, xyarr, apiproductinfo) {


    apiNum = 0;

    /* Here is the codefor converting "image source to "Base64 ".****/
    let url = 'http://localhost:8080/ootd/fileupload/ootdimage/'
    url += imgname;


    var xyArray = xyarr.split(',');
    console.log(xyArray);

    var productInfo = apiproductinfo.split(',');
    console.log(productInfo);

    productData = productInfo;

    var base64var = 0;

    for (i = 0; i < productInfo.length; i++) {


        // 0 1 2 3 / 4 5 6 7 / 8 9 10 11 / 12 13 14 15

        /*


                    var xyvar = i * 4
                    x = xyArray[xyvar]
                    y = xyArray[xyvar + 1]
                    w = xyArray[xyvar + 2]
                    h = xyArray[xyvar + 3]
        */

        // 사용자가 입력한 상품 정보가 있을 때만 보여준다
        if (productInfo[i].length != 0) {

            // 이미지(url) BASE64>FILE로 바꿔주는 중
            const toDataURL = url => fetch(url)
                .then(response => response.blob())
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)

                    function exceptionHandler(message) {
                        alert('에러메세지', message);
                    }


                    try {


                        var xyvar = base64var * 4
                        x = xyArray[xyvar]
                        y = xyArray[xyvar + 1]
                        w = xyArray[xyvar + 2]
                        h = xyArray[xyvar + 3]


                        // alert('try1');
                        var uploader2 = new Uploader2({
                            input: blob,
                            types: ['gif', 'jpg', 'jpeg', 'png']

                        });

                        // alert('try2');
                        var editor = new Cropper({
                            size: {
                                x: x,
                                y: y
                            },
                            pos: {
                                x: w,
                                y: h
                            },
                            size: dimensions,
                            canvas: document.querySelector('.js-editorcanvas'),
                            preview: document.querySelector('.js-previewcanvas')
                        });

                        // Make sure both were initialised correctly
                        if (uploader2 && editor) {
                            //alert('try3');
                            // Start the uploader, which will launch the editor
                            uploader2.listen(editor.setImageSource2.bind(editor), (error) => {
                                throw error;
                            });

                            base64var++;
                        }

                    } catch (error) {
                        console.log("에러", error);
                        exceptionHandler(error.message);
                    }




                }))

            /***  * for converting "Base64" to javascript "File Object". ** **/
            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {
                    type: mime
                });
            }
            /**** Calling both  function *****/
            toDataURL(url)
                .then(dataUrl => {
                    //console.log('RESULT:', dataUrl)
                    fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                    // fileArr.push(fileData)
                    console.log(fileData)
                })

            console.log(x, y, w, h)

        }
    }


}


/*댓글등록*/
function ootdCmtReg(ootdidx) {
    //$('#memidxsession').val()
    console.log($('#memidxsession').val());
    if ($('#memidxsession').val() == "") {

        alert('로그인이 필요합니다')
        return false;

    }


    var formData = new FormData();
    formData.append('ootdcmttext', $('#ootdcmtinput').val());
    formData.append('memidx', $('#memidxsession').val());
    formData.append('ootdidx', ootdidx);
    console.log('memnicsession값있음 나중에 삭제')
    formData.append('ootdcmtnic', $('#memnicsession').val());

    $.ajax({
        url: 'http://localhost:8080/ootd/cmt/reg',
        type: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function (result) {

            if (result > 0) {


                var cmtcount = '<img src="image/icon/comment.png" data-toggle="modal" data-target="#ootdcmtmodal" data-what="hello" width="20" onclick="viewCommentList(' + ootdidx + ',1)">&nbsp&nbsp';
                cmtcount += result;
                var ootdcommenttd = document.querySelector('.ootdcommenttd');
                ootdcommenttd.innerHTML = cmtcount
                $('#ootdcmtinput').val(null);
                viewCommentList(ootdidx, 1);


                alert('댓글이 등록되었습니다.')

            } else {
                alert('등록실패')
            }


        },
        error: function (e) {
            console.log('댓글등록에러', e)
        }
    })



}

/*댓글 리스트 출력*/
function viewCommentList(ootdidx, num) {
    //num = 1 : 시간순 출력
    //num = 2 : 최신순 출력

    $('.cmtalign1').removeClass('ootd_cmt_align_check');
    $('.cmtalign2').removeClass('ootd_cmt_align_check');
    if (num == 1) {

        $('.cmtalign1').addClass('ootd_cmt_align_check');

    } else if (num == 2) {
        $('.cmtalign2').addClass('ootd_cmt_align_check');

    }
    console.log("댓리스트출력실행")


    $.ajax({
        url: 'http://localhost:8080/ootd/cmt/list',
        type: 'GET',
        data: {
            ootdidx: ootdidx,
            align: num
        },
        success: function (data) {

            console.log(data);
            // 0: {ootdcmtidx: 1, ootdidx: 174, memidx: 1, ootdcmtnic: "메이웨더TEST세션", ootdcmttext: "이쁘네염!"}

            var cmtlisthtml = '';

            for (i = 0; i < data.length; i++) {

                console.log("댓리스트출력실행")

                cmtlisthtml += '<div class="ootdcomment"><table class="ootdcmttable"><tr><td rowspan="2" valign="top" lass="ootdcmtimage">';
                cmtlisthtml += '<img src="https://bitterbetter.kr/web/product/big/201902/2e83f4014460bab0a9cf24404440231d.jpg"></td>'
                cmtlisthtml += '<td>' + data[i].ootdcmtnic + '</td><td></td>';
                cmtlisthtml += '<td class="cmtmodifytd"><a1 onclick="ootdModifyView(' + data[i].ootdcmtidx + ',' + data[i].memidx + ',' + data[i].ootdidx + ')">수정 </a1>'
                cmtlisthtml += '| <a1 onclick="ootdDeleteCmt(' + data[i].ootdcmtidx + ',' + data[i].memidx + ',' + data[i].ootdidx + ')">삭제</a1></td>';
                cmtlisthtml += '</tr><tr><td style="padding-left: 10px" class="ootdcmttext' + data[i].ootdcmtidx + '" colspan="3">';
                cmtlisthtml += data[i].ootdcmttext
                cmtlisthtml += '</td></tr></table></div>'
            }

            var ootdcmtmodal = document.querySelector('.ootdcmtbody');
            ootdcmtmodal.innerHTML = cmtlisthtml;



        },
        error: function (e) {
            console.log('댓글 리스트 불러오기 에러', e);
        }
    })


}

//댓글삭제
function ootdDeleteCmt(ootdcmtidx, memidx, ootdidx) {

    if (confirm('정말로 삭제하시겠습니까?')) {
        var loginmemidx = $('#memidxsession').val();

        if (memidx == loginmemidx) {

            $.ajax({
                url: 'http://localhost:8080/ootd/cmt/delete',
                type: 'GET',
                data: {
                    ootdcmtidx: ootdcmtidx,
                    ootdidx: ootdidx
                },
                success: function (data) {

                    viewCommentList(ootdidx, 1);

                    // 현재 댓글의 갯수를 반환
                    var cmtcount = '<img src="image/icon/comment.png" data-toggle="modal" data-target="#ootdcmtmodal" data-what="hello" width="20" onclick="viewCommentList(' + ootdidx + ',1)">&nbsp&nbsp';
                    cmtcount += data;

                    var ootdcommenttd = document.querySelector('.ootdcommenttd');
                    ootdcommenttd.innerHTML = cmtcount
                    $('#ootdcmtinput').val(null);


                    alert('삭제완료')

                }
            });

        } else if (memidx != loginmemidx) {
            alert('댓글의 작성자만 삭제할 수 있습니다.')
        }

    }

}



// 수정창 보여주기
function ootdModifyView(ootdcmtidx, memidx, ootdidx) {

    var loginmemidx = $('#memidxsession').val();
    if (memidx == loginmemidx) {
        var ootdcmttexthtml = '<textarea class="ootdmodifycmt"></textarea>';

        var ootdcmttext = document.querySelector('.ootdcmttext' + ootdcmtidx);
        ootdcmttext.innerHTML = ootdcmttexthtml;

        var cancel = '<a onclick="ootdModifyCmt(' + ootdcmtidx + ',' + ootdidx + ')">수정</a>';
        cancel += ' | <a onclick="viewCommentList(' + ootdidx + ',1)">취소</a>';

        var cmtmodifytd = document.querySelector('.cmtmodifytd');
        cmtmodifytd.innerHTML = cancel;
    } else if (memidx != loginmemidx) {
        alert('댓글의 작성자만 수정할 수 있습니다.')
    }


}

// 댓글 수정
function ootdModifyCmt(ootdcmtidx, ootdidx) {

    var modifycmttext = $('.ootdmodifycmt').val();
    console.log(modifycmttext)

    $.ajax({
        url: 'http://localhost:8080/ootd/cmt/modify',
        type: 'post',
        data: {
            ootdcmtidx: ootdcmtidx,
            ootdcmttext: modifycmttext
        },
        success: function (data) {
            if (data == 1) {
                viewCommentList(ootdidx, 1);
                alert('수정완료')


            } else if (data == 0) {
                alert('수정실패 다시 시도해주세요')
            }
        },
        error: function (e) {
            console.log('댓글 수정 에러', e);
        }


    });
}

// 페이지 뒤로가기
function ootdPageBack() {

    var content = document.querySelector('.content');
    content.innerHTML = contentTemp;
    ootdlistScroll = true;

}

// 상품 정보 페이지
function viewproductinfo(num) {
    var apiImage = $('.apiimage' + num).attr("src");
    var productName = productData[num];


    $.ajax({
        url: 'http://localhost:8080/ootd/naverapi',
        type: 'GET',
        data: {
            word: productName
        },
        success: function (data) {

            var productData = JSON.parse(data).items;
            console.log(productData)

            var proHtml = '';
            proHtml += '<div class="ootdproduct"><img class="ootdProductImage" src="';
            proHtml += apiImage
            proHtml += '" width="80px"><br>' + productName + '</div><hr>';

            for (i = 0; i < productData.length; i++) {

                proHtml += '<div class="ootdnaverapiimage"><img class="apiimage" src="'
                proHtml += productData[i].image
                proHtml += '"></div><div class="ootdapiproductname"><b>'
                proHtml += productData[i].mallName
                proHtml += '</b><br>';
                proHtml += productData[i].title
                proHtml += '<br>'
                proHtml += productData[i].lprice + '원<br>'
                proHtml += '<a href="'
                proHtml += productData[i].link
                proHtml += '">구매하러가기</a></div><br></div>'
            }


            var ootdproductbody = document.querySelector('.ootdproductbody');
            ootdproductbody.innerHTML = proHtml;

        },
        error: function (e) {
            console.log('네이버 API 호출 에러', e);
        }
    });


}

/*게시글 수정 전송*/
function ootdmodify(ootdidx) {
    //모달창끄기

    var current_ajax_num = ajax_last_num;

    var photoFile = $('#ootdphoto');
    var file1 = photoFile[0].files[0];

    console.log(photoFile[0].files.length == 0);




    // hashtagJSON();

    var formData = new FormData();

    //내용
    formData.append('ootdtext', $('#ootdtext').val());

    //파일이 있으때만 수정
    if (photoFile[0].files.length != 0) {
        formData.append("ootdphoto", file1);
        formData.append('xyarr', xyarr.toString());
        for (i = 0; i < apiNum; i++) {
            // 값에 ,이 들어가있으면 생략해줘야함 (처리) var result = test.replace( /가/gi, '나');
            var result = $('.apitable' + i).val().replace(/,/gi, '');
            console.log('변경결과', result);
            apiProductInput.push(result);

        }

        console.log(apiProductInput);
        formData.append('apiproductinfo', apiProductInput);
    }

    //해시태그
    formData.append('ootdhashtag', hashCheck.toString());




    //임시값
    formData.append('ootdnic', $('#memnicsession').val());
    formData.append('memidx', $('#memidxsession').val());

    //글번호
    formData.append('ootdidx', ootdidx);



    $.ajax({

        url: 'http://localhost:8080/ootd/modify',
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


                } else if (data == 2) {
                    hashJSON = '';
                    dataReset();
                    alert('내용을 입력하세요');
                } else {
                    hashJSON = '';
                    dataReset();
                    alert("알수없는 에러가 발생했습니다. 다시시도해주세요");
                    viewPost(ootdidx);

                }

            }
        }

    })


}


function callBrandRank(){
    
    $.ajax({
        url: 'http://127.0.0.1:8000/brand',
        success: function (data) {
          console.log(data)
        }
        
    });

    
}
