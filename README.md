# Bar L'UCE 棚卸し・売上管理システム

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.local.example` をコピーして `.env.local` を作成し、値を入力。

### 3. ローカル起動
```bash
npm run dev
```
→ http://localhost:3000

## Vercel デプロイ
1. GitHub にプッシュ
2. vercel.com → New Project → GitHub リポジトリを選択
3. Environment Variables に UPSTASH_REDIS_REST_URL / TOKEN を追加
4. Deploy

## Upstash セットアップ
1. https://console.upstash.com でアカウント作成
2. Create Database → Redis → リージョン: ap-northeast-1 (東京)
3. REST API の URL と Token をコピー
