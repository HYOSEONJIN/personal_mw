var toppingList = [];
var nowTabNum = 0; // 현재 선택된 탭번호
var nowItemNum = 0; // 현재 선택된 메뉴번호
var ChooseCnt = 0;
// 카트 정보 저장할 함수
var cartList = [];

var paySum = 0;
var takeoutox = null;


function save_cartList(img, name, price, cnt, toppings) {
    this.img = img;
    this.name = name;
    this.price = price;
    this.cnt = cnt;
    this.toppings = toppings;
}



window.onload = function () {
    // 메뉴 불러오기
    getItem();

    // 팝업창 제어 프로세스
    fnPopupProc();

    //팝업외에다른곳클릭X;
    noClick();

};


/* 메뉴 불러오기 메서드 */
function getItem() {

    for (var i = 0; i < arrTabList.length; i++) {

        var menudata = JSON.parse(itemList[i]);
        var menuHtml = "";

        for (var j = 0; j < menudata.length; j++) {
            menuHtml += '<div class="menu" onclick = "javascript:addmenuOpen(' + i + ', ' + j + ');">';
            menuHtml += '<table>';
            menuHtml += '<tr>';
            menuHtml += '<td><img src="'
            menuHtml += menudata[j].src;
            menuHtml += '" width=200px height=200px></td></tr>'
            menuHtml += '<tr><td><a1>'
            menuHtml += menudata[j].name;
            menuHtml += '</a1></td></tr>'
            menuHtml += '<tr><td><a2>'
            menuHtml += menudata[j].price;
            menuHtml += '</a2></td></tr></table></div>'

            var div_sq = document.getElementById(arrTabList[i]);
            console.log(div_sq);
            div_sq.innerHTML = menuHtml;
        };
    };

};

/* [팝업창] 사이드 메뉴 불러오기 메서드 */
function getSidemenuItem() {

    var menudata = JSON.parse(itemList[nowTabNum]);

    // 메뉴명, 이미지 넣기        
    $('#menu_name').text(menudata[nowItemNum].name);
    $("#view_img").attr("src", menudata[nowItemNum].src);
    // 음식 개수 1로 재셋팅
    $("input[name='pop_out']").val(1);

    // 토핑 데이터 가져오기(음료수 탭만 제외 )
    if (nowTabNum != 3) {
        var tabNum = 4;
        var menudata = JSON.parse(itemList[tabNum]);

        var menuHtml = '<h2>밥 추가 변경</h2>';

        for (var i = 0; i < 6; i++) {
            if (i == 3) {
                menuHtml += '<h2>토핑 추가</h2>';
            }
            menuHtml += '<div class="addmenu" id="addmenu' + i + '" onclick="javascript:fnEtcClick(' + tabNum + ', ' + i + ');"><a1>';
            menuHtml += menudata[i].name
            menuHtml += '</a1><br><a2>';
            menuHtml += menudata[i].price
            menuHtml += '</a2></div>'
        }

        var div_side = document.querySelector("#div_addmenu");
        div_side.innerHTML = menuHtml;
        $('#menuinfo').height("500px");

        // 음료수 탭인 경우     
    } else {
        var div_side = document.querySelector("#div_addmenu");
        div_side.innerHTML = '';
        $('#menuinfo').height("300px");
    }
};


// 메뉴탭 클릭시 메뉴목록 Display
function menulist(tabNum) {
    for (var i = 0; i < arrTabList.length; i++) {
        if (i == tabNum) {
            eval("document.querySelector('#" + arrTabList[i] + "').style.display = 'block';");
        } else {
            eval("document.querySelector('#" + arrTabList[i] + "').style.display = 'none';");
        }
    }
};



// [팝업창] 추가메뉴창 열기
function addmenuOpen(tabNum, itemNum) {

    // 현재 선택된 내역 저장 
    nowTabNum = tabNum;
    nowItemNum = itemNum;

    // 팝업창 셋팅
    getSidemenuItem();

    // 팝업창 노출 
    document.querySelector('#menuinfo').style.display = 'block';

    // 다른곳 클릭금지
    noClick();
}


/*매장or포장*/
function takeout(takeout) {
    takeoutox = takeout;
    console.log(takeoutox);
    document.querySelector('#takeout').style.display = 'none';

    // 다른곳 클릭금지
    okClick();
}

/*고른 음식 수량 선택*/
function fnCalCount(type, ths) {
    var $input = $(ths).parents("td").find("input[name='pop_out']");
    var tCount = Number($input.val());

    if (type == 'p') {
        $input.val(Number(tCount) + 1);

    } else {
        if (tCount > 1) $input.val(Number(tCount) - 1);
    }
}



// 토핑 클릭 
function fnEtcClick(tabNum, itemNum) {

    // 토핑인 경우 
    if (toppingList[itemNum] > 0) {
        // 이미 선택되어져 있는경우 선택 해제 
        $('#addmenu' + itemNum).css('border', '0px solid red');
        toppingList[itemNum] = 0;

    } else {
        // 선택 안되어 있는 경우 선택
        $('#addmenu' + itemNum).css('border', '3px solid red');
        toppingList[itemNum] = 1;
    }
}


// 팝업창 제어 프로세스
function fnPopupProc() {

    // 배열 초기화
    popSelect.length = 0;

    // 선택완료 버튼 클릭
    $('#addmenuSubmit').click(function () {

        //사이드 메뉴 호출
        var sidemenudata = JSON.parse(itemList[4])

        // 메인 메뉴      >>>>>>> 생성자로 저장할거라 블럭처리함
        /*        popSelect.push({
                    tabNum: nowTabNum,
                    itemNum: nowItemNum,
                    cnt: $("input[name='pop_out']").val()
                });*/

        // 음료수탭 제외 
        if (nowTabNum != 3) {

            for (var i = 0; i < 6; i++) {

                // 토핑 선택한 경우에만 데이터 저장
                if (toppingList[i] == 1) {
                    popSelect.push({
                        sidename: sidemenudata[i].name,
                        sideprice: sidemenudata[i].price
                    });
                }

            }
        }


        // 고른 도시락 종류[사각/보울..등등]에 맞는 아이템리스트 호출
        var menudata = JSON.parse(itemList[nowTabNum]);


        // 변수에 넣어줌
        var img = menudata[nowItemNum].src;
        var name = menudata[nowItemNum].name;
        var price = menudata[nowItemNum].price;
        var cnt = $("input[name='pop_out']").val();
        var toppings = popSelect;


        // 생성자에 넣어줌
        var list = new save_cartList(img, name, price, cnt, toppings);


        //확인용 콘솔출력
        console.log(img + ':' + name + ':' + price + ':' + cnt + ':' + toppings)

        // 카트리스트 배열에 넣어줌
        cartList.push(list);


        //확인용 콘솔출력
        console.log(cartList)

        // 토핑담는 용도로 전락한 popSelect는 초기화해준다.
        popSelect = [];



        $('#menuinfo').css('display', 'none');

        for (var i = 0; i < 6; i++) {
            $('#addmenu' + i).css('border', '0px solid red');
            toppingList[i] = 0;
        }

        // 장바구니 출력해주기
        show_cartList();

        //showSum();

        // 클릭되게하기
        okClick();

    });

    // 추가메뉴창 닫기
    $('#addmenuClose').click(function () {
        $('#menuinfo').css('display', 'none');

        for (var i = 0; i < 6; i++) {
            $('#addmenu' + i).css('border', '0px solid red');
            toppingList[i] = 0;
        }

        // 클릭되게하기
        okClick();

    });
}


// 팝업뜨면 바탕에 다른 메뉴 클릭 못하게하기
function noClick() {
    $('#bowl').addClass('clicknone');
    $('#square').addClass('clicknone');
    $('#side').addClass('clicknone');
    $('#beverage').addClass('clicknone');
    $('.menuselect >button').addClass('clicknone');
    $('.cart').addClass('clicknone');
}

// 팝업창 닫으면 클릭되게 하기
function okClick() {
    $('#bowl').removeClass('clicknone');
    $('#square').removeClass('clicknone');
    $('#side').removeClass('clicknone');
    $('#beverage').removeClass('clicknone');
    $('.menuselect >button').removeClass('clicknone');
    $('.cart').removeClass('clicknone');

}


// 장바구니에 리스트 출력
function show_cartList() {

    var carthtml = '';

    for (var i = 0; i < cartList.length; i++) {
        carthtml += '<table class="tg">';
        carthtml += '<form class=""><tbody id="addmenu_tbody"><tr>';
        carthtml += '<td rowspan="2"><img src="'
        carthtml += cartList[i].img;
        carthtml += '"></td><td colspan="5"><a1>';
        carthtml += cartList[i].name;
        carthtml += '</a1></td></tr>';
        carthtml += '<tr class="trline"><td><a2>'
        carthtml += cartList[i].price;
        //    carthtml += '</a2></td><td><a3>X';
        //    carthtml += cartList[i].cnt;
        carthtml += '</a3></td>';
        carthtml += '</tr>';
        carthtml += '<tr><td class="sidemenu_show" colspan="4">';
        carthtml += '<ul>'

        for (var j = 0; j < cartList[i].toppings.length; j++) {
            carthtml += '<li><a1>'
            carthtml += '└ ' + cartList[i].toppings[j].sidename;
            carthtml += '</a1><a2>'
            carthtml += cartList[i].toppings[j].sideprice;
            carthtml += '</a2></li>'


        }



        carthtml += '</ul></td></tr>'
        carthtml += '<td colspan="3" class="tdcol3">';
        carthtml += '<input type="button" id="minus" value="-" onclick="cartCount(\'m\',this,' + i + ');">';
        carthtml += '<input type="text" value="' + cartList[i].cnt + '" name="cartCnt" readonly="readonly" style="text-align:center" style="width:20px">';
        console.log(cartList[i].cnt);
        carthtml += '<input type="button" id="plus" value="+" onclick="cartCount(\'p\',this,' + i + ');">';
        carthtml += '</td>';
        carthtml += '<td><input type="button" class="btn btn-warning" id="delete" value="삭제" onclick="delete_cartmenu(' + i + '); "></td>';
        carthtml += '</tbody></form></table><hr>'

    }

    var ct = document.querySelector('.cartlist');
    ct.innerHTML = carthtml;


    showSum();
}




/*카트에 담아둔 음식 삭제*/
function removeCart() {

    removeHtml = '';
    var removecart = document.getElementById("addmenu_tbody");
    removecart.innerHTML = removeHtml;
    var removecart = document.getElementById("sum");
    removecart.innerHTML = removeHtml;

    // 카트에 저장된 데이터 모두 삭제
    cartList.splice(0, cartList.length);

    // 다시 카트 리스트 출력
    show_cartList();

    console.log(cartList);

};


/* 카트에서 원하는 메뉴 인덱스만 삭제*/
function delete_cartmenu(index) {

    cartList.splice(index, 1);

    show_cartList();

    showSum();

}

/*가격의 총합계를 구하는 메서드*/
function showSum() {

    var totalSum = Number($('input[name="sum_money"]').val());

    // 합계 초기화
    totalSum = 0;

    // 메뉴의 가격합계
    for (var i = 0; i < cartList.length; i++) {
        console.log(cartList[i].cnt);
        totalSum += parseInt(String(cartList[i].price).replace(",", "")) * (cartList[i].cnt);
        console.log(totalSum);
        // 토핑의 가격합계
        for (var j = 0; j < cartList[i].toppings.length; j++) {
            totalSum += parseInt(String(cartList[i].toppings[j].sideprice).replace(",", "")) * (cartList[i].cnt);
        }
    }
    console.log(totalSum);

    $('input[name="sum_money"]').val(totalSum);

    console.log(sum);

    var sumhtml = '';

    sumhtml += '<p>';
    sumhtml += totalSum + '원';
    sumhtml += '</p>';

    var div_sum = document.querySelector('.sum');
    div_sum.innerHTML = sumhtml;

    paySum = totalSum;


}




function cartCount(type, ths, i) {
    var $input = $(ths).parents("td").find('input[name="cartCnt"]');
    console.log($input);
    var tCount = Number($input.val());
    if (type == 'p') {
        $input.val(Number(tCount) + 1);

    } else {
        if (tCount > 1) $input.val(Number(tCount) - 1);
    }

    cartList[i].cnt = $input.val();

    show_cartList();

    console.log(cartList[i].cnt);
}


// 결제창팝업

function payClick() {

    // 장바구니에 물건이 있는 경우에만 결제페이지로 이동가능
    if (cartList != 0) {
        document.querySelector('#paystart').style.display = 'block';

        //클릭금지
        noClick();
    }
}



// 결제수단 고르기
function choosePay(index) {

    document.querySelector('#paystart').style.display = 'none';


    var payData = JSON.parse(payArr);
    var payHtml = '';


    // 결제세부창 띄우기
    document.querySelector('.payment').style.display = 'block';
    payHtml += '<div><table class="ptab2">';
    payHtml += '<tr><h2 class="title">결제</h2>';
    payHtml += '<hr align="center" style="width:95">';
    payHtml += '</tr>';
    payHtml += '<tbody class="tab2"><tr>';
    payHtml += '<td align="center"><img src="'
    payHtml += payData[index].img;
    payHtml += '" width="180" height="180"></td>';
    payHtml += ' </tr><tr align="center"><td>';
    payHtml += payData[index].name;
    payHtml += '</td>';
    payHtml += '</tr>';
    payHtml += '<tr align="center">';
    payHtml += '<td><img src="image/pay/load.gif" height="100" width="100"><td>';
    payHtml += ' </tr></tbody>';
    payHtml += '</table></div>';

    var payChk = document.querySelector('.payment');
    payChk.innerHTML = payHtml;




    // 영수증 출력 : 카트리스트 배열 이용

    setTimeout(function () {


            출처: https: //mjmjmj98.tistory.com/31 [코딩 공부]

                console.log(takeoutox)

            if (takeoutox) {
                var to = 'TAKE OUT'
            } else {
                var to = 'FOR HERE'
            }

            var reHtml = '';

            document.querySelector('.payment').style.display = 'none';
            document.querySelector('#receipt').style.display = 'block';

            reHtml += ' <table><tr><th class="receipt_img" colspan="6"><img src="image/logo.png" width="200"></th></tr>'
            reHtml += '<tr><td class="tg-0pky" colspan="6"><a1>두솥도시락 에이아이점</a1></td></tr>'
            reHtml += '<tr><td class="tg-0pky" colspan="6"><a1>서울시 종로구 종로 69 YMCA 빌딩 7층</a1></td></tr>'
            reHtml += '<tr><td colspan="6"><hr></td></tr><tr><td class="tg-0pky" colspan="6"><h1>';
            reHtml += to
            reHtml += '</h1></td></tr><tr><td colspan="6"><hr></td></tr>';

            for (var i = 0; i < cartList.length; i++) {

                p1 = parseInt(cartList[i].price.replace(",", ""));

                c1 = cartList[i].cnt;

                var menu_total = p1 * c1;


                reHtml += '<tr><td class="receipt_name" colspan="3"><p>';
                reHtml += cartList[i].name;
                reHtml += '</p></td><td class="receipt_price"><p>';
                reHtml += parseInt(cartList[i].price.replace(",", ""));
                reHtml += '</p></td><td class="receipt_cnt"><p>';
                reHtml += cartList[i].cnt;
                reHtml += '</p></td><td class="receipt_t"><p>';
                reHtml += menu_total
                reHtml += '원</P></td></tr>'

                for (var j = 0; j < cartList[i].toppings.length; j++) {

                    p2 = parseInt(cartList[i].toppings[j].sideprice.replace(",", ""));
                    var side_total = p2 * c1;

                    reHtml += '<tr><td class="receipt_name" colspan="3"><p>'
                    reHtml += '└ ' + cartList[i].toppings[j].sidename;
                    reHtml += '<td class="receipt_price"><p>'
                    reHtml += parseInt(cartList[i].toppings[j].sideprice.replace(",", ""));
                    reHtml += '</p></td><td class="receipt_cnt"><p>-</p></td><td class="receipt_t"><a2>';
                    reHtml += side_total
                    reHtml += '원</a2></td></tr>';
                }

            }
            reHtml += '<tr><td colspan="6"><hr></td></tr>';
            reHtml += '<tr><td class="total_word" colspan="3"><h2>Total</h2></td><td></td> <td class="receipt_total" colspan="2"><h3>';
            reHtml += paySum
            reHtml += '원</h3></td></tr><tr><td colspan="6"><hr></td></tr>'
            reHtml += '<tr><td class="hansot" colspan="6">TEAM HANSOT DOSIRAK</td></tr>';
            reHtml += '<tr><td class="hansot" colspan="6">THANK YOU ❤</td></tr></table>';

            console.log(reHtml);

            var rec = document.querySelector('#receipt');
            rec.innerHTML = reHtml;

            var audio = new Audio('./audio/good.wav');
            audio.play();

            setTimeout(function () {
                var audio = new Audio('./audio/pay.mp3');
                audio.play();
            }, 1000);


            // 4초뒤 창꺼짐
            setTimeout(function () {
                document.querySelector('#receipt').style.display = 'none';
                //클릭풀어줌
                okClick();

                //새로고침해줌 - 정보리셋 > 카트만 비우면 어째서인지 계속해서 같은 결제방법으로 이어짐.
                 window.location.reload();

            }, 5000)


        },
        1000);




}


function closePay() {
    okClick();
    document.querySelector('.payment').style.display = 'none';

}
