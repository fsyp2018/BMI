var btn = document.querySelector('.rbut');
var now = new Date();
var totalresult = JSON.parse(localStorage.getItem('BMIlist')) || [];
var listrecord = document.querySelector('.listrecord');
var cotestop = document.querySelector('.cotestop');
var cotes = document.querySelector('.cotes');
var imgss = document.querySelector('.imgss');
var refresh = document.querySelector('.refresh');
var BMI = 0;
var obesity = '';
var clearlist = document.querySelector('.clearlist');

//監聽
btn.addEventListener('click', saveBMI);
imgss.addEventListener('click', re);
clearlist.addEventListener('click', deleteList);
//第一次開瀏覽器取得舊資料
updatelist(totalresult);

function saveBMI() {
	//取得身高體重數值
	var heightrs = document.querySelector('.height').value;
	var weightrs = document.querySelector('.weight').value;
	//判斷是否有輸入身高體重數值，並算出BMI
	if (heightrs !== "" && weightrs !== "") {
		BMI = (parseFloat(weightrs) / parseFloat(Math.pow((heightrs / 100), 2))).toFixed(1);
	} else {
		alert("請輸入身高或體重");
		return
	}
	//判斷BMI肥胖度
	if (BMI >= 40) {
		obesity = '重度肥胖';
		var grade = 'lev6';
	} else if (BMI >= 35) {
		obesity = '中度肥胖';
		var grade = 'lev5';
	} else if (BMI >= 30) {
		obesity = '輕度肥胖';
		var grade = 'lev4';
	} else if (BMI >= 25) {
		obesity = '過重';
		var grade = 'lev3';
	} else if (BMI >= 18.5) {
		obesity = '理想';
		var grade = 'lev2';
	} else if (BMI <= 18.4) {
		obesity = '過輕';
		var grade = 'lev1';
	}

	//取得現在時間
	var nowtime = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分';
	// console.log(obesity);
	// console.log(grade);
	// console.log(nowtime);
	// localStorage.setItem('height', heightrs);
	// localStorage.setItem('weight', weightrs);
	// localStorage.setItem('BMI', BMI);
	//將取得的數值存進陣列
	var todo = {
		height: heightrs,
		weight: weightrs,
		BMI: BMI,
		nowtime: nowtime,
		obesity: obesity,
		grade: grade
	}
	// console.log(todo);
	//將陣列以JSON方式輸入至localstorage
	totalresult.push(todo);
	localStorage.setItem('BMIlist', JSON.stringify(totalresult));
	updatelist(totalresult);
	changebtn(todo);
}

//將結果輸入紀錄列表
function updatelist(totalresult) {
	var str = '';
	var len = totalresult.length;
	for (i = len - 1; i >= 0; i--) {
		str += '<div class="boxcolor" id=' + totalresult[i].grade + '></div><li><table><tr><td>' + totalresult[i].obesity + '</td><td><span>BMI</span>' + totalresult[i].BMI + '</td><td><span>weight</span>' + totalresult[i].weight + 'KG</td><td><span>height</span>' + totalresult[i].height + 'cm</td><td><span>' + totalresult[i].nowtime + '</span></td></tr></table></li>';
	}
	listrecord.innerHTML = str;
}

//改結果按鈕
function changebtn(todo) {
	btn.setAttribute('style', 'display:none');
	cotestop.setAttribute('style', 'display:block');
	var str = '<p>' + BMI + '</p><p>BMI</p><p>' + obesity + '</p>';
	switch (obesity) {
		case '過輕':
			cotes.setAttribute('style', 'color:#31BAF9; border: 4px solid #31BAF9; ');
			imgss.setAttribute('style', 'background: #31BAF9');
			break;
		case '理想':
			cotes.setAttribute('style', 'color:#86D73F; border: 4px solid #86D73F;');
			imgss.setAttribute('style', 'background: #86D73F');
			break;
		case '過重':
			cotes.setAttribute('style', 'color:#FF982D; border: 4px solid #FF982D;');
			imgss.setAttribute('style', 'background: #FF982D');
			break;
		case '輕度肥胖':
			cotes.setAttribute('style', 'color:#FF6C03; border: 4px solid #FF6C03;');
			imgss.setAttribute('style', 'background: #FF6C03');
			break;
		case '中度肥胖':
			cotes.setAttribute('style', 'color:#FF6C03; border: 4px solid #FF6C03;');
			imgss.setAttribute('style', 'background: #FF6C03');
			break;
		case '重度肥胖':
			cotes.setAttribute('style', 'color:#FF1200; border: 4px solid #FF1200;');
			imgss.setAttribute('style', 'background: #FF1200');
			break;
	}
	cotes.innerHTML = str;
}

//重新整理
function re(e) {
	e.preventDefault();
	window.location.reload();
}

//清除localStorage資料
function deleteList() {
	localStorage.removeItem('BMIlist');
	totalresult =[];
	updatelist(totalresult);
}
