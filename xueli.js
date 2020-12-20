var time = 0;//总计用时，单位s

//设置一个一维数组d，用来保存#game里div的编号
var d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0];
//d[9]=0表示空白块

//设置一个二维数组ToGoArray用来保存#game里div所有可去的位置
var ToGoArray = [
		[0], //ToGoArray[0]没用到，没意义
		[2,  4],//第一个方块只能向右向下移动，就是可移动到2，4这两个位置，即ToGoArray[1]即【2，4】
		[1, 3, 5],//第二个方块只能向左向右向下移动，就是可移动到1，3，5位置，即ToGoArray[2]即【1，3，5】
		[2, 6],
		[1, 5, 7],
		[2, 4, 6, 8],
		[3, 5, 9],
		[4, 8],
		[5, 7, 9],
		[6, 8]
	];
	
//设置一个二维数组LeftTopArray用A来保存#game里每个div的位置定位
//第一个表示left: px, 第二个表示top: px
var LeftTopArray = [
		[0],//LeftTopArray【0】用不到的
		[0, 0],
		[100, 0],
		[200, 0],
		[0, 100],
		[100, 100],
		[200, 100],
		[0, 200],
		[100, 200],
		[200, 200]
	];
var pause = true;//游戏正在进行状态，此时按钮显示的是‘暂停’

//改id的left值，实现交换位置的目的
function changeLeft(id, num) {
	document.getElementById(id).style.left = num + "px";
}
//改top值
function changeTop(id, num) {
	document.getElementById(id).style.top = num + "px";
}

function move(num){
	var i;
	//先找到点击的是哪个方块
	for(i = 1; i <= 9; i++) {
		if(d[i] === num)
			break;
	}
	var j;//可移动的话，移动到哪个位置
	for(j = 0; j < ToGoArray[i].length; j++) {
		if(d[ ToGoArray[i][j] ] === 0) {
			//可移动
			d[i] = 0;//移动方块去往空位置
			d[ ToGoArray[i][j] ]=num;
			changeLeft("d" + num, LeftTopArray[ ToGoArray[i][j] ][0]);
			changeTop("d" + num, LeftTopArray[ ToGoArray[i][j] ][1]);
			break;
		}
	}
	var flag = 1;//标记方块与数字全部匹配完成
	for(var i = 0; i <= 8; i++) {
		if(d[i] != i) {
			flag = 0;//游戏还没结束呢，有不匹配的
			break;
		}
	}
	if(flag) {
		if(!pause)//变成暂停状态
			begin();
		alert("游戏结束！你已通关！厉害！");
	}
}
var timer;//定时器

function begin() {
	if(pause) {
		pause = false;//改变状态，
		//游戏启动
		document.getElementById("begin").innerHTML = "暂停";
		timer = setInterval(function() {
			time += 1;
			var fen = parseInt(time / 60);
			var miao = time % 60;
			document.getElementById("jishi").innerHTML = fen + "分" + miao + "秒";
		}, 1000);//开始计时
	} else {
		pause = true;
		//此时游戏变成暂停的状态，显示文字‘开始’，
		document.getElementById("begin").innerHTML = "开始";
		clearInterval(timer);//暂停计时
	}
}

function rebegin() {
	time = 0;//重置时间
	//保持页面一加载初就是游戏正在进行的状态
	if(pause) begin();
	//设tmp交换中介
	var temp = d[to];
	d[to] = d[i];
	d[i] = temp;
	for(var i = 1; i <= 9; i++){
		var to = parseInt(Math.random() * (i - 1) + 1);//随机产生数字1-9
		//d[i]与d[to]进行交换，=0意味着空格，不用加样式了
		if(d[i] !== 0) {
			changeLeft("d" + d[i], LeftTopArray[to][0]);
			changeTop("d" + d[i], LeftTopArray[to][1]);
		}
		if(d[to] !== 0) {
			changeLeft("d" + d[to], LeftTopArray[i][0]);
			changeTop("d" + d[to], LeftTopArray[i][1]);
		}
		
	}
}

