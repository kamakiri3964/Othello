# Othello

TypeScript と HTML5 Canvas を使用してオセロゲームを作ることを目指します。

## 環境構築

開発にはTypeScriptというプログラミング言語を使用します。TypeScriptはJavaScriptに静的型付けを追加したプログラミング言語であり、静的型付けによりVSCodeなどの高機能エディタの助けを受けやすくなり、バグの作り込みを防いだり補完機能を十分に利用することができ、開発効率の向上が期待できます。

JavaScriptはブラウザ上で実行できるスクリプト言語としては事実上のスタンダードとなっています。我々が今回使用するTypeScriptをブラウザ上で実行するためには、これをJavaScriptに翻訳してやる必要があります。

以下でTypeScriptを用いてブラウザ上で動作するアプリケーションを作るための環境構築をしていきましょう。

以降の内容はNode.jsとnpmがインストールされている環境を前提としています。
```
$ node -v
v14.15.1

$ npm -v
6.14.8
```
上の2つのコマンドをターミナルで実行してなんらかのバージョン番号が表示されない場合は、各OSのパッケージ管理システムや[https://nodejs.org/en/](https://nodejs.org/en/)公式ベージからインストールしてください。

Node.jsはJavaScriptのランタイムであり、あなたが書いたJavaScriptのコードを実行することができます。上述のとおりJavaScriptはブラウザ上で実行することもできますが、Node.jsを使用するとあなたのターミナル上でも実行することができるようになります。

npmはNode.jsのためのパッケージ管理システムです。インターネット上に公開されているパッケージをインストールしてあなたの環境で使用できるようにします。

プロジェクトのトップディレクトリで以下のコマンドを実行して`package.json`を作成してください。このファイルにはプロジェクトの様々な設定が記述されています。
```
$ npm init -y
```

npmでインストールしたパッケージはnode_modulesというディレクトリに保存されるので、それらがgitのコミットに含まれないように`.gitignore`ファイルを作成して、gitの管理から無視されるようにしておきましょう。
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
`ts-node`パッケージがこれらのパッケージへの依存をもつため、`ts-node`をインストールしようとするとnpmが自動的に依存関係を解決し、これらのパッケージをインストールしてくれます。
これらのすべての依存関係を含めたバージョン情報はpackage-lock.jsonというファイルに記述されています。

package.jsonとpackage-lock.jsonを参照することで、新しい開発者がこのプロジェクトに加わったときに、同一の環境を簡単に構築することができるのです。

新たに加わった開発者は以下のコマンドを実行することでpackage-lock.jsonを参照して、すべての依存パッケージをインストールすることができます。
```
$ npm ci
```

それではパッケージをインストールしたことで何ができるようになったのかを見ていきましょう。

まずは比較のためにJavaScriptのファイルを作成します。srcというディレクトリを作成して`src/main.js`というファイルを作成してください。その中身はこんな感じです。

```javascript
const main = () => {
  const a = "Helllo World!!";
  console.log(a);
};

main();
```

`main`という関数をつくって実行しているだけです。main関数の中では`a`という変数に`"Hello World!!"`という文字列を代入して、`console.log`メソッドで変数aをプリントしています。
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

これを先ほどと同様に実行しようとしてもエラーになってしまうでしょう。Node.jsではTypeScriptを直接実行することができないためです。
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

最後に今後のためにTypeScriptのための設定ファイルを追加しておきましょう。`tsconfig.json`というファイルを作ってください。
```json
{
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "sourceMap": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  }
}
```

### Formatter

コードのスタイルを統一することは、可読性・保守性を向上させるためにとても重要です。[Googleもそう言っています。](https://google.github.io/styleguide/cppguide.html)
我々の開発でも自動フォーマッタを導入して、コードのスタイルを統一しましょう。

```
$ npm install --save-dev prettier
```

`.prettierrc.json`という名前でフォーマッタの設定ファイルを作成しておきます。
```json
{
  "singleQuote": true
}
```

以下のコマンドを実行すると`src/`以下のファイルがフォーマットされます。現時点では`src/main.ts`のみが対象です。
```
$ npx prettier --write ./src
```

少しわかりにくいですが、`"Hello World!!"`のダブルクオートがシングルクオートに変わっているのを確認できると思います。

毎回このようにフォーマットを実行しても良いですが、新たにプロジェクトに加わったチームメンバーや、少し時間を開けて開発に戻ってきた自分自身が、フォーマットのために実行すべきコマンドがわからなくて困る場面が簡単に想像できます。npmのタスクランナー機能を使用して将来の自分が困らないようにしておきましょう。

`package.json`のscriptフィールドに以下のように追記してください。
```json
  "scripts": {
    "format": "prettier --write ./src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

以下のコマンドでフォーマッタを走らせられるようになりました。エディタの機能をつかって保存時に自動的にフォーマットされる設定をするのもよいでしょう。
```
$ npm run format
```

### Test

テスト駆動開発というプログラム開発手法があります。プログラムに必要な各機能について実装する前にテストを書き、テストを通すための最低限の実装を行い、テストが通る状態を維持しながらコードをリファクタリングする。このような開発サイクルを短いスパンで繰り返していくことで、頻繁に開発に対するフィードバックが得られ開発効率が向上することが期待できます。

単体テストのフレームワークである`jest`を導入します。
```
$ npm install --save-dev jest ts-jest @types/jest
```

続けて、jestの設定ファイルを作成します。package.jsonの`scripts`フィールドに`"test": "jest"`という行が追加されていることに注意してください。
```
$ npx jest --init
```

自動生成された`jest.config.js`を以下のように書き換えてください。
```javascript
module.exports = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};
```

これでテストフレームワークの導入ができました。簡単なテスト駆動開発を体験してみましょう。
`src/add.test.ts`というファイルを作成してください。`.test.ts`という拡張子のファイルはjestによってテスト対象のファイルと認識されます。

```typescript
import { add } from './add'

test('add_function_returns_sum_of_two_number', () => {
  const result = add(1, 1);
  expect(result).toBe(2);
})
```
1行目で`src/add.ts`内で定義された`add`関数をインポートしています。これにより、このファイル内で`add`関数が使用できるようになります。
3行目の`test`関数はjestにより提供される関数です。1つ目の引数はテストケースの名前です。そのテストケースが何をテストしているのかが理解できる説明的な名前をつけるようにしましょう。あなたのチームで合意ができているのであれば日本語で名前をつけても構いません。2つ目の引数はテストを走らせたときに実行される関数です。ここではアロー関数式で与えています。
4行目で1と1を引数として`add`関数を実行し、5行目でその結果が2であることを確かめています。

それでは、ここで一度テストを走らせてちゃんと失敗することを確認しましょう。`src/add.ts`ファイルは存在すらしていないので当然失敗するはずです。
実際にエラーメッセージを読んでみると`./add`というモジュールが見つからないと言っているようです。
```
$ npm run test
...
 FAIL  src/add.test.ts
  ● Test suite failed to run

    src/add.test.ts:1:21 - error TS2307: Cannot find module './add' or its corresponding type declarations.

    1 import { add } from './add'
                          ~~~~~~~

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        2.814 s
Ran all test suites.
...
```

エラーを解消するために`src/add.ts`を作成して、`add`関数を用意しましょう。これで`add.test.ts`内で`add`関数が使用できるようになります。
```
export const add = (l: number, r: number): number => {
  return 0;
}
```

テストを走らせてみましょう。`src/add.test.ts`の5行目で`result`には2が期待されているのに0が入っていましたよと報告されています。先程実装した`add`関数はいつでも0を返すので当然の結果です。
```
$ npm run test
...
 FAIL  src/add.test.ts
  ✕ add_function_returns_sum_of_two_number (4 ms)

  ● add_function_returns_sum_of_two_number

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 0

      3 | test('add_function_returns_sum_of_two_number', () => {
      4 |   const result = add(1, 1);
    > 5 |   expect(result).toBe(2);
        |                  ^
      6 | })

      at Object.<anonymous> (src/add.test.ts:5:18)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/@jest/core/build/runJest.js:387:19)
      at _run10000 (node_modules/@jest/core/build/cli/index.js:408:7)
      at runCLI (node_modules/@jest/core/build/cli/index.js:261:3)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        3.782 s, estimated 4 s
Ran all test suites.
...
```

テストを通過できるように`add`関数の実装を進めましょう。とりあえず2を返すようにしたらテストをパスすることができそうです。
```typescript
export const add = (l: number, r: number): number => {
  return 2;
}
```
```
$ npm run test
...
 PASS  src/add.test.ts
  ✓ add_function_returns_sum_of_two_number (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.862 s, estimated 4 s
Ran all test suites.
```

無事テストをパスすることができました！

とはいえ明らかにこの`add`関数の実装には問題があります。我々が求める`add`関数の振る舞いを十分に表現できるようにテストケースを増やしてみましょう。
```typescript
import { add } from './add'

test('add_function_returns_sum_of_two_number', () => {
  let result = add(1, 1);
  expect(result).toBe(2);
  result = add(-1, 1);
  expect(result).toBe(0);
  result = add(-1, -1);
  expect(result).toBe(-2);
  result = add(100, 222);
  expect(result).toBe(322);
})
```

そして、テストを実行します。ここでは結果を表示することはしませんが、このテストは失敗するはずです。テストをパスするように`add`関数を書き換えてみましょう。

このように、テストを書く→テストに失敗する→テストをパスするように実装する→リファクタリングをする、というサイクルを細かい粒度で回していくのがテスト駆動開発です。
今回は単純な例だったのでリファクタリングは行いませんでしたが、テストが通る状態を維持することによってリファクタリングのしやすさは格段に向上します。

### webpack

我々の最終目標はブラウザ上でオセロゲームを実装することでした。[webpack](https://webpack.js.org/)は依存関係をもつモジュール群を静的なアセットとしてバンドルするツールです。適切に設定することで内部的に`typescript`パッケージを呼び出してTypeScriptのトランスパイルを同時にすることができます。

```
$ npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader
```

つづけてwebpack用の設定ファイルを作成します。ファイル名は`webpack.config.js`です。
```javascript
const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: ["web"],
  mode: process.env.NODE_ENV || "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
```

5行目で`src/index.ts`をエントリーポイントとして指定しています。このファイルから再帰的に依存モジュールをたどり、`index.js`というファイル名ですべてのモジュールが含まれたファイルを出力します。
8行目で出力先ディレクトリを指定しており、結果的に`dist/index.js`が出力されることになります。
12行目では`.ts`という拡張子のファイルをwebpackが処理するときに`ts-loader`というものを使うように設定しています。`ts-loader`は`typescript`パッケージを使用してTypeScriptファイルをトランスパイルする役割があります。

`src/index.ts`を用意します。アラートウィンドウで"Hello World!"と表示をして、以前作った`add`関数を呼び出すプログラムです。
```typescript
import { add } from './add';

alert("Hello World!\n 10+15=" + add(10,15));
```

それではwebpackを走らせてみましょう。
```
$ npx webpack
```

`dist/index.js`というファイルができていることが確認できると思います。

続けて`dist/index.html`を作成しておきます。先程生成された`dist/index.js`を読み込むだけのページです。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Othello</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script defer src="index.js"></script>
  </head>
  <body>
  </body>
</html>
```

以下のコマンドを実行してください。`./dist/`ディレクトリ以下のファイルをサーブする開発用のWebサーバーを実行することができます。これによって、ブラウザから`dist/index.html`や`dist/index.js`にアクセスできるようになります。このサーバーを実行している間はソースコードの変更が監視され、変更が検知されると自動的にビルドが実行されます。

```
$ npx webpack serve
```

[http://localhost:8080](http://localhost:8080)をブラウザで開いてください。以下のように表示されたら成功です。
```
Hello World!
10+15=25
```

最後に、開発中に何度も使うことになるコマンドをnpmのタスクランナーに登録しておきましょう。
package.jsonに以下のように追記してください。
```json
  "scripts": {
    "build": "webpack",
    "serve": "webpack serve",
    "format": "prettier --write ./src",
    "test": "jest"
  },
```

## CUIで遊べるオセロを作る
我々の最終目標はブラウザ上で遊べるオセロゲームを作ることでしたが、はじめはもう少しシンプルなものから始めましょう。簡単なものから段階を踏んで複雑なものを作っていくのはとても良いプラクティスです。

ブラウザで動作するオセロゲームの前段階として、CUI(キャラクタインターフェース)であるターミナル上で動作するオセロゲームを作っていきましょう。

以下に動作イメージを提示します。この通りに作る必要は全くありません。あくまで理解を助けるためのサンプルです。

```
$ npm run game-start
ゲームを開始します。
  a b c d e f g h
  - - - - - - - -
1| | | | | | | | |
2| | | | | | | | |
3| | | |-| | | | |
4| | |-|o|x| | | |
5| | | |x|o|-| | |
6| | | | |-| | | |
7| | | | | | | | |
8| | | | | | | | |
  - - - - - - - -
  黒(x): 2
  白(o): 2

黒(x)の手番です。座標を入力してください。例: c4
> c4

  a b c d e f g h
  - - - - - - - -
1| | | | | | | | |
2| | | | | | | | |
3| | |-| |-| | | |
4| | |x|x|x| | | |
5| | |-|x|o| | | |
6| | | | | | | | |
7| | | | | | | | |
8| | | | | | | | |
  - - - - - - - -
  黒(x): 4
  白(o): 1

白(o)の手番です。座標を入力してください。例: c3
> c3
.
.
.
```

### 標準入力・標準出力を扱う
`src/main.ts`を編集しましょう。

```typescript
import { createInterface } from 'readline';

const main = () => {
  console.log('好きな数字を入力してください');
  process.stdout.write('> ');

  const reader = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on('line', function (line) {
    console.log('あなたが入力したのは"' + line + '"です');
    console.log('');
    console.log('好きな数字を入力してください');
    process.stdout.write('> ');
  });
};

main();
```

以下のように実行してください。終了するときは`Ctrl-C`です。
```
$ npx ts-node src/main.ts
```

`console.log`と`process.stdout.write`はどちらも標準出力に出力する関数ですが、前者は出力後に自動で改行がはいるという違いがあります。

`reader.on('line', function)`で与えた関数はターミナルでエンターキーを押す度に実行されます。そのとき引数には入力された文字列が与えられます。

この単純なゲームを少しずつ改善していきます。
ゲームを開始するコマンドをタスクランナーに登録しておきましょう。`package.json`に追記します。
```
  "scripts": {
    "start-game": "ts-node src/main.ts",
```

### 盤面の表示
`src/othello.ts`というファイルを作成しましょう。これ以降オセロのコア機能部分はこのファイルに記述することにします。こうすることで、コードの再利用性が高まります。これ以降も適宜ファイルを分けながら開発していきましょう。

まずはオセロの盤面を表現する型`Board`を定義します。
どのような構造体でも構いません。以下は一つの例です。
```
export type Board = {
  black: boolean[][];
  white: boolean[][];
  black_turn: boolean;
}
```

初期盤面を生成する関数を作成します。以下のような関数を実装していきます。
```
export function generate_initial_board(): Board {
  ...
}
```

まずはテストを書きましょう。`src/othello.test.ts`というファイルを作成してください。
```typescript
import { Board, generate_initial_board } from './othello';

test('generate_initial_board', () => {
  const board = generate_initial_board();
  expect(len(board.black)).toBe(8);
  expect(len(board.black[0])).toBe(8);
  expect(board.black[0][0]).toBe(false);
  expect(board.black[4][3]).toBe(true);
  expect(board.black[3][3]).toBe(false);
  expect(len(board.white)).toBe(8);
  expect(len(board.white[0])).toBe(8);
  expect(board.white[0][0]).toBe(false);
  expect(board.white[4][3]).toBe(false);
  expect(board.white[3][3]).toBe(true);
  expect(board.black_turn).toBe(true);
});
```

テストが失敗することを確認して、テストが通るように実装してください。

main関数の実装を進めていきます。main関数の最初に盤面を初期化する処理をいれて盤面を表示しましょう。
このとき盤面を文字列化する関数があると便利です。今回はテストも自分で書いてみてください。テストを書いてその後実装してください。`src/main.ts`内で`src/othello.ts`で定義した関数や型を使用するためには、`src/othello.test.ts`の先頭に書いたようなimport文を書く必要があります。
```typescript
export function stringify_board(board: Board): string {
  ...
}
```

改行を含む文字列を扱うときにはテンプレートリテラル(バッククォート)が便利です。
```typescript
const raw_string = `apple
banana
suika`;
```

つぎに盤面の下に黒白それぞれのスコアを表示します。
```
  黒(x): 2
  白(o): 2
```

スコアを計算する関数を作りましょう。しつこいようですが**テスト**を書いてください！！
```typescript
// [黒の石数, 白の石数]を返す
export function calc_score(board: Board): [number, number] {
  ...
}
```

最後に手番を表示するようにして、この節はおしまいです。
```
$ npm run game-start
ゲームを開始します。
  a b c d e f g h
  - - - - - - - -
1| | | | | | | | |
2| | | | | | | | |
3| | | | | | | | |
4| | | |o|x| | | |
5| | | |x|o| | | |
6| | | | | | | | |
7| | | | | | | | |
8| | | | | | | | |
  - - - - - - - -
  黒(x): 2
  白(o): 2

黒(x)の手番です。座標を入力してください。例: c4
```

### 石を置く
与えられた座標に石をおいて盤面を変化させてみましょう。いまのところ与えられた座標が合法手かどうかは考えなくて良いことにします。

`put_stone()`という関数をつくることにします。以下のような関数になるはずです。テストを書いてから実装しましょう。
```typescript
export function put_stone(point: [number, number], black_turn: boolean, board: Board) {
  ...
}
```

石をひっくり返す関数も作成します。
```typescript
export function flip_stone(point: [number, number], board: Board) {
  ...
}
```

手番を進める関数も作成します。
```typescript
export function move_turn(board: Board) {
  ...
}
```

これらの関数を`src/main.ts`内で使用するためには"c4"といった座標の文字列を`[2, 3]`といった`[number, number]`の型に変換する関数があると便利そうです。
```typescript
export function parse_coord(coord_str: string): [number, number] {
  ...
}
```

この節で作成した関数を`src/main.ts`に組み込んでいきましょう。
ここまでで我々のゲームは黒と白の石を交互に好きな位置におけるゲームになっているとおもいます。

### 合法手以外を打てないようにする
好き勝手な位置に石を置かれてはゲームが成立しないので、ユーザーからの入力が合法手であるかをする必要があります。
```typescript
export function is_valid_move(p: [number, number], board: Board): boolean {
  ...
}
```

ある手が合法であるかを確認するためには、縦横斜め方向にグリッドを探索する必要があります。
このような探索では以下のような定数を用意しておいてベクトル同士の演算として扱うと簡潔に書けることが多いです。
```typescript
const DIRECTIONS = {
  up:    [-1,  0],
  down:  [ 1,  0],
  left:  [ 0, -1],
  right: [ 0,  1],
  ul:    [-1, -1],
  ur:    [-1,  1],
  dl:    [ 1, -1],
  dr:    [ 1,  1],
} as const;

function add_vec(p: readonly [number, number], q: readonly [number, number]): [number, number] {
  ...
}

const new_p = add_vec(p, DIRECTIONS.up);
```

探索中に盤面の配列をオーバーした添字でアクセスするとエラーが起きてしまうことに注意してください。
そのようなケースを扱うテストを用意しておくと良いですね。

`is_valid_move`関数ができたら、ユーザーが非合法手を入力したときに怒って、もう一度入力を待ってくれるように`src/main.ts`を変更しておいてください。
いまのところ、挟まれた石がひっくり返るというルールに関して考えなくても良いことにします。

### 合法手を表示する
もう少し我々のゲームを洗練させるために、せっかくなので着手可能位置のヒントを表示してあげることにしましょう。
この機能を実現するためにはすべての合法手を列挙する必要があります。この機能をもつ関数を作成しましょう。

前節で実装した`is_valid_move`をうまく使うと簡単に実装できると思います。

以前実装した`stringify_board`も変更して着手可能位置を表示するように変更してください。着手可能位置を表示するオプションを引数として与えたり、もしくは新たに別の関数を作ってもよいでしょう。このときもはじめにテストを書くことを推奨します。

### 挟まれた石をひっくり返す
いよいよオセロの核心である、挟まれた石をひっくり返す処理を実装していきましょう。
盤面と新たに置かれた石が入力として与えられたときにある一方向についてひっくり返る石の配列を返してくれる関数があればよさそうです。
この関数をすべての方向について呼び出すことでひっくり返すべきすべての石が得られます。
関数内部の処理は前前節で実装したものと共通点が多いのでうまく共通化できると実装量が節約できそうです。

最後に、現在の盤面と次の着手が与えられて次の盤面を返すような関数`next_state`を実装してこれを`src/main.ts`から呼ぶことにしましょう。
`src/main.ts`の中身は少ないほどブラウザへの移植が楽になります。

これでオセロゲームはほとんど遊べるようになっていると思います。
最後の節では細々した機能を追加してゲームの体裁を整えます。

### パス、終了判定、勝敗判定
CUIオセロゲームの最後の節です。
以下の機能を実装してください。

- 着手可能位置がない場合には手番を飛ばす
- ゲームの終了を判定する
- ゲーム終了時に勝敗に関するメッセージを出力する

## ブラウザで遊べるオセロを作る

### Canvas


## AIをつくる

### 盤面評価

### 探索

#### min-max法

#### α-β法