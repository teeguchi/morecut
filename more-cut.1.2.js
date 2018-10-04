/*
 * moreCUT v1.2
 *
 * Date: 2017-06-03
 * 
 * TERMS OF USE - moreCUT v1.2
 * 
 * Open source under the BSD License. 
 * 
 * Copyright 2017 Takashi Yamaguchi
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * 1.Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES,INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT,INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
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
			var textSlice = str.slice(0,j) + strMore;  // ...を付け加える
			var textWidth = strWidth(textSlice,ele);
			if (textWidth <= moreCutOwidth) {
				var textIn = textSlice;
			}
		}
		return textIn;
		
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
