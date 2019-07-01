
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