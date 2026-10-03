# Yosegakky

## What's This?

- 簡易寄せ書き作成ツールです
- download したら簡単に寄せ書きっぽいものを作れる様にしたつもりです
- そのため昨今のビルドツールは使っていません
- ローカルで動くので寄せ書きのメッセージなどを設定したら、みんなで見たりとか、zipなんかにしてプレゼントしたりとかそんな感じです

## Usage

[http://shimabox.github.io/yosegakky/](http://shimabox.github.io/yosegakky/)

## 同梱ライブラリ

- jQuery 3.7.1（公式配布: https://code.jquery.com/jquery-3.7.1.min.js）
- Bootstrap 4.6.2（公式 npm パッケージの `dist`。JavaScript は Popper 同梱の bundle を使用）
- Lightcase 2.3.4 の画像読み込みイベントは jQuery 3 に合わせて `.on('load', ...)` / `.on('error', ...)` に変更しています。

ブラウザから `index.html` を開くだけで動作します。ライブラリはローカルに同梱しているため、表示時の CDN アクセスは不要です。

## 開発時の検証

Node.js 24 以上で `npm ci --ignore-scripts`、`npx playwright install chromium`、`npm test` を実行します。オフライン起動、寄せ書き描画、ライトボックス、jQuery の prototype pollution 防止、スマートフォン・デスクトップ表示を Chromium で確認します。実行時のビルド手順は不要です。

GitHub Actions でも同じテストと `npm audit` を実行し、スクリーンショットを保存します。この workflow は公開・デプロイを行いません。GitHub Pages の公開元は既存の `gh-pages` ブランチです。
