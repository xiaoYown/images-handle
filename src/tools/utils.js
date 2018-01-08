//Ajax的简单封装
export function httpResponse (api,success,error) {
    var _this=this;
    api.then(response => {
        success && success(response);
    },response => {
        error && error(response.status)
        if(response.status==404 || response.status==500){
            console.log('服务器无响应-'+response.status)
        }
    })
}