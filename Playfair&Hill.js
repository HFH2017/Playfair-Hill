//页面加载后的初始化
window.onload = function() {
	if (!document.getElementsByClassName) {
		return;
	}

	var inputRow = document.getElementsByClassName("inputRow");
	var PlayfairBtn = document.getElementById("PlayfairBtn");
	var HillBtn = document.getElementById("HillBtn");
	var PlayfairResult = document.getElementById("PlayfairResult");
	var HillResult = document.getElementById("HillResult");
	var tips = document.getElementsByClassName("tips");
	var keyInput = inputRow[0].childNodes[3];
	var textInput = inputRow[1].childNodes[3];
	var psdInput = inputRow[2].childNodes[3];
	var HillTextInput = inputRow[3].childNodes[3];
	var tipsImg = document.getElementsByTagName("img");
	var encrypt = document.getElementById("encrypt");
	var decrypt = document.getElementById("decrypt");
	var keysTable = document.getElementById("keys").getElementsByTagName("table")[0];

	//初始化样式
	if (!PlayfairResult.value) {
		PlayfairResult.value = PlayfairResult.value + "说明：本例的Playfair密码的字母矩阵生成规则采用德语规范，即把“I”和“J”合起来当成一个字母看待(显示为“I/J”)。\n知识科普：法语一般去掉“W”或“K”，英语一般去掉“Z”"
	};
	if (!HillResult.value) {
		HillResult.value = HillResult.value + "说明：本例的Hill密码没有实现解密功能，因而没有做密钥矩阵是否可逆判断。密钥矩阵中每个数字取值范围在-25~25，不能出现非法字符（包括空格），且不能为空。"
	};
	inputRow[2].style.display = "none";
	tips[0].style.color = "white";
	tips[1].style.color = "white";
	tips[2].style.color = "white";
	tips[3].style.color = "white";
	tips[4].style.color = "white";

	//初始化事件
	PlayfairBtn.onclick = PlayfairEncrypt;
	HillBtn.onclick = HillEncrypt;
	encrypt.onclick = changeControl;
	decrypt.onclick = changeControl;

	//各种输入验证
	keyInput.onfocus = function() {
		var re = /[^A-Za-z\s]/g;
		tips[0].style.color = "#8a8987";
		tips[0].innerHTML = "非空，字母+空格，合法，长度适中";
		if (re.test(this.value)) {
			tipsImg[0].style.display = "none";
			tipsImg[1].style.display = "block";
			tips[0].style.color = "red";
			keyInput.style.borderColor = "#EC5E49";
			tips[0].innerHTML = "不能含有非法字符！";
		}
	};
	keyInput.onkeyup = function() {
		var re = /[^A-Za-z\s]/g;
		if (keyInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[0].style.display = "none";
			tipsImg[1].style.display = "block";
			tips[0].style.color = "red";
			keyInput.style.borderColor = "#EC5E49";
			tips[0].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[0].style.display = "none";
			tipsImg[1].style.display = "block";
			tips[0].style.color = "red";
			keyInput.style.borderColor = "#EC5E49";
			tips[0].innerHTML = "不能含有非法字符！";
		} else {
			tips[0].style.color = "white";
			keyInput.style.borderColor = "#11CD6E";
			tipsImg[1].style.display = "none";
			tipsImg[0].style.display = "block";
		}
	};
	keyInput.onblur = function() {
		var re = /[^A-Za-z\s]/g;
		if (keyInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[0].style.display = "none";
			tipsImg[1].style.display = "block";
			tips[0].style.color = "red";
			keyInput.style.borderColor = "#EC5E49";
			tips[0].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[0].style.display = "none";
			tipsImg[1].style.display = "block";
			tips[0].style.color = "red";
			keyInput.style.borderColor = "#EC5E49";
			tips[0].innerHTML = "不能含有非法字符！";
		} else {
			tips[0].style.color = "white";
			keyInput.style.borderColor = "#11CD6E";
			tipsImg[1].style.display = "none";
			tipsImg[0].style.display = "block";
		}
	};

	textInput.onfocus = function() {
		var re = /[^A-Za-z\s]/g;
		tips[1].style.color = "#8a8987";
		tips[1].innerHTML = "非空，字母+空格，合法，长度适中";
		if (re.test(this.value)) {
			tipsImg[2].style.display = "none";
			tipsImg[3].style.display = "block";
			tips[1].style.color = "red";
			textInput.style.borderColor = "#EC5E49";
			tips[1].innerHTML = "不能含有非法字符！";
		}
	};
	textInput.onkeyup = function() {
		var re = /[^A-Za-z\s]/g;
		if (textInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[2].style.display = "none";
			tipsImg[3].style.display = "block";
			tips[1].style.color = "red";
			textInput.style.borderColor = "#EC5E49";
			tips[1].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[2].style.display = "none";
			tipsImg[3].style.display = "block";
			tips[1].style.color = "red";
			textInput.style.borderColor = "#EC5E49";
			tips[1].innerHTML = "不能含有非法字符！";
		} else {
			tips[1].style.color = "white";
			textInput.style.borderColor = "#11CD6E";
			tipsImg[3].style.display = "none";
			tipsImg[2].style.display = "block";
		}
	};
	textInput.onblur = function() {
		var re = /[^A-Za-z\s]/g;
		if (textInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[2].style.display = "none";
			tipsImg[3].style.display = "block";
			tips[1].style.color = "red";
			textInput.style.borderColor = "#EC5E49";
			tips[1].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[2].style.display = "none";
			tipsImg[3].style.display = "block";
			tips[1].style.color = "red";
			textInput.style.borderColor = "#EC5E49";
			tips[1].innerHTML = "不能含有非法字符！";
		} else {
			tips[1].style.color = "white";
			textInput.style.borderColor = "#11CD6E";
			tipsImg[3].style.display = "none";
			tipsImg[2].style.display = "block";
		}
	};

	psdInput.onfocus = function() {
		var re = /[^A-IK-Za-ik-z\s]/g;
		tips[2].style.color = "#8a8987";
		tips[2].innerHTML = "非空，字母+空格，合法，长度适中，不能出现“J”";
		if (re.test(this.value)) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "不能含有非法字符！";
		} else if (psdInput.value.length % 2 == 1) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "密文长度不能为奇数！";
		}
	};
	psdInput.onkeyup = function() {
		var re = /[^A-IK-Za-ik-z\s]/g;
		if (psdInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "不能为空！";
		} else if (psdInput.value.length % 2 == 1) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "密文长度不能为奇数！";
		} else if (re.test(this.value)) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "不能含有非法字符！";
		} else {
			tips[2].style.color = "white";
			psdInput.style.borderColor = "#11CD6E";
			tipsImg[5].style.display = "none";
			tipsImg[4].style.display = "block";
		}
	};
	psdInput.onblur = function() {
		var re = /[^A-IK-Za-ik-z\s]/g;
		if (psdInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "不能为空！";
		} else if (psdInput.value.length % 2 == 1) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "密文长度不能为奇数！";
		} else if (re.test(this.value)) {
			tipsImg[4].style.display = "none";
			tipsImg[5].style.display = "block";
			tips[2].style.color = "red";
			psdInput.style.borderColor = "#EC5E49";
			tips[2].innerHTML = "不能含有非法字符！";
		} else {
			tips[2].style.color = "white";
			psdInput.style.borderColor = "#11CD6E";
			tipsImg[5].style.display = "none";
			tipsImg[4].style.display = "block";
		}
	};

	HillTextInput.onfocus = function() {
		var re = /[^A-Za-z\s]/g;
		tips[4].style.color = "#8a8987";
		tips[4].innerHTML = "非空，字母+空格，合法，长度适中";
		if (re.test(this.value)) {
			tipsImg[7].style.display = "none";
			tipsImg[8].style.display = "block";
			tips[4].style.color = "red";
			HillTextInput.style.borderColor = "#EC5E49";
			tips[4].innerHTML = "不能含有非法字符！";
		}
	};
	HillTextInput.onkeyup = function() {
		var re = /[^A-Za-z\s]/g;
		if (HillTextInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[7].style.display = "none";
			tipsImg[8].style.display = "block";
			tips[4].style.color = "red";
			HillTextInput.style.borderColor = "#EC5E49";
			tips[4].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[7].style.display = "none";
			tipsImg[8].style.display = "block";
			tips[4].style.color = "red";
			HillTextInput.style.borderColor = "#EC5E49";
			tips[4].innerHTML = "不能含有非法字符！";
		} else {
			tips[4].style.color = "white";
			HillTextInput.style.borderColor = "#11CD6E";
			tipsImg[8].style.display = "none";
			tipsImg[7].style.display = "block";
		}
	};
	HillTextInput.onblur = function() {
		var re = /[^A-Za-z\s]/g;
		if (HillTextInput.value.replace(/\s+/g, "").length == 0) {
			tipsImg[7].style.display = "none";
			tipsImg[8].style.display = "block";
			tips[4].style.color = "red";
			HillTextInput.style.borderColor = "#EC5E49";
			tips[4].innerHTML = "不能为空！";
		} else if (re.test(this.value)) {
			tipsImg[7].style.display = "none";
			tipsImg[8].style.display = "block";
			tips[4].style.color = "red";
			HillTextInput.style.borderColor = "#EC5E49";
			tips[4].innerHTML = "不能含有非法字符！";
		} else {
			tips[4].style.color = "white";
			HillTextInput.style.borderColor = "#11CD6E";
			tipsImg[8].style.display = "none";
			tipsImg[7].style.display = "block";
		}
	};

	keysTable.onkeyup = function(event) {
		var re = /^[-]{0,1}\d*$/;
		if (event.target.value.length == 0) {
			tipsImg[6].style.display = "block";
			tips[3].style.color = "red";
			tips[3].innerHTML = "不能为空！";
		} else if (!re.test(event.target.value)) {
			tipsImg[6].style.display = "block";
			tips[3].style.color = "red";
			tips[3].innerHTML = "不能含有非法字符！";
		} else if (event.target.value > 25 || event.target.value < -25) {
			tipsImg[6].style.display = "block";
			tips[3].style.color = "red";
			tips[3].innerHTML = "只能在-25~25以内！";
		} else {
			tips[3].style.color = "white";
			tipsImg[6].style.display = "none";
		}
	};
};

//切换“加密”、“解密”

var changeControl = function(event) {
	var inputRow = document.getElementsByClassName("inputRow");
	var encrypt = document.getElementById("encrypt");
	var decrypt = document.getElementById("decrypt");
	var btn = document.getElementById("PlayfairBtn");
	var viewLabel = document.getElementsByClassName("view")[0].childNodes[3];
	event.preventDefault();
	if (this.id == "decrypt") {
		inputRow[2].style.display = "block";
		inputRow[1].style.display = "none";
		encrypt.className = "unusing";
		decrypt.className = "using";
		btn.value = "解密";
		viewLabel.innerHTML = "明文";
		btn.onclick = PlayfairDecrypt;
	} else {
		inputRow[1].style.display = "block";
		inputRow[2].style.display = "none";
		encrypt.className = "using";
		decrypt.className = "unusing";
		btn.value = "加密";
		viewLabel.innerHTML = "密文";
		btn.onclick = PlayfairEncrypt;
	}
};

//生成字母矩阵，用keys数组存放并返回

function getKeys(key) {
	var i, letter, letterChar;
	var keyValue = key.value.toUpperCase().replace(/\s+/g, ""); //将用户输入的密钥关键字转换为大写并去掉空格
	var keyLen = keyValue.length; //获取密钥关键字的长度
	var keys = new Array();
	//格式化用户输入的密钥关键字并存入keys数组
	for (i = 0; i < keyLen; i++) {
		if (keys.indexOf(keyValue[i]) == -1) {
			if (keyValue[i] == 'I' || keyValue[i] == 'J') {
				if (keys.indexOf("I") == -1) {
					keys.push("I");
				}
			} else {
				keys.push(keyValue[i]);
			}
		}
	}

	//生成完整的字母矩阵并向用户展现
	for (letter = 65; letter <= 90; letter++) {
		letterChar = String.fromCharCode(letter);
		if (keys.indexOf(letterChar) == -1 && letterChar != 'J') {
			if (letterChar == 'I') {
				keys.push("I");
				letter++; //跳过字母J
			} else {
				keys.push(letterChar);
			}
		}
	}
	return keys;
}

//向用户展现字母矩阵

function showKeys(keys) {
	var td = document.getElementsByTagName("td");
	for (i = 0; i < 25; i++) {
		if (keys[i] == 'I') {
			td[i].innerHTML = "I/J";
		} else {
			td[i].innerHTML = keys[i];
		}
	}
}

//生成结果

function createResult(resultID, result) {
	var textarea = document.getElementById(resultID);
	textarea.value = result + "\n" + textarea.value;
}

//生成提示文本

function showTips(tipsText, tipsClass) {
	var tipsPara = document.getElementsByClassName(tipsClass)[0];
	if (tipsPara) {
		tipsPara.innerHTML = tipsText;
		tipsPara.style.opacity = "1";
	} else {
		tipsPara = document.createElement("p");
		tipsPara.innerHTML = tipsText;
		tipsPara.className = tipsClass;
		document.getElementsByTagName("body")[0].appendChild(tipsPara);
		tipsPara.style.opacity = "1";
		disappearElement(tipsClass, 100);
	}
}

//控制提示文本的透明度

function disappearElement(elementClass, interval) {
	var elem = document.getElementsByClassName(elementClass)[0];
	if (elem) {
		var repeat = "disappearElement('" + elementClass + "'," + interval + ")";
		//递归，为class为elementClass的元素新建一个名为disappearElement的属性并设置值
		if (elem.style.opacity == 1) {
			setTimeout(function() {
				elem.style.opacity = elem.style.opacity - 0.1;
			}, 1000);
			elem.movement = setTimeout(repeat, interval);
		} else if (elem.style.opacity > 0) {
			elem.style.opacity = elem.style.opacity - 0.1;
			elem.movement = setTimeout(repeat, interval);
		} else {
			document.getElementsByTagName("body")[0].removeChild(elem);
		}
	}
}

//Playfair加密算法

function PlayfairEncrypt() {
	/**
	 * 当“加密”按钮被点击时触发该事件
	 * @keys数组用于记录字母矩阵
	 * @textGroup字符串用于记录分组明文
	 * @psd字符串用于记录密文
	 * @事件内容：根据密钥关键字生成字母矩阵，并根据矩阵将用户输入的
	 *            明文转换成密文，然后再向用户展现字母矩阵以及密文。
	 */
	var textInput = document.getElementById("PlayfairText");
	var keyInput = document.getElementById("PlayfairKey");
	var i;
	var textValue = textInput.value.toUpperCase().replace(/\s+/g, ""); //将用户输入的明文转换为大写并去掉所有空格
	var textValueFormat = textValue.replace(/J/ig, "I"); //将所有J替换为I，不区分大小写
	var textLen = textValueFormat.length;
	var keys = new Array();
	var textGroup = "";
	var psd = "";

	var re = /[^A-Za-z\s]/g;
	if (keyInput.value.replace(/\s+/g, "").length == 0 || re.test(keyInput.value)) {
		keyInput.focus(); //获得焦点
		showTips("密钥关键字不合法！", "PlayfairErrorTips"); //出现错误提示
		return;
	}
	if (textValue.length == 0 || re.test(textInput.value)) {
		textInput.focus(); //获得焦点
		showTips("明文不合法！", "PlayfairErrorTips"); //出现错误提示
		return;
	}

	keys = getKeys(keyInput); //获取字母矩阵，并存入keys数组
	showKeys(keys); //生成完整的字母矩阵并向用户展现

	//将明文分组
	for (i = 0; i < textLen;) {
		if (i == (textLen - 1)) {
			textGroup = textGroup + textValueFormat[i];
			i++;
		} else if (textValueFormat[i] != textValueFormat[i + 1]) {
			textGroup = textGroup + textValueFormat[i] + textValueFormat[i + 1];
			i += 2;
		} else {
			textGroup = textGroup + textValueFormat[i] + "K";
			i++;
		}
	}
	if (textGroup.length % 2) { //判断最后一组是否只有一个字母，如果是则补充字母K
		textGroup += "K";
	}

	//转换密文
	var textGroupLen = textGroup.length;
	var letterA, letterB, remainderA, remainderB, discussA, discussB;
	for (i = 0; i < textGroupLen; i += 2) {
		letterA = keys.indexOf(textGroup[i]);
		letterB = keys.indexOf(textGroup[i + 1]);
		remainderA = letterA % 5;
		remainderB = letterB % 5;
		discussA = Math.floor(letterA / 5);
		discussB = Math.floor(letterB / 5);
		if (discussA == discussB) {
			//如果明文字母在矩阵中同行，则
			letterA++;
			letterB++;
			if (letterA % 5 == 0) {
				letterA -= 5;
			}
			if (letterB % 5 == 0) {
				letterB -= 5;
			}
			psd = psd + keys[letterA] + keys[letterB];
			continue;
		} else if (remainderA == remainderB) {
			//如果明文字母在矩阵中同列，则
			letterA += 5;
			letterB += 5;
			if (letterA > 24) {
				letterA -= 25;
			}
			if (letterB > 24) {
				letterB -= 25;
			}
			psd = psd + keys[letterA] + keys[letterB];
			continue;
		} else {
			//如果明文字母在矩阵中既不同行又不同列，则
			letterA = letterA - remainderA + remainderB;
			letterB = letterB - remainderB + remainderA;
			psd = psd + keys[letterA] + keys[letterB];
		}
	}

	//呈现密文
	createResult("PlayfairResult", psd);

	//出现成功提示
	showTips("OK！加密成功！", "PlayfairSuccessTips");

	//释放变量
	i = null;
	textValue = null;
	textValueFormat = null;
	textLen = null;
	keys = null;
	textGroup = null;
	psd = null;
	textGroupLen = null;
	letterA = null;
	letterB = null;
	remainderA = null;
	remainderB = null;
	discussA = null;
	discussB = null;
	re = null;
}

//Playfair解密算法

function PlayfairDecrypt() {
	/**
	 * 当“解密”按钮被点击时触发该事件
	 * @keys数组用于记录字母矩阵
	 * @textGroup字符串用于记录转换后的明文（未去“K”）
	 * @text字符串用于记录去“K”后的明文
	 * @事件内容：根据密钥关键字生成字母矩阵，并根据矩阵将用户输入的
	 *            密文转换成明文，然后再向用户展现字母矩阵以及明文。
	 */
	var psdInput = document.getElementById("PlayfairPsd");
	var keyInput = document.getElementById("PlayfairKey");
	var i;
	var psdValue = psdInput.value.toUpperCase().replace(/\s+/g, ""); //将用户输入的密文转换为大写并去掉所有空格
	var psdLen = psdValue.length;
	var keys = new Array();
	var textGroup = "";
	var text = "";

	var re1 = /[^A-Za-z\s]/g;
	var re2 = /[^A-IK-Za-ik-z\s]/g;
	if (keyInput.value.replace(/\s+/g, "").length == 0 || re1.test(keyInput.value)) {
		keyInput.focus(); //获得焦点
		showTips("密钥关键字不合法！", "PlayfairErrorTips"); //出现错误提示
		return;
	}
	if (psdValue.length == 0 || re2.test(psdInput.value)) {
		psdInput.focus(); //获得焦点
		showTips("密文不合法！", "PlayfairErrorTips"); //出现错误提示
		return;
	}

	keys = getKeys(keyInput); //获取字母矩阵，并存入keys数组
	showKeys(keys); //生成完整的字母矩阵并向用户展现

	//转换明文
	var letterA, letterB, remainderA, remainderB, discussA, discussB;
	for (i = 0; i < psdLen; i += 2) {
		letterA = keys.indexOf(psdValue[i]);
		letterB = keys.indexOf(psdValue[i + 1]);
		remainderA = letterA % 5;
		remainderB = letterB % 5;
		discussA = Math.floor(letterA / 5);
		discussB = Math.floor(letterB / 5);
		if (discussA == discussB) {
			//如果密文字母在矩阵中同行，则
			letterA--;
			letterB--;
			if ((letterA + 1) % 5 == 0) {
				letterA += 5;
			}
			if ((letterB + 1) % 5 == 0) {
				letterB += 5;
			}
			textGroup = textGroup + keys[letterA] + keys[letterB];
			continue;
		} else if (remainderA == remainderB) {
			//如果密文字母在矩阵中同列，则
			letterA -= 5;
			letterB -= 5;
			if (letterA < 0) {
				letterA += 25;
			}
			if (letterB < 0) {
				letterB += 25;
			}
			textGroup = textGroup + keys[letterA] + keys[letterB];
			continue;
		} else {
			//如果密文字母在矩阵中既不同行又不同列，则
			letterA = letterA - remainderA + remainderB;
			letterB = letterB - remainderB + remainderA;
			textGroup = textGroup + keys[letterA] + keys[letterB];
		}
	}

	//去“K”
	var textGroupLen = textGroup.length;
	for (i = 0; i < (textGroupLen - 2); i += 2) {
		if (textGroup[i] == textGroup[i + 2] && textGroup[i + 1] == 'K') {
			text = text + textGroup[i];
		} else {
			text = text + textGroup[i] + textGroup[i + 1];
		}
	}
	if (textGroup[i] != 'K' && textGroup[i + 1] == 'K') { //末尾处理
		text = text + textGroup[i] + "(K)";
	} else if (textGroup[i] == 'K' && textGroup[i + 1] == 'K') {
		text = text + textGroup[i];
	} else {
		text = text + textGroup[i] + textGroup[i + 1];
	}

	//呈现明文
	createResult("PlayfairResult", text);

	//出现成功提示
	showTips("OK！解密成功！", "PlayfairSuccessTips");

	//释放变量
	textInput = null;
	i = null;
	psdValue = null;
	psdLen = null;
	keys = null;
	textGroup = null;
	text = null;
	textGroupLen = null;
	letterA = null;
	letterB = null;
	remainderA = null;
	remainderB = null;
	discussA = null;
	discussB = null;
	re1 = null;
	re2 = null;
}

//Hill加密算法

function HillEncrypt() {
	/**
	 * 当“加密”按钮被点击时触发该事件
	 * @keys数组用于记录密钥矩阵
	 * @textArray数组用于记录转换后的明文
	 * @psd字符串用于密钥
	 * @事件内容：根据密钥矩阵将用户输入的明文转换成明文，然后再向用户展现。
	 */
	var textInput = document.getElementById("HillText");
	var i, j, n;
	var textValue = textInput.value.toUpperCase().replace(/\s+/g, ""); //将用户输入的密文转换为大写并去掉所有空格
	var textLen = textValue.length;
	var keyInput = document.getElementById("keys").getElementsByTagName("input");
	var textArray = new Array();
	var keys = new Array();
	var psd = "";

	var re1 = /[^A-Za-z\s]/g;
	var re2 = /^[-]{0,1}\d+$/;
	if (textValue.length == 0 || re1.test(textInput.value)) {
		textInput.focus(); //获得焦点
		showTips("明文不合法！", "HillfairErrorTips"); //出现错误提示
		return;
	}
	for (i = 0; i < 9; i++) {
		if (keyInput[i].value.length == 0 || !re2.test(keyInput[i].value) || keyInput[i].value > 25 || keyInput[i] < -25) {
			keyInput[i].focus(); //获得焦点
			showTips("密钥矩阵不合法！", "HillfairErrorTips"); //出现错误提示
			return;
		}
	}

	//处理明文并存入textArray
	for (i = 0; i < textLen; i++) {
		textArray.push(textValue.charCodeAt(i) - 65);
	}
	var textArrayLen = textArray.length;
	if (textArrayLen % 3 == 1) { //判断最后一组是否只有1个字母
		textArray.push(23);
		textArray.push(23);
	} else if (textArrayLen % 3 == 2) { //判断最后一组是否只有2个字母
		textArray.push(23);
	}

	//获取密钥矩阵
	for (i = 0; i < 9; i++) {
		keys.push(keyInput[i].value);
	}

	//矩阵相乘（即加密）
	textArrayLen = textArray.length;
	for (i = 0; i < textArrayLen; i += 3) {
		for (j = 0; j < 3; j++) {
			//矩阵各行相乘
			n = keys[3 * j] * textArray[i] + keys[3 * j + 1] * textArray[i + 1] + keys[3 * j + 2] * textArray[i + 2];
			//模26
			n = n % 26;
			if (n < 0) {
				n += 26;
			}
			//转换密文
			psd = psd + String.fromCharCode(n + 65);
		}
	}

	//呈现明文
	createResult("HillResult", psd);

	//出现成功提示
	showTips("OK！加密成功！", "HillfairSuccessTips");

	//释放变量
	textInput = null;
	i = null;
	j = null;
	n = null;
	textValue = null;
	textLen = null;
	keyInput = null;
	textArray = null;
	textArrayLen = null;
	keys = null;
	psd = null;
	re1 = null;
	re2 = null;
}