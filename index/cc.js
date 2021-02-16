function ootdmodify() {
    //모달창끄기
    //$(".modal-footer").on('click', '#close_modal', function () {



    var current_ajax_num = ajax_last_num;

    var photoFile = $('#ootdphoto');
    var file1 = photoFile[0].files[0];

    console.log(photoFile[0].files.length == 0);



    if (file1.type == 'image/jpeg' || (file1.type == 'image/png') || file1.type == "undefined") {


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
