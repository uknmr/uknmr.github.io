---
layout: blog
title: Google Fonts が font-display に対応する 🎉
date: 2019-05-11T15:18:00.000+09:00
tags: post
---

Google I/O 2019 で Google Fonts の `font-display` サポートが発表されたらしい！

```html
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:900|Noto+Serif+JP&display=swap" rel="stylesheet">
```

これは嬉しい。~~`font-display=swap` を足せばいいだけ。~~  
5/14 追記: [`display=swap` が最終的な構文に決まりました](https://github.com/google/fonts/issues/358#issuecomment-492091688)。

まだ正式発表されてないけど、嬉しいので[このブログにも適用しておいた](https://github.com/uknmr/uknmr.github.io/commit/530e2114b77f943a2e0204036ea2de1982ef34fc)。これまでは [PerfPerfPerf が提供していたスニペット](https://googlefonts.3perf.com/)をつかっていた。[Web Font Loader ](https://github.com/typekit/webfontloader)って手もあるけど、あれは日本語では気持ち悪すぎるよね（読みこまれた文字からグニョグニョと切り替わっていく）。

![](https://i.gyazo.com/47672aa5b551339ab0bd676c78a98496.png)  
5/14 追記: `font-display: swap` なレスポンスが返ってくるようになった！

GitHub に[ Issue が上がってから 2 年半強](https://github.com/google/fonts/issues/358)、[1 年以上色んな人が関わってきた](https://twitter.com/addyosmani/status/1126387263749799936)らしい。

[Addy の Twitter スレッド](https://twitter.com/addyosmani/status/1126370518347608065)を見る限り API の変更はなさそう。嘘でした、[リリース時にはパラメーターが `font-display` から `display` になってるかも](https://github.com/google/fonts/issues/358#issuecomment-491453043)、とのこと。

個人的にはデフォルトでもいいんだよ？という気持ち。これにならって他のフォント配信サービスも頑張ってほしい。

あとは[ Android の WebView が対応](https://caniuse.com/#feat=css-font-rendering-controls)すればもう日本でもあまり心配なくウェブフォントつかっていける気がする。いや、[Xperia の Noto Sans / Serif JP 周りの扱い](https://togetter.com/li/1106385)もどうにかしてほしい。
