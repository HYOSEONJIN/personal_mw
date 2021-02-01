window.onload = function () {


};


var hashtagName = '';


// 메인 출력
function ootdMain() {

    var mainhtml = '';
    mainhtml += '<h1>리스트출력 페이지</h1>';
    mainhtml += '<button type="button" class="btn btn-primary" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello">글쓰기버튼</button>';
    mainhtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5><div class="modal-body"><form><div class="form-group"> <label for="recipient-name" class="col-form-label">TODAY OOTD</label> <input type="file" id="ootdphoto" name="ootdphoto"></div><div class="form-group"><input type="text" id="ootdtext" name="ootdtext"> </div><div class="form-group"><div class="ootd_hs">';

    // 해시태그 리스트 불러오기
    hashtagList();
    mainhtml += hastagName;


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
            console.log(data);

            for (var i = 1; i < 10; i++) {
                hashtagName += '<div class="ootd_hashtag" id="ootd_hashtag' + i + '">' + data.hashtag + i + '</div>';

            }
            console.log(hashtagName)

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
        $("#ootdRegModal").modal("hide");

        var photoFile = $('#ootdphoto');
        var file1 = photoFile[0].files[0];
        console.log(file1);

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
                console.log(data);
            }

        })



    });
}
