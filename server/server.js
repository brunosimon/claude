var app  = require('express')(),
    http = require('http').Server(app),
    io   = require('socket.io')(http);

app.get('/',function (req,res)
{
    res.sendfile('index.html');
});

io.on('connection',function (socket)
{
    console.log('connection');

    socket.on('disconnect',function()
    {
        console.log('disconnect');
    });

});

setInterval(function()
{
    io.emit('blink');
},3000);

http.listen(3000,function ()
{
    console.log('listening on *.3000');
});
