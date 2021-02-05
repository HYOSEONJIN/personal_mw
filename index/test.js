function likeChk(data) {
    $.ajax({
        url: 'http://localhost:8080/ootd/like/istrue',
        type: 'GET',
        data: {
            memidx : data
        },
        success: function (rs) {
            
            alert(rs);

        },
        error: function (e) {
            console.log("해시태그 불러오기 에러발생: ", e);
        }
    })

}
