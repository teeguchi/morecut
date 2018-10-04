# morecut
文字列を切り詰めるJsプラグイン。
横幅が限定されているコンテンツで、一行に文字が入りきらなくなったときに（ 文字列が... ）のように自動的に切りつめるスクリプトです。
## 使い方
1. 任意の場所に more-cut Js File を置き、headタグ内などで more-cut Js File を読み込む。
2. 終了bodyタグの直前に、以下のように記述する。
```html:sample
	<script>moreCUT('任意の文字列');</script>
```
3. 文字列を切りつめたい要素に '任意の文字列' でクラスを付ける。
### 補足
* 第２引数を指定すると、"..." の表示を変えることができます。
```html:sample
	<script>moreCUT('more-cut', ' 〜');</script>
```
