/**
 * moreCUT v1.2.2
 *
 * Copyright 2020, TeeGuchi
 *
 * Released under the MIT License.
 * https://github.com/teeguchi/morecut/blob/master/LICENSE
 */
function moreCUT(c,s) {
	
	var className = c; // クラスを付ける
	/* 省略記号 部分の表示を入力 */
	var strMore = '';
	if (s == null) {
		strMore = '...';
	} else {
		strMore = s;
	}
	
	var moreCutArray = document.getElementsByClassName(className);  // 要素取得
	var textSourceArray = new Array();
	/* テキストソース取得 */
	for (var i = 0; i < moreCutArray.length; i++) {
		textSourceArray[i] = moreCutArray[i].innerHTML;
	}
	/* スクリプト実行 */
	moreCut(); 
	window.onresize = function () { moreCut(); }
/* --------------------------------------------------------------------------------- */
function moreCut() {
		
	/* はみ出た時だけ実行する設定 */
	for (var i = 0; i < moreCutArray.length; i++) {
		moreCutArray[i].innerHTML = textSourceArray[i];
		moreCutArray[i].style.whiteSpace = 'nowrap';  // 改行させない処置
		var moreCutOwidth = moreCutArray[i].offsetWidth;
		var moreCutSwidth = moreCutArray[i].scrollWidth;
		// 実行条件
		if (moreCutSwidth > moreCutOwidth) {
			var textSource =  moreCutArray[i].innerHTML;
			var moreCutEle =  moreCutArray[i];
			var textIn = strCut(textSource,moreCutEle);
			moreCutArray[i].innerHTML = textIn;
		}
	}
	
	/* 文字列を切りつめる関数 */
	function strCut(str,ele) {
		for (var j = 0; j < str.length; j++) {
			var textSlice = str.slice(0,j);
			var textTotal = textSlice + strMore;  // ...を付け加える
			var textWidth = strWidth(textTotal,ele);
			if (textWidth <= moreCutOwidth) {
				var lastStr = str[j - 1];
				var beyoStr = str[j];
				var textCalc = textSlice;
			}
		}
		// サロゲートペアの処理
		if (lastStr != undefined) {
			if (lastStr.search(/[\uD800-\uDBFF]/) != -1) {
				textCalc += beyoStr;
			}
		}
		return textCalc + strMore;
		
		/* 文字列の長さを出す処理 */
		function strWidth(text,ele) {
			var span = document.createElement('span');
			ele.appendChild(span);
			span.style.whiteSpace = 'nowrap';  // 改行させない処置
			span.innerHTML = text;
			var spanW = span.offsetWidth;
			span.parentNode.removeChild(span);
			return spanW;
		}
	}
}
/* --------------------------------------------------------------------------------- */
}
