window.onload = function () {


};

function ootdMain() {

    var mainhtml = '';
    mainhtml += '<h1>리스트출력 페이지</h1>'
    mainhtml += '<a href="">글쓰기</a>'

    var content = document.querySelector('.content');
    content.innerHTML = mainhtml;

}
// 모달 팝업 띄울 시 발생하는 이벤트 (이벤트명 : show.bs.modal)
