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

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var what = button.data('what');
   
    // 모달 팝업에 데이터 집어넣기 

    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + what) modal.find('.modal-body input').val(what)
})
