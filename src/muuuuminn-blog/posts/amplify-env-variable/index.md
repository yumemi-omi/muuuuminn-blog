---
title: "AmplifyでデプロイしたNext.js内において、Amplifyコンソールから環境変数を設定して使う"
description: "NEXT_PUBLICをつける場合とつけない場合の2パターンを記載した。"
date: "2023-05-06T06:59:19.978Z"
coverImage: "https://user-images.githubusercontent.com/38467746/236593357-95fd30eb-047c-4332-9822-16cc2c53d9fe.jpeg"
ogImageUrl: "https://user-images.githubusercontent.com/38467746/236593357-95fd30eb-047c-4332-9822-16cc2c53d9fe.jpeg"
category: "0"
tags: "1,21,23"
---

## _1.ブラウザ側に晒しても OK な環境変数を読み込む_

Amplify コンソールの環境変数のページへ行き、設定したい環境変数の prefix として`NEXT_PUBLIC_`をつける。これだけで完了。
ブラウザ側から見れてしまうので、シークレットな値は次に紹介する方法で設定すること。

![NEXT_PUBLIC_の設定画像](https://user-images.githubusercontent.com/38467746/236594915-0b818278-c698-4b19-bb50-83826de83737.png)

## _2.Node.js 環境下（SSR や API routes など）で読み込む_

Amplify コンソールの環境変数のページへ行き、環境変数を追加する。ただし prefix `NEXT_PUBLIC_`はつけない。
![NEXT_PUBLICではない設定画像](https://user-images.githubusercontent.com/38467746/236594913-62cc7cc8-c56e-4801-b751-1c0341a11e77.png)

次に`amplify.yml`を編集する。ビルドの設定ページに行けばコンソール上で編集可能ですが、リポジトリのルートに`amplify.yml`を置いておけば管理しやすくなるのでオススメ。
そして`amplify.yml`の編集内容としては以下になる。

```yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - echo "ENV_TEST=$ENV_TEST" >> .env # この行を追加
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

これでデプロイすれば、読み込みができているはず。

## _参考情報_

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

https://maku.blog/p/gbpeyov/

https://qiita.com/iMissYu/items/fb57c75b77a222ec9ea1
