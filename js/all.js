var btn = document.querySelector('.rbut');
var now = new Date();
var totalresult = JSON.parse(localStorage.getItem('BMIlist')) || [];

function saveBMI() {
	//取得身高體重數值
	var heightrs = document.querySelector('.height').value;
	var weightrs = document.querySelector('.weight').value;
	//判斷是否有輸入身高體重數值，並算出BMI
	if (heightrs !== "" && weightrs !== "") {
		var hwresult = (parseFloat(weightrs) / parseFloat(Math.pow((heightrs / 100), 2))).toFixed(1);
	} else {
		alert("請輸入身高或體重");
		return
	}
	//判斷BMI肥胖度
	if (hwresult >= 40) {
		var obesity = '重度肥胖';
		var grade = 'lev6';
	} else if (hwresult >= 35) {
		var obesity = '中度肥胖';
		var grade = 'lev5';
	} else if (hwresult >= 30) {
		var obesity = '輕度肥胖';
		var grade = 'lev4';
	} else if (hwresult >= 25) {
		var obesity = '過重';
		var grade = 'lev3';
	} else if (hwresult >= 18.5) {
		var obesity = '理想';
		var grade = 'lev2';
	} else if (hwresult <= 18.4) {
		var obesity = '過輕';
		var grade = 'lev1';
	}
	//取得現在時間
	var nowtime = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒';
	console.log(obesity);
	console.log(grade);
	console.log(nowtime);
	localStorage.setItem('height', heightrs);
	localStorage.setItem('weight', weightrs);
	localStorage.setItem('hwresult', hwresult);
	//將取得的數值存進陣列
	var todo = {
		height: heightrs,
		weight: weightrs,
		BMI: hwresult,
		nowtime: nowtime,
		obesity: obesity,
		grade: grade
	}
	console.log(todo);
	//將陣列以JSON方式輸入至localstorage
	totalresult.push(todo);
	localStorage.setItem('BMIlist', JSON.stringify(totalresult));
}

function updatelist(){

}
//監聽看結果按鈕
btn.addEventListener('click', saveBMI);