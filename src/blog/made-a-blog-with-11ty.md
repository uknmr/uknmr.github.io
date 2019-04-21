---
layout: blog
title: 11ty でブログをつくった
---

[BIT VALLEY INSIDE](https://atnd.org/groups/bitvalleyinside) で[同僚の話](https://tkdn.github.io/slides/2019-04-17-frontend-learn-and-delegation/dist/)を聞いていたら自分もたまらなく何かを出したくなってしまってブログをつくった。

[Just write.](https://www.sarasoueidan.com/desk/just-write/) や[おせっかいなブログアドバイス](https://daverupert.com/2019/04/some-unsolicited-blogging-advice/)の影響も少なからずあって、吐き出す場所を探していたものある。  
ほぼブックマークであり、外付けの脳と化している [Scrapbox](https://scrapbox.io/uknmr/) でもよかったんだけど、つくりたかったんだよね。

[Notion](https://www.notion.so/) という選択肢も頭にはあったが、とにかく手を動かしたかった。

静的サイトジェネレーターとして [Eleventy](http://11ty.io)（以下 11ty）をつかっている。

# なぜ 11ty を選んだのか

端から 11ty にしようと決めていた。

~~Hugo や Gatsby でもよかったんだけど、ぱっと見は単純そうで、複数のテンプレート言語に対応、しかも組み合わせてつかえる謎仕様もあって気になっていた。~~  
なんか書いてみたけど、目にする機会が多かったのと「いいぞ！」みたいな記事をよくみたからだと思う。

名前かっこいいよね「11ty」。

JavaScript をテンプレート言語としてつかうことができちゃって、つまり React で書くこともできる。最高かよ。

あとはフロントエンドエンジニアの端くれとして JAMstack の何かをつくっておきたかった感もあるし、どうせなら普段つかわないものをつかおうと思ったのもある。

# 選んでみて

しっかりしたドキュメントがあるので特に何も書くことはないんだけど、
簡単に最小限の設定で始められて（むしろ、[0C](https://www.11ty.io/docs/resources/#zero-config) でもいける）、必要あればしっかり拡張できるところがすごく気にいった。

まだつかいはじめたばかりだけど、とてもいいものですね！みたいな感想しかない。

# ほかにやったこと

CSS は [Tailwind CSS](https://tailwindcss.com) をつかっている。時期尚早なコンポーネント化に疲れてしまっているので、命名に時間を割かれないユーティリティ CSS 以外を選ぶ気はしない。

CSS は CLI でビルドするんだけど、はじめてデプロイにかかった時間やファイルサイズなどを可視化してみた。  
周辺ライブラリが揃ってて [pretty-hrtime](https://www.npmjs.com/package/pretty-hrtime) や [bytes](https://www.npmjs.com/package/bytes)、[chalk](https://www.npmjs.com/package/chalk) あたりのお世話になった。

フォントは <span class="font-sans font-bold">[Noto Sans JP Black](https://fonts.google.com/specimen/Noto+Sans+JP)</span> と [Noto Serif JP](https://fonts.google.com/specimen/Noto+Serif+JP) を読み込んでいる。Google Fonts は font-display に対応していないので、[PerfPerfPerf に置いてあったスニペット](https://googlefonts.3perf.com/) をつかっている。

11ty のビルドは CircleCI でやってる。  
[CircleCI の Local CLI](https://circleci.com/docs/2.0/local-cli/) は初めてつかったが驚くほど便利だった。なぜ私はいままでこれをつかわないで `commit --amend` からの `push --force` を繰りかえしていたんだろう。

# 参考記事

とくに何か参考にしてつくったわけでもないのに、昔から見ている [hail2u](https://hail2u.net) さんや [kotarok](http://kotarok.com) さん、[Sara Soueidan](https://www.sarasoueidan.com/) さんの影響が強いなぁと感じる。