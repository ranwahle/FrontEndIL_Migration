let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require('express');
let topics = [];


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

io.on('connection', function(socket){
    //

    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('loadTopics', () =>{
        console.log('load Topcis request');
        io.emit('topics', topics);
    })

    socket.on('newTopic', topic => {
        topics.push(topic);
        io.emit('topics', topics);
    } );

    socket.on('newUser', user => {
       console.log(user);
    io.emit('newUser', user);
    });
    socket.on('chat message', msg => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });

    socket.emit('topics', topics);

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
