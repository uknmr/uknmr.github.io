---
layout: blog
title: Web Components ことはじめ
date: 2019-04-27T17:04:00.000+09:00
permalink: false
tags: post
---

もうずっと気になっていた、それこそ Bower をつかわないといけない Polymer の時代から気になっていたものの、なかなか投入するタイミングがわからず手を出さずにいた Web Components。

[仕事でつくったデザイン原則](https://game.auone.jp/styleguide/)から、さぁどうコンポーネントに落として展開しようかと考えるうち、Web Components という選択肢が上がってきた。

[Edge の Chromium 化](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/)も後押しして、今年は改めて Web Components 元年になるんじゃないかと思う。

ということで、[An Introduction to Web Components | CSS-Tricks](https://css-tricks.com/an-introduction-to-web-components/) の写経から Web Components デビューすることにした。

## これが基本

```js
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello world!</h1>`
  }
}

customElements.define('my-component', MyComponent)
```

としておき `<my-component></my-component>` で呼び出すことができる。これが基本らしい。

すべての Custom Elements は何らかの形で `HTMLElement` を継承する必要があります。

`connectedCallback()` は [Custome Elements がもつライフサイクルメソッドのひとつ](https://developer.mozilla.org/ja/docs/Web/Web_Components/Custom_Elements#Custom_element_methods)で、その要素がドキュメントに挿入されたときに呼び出されます。

## Shadow DOM

ドキュメント内のコンテンツを Light DOM と呼び、Shadow root にあるものを Shadow DOM と呼びます。

Light DOM で `document.querySelector('selector')` するように、Shadow DOM では `shadowRoot.querySelector('selector')` できます。  
このとき、Shadow DOM は Light DOM から選択することができません。

`SVG` の `<use>` は Shadow DOM だよね。 

```js
const shadowRoot = document.getElementById('example').attachShadow({
  mode: 'open',
})

shadowRoot.innerHTML = `<style>
  button {
    background-color: grey;
    padding: 5px;
    color: white;
  }
</style>
<button id="button"><slot></slot> button</button>`
```

`attachShadow()` は Shadow DOM を特定の要素に追加し、その Shadow root を返します。  
`mode: 'open'` はカプセル化モードを文字列で指定でき、`open` だと ShadowRoot オブジェクトにアクセスできるが、`'close'` だと `null` を返す。

これで `<div id=example>Shadom root example</div>` とすれば

```html
<div id="example">
  #shadow-root (open)
    <style>
      button {
        background-color: grey;
        padding: 5px;
        color: white;
      }
    </style>
    <button id="button">
      <slot></slot> button
    </button>
    </style>
  Shadow root sample
</div>
```

となり、`Shadow root sample` は `<slot>` に入れ込まれる。

![](https://gyazo.com/d1fbc37b01a433ac158b9867d744f125.png)

こんな感じ。

## HTML Templates

```html
<template id="book-template">
  <li><span class="title"></span> &mdash; <span class="author"></span></li>
</template>

<ul id="books"></ul>
```

この `<template>` は表示されず `createDocumentFragment()` してたようなやつを HTML として持つことができる。

```js
const fragment = document.getElementById('book-template')
const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    title: 'A Farewell to Arms',
    author: 'Ernest Hemingway',
  },
  {
    title: 'Catch 22',
    author: 'Joseph Heller',
  },
]

books.forEach(book => {
  // Create an instance of the template content
  const instance = document.importNode(fragment.content, true)
  // Add relevant content to the template
  instance.querySelector('.title').innerHTML = book.title
  instance.querySelector('.author').innerHTML = book.author
  // Append the instance ot the DOM
  document.getElementById('books').appendChild(instance)
})
```

`importNode()` は DocumentFragment や Node を複製するメソッドで、第一引数がインポートしたい DocumentFragment または Node、第二引数の boolean は第一引数で指定した externalNode の DOM サブツリーをすべてコピーするかどうか。

## さらに HTML Templates

`<style>` も `<script>` も HTML Templates の中にいれることができる。これは、なんでもできてしまうな。

```html
<template id="template">
  <script>
    const button = document.getElementById('click-me')
    button.addEventListener('click', event => alert(event))
  </script>
  <style>
    #click-me {
      all: unset;
      background: tomato;
      border: 0;
      border-radius: 4px;
      color: white;
      font-family: Helvetica;
      font-size: 1.5rem;
      padding: .5rem 1rem;
    }
  </style>
  <button id="click-me">Log click event</button>
</template>
```
```js
const template = document.getElementById('template')
document.body.appendChild(document.importNode(template.content, true))
```

[Crafting Reusable HTML Templates | CSS-Tricks](https://css-tricks.com/crafting-reusable-html-templates/) では HTML Templates で Dialog をつくるサンプルが書かれていた。

## 再利用のために Custom Elements でやる

Custom Elements のライフサイクルメソッド、`constractor()` は要素の必要最低限の設定につかい、`connectedCallback()` は要素にコンテンツを追加したりイベントを登録する、べつもの。

`attributeChangedCallback()` は `observedAttributes()` に設定した属性が変更された場合に呼び出される。

```js
class MyComponent extends HTMLElement {
  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = this.hasAttribute(attrName)
    }
  }

  connectedCallback() {
    const template = document.getElementById('template')
    const node = document.importNode(template.content, true)
    this.appendChild(node)

    this.querySelector('button').addEventListener('click', this.close)
    this.querySelector('.overlay').addEventListener('click', this.close)
  }

  disconnectedCallback() {
    this.querySelector('button').removeEventListener('click', this.close)
    this.querySelector('.overlay').removeEventListener('click', this.close)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(isOpen) {
    this.querySelector('.wrapper').classList.toggle('open', isOpen)
    this.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen)

    if (isOpen) {
      this._wasFocused = document.activeElement
      this.setAttribute('open', true)
      document.addEventListener('keydown', this._watchEscape)
      this.focus()
      this.querySelector('button').focus()
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus()
      this.removeAttribute('open')
      document.removeEventListener('keydown', this._watchEscape)
      this.close()
    }
  }

  close = () => {
    if (this.open !== false) {
      this.open = false
    }

    const closeEvent = new CustomEvent('dialog-closed')
    this.dispatchEvent(closeEvent)
  }

  _watchEscape = event => {
    if (event.key === 'Escape') {
      this.close()
    }
  }
}

customElements.define('my-component', MyComponent)

const button = document.getElementById('launch-dialog')
button.addEventListener('click', () => {
  document.querySelector('my-component').open = true
})
```

`disconnectedCallback()` は `connectedCallback()` の逆で要素から削除されるときに呼び出される。

## Shadow DOM をどうスタイリングするか

`innerHTML` に `<style>` を差し込むのが唯一の確実な Shadow DOM のスタイリング方法らしい。  
`:host` は Shadow root に対してスタイリングできる。

このスタイルタグ内ではカスタムプロパティがつかえるので Shadow DOM 外からスタイルを変えられる。  
`:host` でカスタムプロパティを上書きした場合は、カスケーディングされるのでもちろん `:host` が勝つ。

`:host` は [CSS custom properties and shadow DOM](https://codepen.io/calebdwilliams/pen/eXJZza) を見て理解したし、`Constructable Stylesheets` は [CSS custom properties and shadow DOM](https://codepen.io/calebdwilliams/pen/eXJZza) を見るとよさそう。