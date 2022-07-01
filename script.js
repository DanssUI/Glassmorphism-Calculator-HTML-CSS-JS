 
 const root = document.documentElement;
 const outputDisplay = document.getElementById("hasil");
 const tempCalc = document.getElementById("preview");
 const allbutton = document.querySelectorAll("button");
 var historyColumn = document.querySelectorAll("#hcol");
 const historytab = document.querySelector(".history");
 const settingRiple = document.querySelector(".setting-riple");
 const setting = document.querySelector(".setting");
 const settingForm = document.querySelector(".setting-form");
 const opacitySlider = document.querySelector(".slider-opacity");
 const bgHolder = document.getElementById("background");
 
 let boolkoma = 0;
 let boolOp = 0;
 let opsatukali = 0;
 
 var memriwayat = ["1+1"];
 
 if (JSON.parse(localStorage.getItem("riwayat")) == null){
 	memriwayat = ["1+1"];
    localStorage.setItem("riwayat", JSON.stringify(memriwayat));
	var memriwayat = JSON.parse(localStorage.getItem("riwayat"));
 }else{
	var memriwayat = JSON.parse(localStorage.getItem("riwayat"));
 }
 
 updatehColumn();

	//Setting
	function openSetting(){
		setting.style.display="flex";
		settingRiple.style="animation-name: setting-span; animation-duration: 3s;"; setTimeout(function() {settingRiple.style="transform: scale(100);"}, 2500);
		settingForm.style= "display: flex; animation-name: fadein; animation-duration: 3.5s; animation-delay: .8s;" ; setTimeout(function() {settingForm.style.opacity="1"}, 3300);
	}
	
	function closeSetting(){
		settingRiple.style="animation-name: setting-span; animation-duration: 1.5s; animation-direction: reverse;"; setTimeout(function() {settingRiple.style="transform: scale(1);"; setting.style.display="none";}, 1600);
		settingForm.style= "animation-name: fadeout; animation-duration: 1s;"; setTimeout(function() {settingForm.style.display="none"}, 1000);
	}
	
	changeTheme(0);
	
	function changeTheme(val){
		if (val == 0) {
			removeBackground();
			root.style.setProperty("--colorTheme", "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)");
			whiteTheme();
		} else if (val == 2) {
			removeBackground();
			root.style.setProperty("--colorTheme", "linear-gradient(60deg, rgba(153,0,255,1) 13%, rgba(0,212,255,1) 100%)");
			blueTheme();
		} else if (val == 1) {
			removeBackground();
			root.style.setProperty("--colorTheme", "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(55,55,55,1) 100%)");
			blackTheme();
		}
	}

	opacitySlider.oninput = function() {root.style.setProperty("--glass", opacitySlider.value / 100);}

	//historyTabTogle
	document.querySelector(".container").addEventListener("click", function(){historytab.style.height = "50px"; showhistab(0); updatehColumn(); });
    historytab.addEventListener('click', function(event) {
    	if (window.innerWidth < 900) {
    		historytab.style.height = "70vh";
    	}else{
     		historytab.style.height = "30vh";
    	}
    	
    	event.stopPropagation();
    	showhistab(1);
    	updatehColumn();
    });
    
    //ButtonHandler
	allbutton.forEach(allbutton => {
		if(allbutton.id != "nan"){
			allbutton.addEventListener("click", function(){inputnmr('' + allbutton.innerHTML + '');});
		}
	});
	
	
   //InputSystem
   function inputnmr(masukan){
      if (outputDisplay.innerHTML == "0") {
          outputDisplay.innerHTML = "" + masukan;
      } else{
          outputDisplay.innerHTML += "" + masukan;
      }
      
      opsatukali = 0;
      
      if (boolOp == 1) {
          boolOp = 2
      }
      
      hitungsementara();
      
      if (boolOp == 2) {
          boolkoma = 0
      }
      
   }
   
   function koma(){
       if (boolkoma == 0) {
           outputDisplay.innerHTML += ".";
           boolkoma = 1;
           boolOp = 3;
       }
   }
   
   function operator(op){
       
       let indexOperasi = "";
       boolOp = 1;
       
       if (opsatukali == 0) {
           if (op == 0) {
           indexOperasi = "+";
           
           } else if (op == 1) {
           if (outputDisplay.innerHTML == "0") {
               indexOperasi = "";
               outputDisplay.innerHTML = "-";
           }else{
               indexOperasi = "-";
           }
           
           }else if (op == 2) {
             indexOperasi = "×";
           
           } else if (op == 3) {
             indexOperasi = "÷";
           }
       
        outputDisplay.innerHTML += indexOperasi;
        opsatukali = 1;
        
       }
       
       hitungsementara();
   }
   
   function backspace(){
       if (outputDisplay.innerHTML.length < 2) {
           outputDisplay.innerHTML = 0;
       }else{
           
         let backSpace = outputDisplay.innerHTML.substring(0, outputDisplay.innerHTML.length - 1);
         outputDisplay.innerHTML = backSpace;
       
       }
       
       boolOp -= 1;
       hitungsementara();
   }
   
   function hitung(){
   	
   	   riwayat(outputDisplay.innerHTML);
     
       outputDisplay.innerHTML = outputDisplay.innerHTML.replace(/×/g, "*");
       outputDisplay.innerHTML = outputDisplay.innerHTML.replace(/÷/g, "/");
       
       outputDisplay.innerHTML = eval(outputDisplay.innerHTML);
       
       boolOp = 0;
       hitungsementara();
       
   }
  
   function hitungsementara(){
      if (boolOp >= 2) {
      	
      	let outtmp = outputDisplay.innerHTML;
        
    	 tempCalc.style = "visibility:unhidden";
      
    	 outtmp = outtmp.replace(/×/g, "*");
    	 outtmp = outtmp.replace(/÷/g, "/");
       
    	tempCalc.innerHTML = eval(outtmp);
      
      } else {
          
         tempCalc.style = "visibility:hidden";
      
      }
      
  }
     
   function bersihkan(){
       outputDisplay.innerHTML = "0";
       boolOp = 0;
       boolkoma = 0;
       hitungsementara();
   }
   
   
    //HistorySystem
    function riwayat(val){
    	memriwayat.unshift("" + val + "");
    	updatehColumn();
    	addRemoveColumn();
    	localStorage.setItem("riwayat", JSON.stringify(memriwayat));
    	console.log(JSON.parse(localStorage.getItem("riwayat")));
    	setTimeout(function() {if (historyColumn.length > 0) {historyColumn[0].innerHTML = val}}, 200);
    }
    
    function showhistab(val){
    	historyColumn = document.querySelectorAll("#hcol");
    	if (val == 0) {
			for (var i = 0; i < historyColumn.length; i++) {
				historyColumn[i].style = "display: hidden; opacity: 0";
			}
    	} else{
    		for (var i = 0; i < historyColumn.length; i++) {
				historyColumn[i].style = "display: block; opacity: 1";
			}
    	}
    }
   
	function updatehColumn(){
		if (historyColumn.length != memriwayat.length) {
			if (memriwayat.length <= 5) {
				addRemoveColumn();
			}else{
				memriwayat.pop();
				addRemoveColumn();
			}
		}
	}
	
	function addRemoveColumn(){
		var memriwayat = JSON.parse(localStorage.getItem("riwayat"));
		for (var i = 0; i < memriwayat.length; i++) {
			historyColumn.forEach(historyColumn => {historyColumn.remove();});
			
			const htab = document.createElement("button");
			htab.onclick = function() {inputnmr(htab.innerHTML); boolOp = 2; hitungsementara();};
			htab.id = "hcol";
			htab.innerHTML = memriwayat[i];
			document.querySelector(".history div").appendChild(htab);
		}
	}
	
	function clearHistory(){
		memriwayat = [];
    	localStorage.setItem("riwayat", JSON.stringify(memriwayat));
		historyColumn.forEach(historyColumn => {historyColumn.remove();});
    	addRemoveColumn();
	}
   
   
   function removeBackground(){
		let blueCir = document.querySelectorAll(".background .blue-cir");
		let whiteCir = document.querySelectorAll(".background .white-cir");
		let blackCir = document.querySelectorAll(".background .black-cir");

		blueCir.forEach(blueCir => {blueCir.remove()});
		whiteCir.forEach(whiteCir => {whiteCir.remove()});
		blackCir.forEach(blackCir => {blackCir.remove()});
   }
   
   function whiteTheme(){
   	 let jmlcir = Math.floor(Math.random() * (3 - 2 + 1) + 2);
   	  
   	  for (var i = 0; i < jmlcir; i++) {
   	  	const cir = document.createElement("span");
   	  	cir.className = "white-cir";
   	  	
   	  	let rsize = Math.floor(Math.random() * (50 - 20 + 1) + 20);
   	  	let rpos = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
   	  	
   	  	cir.style.right= rpos + "%"; cir.style.top= rpos + "%";
   	  	cir.style.width= rsize + "vh";
   	  	cir.style.height= rsize + "vh";
   	  	
   		bgHolder.appendChild(cir);
      }
      
    root.style.setProperty("--themeSceme", "#B7B7B7");
   	root.style.setProperty("--fontColor", "black");
	document.querySelector(".del-btn").style = "background-image: url('Img/delete.png')";
   	document.querySelector(".setting-btn").style = "background-image: url('Img/setting.png')";
   	
   }
   
   //RandomCircleBackground
   function blueTheme(){
   	 let jmlcir = Math.floor(Math.random() * (3 - 2 + 1) + 2);
   	  
   	  for (var i = 0; i < jmlcir; i++) {
   	  	const cir = document.createElement("span");
   	  	cir.className = "blue-cir";
   	  	
   	  	let rsize = Math.floor(Math.random() * (80 - 20 + 1) + 20);
   	  	let rpos = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
   	  	
   	  	cir.style.right= rpos + "%"; cir.style.top= rpos + "%";
   	  	cir.style.width= rsize + "vh";
   	  	cir.style.height= rsize + "vh";

   		bgHolder.appendChild(cir);
      }
      
    root.style.setProperty("--themeSceme", "#B7B7B7");
   	root.style.setProperty("--fontColor", "black");
   	document.querySelector(".del-btn").style = "background-image: url('Img/delete.png')";
   	document.querySelector(".setting-btn").style = "background-image: url('Img/setting.png')";
   	
   }
   
   function blackTheme(){
   	root.style.setProperty("--fontColor", "white");
   	root.style.setProperty("--glass", 0);
   	root.style.setProperty("--themeSceme", "#2F2F2F");
   	
   	document.querySelector(".del-btn").style = "background-image: url('Img/delete-white.png')";
   	document.querySelector(".setting-btn").style = "background-image: url('Img/setting-white.png')";
   	document.querySelector(".slider-opacity").value = 0;
   	
   	//for (var i = 0; i < historyColumn.length; i++) {
   	//	historyColumn[i].style = "background-color: #5A5A5A";
   	//}
   	
   }