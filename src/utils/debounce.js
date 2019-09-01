  /**函数的去抖动**/
function debounce(method,delay){
    var timer=null;
   	return function(){
        var context=this, args=arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
            method.apply(context,args);
        },delay);
    }
}

export default debounce;