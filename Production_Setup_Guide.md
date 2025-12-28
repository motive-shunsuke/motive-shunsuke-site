
# Production Setup Guide

実装された機能（Googleログイン、Salesforce連携）を本番環境で動作させるための設定手順書です。

## 1. Google OAuth の設定 (Googleログイン)
現在はシミュレーションモードで動作していますが、実際にGoogleアカウントを使ってログインさせるには、Google Cloud Platform (GCP) での設定が必要です。

### 手順
1. **Google Cloud Console** (https://console.cloud.google.com/) にアクセス。
2. 新しい**プロジェクトを作成**（例: "BizHack-Prod"）。
3. **「APIとサービス」 > 「OAuth同意画面」** を設定。
   - User Type: `External` (外部)
   - アプリ情報: アプリ名、ユーザーサポートメールなどを入力。
4. **「認証情報」 > 「認証情報を作成」 > 「OAuthクライアントID」** を選択。
   - アプリケーションの種類: `Web application`
   - **承認済みのJavaScript生成元**: 
     - 開発用: `http://localhost:3000`
     - 本番用: `https://your-domain.com` (実際のドメイン)
   - **承認済みのリダイレクトURI**:
     - 開発用: `http://localhost:3000/api/auth/callback/google` (NextAuthなどを使用する場合)
5. 作成後、`Client ID` と `Client Secret` が発行されます。

### 実装の切り替え
本番化する際は、現在の `RegistrationDialog` のシミュレーション部分を、`next-auth` などのライブラリを使用した実装に置き換えることを推奨します。

---

## 2. Salesforce Web-to-Lead の設定
フォームから送信されたデータが実際にSalesforceに届くように設定します。

### 手順
1. Salesforceにログインし、**設定 (Setup)** 画面へ。
2. クイック検索で「Web-to-Lead」を検索し、選択。
3. **「Web-to-Leadの有効化」** にチェックを入れて保存。
4. **「Web-to-Leadフォームの作成」** ボタンをクリック。
   - 含める項目を選択: `姓 (Last Name)`, `名 (First Name)`, `メール (Email)`, `会社名 (Company)`, `役職 (Title)` など。
   - 戻りURL (Returl URL): `https://your-domain.com/thanks` (登録完了後の画面)
5. **generate (作成)** すると、HTMLコードが生成されます。
6. 生成されたコード内の `oid` (Organization ID) が、現在の `.env` ファイルの `NEXT_PUBLIC_SALESFORCE_OID` と一致することを確認してください。

### 注意点:
- **reCAPTCHA**: 本番環境でスパムを防ぐために、Salesforce側でreCAPTCHAを有効にすることがありますが、その場合はフォーム側にreCAPTCHAの実装追加が必要です。
- **CORS制限**: ブラウザから直接Salesforceのエンドポイント (`webto.salesforce.com`) にPOSTする場合、CORSエラーが発生する可能性があります（現在は `mode: 'no-cors'` で回避していますが、レスポンス内容を確認できません）。より確実な方法は、Next.jsのAPI Routeを経由してサーバーサイドからSalesforceに送信することです。

### サーバーサイド送信へのアップグレード（推奨）
現在のクライアントサイド送信 (`mode: 'no-cors'`) から、より堅牢な実装への変更例：

```typescript
// app/api/register/route.ts
export async function POST(request: Request) {
  const body = await request.formData();
  // サーバーからSalesforceへ送信 (CORS制限なし)
  const response = await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead", {
    method: "POST",
    body: body,
  });
  return Response.json({ success: true });
}
```

---

## 3. Webサイトのナビゲーション確認
- **プロンプト集リンク**: ヘッダーの「プロンプト集」リンクは `/prompts` (一覧ページ) に遷移するよう修正しました。
- **お問い合わせボタン**: ログイン後もヘッダー内にお問い合わせボタンが表示されるよう修正しました。
