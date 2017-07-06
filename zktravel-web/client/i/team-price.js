window.onload = function(){
	var time = true;
	var btn = document.getElementById('btn');
	var close = document.getElementById('close');
	var dialog = document.getElementById('dialog');
	var mubu = document.getElementById('mubu');
	var tog = document.getElementsByClassName('toggle-main');
	for(var i=0;i<tog.length;i++){
		tog[i].onclick = function(){
			toggle(this);
		}
	}
	function toggle(obj) {
	 if(time){
	 	var x = obj.parentNode.parentNode;
	 	var toggle = obj.nextSibling;
	 	if(x.nodeType !=1){
	 		x = x.parentNode;
	 		}
	 		y = x.nextSibling;
	 		if(y.nodeType !=1){
	 			y = y.nextSibling;
	 		}
	 		y.style.display = "block";
	 		if(toggle.nodeType !=1){
	 			toggle = toggle.nextSibling;
	 		}
	 		toggle.className = 'arrow3';
	 		time = !time;
	 	}else{
	 		var x = obj.parentNode.parentNode;
	 		var toggle = obj.nextSibling;
	 		if(x.nodeType !=1){
	 			x = x.parentNode;
	 		}
	 		y = x.nextSibling;
	 		if(y.nodeType !=1){
	 			y = y.nextSibling;
	 		}
	 		y.style.display = "none";
	 		if(toggle.nodeType !=1){
	 			toggle = toggle.nextSibling;
	 		}
	 		toggle.className = 'toggle';
	 		time = !time;
        }
	 }
	 
 	/*window.onresize = dialogWh;  
 	dialogWh(); 
	function dialogWh(obj){  
	   var screenWidth  = window.screen.width;  
	   var screenHeigth = window.screen.height;
	   dialog.style.height = screenHeigth+"px";
	   
	}*/
	btn.onclick = function (){
		mubu.style.display = "block";
		dialog.style.display = "block";
	}
	close.onclick = function (){
		dialog.style.display = "none";
		mubu.style.display = "none";
	}
	mubu.onclick = function (){
		dialog.style.display = "none";
		mubu.style.display = "none";
	}
}