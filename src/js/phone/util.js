
//jQuery扩展函数
jQuery.fn.extend({
    clickToPage: function (url) {
        return this.each(function () {
            $(this).click(function () {
                window.location.href = url;
            });
        });
    }
});

/* 跳转页面  */
function toPage(url){
    window.location.href = url;
}


/* 刷新页面  */
function refreshPage(){
    window.location.reload();
}



//获取特殊字符在源字符串中的个数
function getStrCount(scrstr, armstr){  //scrstr 源字符串  armstr 特殊字符
    var count=0;
    while(scrstr.indexOf(armstr) >=0 ){
        scrstr = scrstr.replace(armstr,"");
        count++;
    }
    return count;
}


// 验证手机号是否正确
function isMobile(phone) {
    var reg = /^0?(13[0-9]|14[01456789]|15[0-9]|16[56]|17[01235678]|18[0-9]|19[89])[0-9]{8}$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

// 验证座机号码是否正确
function isPhone(phone) {
    var reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

//金额格式化
function amountFormat(amount){
    var reg=/^\d+$/;
    if(reg.test(amount)){
        return amount;
    }else{
        var amount2=amount.toFixed(2);
        amount2=parseFloat(amount2)
        return amount2;
    }
}


//String类型扩展方法
String.prototype.endWith = function(str) {
    if (str == null || str == "" || this.length == 0
        || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
};

//String类型扩展方法
String.prototype.startWith = function(str) {
    if (str == null || str == "" || this.length == 0
        || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
};

//String类型扩展方法
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


Array.prototype.remove=function(dx){
    if(isNaN(dx)||dx>this.length){return false;}
    //var arr=new Array();
    for(var i=0,n=0;i<this.length;i++){
        if(i!=dx){
            this[n++]=this[i];
            // arr.push(this[i]);
        }
    }
    //alert("arr---="+arr);
    this.length-=1;
};

Array.prototype.isContain=function(value){
    if(isNaN(value)){return false;}
    var flag=false;
    for(var i=0;i<this.length;i++){
        if(this[i]==value){
            flag=true;
        }
    }
    return flag;
};

//String类替换所有字符
String.prototype.replaceAll = function (FindText, RepText) {
    var regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
};

//验证是否为空
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}