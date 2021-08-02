# Othello

TypeScript と HTML5 Canvas を使用してオセロゲームを作ることを目指します。

## 環境構築

開発にはTypeScriptというプログラミング言語を使用します。TypeScriptはJavaScriptに静的型付けを追加したプログラミング言語であり、静的型付けによりVSCodeなどの高機能エディタの助けを受けやすくなり、バグの作り込みを防いだり補完機能を十分に利用することができ、開発効率の向上が期待できます。

JavaScriptはブラウザ上で実行できるスクリプト言語としては事実上のデファクトスタンダードとなっています。我々が使用するTypeScriptをブラウザ上で実行するためには、これをJavaScriptに翻訳してやる必要があります。

以下でTypeScriptを用いてブラウザ上で動作するアプリケーションを作るための環境構築をしていきましょう。

以降の内容はNode.jsとnpmがインストールされている環境を前提としています。
```
$ node -v
v14.15.1

$ npm -v
6.14.8
```
上の2つのコマンドをターミナルで実行してなんらかのバージョン番号が表示されない場合は、各OSのパッケージ管理システムや[https://nodejs.org/en/](https://nodejs.org/en/)公式ベージからインストールしてください。

Node.jsはJavaScriptのランタイムであなたが書いたJavaScriptのコードを実行することができます。上述のとおりJavaScriptはブラウザ上で実行することもできますが、Node.jsを使用するとあなたのターミナル上でも実行することができるようになります。

npmはNode.jsのためのパッケージ管理システムです。インターネット上に公開されているパッケージをインストールしてあなたの環境で使用できるようにします。

プロジェクトのトップディレクトリで以下のコマンドを実行して`package.json`を作成してください。このファイルにはプロジェクトの様々な設定が記述されています。
```
$ npm init -y
```

npmでインストールしたパッケージはnode_modulesというディレクトリに保存されるので、それらがgitのコミットに含まれないように`.gitignore`ファイルを作成して、gitの管理から無視されるようにしましょう。
```
$ echo /node_modules/ >> .gitignore
```

### TypeScript

まずはターミナル上でTypeScriptを実行することができる環境を構築します。
```
$ npm install --save-dev typescript ts-node @types/node
```

npmをつかって`typescript`, `ts-node`, `@types/node`というパッケージをインストールします。

- `typescript`: TypeScriptで書いたコードをJavaScriptに変換(トランスパイル)する。
- `ts-node`: ターミナルで直接TypeScriptのコードを実行できるようにする。
- `@typs/node`: Node.jsのデフォルトモジュールで型情報を利用した補完を使えるようにする。

上のコマンドを実行すると、node_modulesディレクトリにパッケージがインストールされます。
同時にpackage.jsonのdevDependenciesフィールドにインストールされたパッケージが追記されます。

node_modulesディレクトリを見ると、指定した3つのパッケージ以外にも`arg`, `diff`, `make-error`といったパッケージがインストールされていることがわかると思います。
`ts-node`パッケージがこれらのパッケージに対する依存をもつため、`ts-node`をインストールしようとするとnpmが自動的に依存関係を解決し、必要なパッケージをすべてインストールしてくれます。
これらのすべての依存関係を含めたバージョン情報はpackage-lock.jsonというファイルに記述されています。

package.jsonとpackage-lock.jsonを参照することで、新しい開発者がこのプロジェクトに加わったときに、同一の環境を簡単に構築することができるのです。

以下のコマンドを実行することでpackage-lock.jsonを参照して、すべての依存パッケージをインストールすることができます。
```
$ npm ci
```

それではパッケージをインストールすることで何ができるようになったのかを見ていきましょう。

まずは比較のためにJavaScriptのファイルを作成します。srcというディレクトリを作成して`src/main.js`というファイルを作成してください。その中身はこんな感じです。

```javascript
const main = () => {
  const a = "Helllo World!!";
  console.log(a);
};

main();
```

`main`という関数をつくって実行しているだけです。main関数の中では`a`という変数に`"Hello World!!"`という文字列を入れて、`console.log`メソッドでaをプリントしています。
このファイルを実行してみましょう。

```
$ node src/main.js
Hello World!!
```

このファイルをTypeScriptのコードに変更していきます。まずはファイル名を`src/main.ts`に変更しましょう。TypeScriptはJavaScriptのスーパーセットなので、このファイルは完全に合法なTypeScriptのファイルです。
とはいえ、せっかくなので変数aに型をつけてみましょう。以下のようになります。
```typescript
const main = () => {
  const a: string = "Helllo World!!";
  console.log(a);
};

main();
```

これを先ほどと同様に実行しようとしてもエラーになってしまうでしょう。Node.jsではTypeScriptを直接実行することができないので当然のことです。
```
$ node src/main.ts
src/main.ts:2
  const a: string = "Helllo World!!";
        ^

SyntaxError: Missing initializer in const declaration
    at wrapSafe (internal/modules/cjs/loader.js:979:16)
    at Module._compile (internal/modules/cjs/loader.js:1027:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

TypeScriptのファイルをブラウザやNode.jsで実行できるようにするために、先程インストールした`typescript`パッケージを使用します。このパッケージをインストールすることで`tsc`コマンドを使用できるようになります。以下のコマンドで`src/main.ts`から`main.js`を生成します。そして生成された`main.js`がNode.jsによって正しく実行できることを確認してください。
```
$ npx tsc --outFile main.js src/main.ts 
$ node main.js
Helllo World!!
```

確認できたら`main.js`を削除しておきます。
```
$ rm main.js
```

とはいえTypeScriptのコードを実行するたびに、変換→実行のステップを踏むのは面倒なので直接実行したくなります。そのために先程インストールした`ts-node`を使用します。以下のコマンドでTypeScriptのファイルが直接実行できることを確認してください。
```
$ npx ts-node src/main.ts
Helllo World!!
```

### Formatter

### Test

### WebPack

## CUIで遊べるオセロを作る

### 盤面の持ち方・盤面の表示

### 盤面の情報を取得する
#### 石の数

#### 終了を判定する

#### 勝敗を判定する

#### 石を置けるか判定する

#### 有効手を列挙する

#### ある方向の返される石を列挙する

#### すべての方向の返される石を列挙する


### 盤面を操作する
#### 石を置く（単に）

#### 一つの石をひっくり返す

#### 石をおいて、適切にひっくり返す

#### パスする


### インターフェースをつくる

#### 標準入力をあつかう

#### 盤面を初期化する

#### ターンを進める

#### 勝敗を表示する


## ブラウザで遊べるオセロを作る

### Canvas


## AIをつくる

### 盤面評価

### 探索

#### min-max法

#### α-β法