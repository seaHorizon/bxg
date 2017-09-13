define(function(){
    return {
        getQueryObj: function (){
            var search = location.search;
            search = search.slice(1);
            search = search.split("&");
            var result = {};
            for(var i=0;i<search.length;i++){
                search = search[i].split("=");
                result[search[0]] = search[1];
            }
            return result;
        }
    }
})