---
layout: blog
title: Web Share Target API を使って共有メニューからスクマするアプリを作った
date: 2019-07-18T02:27:00.000+09:00
# date: 2019-07-16T00:39:00.000+09:00
---

via [https://uknmr.github.io/scma/](https://github.com/pastak/scboloo)

[Scrapbox でブックマーク](https://scrapbox.io/masui/スクマのすすめ) することをスクマと呼ぶらしい。私は脳の外部記憶装置として [Scrapbox](https://scrapbox.io/uknmr/) を使っていて、先月には [Pocket も Feedly Boards も使うのをやめ Scrapbox に一本化した](https://scrapbox.io/uknmr/スクマ用のブックマークレットを書いた)ところだった。

ブックマークレットでスクマに流し込んでいたが、その操作ステップの多さにストレスが溜まっていた。例えば Feedly で RSS を閲覧しているとすると、

- Feedly の詳細ページを最下部までスクロール
- Visit Website でウェブビューを開く
- Chrome で開く
- アドレスバーに「す」と打ち込みブックマークレット呼び出し

という具合だった。これが、

- 共有メニューからアプリ選択
- テキストを入力して送信

となる。正直ブックマークレットの方ができることは多いが、操作ステップは減るので良しとしたい。

# 使い方

Android Chrome で使う想定です。デスクトップなら [scboloo](https://github.com/pastak/scboloo) を使えばいいと思います。

- [https://uknmr.github.io/scma/](https://github.com/pastak/scboloo) を開く
- A2HS する
- スクマしたいウェブページで共有メニューから「スクマ」を選択する
- PWA が立ち上がるので適当に入力して送信する

# Web Share Target API

[Chrome 71 から Web Share Target API](https://developers.google.com/web/updates/2018/12/web-share-target) が使えるようになった。これは Android で言うところの `Intent.ACTION_SEND` をウェブで簡単に受け取れるようになるものだ。いまのところ Chrome でしか動作しないが、いいものなので他のプラットフォームにも早く来るといい。

実装はほとんどいらず、[Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) に `share_target` を書くだけだった。

```json
"share_target": {
  "action": "/share-target/",
  "method": "GET",
  "enctype": "application/x-www-form-urlencoded",
  "params": {
    "title": "title",
    "text": "text",
    "url": "url"
  }
}
```

`action` に対して `method` で `params` が渡って来るので、アプリ側ではそれをよしなに処理してあげれば良い。ちなみに `method` と `enctype` を省略するとそれぞれ `GET` と `application/x-www-form-urlencoded` になる（省略すると DevTools の警告がうるさい）。

`title` と `text`、`url` の 3 つフィールドはあるが、それぞれの内容は共有する側のアプリに依存し、受け取り側では操作できない。また Android においては `url` はサポートされていないらしい。

# その他やってみたこと

基本的に自分しか使わないものなので自由に開発できてよかった。

- [ES Modules](https://caniuse.com/#feat=es6-module) のブラウザ対応が進んでいたので使ってみた
- border-radius に 8 つの半径を指定して有機的な形を作ってみた
- [unicode-range](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face/unicode-range) を指定してみた（ただ指定してみたかっただけで利いてるわけではない）

# できなかったこと

API が公開されていなかったり CORS に阻まれできなかったこと。

- [Scrapbox の project 一覧](https://scrapbox.io/api/projects) の取得
- 記事から `og:image` を抜き出して Gyazo 化し本文に挿入

ここはなんとか実現したくて Firebase Functions で puppeteer を動かしてレスポンスを返す実装を書いた。が、毎回認証が走っててアホくさなったので消した。

# 余談

最初はなぜか [Flutter](https://flutter.dev/) を使って実装を始め「Widget 完全に理解した」となり `Intent.ACTION_SEND` を捌く Java コードを書いていた。_"共有でサクッとスクマしたいだけなんだよおおおおお"_ とか _"Flutter が楽とか言って結局ネイティブモジュール書かないと駄目じゃんかよおおおお"_、となってたので [Web Share Target API](https://wicg.github.io/web-share-target/) のことを思い出せてよかった。

あと [Paul Kinlan 氏の紹介記事の日本語が怪しい](https://paul.kinlan.me/ja/web-share-target-api/)ので余裕があれば[ここ](https://github.com/PaulKinlan/paul.kinlan.me/blob/main/content/ja/2018-04-15-share-target-api.ja.markdown)に PR を投げたい。
