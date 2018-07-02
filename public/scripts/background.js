let counter = 0;
function changeBG(){
    let imgs = [
        "url(../img/photo-1414016642750-7fdd78dc33d9.jpeg)",
        "url(../img/photo-1444012104069-996724bf4a0a.jpeg)",
        "url(../img/photo-1444012236767-1b471c68781c.jpeg)",
        "url(../img/photo-1444210971048-6130cf0c46cf.jpeg)",
        "url(../img/photo-1444228250525-3d441b642d12.jpeg)",
        "url(../img/photo-1445308394109-4ec2920981b1.jpeg)",
        "url(../img/photo-1445888761652-fc13cbb0d819.jpeg)",
        "url(../img/photo-1445888985293-8e1b904061c4.jpeg)"
      ];

    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}

setInterval(changeBG, 2000);


