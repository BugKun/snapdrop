const express = require('express'),
    child_process = require("child_process"),
    app = express(),
    proxy = require('http-proxy-middleware'),
    path = require('path'),
    isWin32 = require('os').platform() === 'win32',
    port = process.env.PORT || 10080



/* 挂载静态页面 */
app.use(express.static(path.join(__dirname, '../client')))

app.use('/server', proxy({target: 'http://127.0.0.1:13337', ws: true, changeOrigin: true}))

app.listen(port, () => {
    console.log(`Server is now running in localhost:${port}`)
    if(isWin32) {
        //打开浏览器
        child_process.exec(`start http://localhost:${port}`)
    }
})