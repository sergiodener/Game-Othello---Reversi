var cW = document.documentElement.clientWidth,
	cH = document.documentElement.clientHeight*.75;
	
if (cW<cH){ // caso a altura seja maior que a largura 
	cH=cW*.85;
}

class Player {
	constructor(color, pieces,  cUn, score, points){
		this.color = color;
		this.pieces = (pieces);
		this.points = points;
		this.cUn = cUn;
		this.score = score;	
	}

	 inGame(){
		document.getElementById(this.score).setAttribute("fill", "#ffd000");
		document.getElementById(this.points).innerHTML=this.pieces.length;
		otPlayer.nGame();
	}
	
	 nGame(){
		document.getElementById(this.score).setAttribute("fill", this.cUn);
		document.getElementById(this.points).innerHTML=this.pieces.length;
	}
	
	get getPieces(){
		return this.pieces;
	}
	
	getPoints(){
		return this.pieces.length;
	}
	
}

function start() {
    gm = Snap("#game");
	playerW = new Player ("#fff", ["33","44"], "#cce0fc",  "scoreW", "pntsW");
	playerB = new Player ("#000", ["34","43"], "#bbb7ae",  "scoreB", "pntsB");
	actualPlayer = playerB;
	otPlayer= playerW;
	
	var	a = ((cW-cH)/2),
		aux = (document.documentElement.clientHeight)-cH,
		bk =  (cH-cH*.05)/8,
		f = gm.filter(Snap.filter.shadow(2, 4, .5)),
	
		table= gm.rect(a , bk*.25, cH-bk*.45, cH-bk*.45).attr({
			fill: "#060",
			id: "table",
			stroke:"#000",
			strokeWidth:"3"
		}),
		score= gm.rect(0,cH-bk*.15, cW, aux).attr({
			fill: "#bbc495",
			id: "scoreB"
		})
		
		scrW= gm.rect(bk*.1,cH-bk*.15,(cW-.2*bk)/2, aux-bk*.1).attr({
			fill: "#e8edde",
			id: "scoreW"
		}),
		
		plW= gm.text((cW-.2*bk)/4.5, cH*(1.05), "White").attr({
			"class": "score",
			filter: f
		}),
		
		plWS= gm.text((cW-.2*bk)/4.3, cH*(1.16),2).attr({
			"class": "score point",
			id:"pntsW",
			filter: f
		}),
		
		plB= gm.text((cW-.2*bk)/1.35, cH*(1.05), "Black").attr({
			"class": "score",
			filter: f
		}),
		
		plBS= gm.text((cW-.2*bk)/1.34, cH*(1.16),2).attr({
			"class": "score point",
			id:"pntsB",
			filter: f
		});
		
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
			var f = gm.filter(Snap.filter.shadow(0, 2, .7)),
				circle = gm.circle((x*bk+x1), (y*bk+y1),  r).attr({
					strokeWidth: 2,
					stroke: "#010",
					"stroke-opacity": .4,
					fill: "#060",
					id: (x+""+y),
					filter: f
				});
			//var text = gm.text((x*bk+x1), (y*bk+y1), x+""+y );
			circle.node.onclick = function (e){
				put(e);
			};
		}
			
	}
	playerB.inGame();
	document.getElementById("33").setAttribute("fill", "#fff");
	document.getElementById("44").setAttribute("fill", "#fff");
	document.getElementById("43").setAttribute("fill", "#000");
	document.getElementById("34").setAttribute("fill", "#000");
	
}

function put(circle){
	var id = parseInt(circle.target.id);
	console.log("click", id);
	obj=document.getElementById(circle.target.id);
	color=obj.getAttribute("fill");
	
	if(color=="#006600"){
		var srhArr= [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11];
		resArr =[];
		srhArr.forEach(verify);
		console.log (resArr, srhArr);
			if(change(circle.target.id)){
				var tmp = actualPlayer;
				actualPlayer=otPlayer;
			otPlayer = tmp;
			}
	}
	actualPlayer.inGame();
	document.getElementById("pntsB").innerHTML;
	document.getElementById("pntsW").innerHTML;
}

function change(circleID){
	var p = parseInt(circleID),
		last=0,
		changed= false;
		
	for(var i=0; i< resArr.length; i++){
		var offset = (parseInt(resArr[i])-p),
			next= String(offset+p);
		last=(search(offset, resArr[i], actualPlayer.color));
		console.log(i, resArr.length);
		if (last!==0&& p+offset!=last){
			for (var y = p; y!=(last);y+=offset){
				var aux = y<10?"0"+y:String(y);
				console.log("aux", aux);
				document.getElementById(aux).setAttribute("fill", actualPlayer.color);
				changed=true;
				if (circleID!==aux){
					console.log("remove",  aux);
					otPlayer.pieces.splice(otPlayer.pieces.indexOf(String(aux)),1);	
				}
				console.log(actualPlayer.pieces.indexOf(aux), aux);
				if(actualPlayer.pieces.indexOf(aux)==-1){
						actualPlayer.pieces.push(String(aux));
				}
			}
			
		}
	}
	return changed;
	
}

function search(offset, next, pcolor){
	
	if(parseInt(next)<10 && parseInt(next)>=0){
		next="0"+parseInt(next);	
	}
	console.log("next", (next));
	
	if ((String(next)).includes("8")|(String(next)).includes("9")|(parseInt(next)<0)|document.getElementById(next)==null){
		return 0;
	} else {
		if(document.getElementById(next).getAttribute("fill")=="#006600"){
			return 0;
		}
	}
	
	if(document.getElementById(next).getAttribute("fill")==pcolor){
		return (next);
	}
	
	return search(offset, String(parseInt(next)+offset), pcolor);		
	
}

function verify(circleID){
	console.log("verify", circleID);
	if(parseInt(circleID)<0|String(circleID).includes("8")|String(circleID).includes("9")){
		return;
	}
	if (circleID>=10){
		var tmp = otPlayer.getPieces.find(function(e){return (e==circleID)});
		if(tmp == undefined){
			return;
		}
		resArr.push(String(tmp));
		
	}
	else{
		var tmp = otPlayer.getPieces.find(function(e){return (e==0+""+circleID)});
		if(tmp == undefined){
			return;
		}
		resArr.push(0+""+circleID)
	}
	
}
