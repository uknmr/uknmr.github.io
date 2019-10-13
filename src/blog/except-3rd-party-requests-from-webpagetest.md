---
layout: blog
title: WebPagetest でサードパーティの影響を除いて計測する ⚡
date: 2019-07-13T22:43:00.000+09:00
tags: post
---

正しくは「テスト対象の URL と同じホストへのリクエストを除いて計測する」です。ウェブパフォーマンスの計測くらい自分のコントローラブルな状態で行いたいし、そうあるべきですよね（もちろんユーザーはサードパーティスクリプト込みの体験をするし、あくまでコントローラブルな部分を計測して改善していくならば）。

WebPagetest では [Scripting](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) と呼ばれるマルチステップテストを行うためのスクリプトが書けます。このスクリプトに次の用に書き込むと URL と同じホストへのリクエストを除いて計測してくれます。

```text
navigate %URL%
blockDomainsExcept %HOST%
```

この [`blockDomainsExcept`](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting#TOC-blockDomainsExecpt) は空白区切りで複数指定もできるので、例えば *"Google Fonts は明らかに依存しているので計測対象にしたい"* とすれば次のように書くことができます。

```text
navigate %URL%
blockDomainsExcept %HOST% fonts.googleapis.com fonts.gstatic.com
```

ちなみにこの方法はイギリスで WebPerf コンサルをやっている [Andy Davies 氏のツイート](https://twitter.com/AndyDavies/status/1128748618305896452/)で知りました。

`%URL%` や `%HOST%` 以外に使える変数がないか探しましたがよくわからず、[チラッとソースを見ても](https://github.com/WPO-Foundation/webpagetest/blob/master/www/runtest.php)他に使えそうなものはありませんでした。

この設定は [gas-webpagetest](https://github.com/uknmr/gas-webpagetest) という Google Apps Script から WebPagetest を叩いて記録するツールのデフォルト設定にしようか迷ったものです。このスクリプトで正しくサードパーティを外せる訳でも、サードパーティを外すことが常に計測として正しい訳でもないので、このブログにメモして終わりにします。
