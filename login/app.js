const http = require('http')
const querystring = require('querystring')
const fs=require('fs');
http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	var vip=eval('('+'['+fs.readFileSync('login.txt').toString()+']'+')');
	var str = ''
	req.on('data',(data)=>{
		str+=data
	})
	req.on('end',()=>{
		var json = querystring.parse(str)
		console.log(json)
		var userType = false
		for(var i=0;i<vip.length;i++){
			if(vip[i].user == json.user){
				userType = true
			}
		}
		if(userType){
		res.write('no')
	     res.end()
		}else{
			fs.appendFileSync('login.txt',','+JSON.stringify(json))
			res.write('ok')
		    res.end()
		}
	})
}).listen(8000)
http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	var vip=eval('('+'['+fs.readFileSync('login.txt').toString()+']'+')');
	var str = ''
	req.on('data',(data)=>{
		str+=data
	})
	req.on('end',()=>{
		var json = querystring.parse(str)
		var userType = false
		for(var i=0;i<vip.length;i++){
			if(vip[i].user == json.user & vip[i].pass == json.pass){
				userType = true
			}
		}
		if(userType){
		res.write('OK')
	     res.end()
		}else{
			res.write('no')
		    res.end()
		}
	})
}).listen(8001)