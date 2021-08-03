const http = require('http');

const server = http.createServer((req, res) => {
    /**
     * req : http.IncomingMessage 类
     * res : http.ServerResponse 类
     */
    console.log('客户端请求的URL为 ', req.url);
    if (req.method === 'POST') {
        let postData = "";

        req.on("data", (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            /**
             * POST的表单的enctype为默认时,post的数据为n1=v1&n2=%E6%88%91%E7%9A%84
             * POST的表单的enctype为multipart/form-data时,
             */
            console.log("post的数据为: ", postData);
            console.log("post的数据经过decodeURI为: ", decodeURI(postData));
            console.log("end");
        });

        res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8'
        });
        res.end('<h1>你发的是POST请求👴</h1>');
        return;
    }
    if (req.method === 'GET') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end('<h1>你发的是GET请求👴</h1>');
        return;
    }

});

server.listen(8888, () => {
    console.log('监听8888端口');
})