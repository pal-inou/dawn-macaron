
//ハンバーガーメニュー
$(document).ready(function(){
    $('.burger-btn').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('.nav-list').addClass('active');
        } else{
            $('.nav-list').removeClass('active');
        }
        $('.nav-item a').click(function(){
            $('.burger-btn').removeClass('active');
            $('.nav-list').removeClass('active');
        });
        $('body').toggleClass('noscroll'); //メニュー開示時のbody全体のスクロールを止める"noscroll"クラスを実行
    });
});

//スライドショー
$(function(){
    //戻る・進むボタンの表示・非表示
    function toggleChangeBtn(){  //関数toggleChangeBtnの作成
        var $slideIndex = $('.thought-box').index($('.active')); //.activeがついている（.thought-box）のインデックス番号を取得する変数「slideIndex」を作成
        $('.slide-button').show();  //「戻る」「進む」両方のボタン（.slide-button）をshowメソッドで表示
        if($slideIndex == 0){
            $('.prev').hide();   //（1枚目のスライド）なら（.prev）ボタンを非表示
        } else if($slideIndex == 2){
            $('.next').hide();  //（3枚目のスライド）なら（.next）ボタンを非表示
        }
    }
    toggleChangeBtn(); //toggleChange関数の呼び出し

    //「戻る」「進む」ボタンに機能をつける
    //①進むボタン（.next）をクリックした際、以下の関数を実行
    $('.next').click(function(){
        var $displaySlide = $('.active');/*現在表示中のスライドを取得*/
        $displaySlide.removeClass('active box-design');/*そのスライドからactiveクラスを除いて表示されないようにする。*/
        $displaySlide.next().addClass('active box-design');/*次のスライドにactiveクラスをつけ、表示させる。*/
        toggleChangeBtn();/*nextボタンを隠すか判断*/
    });
    //②戻るボタン（.prev）をクリックした際、以下の関数を実行
    $('.prev').click(function () {/*prevボタンを押したとき*/
        var $displaySlide = $('.active');/*現在表示中のスライドを取得*/
        $displaySlide.removeClass('active box-design');/*そのスライドからactiveクラスを除いて表示されないようにする。*/
        $displaySlide.prev().addClass('active box-design');/*前のスライドにactiveクラスをつけ、表示させる。*/
        toggleChangeBtn();/*prevボタンを隠すか判断*/
    });
});

//モーダルウィンドウ
$(function(){
    $('.modalopen').each(function(){ //.modal-openに対して以下を繰り返し処理
        $(this).on('click',function(){  //.modal-openをクリックした時に以下の関数を実行
            var $target = $(this).data('target');  //.modal-open内のdata属性の'target'値を代入
            var $modal = document.getElementById($target);  //取ってきたID($target)にマッチする要素を代入
            console.log($modal);
            $($modal).fadeIn(); //$modalをフェードイン
            return false; //イベント処理や伝達を無効にする
        });
    });
    $('.modalClose').on('click',function(){ //.modalCloseをクリックした時に以下の関数を実行
        $('.js-modal').fadeOut(); //.js-modalをフェードアウト
        return false; //イベント処理や伝達を無効にする
    });
});


//タブ切り替え
$(function(){
    var $filters = $('.lineup-filter [data-filter]'), //ul内にあるdata-filterの値いずれかが代入
    $boxes = $('.lineup-list [data-category]'); //商品リスト内にあるdata-categoryの値いずれかが代入

    //選択されたタブを判断し、アクティブにする
    $filters.on('click', function(e){ //LineUpタブをクリックした時に以下を実行
        e.preventDefault();  //デフォルトのイベント機能を実行しないようにリセット
        var $this = $(this);  //$filtersで選択された値を、変数$thisに代入
        $filters.removeClass('active');  //メニュータブ全てから.activeを除く
        $this.addClass('active');  //選択されたタブ($this)に、.activeを付与

        var $filterTime = $this.attr('data-filter');
        //選択されたタブ($this)に対して、attrメソッドを使ってdata-filter属性の値を代入

        //rankingタブを選択した時の処理
        if($filterTime === 'ranking'){
            $boxes.removeClass('is-animated') //商品ボックス($boxes)に対して(.is-animated)をのぞき、
            .fadeOut().promise().done(function(){ //フワッと非表示、非同期通信にし、全てが完了したら以下の処理を実行
                $boxes.addClass('is-animated').fadeIn(); //商品ボックス（$boxes）に（.is-animated）を付与し、表示させる
            });
            // rankingタブ以外を選択した時の処理
        } else{
            $boxes.removeClass('is-animated') //同上
            .fadeOut().promise().done(function(){  //フワッと非表示、非同期通信にし、全てが完了したら以下の処理を実行
                $boxes.filter('[data-category = "' + $filterTime + '"]') //$boxesに対して、filterメソッドを使い、
                //$boxesから「data-category」属性の値＝選択した要素が持つ「data-filter」属性の値の場合のみ該当するボックスを抽出し,
                .addClass('is-animated').fadeIn();  //そのボックスに（.is-animated）を付与し、ふわっと表示させます。
            });
        }
    });
});