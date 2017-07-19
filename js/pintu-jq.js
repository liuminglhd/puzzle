var blank,levelNum,cls;

// 初始化：显示图片
var init = function (level) {
    var tag = [], i = 0;  
    for (var y = 0; y < 5; y++)  
        for (var x = 0; x < 5; x++) {  
            // 每个小图片：p标签，定位
            tag.push('<p id=' + i + ' class=' + i + 
                ' style="left:' + x * 100 + 'px;top:' + y * 100 + 'px;background-position:-' + 
                x * 100 + 'px -' + y * 100 + 'px;"></p>');  
            i++;  
        } 
    $("#move").html(tag.join('')); 
    blank = $("p").length - 1; 
    levelNum = level;     
    random();
    $("p:last").css("display","none"); 
    $("span").html("");
    $("p").bind("click",function(){
        move($(this));
    });
}

// 打乱图片
var random = function () {
    var count = 0;
    while(count < levelNum) {
        var d = parseInt(Math.random() * 4);  
        // 小空格 
        var yB = parseInt(blank / 5);  
        var xB = parseInt(blank % 5);  
        cls = -1;  
        // 四种变换位置的可能，上下或左右变换
        if (d == 0 && yB != 0) cls = blank - 5;  
        else if (d == 1 && xB != 4) cls = blank + 1;  
        else if (d == 2 && yB != 4) cls = blank + 5;  
        else if (d == 3 && xB != 0) cls = blank - 1;  
        if (cls != -1) { 
            change(getByClass(blank), getByClass(cls));  
            blank = cls;  
            count++;  
        }          
    }
    
}

// 获取对象  
var getByClass = function (num) { 
    var getObj;
    $('p').each(function () {
        (parseInt($(this).attr("class")) == num) ? getObj = $(this) : null;   
    });
    return getObj; 
}

// 图片交换位置
var change = function (a,b) {
    // position的值确定位置，class的值交换对象便于验证
    var topA = a.css("top");
    var leftA = a.css("left");    
    var tempA = a.attr("class");  
    a.css({
        "top":b.css("top"),
        "left":b.css("left")
    }).attr("class",b.attr("class"));
    b.css({
        "top":topA,
        "left":leftA
    }).attr("class",tempA);  
}

// 检查是否成功
var check = function () {
    var success = true;
    $('p').each(function () {  
        if ($(this).attr("class") != $(this).attr("id")){
            success = false; 
        } 
    });  
    if(success) return true;
}

// 点击移动  
var move = function (currObj) {  
    // 当前格
    var pos = currObj.attr("class");  
    var y = parseInt(pos / 5);  
    var x = parseInt(pos % 5); 
    //小空格  
    var yB = parseInt(blank / 5);  
    var xB = parseInt(blank % 5);  
    if (Math.abs(x - xB) + Math.abs(y - yB) == 1) {     
        change(currObj, getByClass(blank));  
        blank = pos;  
    }  
    if (check()) {  
        $("span").html("恭喜成功");
        $("p").unbind("click");
    }  
}

//切换图片
var tab = function (k) {
    $("#compare").css("background-image","url(./images/pic_" + k + ".jpg)");
    $("#move p").css("background-image","url(./images/pic_" + k + ".jpg)");   
}

// 调用
$(function(){
    var n = 0;
    init(10);
    $("#tab").bind("click",function(){
        n = parseInt(Math.random() * 13);
        console.log(n);
        init($("#level").val());
        tab(n);
    })
    $("#level").bind("change",function () {  
        init($(this).val());  
        tab(n);
    });
    
});
