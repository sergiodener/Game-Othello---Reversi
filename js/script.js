var cW = document.documentElement.clientWidth,
	cH = document.documentElement.clientHeight;

function start() {
    gm = Snap("#game");
	playerW = {color:"#fff", points:2};
	playerB = {color:"#000", points:2};
	player = playerW;
	var	a = ((cW-cH)/2);
	bk =  (cH-cH*.05)/8;
	
		table= gm.rect(a , bk*.25, cH-bk*.45, cH-bk*.45).attr({
			fill: "#060",
			id: "table",
			stroke:"#000",
			strokeWidth:"3"
		});
	console.log(a, cW, cH);
	g = gm.g();
	
	
	for (var x=1; x<8; x++){
		var line = gm.line((x*bk)+a, bk*.25, (x*bk)+a, cH-bk*.2).attr({
			strokeWidth: 2,
			stroke: "#000"
		});
		g.add(line);
	}
	
	for (var y =1 ; y<8; y++){
		var line = gm.line(a, (y*bk)+bk*.25, cH+a-bk*.45, (y*bk)+bk*.2).attr({
			strokeWidth: 2,
			stroke: "#000"
		});
		g.add(line);
	}
	 var x1 = a+bk*.5,
		y1 = bk*.7,
		r = bk/3;
	for( y = 0 ; y<8; y++){
		for (var x = 0; x<8; x++){
			var circle = gm.circle((x*bk+x1), (y*bk+y1),  r).attr({
				strokeWidth: 1,
				stroke: "#000",
				fill: "#060",
				id: (x+""+y)
			});
			var text = gm.text((x*bk+x1), (y*bk+y1), x+""+y );
			circle.node.onclick = function (e){
				verify(e);
			};
		}
			
	}
	document.getElementById("33").setAttribute("fill", "#fff");
	document.getElementById("44").setAttribute("fill", "#fff");
	document.getElementById("43").setAttribute("fill", "#000");
	document.getElementById("34").setAttribute("fill", "#000");
	
}

function verify(circle){
	var id = parseInt(circle.target.id);
	console.log("click", id);
	obj=document.getElementById(circle.target.id);
	color=obj.getAttribute("fill");
	console.log(color);
	
	if(color=="#006600"){
		var srhArr= [id,id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11];
		srhArr.forEach(change);
	}
	if (player.color =="#fff"){
		player=playerB;
	}else {
		player=playerW;
	}
	
}

function change(circleID){
	console.log(circleID);
	if(parseInt(circleID)<0|String(circleID).includes("8")|String(circleID).includes("9")){
		return;
	}
	if (circleID>=10){
		document.getElementById(circleID).setAttribute("fill",  player.color);
	}
	else{
		document.getElementById(0+""+circleID).setAttribute("fill",  player.color);
	}
	
	
}
