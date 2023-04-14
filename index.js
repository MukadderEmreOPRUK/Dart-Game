var playerCounter = 2;
var playerDoubleCounter = 100;
$(document).ready(function () {
    /* Atış */
    $(document).on("click", ".board", function (event) {
        $("#audio")[0].play();
        if ($(event.target).hasClass("slice")) {
            var point = $(event.target).data("point");
            changeScore(point, true);
        }
        else {
            changeScore(0, false);
        }
    });
    /*Splash Screen*/
    $(".fa-volume-up").on("click",function(){
        $("#splash-music")[0].play();
    });
    $(".fa-volume-mute").on("click",function(){
        $("#splash-music")[0].pause();
    });
    $("#options-icon").on("click",function(){
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      });
    /*Splash Screen*/
    /* ./ Atış */
    /*Splash Screen*/
        $("#twoPlayers").on("click",function(){
            $(".splash-screen").slideUp(1500);
        });
        $("#threePlayers").on("click",function(){
            $("#players").append(htmlString);
            $(".splash-screen").slideUp(1500);
            
        });
        $("#fourPlayers").on("click",function(){
            $("#players").append(htmlDoubleString);
            $(".splash-screen").slideUp(1500);
            
        });
    /*/Splash Screen*/

    /*Oyuncu ekleme*/
        playerCounter += 1;
        var htmlString = $(
            '<div class="score-board">' +
            '<div class="chalk-line-count">' +
            '</div>' +
            '<img src="image/14-chalk-arrows-10.png" class="chalkarrow">' +
            '<input value="' + (playerCounter)+'" name="player" type="radio"><br>' +
            ' <input type="hidden" class="countPlayer" value="0">'+
            '<label>Score:</label>' +
            '<input name="score" type="text" data-count="0" data-firstscore="0" value="301" readonly></br>' +
            '<label>Name:</label>' +
            '<input name="name" type="text" >' +
            '</div>'
        );
    /*Oyuncu Ekleme*/

    /*Double Oyuncu Ekleme*/
    playerDoubleCounter += 1;
    var htmlDoubleString = $(
        '<div class="score-board">' +
        '<div class="chalk-line-count">' +
        '</div>' +
        '<img src="image/14-chalk-arrows-10.png" class="chalkarrow">' +
        '<input value="' + (playerDoubleCounter)+'" name="player" type="radio"><br>' +
        ' <input type="hidden" class="countPlayer" value="0">'+
        '<label>Score:</label>' +
        '<input name="score" type="text" data-count="0" data-firstscore="0" value="301" readonly></br>' +
        '<label>Name:</label>' +
        '<input name="name" type="text" >' +
        '</div>'+
        '<div class="score-board">' +
        '<div class="chalk-line-count">' +
        '</div>' +
        '<img src="image/14-chalk-arrows-10.png" class="chalkarrow">' +
        '<input value="' + (playerDoubleCounter)+'" name="player" type="radio"><br>' +
        ' <input type="hidden" class="countPlayer" value="0">'+
        '<label>Score:</label>' +
        '<input name="score" type="text" data-count="0" data-firstscore="0" value="301" readonly></br>' +
        '<label>Name:</label>' +
        '<input name="name" type="text" >' +
        '</div>'
    );
    /*Double Oyuncu Ekleme*/
    $(".refresh").click(function () {
        $(".score-board").children("input[type=radio]").prop("checked", false);
        $("#selectedPlayer").val(0)
        $("input[name=score]").val('301');
        $("input[name=name]").val('');
        $(".score-board").children("input[name=score]").data("count", 0);
        DrawLine($(".score-board"));
    });
    $(".turn-page").click(function(){
        document.location.reload(true);
    });

    /* Oyuncu Seçimi - Yaz-Boz Click*/
    $(document).on("click", ".score-board", function () {

        //1) Seçilenin hak durumu true(1) ise diğerline de bak. Diğerlerinden biri bile true değilse uyarı ver ve işlemi kes.
        var thisCountPlayer = $(this).children(".countPlayer").val();
        var isThereAnyPlayerForPlay = false;
        if(thisCountPlayer == 1 && $("input[name=player]:checked").siblings("input[name=score]").data("count") == 3){
            for(var i = 0; i <= $(".countPlayer").length - 1; i++){
                if($($(".countPlayer")[i]).val() != 1){
                    isThereAnyPlayerForPlay = true;
                    break;
                }
            }
            if(isThereAnyPlayerForPlay){
                ShowMessage("Bu tur hakkını doldurdun, gelecek turu beklemelisin.!");
                return;
            }
            else{
                $(".countPlayer").val(0);
                $("#selectedPlayer").val(0);
                $("input[name=score]").data("count", 0);
            }
        }
        if ($("#selectedPlayer").val() == 0) {
            $("#selectedPlayer").val($(this).children("input[type=radio]").val());
            $(this).children("input[name=score]").data("count", 0);
            $(this).children("input[type=radio]").prop("checked", true);
            DrawLine($(this));
            var audio = $("#board-sound")[0];
            audio.play();
            $(".score-board").children(".chalkarrow").attr("style", "display:none");
            $(this).children(".chalkarrow").attr("style", "display:block");
            $(".score-board").children(".chalk-line-count").attr("style", "display:none");
            $(this).children(".chalk-line-count").attr("style", "display:block");
        }
        else {
            //Seçili oyuncu var demektir. Seçili oyuncunun atış hakkı var mı? Varsa bir şey yapamazsın. Yoksa devam edebilirsin.
            if ($("input[name=player]:checked").siblings("input[name=score]").data("count") == 3 && $(this).children("input[type=radio]").val() != $("#selectedPlayer").val()){
                //Hakkı yoksa ve başkasını seçiyorsa
                $("#selectedPlayer").val($(this).children("input[type=radio]").val());
                $(this).children("input[name=score]").data("count", 0);
                $(this).children("input[type=radio]").prop("checked", true);
                DrawLine($(this));
                var audio = $("#board-sound")[0];
                audio.play();
                $(".score-board").children(".chalkarrow").attr("style", "display:none");
                $(this).children(".chalkarrow").attr("style", "display:block");
                $(".score-board").children(".chalk-line-count").attr("style", "display:none");
                $(this).children(".chalk-line-count").attr("style", "display:block");
            }
            else if($("input[name=player]:checked").siblings("input[name=score]").data("count") < 3 && $(this).children("input[type=radio]").val() != $("#selectedPlayer").val()){
                //Hakkı varsa ve başkasını seçiyorsa
                ShowMessage("Atış hakkın henüz bitmedi!");
            }
            else if($("input[name=player]:checked").siblings("input[name=score]").data("count") < 3 && $(this).children("input[type=radio]").val() == $("#selectedPlayer").val()){
                //Hakkı varsa ve kendisini seçiyorsa
                ShowMessage("Tahta bu tarafta değil. Tabelayla uğraşma.");
            }
            else{
                //Hakkı yoksa ve kendisini seçiyorsa
                ShowMessage("Bu tur atış hakkın kalmadı. Sonraki turu bekle.");
            }
            
        }/*$(".score-board").children("input[type=hidden]").val("false");   */    
    });
    /* ./ Oyuncu Seçimi - Yaz-Boz Click*/
    /* Alert-Box Gizleme */
    $('.alert-box-ab').on("click", function () {
        HideMessage();
    });
    /* ./ Alert-Box Gizleme */
});

/* Bildiri/Uyarı */
var ShowMessage = function (message) {
    $(".alert-box").children(".alertinfo").text(message);
    $(".alert-box-ab").show()
}
var HideMessage = function () {
    $(".alert-box-ab").hide();
    $(".alert-box").children(".alertinfo").text("");
}
/* ./ Bildiri/Uyarı */

/* Atış Hakkı Çizgisi */
var DrawLine = function (element) {
    var drawCount = 3 - parseInt(element.children("input[name=score]").data("count"));
    var chalkArea = element.children(".chalk-line-count");
    chalkArea.empty();
    for (var i = 0; i < drawCount; i++) {
        chalkArea.append($('<img class="chalk-line" src="image/PikPng.com_chalk-png_2949426.png" alt="">'));
    }
}
/* ./ Atış Hakkı Çizgisi */

/* Atış Hakkından Düşme */
var changeCount = function (element) {
    if (element.data("count") < 3) {
        element.data("count", element.data("count") + 1)        
        DrawLine($("input[name=player]:checked").parent());
    }
    else {
        DrawLine($("input[name=player]:checked").parent());
    }

    
    //Atış hakkı bitti uyarısı da yapmasın. Bu bağlamda belki de kalabilir.
    if (element.val() < 0) {
        element.data("count", 3);
        DrawLine($("input[name=player]:checked").parent());
    }
    if (element.val() == 0) {
        DrawLine($("input[name=player]:checked").parent());
    }
}
/* ./ Atış Hakkından Düşme */
/* Score Düşme */
var changeScore = function (point, isSlice) {
    if ($("input[name=player]").is(":checked")) {
        var scoreInput = $("input[name=player]:checked").siblings("input[name=score]");
        if (scoreInput.data("count") == 0) {
            scoreInput.data("firstScore", scoreInput.val());
        }
        if(scoreInput.data("count") == 2){
            $("input[name=player]:checked").siblings(".countPlayer").val(1);
        }
        if (scoreInput.data("count") < 3) {
            if (isSlice) {
                scoreInput.val(scoreInput.val() - point);
            }
            changeCount(scoreInput);
        }
        else {
            ShowMessage("Atış hakkı bitti.");
        }

        if (scoreInput.val() < 0) {
            scoreInput.val(scoreInput.data("firstScore"));
            ShowMessage("Sıfırın altına düşüldü. El yandı.");
            /*alert("Sıfırın altına düşüldü.El yandı.");*/
        }
        if (scoreInput.val() == 0) {
            scoreInput.siblings($("input[name=name]")).val('Kazandınız');
        }
    }
    else {
        ShowMessage("Oyuncu seçilmedi.");
    }
}
/* ./ Score Düşme */