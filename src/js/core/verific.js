var verific={

    /**
     * 验证是否合法
     * @param reg
     * @param str
     * @returns {boolean}
     */
    isLegal:function (reg,str) {
        if(reg.text(str)){
            return true;
        }else{
            return false;
        }
    },

    /**
     * 验证是否为数字
     * @param str
     * @returns {boolean}
     */
    isDigit:function (str) {
        var reg=/^[0-9]*$/;
        if(reg.test(str)){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 验证是否为空
     * @param str
     * @returns {boolean}
     */
    isEmpty:function (str) {
        if($.trim(str)==""){
            return true;
        }else {
            return false;
        }
    }


};