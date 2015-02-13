var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users=[];
var table=[];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket)
{

	socket.on('newuser',function(name){
		if(users.length<=2){
			if(users.length==0){
				users.push('player1');
				users['player1']=name;
				socket.emit('user','player1');
			}
			else {
				users.push('player2');
				users['player2']=name;
				socket.emit('user','player2');
			}
		}
		
	});

	socket.on('choiser',function(data,play){
		table.push({data:data,player:play});
		io.emit('allchois',table);
	});

	socket.on('move',function(datas){
		console.log(datas);
		console.log(table);
		for (var i = 0; i < table.length; i++) {
			if(table[i].data==datas.from) table[i].data=datas.to;
		};
		io.emit('movedone',table,datas.player);
	});

	socket.on('winner',function(){
		io.emit('gameover');
	});

	socket.on('disconnect',function()
	{

	});
});

http.listen(3000, function(){
  
});

