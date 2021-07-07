

function handleParams(obj) {
    let str = Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&");
    return "?" + str;
}

/** axios函数:
 * 1. 函数返回值为promise,成功结果为 response,失败结果为error
 * 2. 能处理多种类型的请求,get,post等
 * 3. 函数的参数为一个对象
 * 4. 响应json数据时,自动解析为一个js对象
 */
function axios({
    url,
    method = 'GET',
    params = {},
    data = {}
}) {
    return new Promise((resolve, reject) => {
        // 1. 执行异步ajax请求
        // 2. 成功, 执行resolve
        // 3. 失败, 执行reject

        // 创建XHR
        const request = new XMLHttpRequest();

        if (method === 'GET' || method === 'DELETE') {
            url += handleParams(params);
            request.open(method, url);
            console.log(url);
            request.send(null);
        }

        if (method === 'POST' || method === 'PUT') {
            request.open(method, url);
            request.setRequestHeader("content-type", "application/json;charset=utf-8")
            request.send(JSON.stringify(data));
        }

        // 监听请求状态
        request.onreadystatechange = function () {
            // console.log('request.readyState ', request.readyState, request.DONE);
            // request.response属性是什么
            // console.log(request.readyState, request.response);
            // 响应的头部信息
            // console.log(request.readyState, request.getAllResponseHeaders());

            // 请求未完成,直接返回
            if (request.readyState !== request.DONE) {
                return
            }
            // 得到响应状态码
            const { status, statusText } = request;
            if (status >= 200 && status < 300) {
                // 成功,构造response对象
                const response = {
                    data: JSON.parse(request.response),
                    status,
                    statusText
                }
                resolve(response);
            } else {
                // 失败,构造一个错误对象
                reject(new Error('request error , status is ', status));
            }
        }

    })
};
