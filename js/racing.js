var oRoad = document.getElementById('road');
var oRyg = document.getElementById('ryg');
var oRacing = document.getElementById('racing');
var ready_p = oRacing.getElementsByTagName("p")[0];
var oClock = document.getElementById('clock');
var oS1 = oClock.getElementsByTagName("span")[0];
var oStart_line = document.getElementById('start_line');
var mycar = document.getElementById("mycar");
var addspeed = document.getElementById("speed");
var startbol = false;
var roadtimer = null;
var pengz = false;
var hinderaddtimer = null;
var sum = 0;
var mycarroadT=0;
var hinder_wrap = document.getElementById("hinder_wrap");
oStart_line.ot = oStart_line.offsetTop;
mycar.oh = mycar.offsetHeight;
mycar.ol = mycar.offsetLeft;

ready_p.style.display = "block";
setTimeout(function(){	
	oRyg.style.display = "block";
	setTimeout(function(){
		rygFn();
	},500)		
},500)
function rygFn(){
	setTimeout(function(){
		oRyg.src = "images/ready_yellow.png";
		setTimeout(function(){
			oRyg.src = "images/ready_green.png";
			
			start();
			startbol = true;
		},1000)
	},1000)
}

function start(){
	setTimeout(function(){
		oRyg.className = "animated fadeOutUp";
		ready_p.className = "animated fadeOutUp";
	},500)
	
	// oRyg.style.display = "none";
	// ready_p.style.display = "none";
	// $(oRoad).css({animation: "5680ms carmove linear infinite"})
	clockFn();
	moveFn();
}
var speed=1;
function moveFn(){
	var windowHeight = document.documentElement.clientHeight;	
	var roadT=0;
	var lineT=oStart_line.offsetTop;
	var ch=0;
	var foenum=0;
	var aHinder=[9,24,31];
	var aHinder2=[84,69,60];
	var lr=0;
	var ol=0;
	// $(oStart_line).css({animation: "2840ms linemove linear"});
	// $(oStart_line).css("transform","translate3d(0, 1500%, 0)")
	var hinderB = 0;
	for (var i = 0; i < 60; i++) {
		if (ch==0) {
			ch=1;
			if (lr!=1) {
				var rnd = Math.round(Math.random()*2);
				var rndL = Math.random()*15;
				var rndL = aHinder2[rnd]-rndL;
				hinderFn(rndL,hinderB);
			}else{
				
				lr=0;
				var rnd = Math.round(Math.random()*2);
				var rndL = 22+Math.random()*42;

				var time = Math.round(Math.random()*5);

					var car = foeFn(rndL,hinderB);	
					hinderB+=50;
					
			}
			hinderB+=100;
			
		}else{
			ch=0;
			foenum++;
			if (lr!=2) {
				var rnd = Math.round(Math.random()*2);
				var rndL = Math.random()*15;
				var rndL = aHinder[rnd]+rndL;
				hinderFn(rndL,hinderB);					
			}else{
				lr=0;
				var rnd = Math.round(Math.random()*2);
				var rndL = 22+Math.random()*42;

				var time = Math.round(Math.random()*5);
				
					var car = foeFn(rndL,hinderB);	
					hinderB+=50;	
								
			}
			hinderB+=100;
			
		};

		var rnd = Math.round(Math.random()*3);	
		if (foenum>rnd+1) {	
			if (rndL>=42) {
				lr=1;
			}else{
				lr=2;
			}
			foenum=0;
		}


	};

	// $("#hinder_wrap").css({animation: "30s hindermove linear"});
	var hwrapT=hinder_wrap.offsetTop;
	var hwrapT=0;

	var abc = $(oStart_line).css('transform');
	arr = abc.split(",");
	var tranT = arr[arr.length-1].split(")")[0];
	// alert(tranT);
	var lineT = Number(tranT);
	roadtimer = setInterval(function  () {
		roadT+=speed*2;
		hwrapT+=speed*2;
		lineT+=speed*2;
		// hwrapT+=speed*2;
		var abc = $(hinder_wrap).css('transform');
		arr = abc.split(",");
		var tranT = arr[arr.length-1].split(")")[0];
		$(hinder_wrap).css("transform","translate3d(0, "+hwrapT+"px, 0)")

		if (windowHeight<=lineT) {
			lineT=windowHeight;
		};

		$(oStart_line).css("transform","translate3d(0, "+lineT+"px, 0)")

		// hinder_wrap.style.top=hwrapT+"px";
		if (windowHeight<=roadT) {
			roadT=0;
			$(oRoad).css("transform","translate3d(0, "+roadT+"px, 0)")
				
		}else{
			$(oRoad).css("transform","translate3d(0, "+roadT+"px, 0)")
		}	
		var abc = $(oRoad).css('transform');
		arr = abc.split(",");
		var tranT = arr[arr.length-1].split(")")[0];
		// $(oRoad).css("transform","translate3d(0, "+roadT+"px, 0)")

		
	},20);
}

function foeFn(rndL,hinderB){
	var windowHeight = document.documentElement.clientHeight;	
	var windowWidth = document.documentElement.clientWidth;	
	var car = createfoe();
	var hinderB=hinderB;
	car.style.left = rndL + "%";
	car.style.bottom = hinderB + "px";
	var bol=true;
	var cartimer = setInterval(function(){

		var abc = $(hinder_wrap).css('transform');
		arr = abc.split(",");
		var tranT = arr[arr.length-1].split(")")[0];

		var l1=mycar.ol+10;
		var r1=l1+mycar.offsetWidth-20;
		var t1=mycar.offsetTop+10;
		var b1=t1+mycar.oh-35;


		var l2=car.offsetLeft;
		var r2=l2+car.offsetWidth;
		var t2=tranT-hinderB-car.offsetHeight;
		var b2=t2+car.offsetHeight;
		if (bol && t2>100) {
			if (l1<l2) {
				car.children[1].style.visibility="visible";
				car.children[2].style.left="0px";
			}else{
				car.children[2].style.visibility="visible";
				car.children[1].style.left="0px";
			}
			bol=false
		};
		if (car.children[1].offsetLeft==0) {
			var l3=0;
		}else{
			var l3=car.offsetLeft+car.offsetWidth*-0.37;
		}
		
		var r3=l3+car.children[1].offsetWidth;
		var t3=tranT-hinderB-car.offsetHeight-car.offsetHeight*0.67;
		var b3=t3+car.children[1].offsetHeight;

		
		var l4=car.offsetLeft;
		if (car.children[2].offsetLeft==0) {
			var r4=0;
		}else{
			var r4=l4+car.children[2].offsetWidth+car.offsetWidth*0.77;
		}
		var t4=tranT-hinderB-car.offsetHeight-car.offsetHeight*0.67;
		var b4=t4+car.children[2].offsetHeight;



		if (r1>l2&&b1>t2&&t1<b2&&l1<r2 || r1>l3&&b1>t3&&t1<b3&&l1<r3 || r1>l4&&b1>t4&&t1<b4&&l1<r4){
			pengz = true;
			gameover();
			// alert("")
			clearInterval(cartimer);
		}else{
			if (b1<t2) {
				sum++;
				clearInterval(cartimer)
			};
		}
	},50)
	return car;
}

function hinderFn(rndL,hinderB){
	var windowHeight = document.documentElement.clientHeight;	
	var hinder = createhinder();
	var hinderB=hinderB;
	hinder.style.left = rndL + "%";
	hinder.style.bottom = hinderB + "px";
	setTimeout(function(){
		var hindertimer = setInterval(function(){
			var abc = $(hinder_wrap).css('transform');
			arr = abc.split(",");
			var tranT = arr[arr.length-1].split(")")[0];
			
			var l1=mycar.ol+10;
			var r1=l1+mycar.offsetWidth-20;
			var t1=mycar.offsetTop+10;
			var b1=t1+mycar.oh-35;

			var l2=hinder.offsetLeft;
			var r2=l2+hinder.offsetWidth;
			var t2=tranT-hinderB-hinder.offsetHeight;
			var b2=t2+hinder.offsetHeight;

			if (r1>l2&&b1>t2&&t1<b2&&l1<r2){
				pengz = true;
				gameover();
				clearInterval(hindertimer)
			}else{
				if (b1<t2) {
					sum++;
					clearInterval(hindertimer)
				};
			}
		},50)

	},hinderB*5)
	
}
var clocktimer=null;
function clockFn(){		

	var num=30;
	var str;
	clocktimer = setInterval(function(){
		num--;
		if (num<=0) {

		oS1.innerHTML = "0:0:00";	
		gameover();
		clearInterval(clocktimer);
		return;				
		};
		if (num<10) {
			str="0"+num;
		}else{
			str=num;
		}
		
		oS1.innerHTML = "0:0:"+str ;			
	}, 1000);
}

function createhinder(){
	var hinder=document.createElement("img");
	hinder.src="images/hinder.png";
	hinder.className = "hinder";
	$("#hinder_wrap").get(0).appendChild(hinder);
	return hinder;
}
function createfoe(){
	var hinder=document.createElement("div");
	var img1=document.createElement("img");
	var img2=document.createElement("img");
	var img3=document.createElement("img");
	img1.src="images/foe_car.png";
	img1.className = "foe_car";
	img2.src="images/foe_l.png";
	img2.className = "foe_l";
	img3.src="images/foe_r.png";
	img3.className = "foe_r";
	hinder.appendChild(img1);
	hinder.appendChild(img2);
	hinder.appendChild(img3);
	hinder.className = "foe";
	$("#hinder_wrap").get(0).appendChild(hinder);
	return hinder;
}
function gameover(){
	// $(".hinder").css({"animation-playState":"paused"})
	// $(".foe").css({"animation-playState":"paused"})
	// $(oRoad).css({"animation-playState":"paused"})
	$(hinder_wrap).css({"animation":"none"})

	$(oRoad).css({"animation":"none"})
	// alert("");
	startbol=false;
	clearInterval(roadtimer);
	clearInterval(clocktimer);
	clearInterval(mycartimer);
	clearInterval(hinderaddtimer);
	if (pengz==false) {
		$(start_line).css("transform","translate3d(0, 765%, 0)")
		$(start_line).css({animation: "1500ms linemove2 linear",visibility:"visible"});
	};
	alert(sum);
}
var mycartimer=null;

touch.on("#btnl","touchstart",function(ev){
	if (startbol==false) {return};
	clearInterval(mycartimer);
	var mycarL = mycar.ol;
	var windowWidth = document.documentElement.clientWidth;	
	var l = 0.09305*windowWidth;
	var roadT=mycarroadT;
	mycartimer = setInterval(function(){
		mycarL-=speed*2;
		roadT-=speed*2;				
		if (mycarL<=l) {
			mycarL=l;
		};
		if (roadT<=-mycar.offsetWidth*2.33628) {
			roadT=-mycar.offsetWidth*2.33628;
		};		
		mycar.ol = mycarL;
		mycarroadT=roadT;
		$(mycar).css("transform","translate3d("+roadT+"px, 0, 0)")
	},20)
	ev.preventDefault();
});	
touch.on("#btnl","touchend",function(){
	clearInterval(mycartimer);
});	

touch.on("#btnr","touchstart",function(ev){
	if (startbol==false) {return};
	clearInterval(mycartimer);
	var mycarL = mycar.ol;
	var windowWidth = document.documentElement.clientWidth;	
	var l = windowWidth-0.09305*windowWidth-mycar.offsetWidth;
	var roadT=mycarroadT;
	mycartimer = setInterval(function(){
		mycarL+=speed*2;
		roadT+=speed*2;
		if (mycarL>=l) {
			mycarL=l;
		};
		if (roadT>=mycar.offsetWidth*2.33628) {
			roadT=mycar.offsetWidth*2.33628;
		};		
		mycarroadT=roadT;
		mycar.ol = mycarL;
		$(mycar).css("transform","translate3d("+roadT+"px, 0, 0)")	

	},20)
	ev.preventDefault();
});	
touch.on("#btnr","touchend",function(){	
	clearInterval(mycartimer);
});	

touch.on(window, 'touchstart', function(ev){
	ev.preventDefault();
	ev.cancelBubble = true; 
	ev.stopPropagation(); 
});

addspeed.bol=true;
touch.on("#speed","tap",function(){
	if (startbol==false) {return};
	if (addspeed.bol==true) {
		addspeed.src = "images/cut_speed.png";
		mycar.src = "images/mycar_add.png"
		speed=2;
		addspeed.bol=false;
		// $(oRoad).css({animation: "2840ms carmove linear infinite"})

	}else{
		addspeed.src = "images/add_speed.png";
		mycar.src = "images/mycar.png"
		speed=1;
		addspeed.bol=true;

		// $(oRoad).css({animation: "5680ms carmove linear infinite"})
	}
	
})

// var browser = {
// versions: function () {
// var u = navigator.userAgent, app = navigator.appVersion;
// return { //移动终端浏览器版本信息 
// ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
// android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
// iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
// iPad: u.indexOf('iPad') > -1, //是否iPad 
// };
// }(),
// }
// if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
// 	alert("1");
// }
// if (browser.versions.android) {
// 	alert("2");
// }