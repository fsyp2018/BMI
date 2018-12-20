var btn = document.querySelector('.rbut');

function saveBMI(e) {
	var heightrs = document.querySelector('.height').value;
    var weightrs = document.querySelector('.weight').value;
	if (heightrs !=="" && weightrs !==""){
		    var hwresult =(parseFloat(weightrs) / parseFloat(Math.pow((heightrs/100),2))).toFixed(1);
	} else {
		alert("請輸入身高或體重");
	}
	if (hwresult >= 40) {
		alert("重度肥胖");
	} else if (hwresult >= 35) {
		alert("中度肥胖");		
	} else if (hwresult >= 30) {
		alert("輕度肥胖");		
	} else if (hwresult >= 25) {
		alert("過重");		
	} else if (hwresult >= 18.5) {
		alert("理想");		
	} else if (hwresult <= 18.4) {
		alert("過輕");		
	}

    localStorage.setItem('height',heightrs);
    localStorage.setItem('weight',weightrs);
    localStorage.setItem('hwresult',hwresult);
}


btn.addEventListener('click', saveBMI);