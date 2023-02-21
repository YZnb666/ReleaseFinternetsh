var newfish = document.createElement('img');
newfish.src = "img/7adc86eb3fec347057f0110b658fa3c7.png";
newfish.style.position = 'absolute';
newfish.style.width = '220px';
newfish.style.height = '200px';
newfish.style.left = '575px';
newfish.style.top = '500px';
newfish.style.transaction = '0.5s';
newfish.setAttribute('id','fish');

var Mx = 0;
var My = 0;
var drag = 0;
var box = mui('body')[0];
var water = mui('#shuihua')[0];
var score = 0;
var fishlevel = 1;
var uplevelmerits = 10;

document.ondragstart=function(){return false}

box.appendChild(newfish);

window.onload = function(){
	fishlevel = parseInt(localStorage.getItem('level'));
	uplevelmerits = parseInt(localStorage.getItem('levelmerits'));
	score = parseInt(localStorage.getItem('merits'));
	mui('#merit')[0].innerHTML = 'merits:' + score;
	mui('#needmerits')[0].innerHTML = 'need:' + uplevelmerits;
	mui('#level')[0].innerHTML = 'level:' + fishlevel;
}

function reset(){
	var choose = confirm('ARE YOU SURE?!?!?!?!YOU WILL LOSE ALL MERITS')
	if (choose == true) {
		score = 0;
		fishlevel = 1;
		uplevelmerits = 10;
		mui('#merit')[0].innerHTML = 'merits:' + score;
		mui('#needmerits')[0].innerHTML = 'need:' + uplevelmerits;
		mui('#level')[0].innerHTML = 'level:' + fishlevel;
		localStorage.setItem('level',fishlevel);
		localStorage.setItem('levelmerits',uplevelmerits);
		localStorage.setItem('merits',score);
	}
}

function fishlevelup(){
	if (score >= uplevelmerits){
		fishlevel++;
		uplevelmerits = uplevelmerits*2;
		localStorage.setItem('level',fishlevel);
		localStorage.setItem('levelmerits',uplevelmerits);
		mui('#merit')[0].innerHTML = 'merits:' + score;
		mui('#needmerits')[0].innerHTML = 'need:' + uplevelmerits;
		mui('#level')[0].innerHTML = 'level:' + fishlevel;
	}
}

newfish.onmousedown = function(){
	drag = 1;
	document.onmousemove = function(){
		if(drag == 1){
			newfish.style.transform = 'scale(1.1)';
			Mx = window.event.clientX - 110;
			My = window.event.clientY - 100;
			mui('#fish')[0].style.left = Mx + 'px';
			mui('#fish')[0].style.top = My + 'px';
		}
	}
}
newfish.onmouseup = function(){
	drag = 0;
	newfish.style.transform = 'scale(1)'
	if(My < 200){
		box.removeChild(mui('#fish')[0]);
		water.style.left = Mx + 'px';
		water.style.top = My + 'px';
		water.style.display = 'block';
		score = score + fishlevel
		mui('#merit')[0].innerHTML = 'merits:' + score;
		localStorage.setItem('merits',score);
		water.style.transform = 'scale(1.5)';
		setTimeout(function(){
			water.style.transform = 'scale(0.5)';
			setTimeout(function(){
				water.style.display = 'none'
				}, 400);
		}, 300);
		newfish.style.left = '575px';
		newfish.style.top = '500px';
		box.appendChild(newfish);
	}
}
