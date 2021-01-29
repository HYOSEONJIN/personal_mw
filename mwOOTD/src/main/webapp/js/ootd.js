window.onload = function () {
  

};

function ootdMain(){
    
    var mainhtml = '';
    mainhtml += '<h1>리스트출력 페이지</h1>';
    mainhtml += '<button type="button" class="btn btn-primary" class="regFormButton" data-toggle="modal" data-target="#ootdRegModal" data-what="hello">글쓰기버튼</button>';
    mainhtml += '<div class="modal fade" id="ootdRegModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">WEATHER WEAR - OOTD</h5><div class="modal-body"><form><div class="form-group"> <label for="recipient-name" class="col-form-label">TODAY OOTD</label> <input type="file" id="ootd=photo"></div><div class="form-group"><input type="text" id="ootd_text" name="ootd_text"> </div><div class="form-group"><div class="ootd_hs"><div class="ootd_hashtag" id="ootd_hashtag1">여성스러운</div><div class="ootd_hashtag" id="ootd_hashtag2">귀여운</div><div class="ootd_hashtag" id="ootd_hashtag3">보이쉬한</div><div class="ootd_hashtag" id="ootd_hashtag4">걸크러쉬</div><div class="ootd_hashtag" id="ootd_hashtag5">캐주얼</div><div class="ootd_hashtag" id="ootd_hashtag6">격식있는</div><div class="ootd_hashtag" id="ootd_hashtag7">스트릿</div><div class="ootd_hashtag" id="ootd_hashtag8">섹시한</div><div class="ootd_hashtag" id="ootd_hashtag9">베이직한</div></div></div></form></div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button> <button type="button" class="btn btn-primary" id="close_modal">등록</button> </div></div></div></div></div></div>';
    mainhtml += '<script>$(document).ready(function () {    $("#close_modal").click(function () {        $("#ootdRegModal").modal("hide");    });});    </script>';

    
    var content = document.querySelector('.content');
    content.innerHTML = mainhtml;
    
}