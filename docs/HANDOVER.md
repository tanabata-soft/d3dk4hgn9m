# 引き継ぎメモ

作業の区切りごとに書き直す(次の作業を始める人や AI が、ここだけ読めば再開できるように)。古くなった内容は消し、今の状態だけを残す。

更新: 2026-11-20・版 v1.2.0 作業中（リズムゲーム適用、引き継ぎのため中断・固定）

## v1.2.0 リズムゲーム適用（2026-11-20、作業中断・引き継ぎ用）

オーナー指示でリズムゲーム化を開始し、同日中に別 AI へ引き継ぐため中断した。状態はこの節とブランチ `feat/rhythm-game` のコミットが正。公開はまだ（main は v1.1.15 のまま）。

### 済んでいること

- デジタルCDエンジン v1.4.1（mmishina-art/digitalcd-engine）の任意モジュール「リズムゲーム」を移植済み。コピー物: `src/game/` 一式（data/ を除く）、`src/debug.ts`（registerDebugActions 追加版へ差し替え）、`scripts/`（generate-charts.py / gen-game-lyrics.mjs / check-two-thumb.py / verify-autoplay-full.mjs / jacket-accent.py）、`tests/game-data.test.ts`、`e2e/game.spec.ts`
- 配線済み: index.html に「遊ぶ」ボタン（btn-open-game）と `#view-game` セクション、src/main.ts に enterGameMode の import とクリック処理、vite.config.ts の precache に mp3・wav を追加
- 素材済み: CD の MP4 11曲から MP3 192kbps を抽出して `src/game/assets/track01〜11.mp3`、曲ジャケットを `track01〜11.jpg` にコピー、hit-sample.wav も配置
- `src/game/songs.ts` 作成済み。全11曲、ID は kogoe / samurai / ginmaku / nicolas / yoru / silhouette / kyoran / fire / highway / kiri / actor（actor は bonus: true で CD 側 tracks.ts と一致）。album 表示は「NK-001 ニコラスケイジと木曽と私」、genre は CD 側の表記どおり
- テーマ色はパターン3（曲ごとに切替、オーナー決定 2026-11-20 で確定）。accent は scripts/jacket-accent.py の抽出値: kogoe #5199d6 / samurai #518cd6 / ginmaku #51c8d6 / nicolas #d6a351 / yoru #d65171 / silhouette #5190d6 / kyoran #d66051 / fire #d66d51 / highway #b651d6 / kiri #60d651 / actor #d67351
- frameInset は全曲 0。11枚とも紙枠は無く全面絵（track02 の地色クリーム、track06 の夜景、track10 の黒地＋虹色の星は絵の一部であることを目視確認済み。端の低分散だけで判断しないこと）
- `scripts/generate-charts.py` の SONGS 表を本作11曲に差し替え済み。FEVER 区間は歌詞（src/album/sync.ts）のサビ反復ブロックから決定（ブロック先頭行の開始秒〜末尾行の歌唱終了頃）。chorus_layer は "vocal"、chorus_bonus は 0.5（NK-S003 のオーナー指示のパターン）
- `scripts/gen-game-lyrics.mjs` の ID_BY_TITLE、`tests/game-data.test.ts`（11曲の ID・タイトル・対応表）、`e2e/game.spec.ts`（スライド11枚・kogoe / samurai・ベストスコア表示文）を本作向けに適合済み
- バージョンは 1.1.15 → 1.2.0 に bump 済み（package.json と package-lock.json のルート version 2箇所）。注意: package-lock.json には旧来から name が "pwa-app" のまま等のドリフトがある（今回の変更ではない）

### 譜面生成の状態（2026-11-20 23:45 時点の確定事実）

- 生成は10曲目 kiri で検証アサーションにより異常終了した。charts.json は最後に一括で書く方式のため**未生成**（src/game/data/ は空）。ログは /tmp/nk001-charts.log（VM 再起動で消えることがある）
- 失敗内容: `AssertionError: kiri/hard: レーン3の割合 0.17 が範囲外`（LANE_MIN_SHARE 0.18 未満）。kiri は本作で最も静かな曲（Dark Ambient Ballad、152秒）で、hard のレーン分布が偏った。引き継ぎ側の対応案: kiri のエントリに layer_bias や chord_gate_drop 等の曲別調整を入れて再生成する、または生成器のレーン配分を見直す。actor は未着手
- 1〜9曲目は生成・検証まで完了していた（再生成すれば同じ結果になるはず）。BPM とノーツ数（easy/normal/hard）: kogoe 125・196/389/778、samurai 90・147/287/494、ginmaku 120・179/393/671、nicolas 152・190/377/800、yoru 152・181/362/809、silhouette 150・191/388/810、kyoran 125・192/397/790、fire 120・127/401/786、highway 135・198/388/697
- 再実行コマンド: `~/workspace/kiso-rhythm-game/.venv/bin/python scripts/generate-charts.py`（この VM では1曲あたり数分、混雑時はさらにかかる）。生成が終わるまで charts.json は出ない

### 残作業（この順で）

1. `node scripts/gen-game-lyrics.mjs`（charts.json の後に実行。歌詞の endMs を譜面の実尺で締める）
2. `python3 scripts/check-two-thumb.py src/game/data/charts.json`（パス引数が必須。違反 0 が合格）
3. `npm run verify`（lint＋単体テスト＋build＋check:dist＋check:content）。layer-rules テストは VM 高負荷時に 5 秒タイムアウトのフレークが出ることがある。その場合は単独で再実行して通ればよい
4. e2e: 実行前に 4173 番ポートを掴んでいるプロセスを確認すること（他ワークツリーの preview が掴んでいると旧ビルドで走る）。掴まれていたら playwright.local.config.ts（4174 番・reuseExistingServer: false）を一時的に作って回し、コミット前に消す。e2e の出力を tail にパイプすると終了コードが隠れるので、ファイルにリダイレクトして確認する
5. 完走確認: `scripts/verify-autoplay-full.mjs` はこの VM のヘッドレス再生が実時間の 0.45〜0.67 倍しか進まずタイムアウトしやすい（作品の不具合ではない）。確実なのは1曲ずつプローブで回す方式（NK-S006 v1.2.0 の前例）。全11曲フルコンボが理想だが、所要が大きい場合は「複数曲の完走＋全曲の譜面健全性」で代替できるかオーナー未決（2026-11-20 時点）
6. 単体プレビュー: 先に `rm -rf node_modules/.cache dist-preview` してから `npm run build:preview`（キャッシュが残ると前作の音源が埋め込まれる事故の前例あり）。完成後は埋め込み MP3 を取り出して長さを実測し、原音源と一致を確認してから渡す
7. この HANDOVER の台帳ブロック（現行バージョン等）を v1.2.0 に更新する
8. コミット → push → PR → CI（check / e2e）通過 → squash マージ → GitHub Pages 配信確認（配信中 index の JS バンドル名がローカル build と一致し、"1.2.0" を含むこと）
9. 台帳チャット（★デジタルCDシリーズ）へ公開報告を1件送る

### 曲データ（ID / タイトル / 尺・MP3実測）

- kogoe「凍える銀の幕」178.24秒 / samurai「Kiso-ji: Samurai Flow」162.56秒 / ginmaku「銀幕の木曽路」180.14秒 / nicolas「ニコラスケイジと木曽と私」178.58秒 / yoru「木曽路のニコラス」172.80秒 / silhouette「Kiso Night Silhouette」179.88秒 / kyoran「木曽路、狂乱の舞台」176.77秒 / fire「Nakasendo Fire」177.98秒 / highway「石畳のハイウェイ」179.58秒 / kiri「木曽の霧と狂気の瞳」152.00秒 / actor「The Actor in the Mist」180.51秒

## 【デジタルCD台帳反映用レポート】

- カタログ番号：NK-001
- タイトル：ニコラスケイジと木曽と私
- 形態：アルバム
- 制作担当：シリーズ制作チャット
- 状態：完了
- 現行バージョン：1.1.15
- リポジトリ：tanabata-soft/d3dk4hgn9m
- 公開URL：https://tanabata-soft.github.io/d3dk4hgn9m/
- 収録曲数：11（本編10曲・ボーナストラック1曲）
- 総再生時間：約32分
- 残件・仮置き：なし
- HANDOVER.md更新：済

## 今の状態

- 実機確認（2026-11-13、オーナー）: 歌詞タップシークは問題なし。確認完了、残件なし。
- v1.1.15 公開記録: PR #16 を squash マージ（merge commit 83764f77a522bce51f5c537bb499e1b9c47b1310）、ブランチ update/nk-001-v1.1.15 は削除済み。GitHub Pages 再デプロイ成功、https://tanabata-soft.github.io/d3dk4hgn9m/ は HTTP 200、配信中 JS に version 1.1.15 が含まれることを確認済み。CI の check は通過（e2e も通過。ローカル e2e 17件通過済み）。
- v1.1.15（2026-11-12）: 歌詞タップでその行から再生できるようにした（アルバム・シングル共通ルール、オーナー指示 2026-11-12。テンプレート digitalcd-engine commit 38b215d と同一の実装）。ドラッグによる歌詞スクロールではシークしない（タップ判定は移動量10pxとスクロール量）。e2e にタップシーク／ドラッグではシークしないテストを追加。アルバムに反映するのはこの挙動のみ（裏面フィットはシングル専用、トップへ戻っても止めない挙動はアルバムに元々ある）。
- デジタルCDアルバムは PWA テンプレート構成(Vite + TypeScript + vite-plugin-pwa)。公開は GitHub Actions → GitHub Pages(リポジトリ `tanabata-soft/d3dk4hgn9m`)、URL は https://tanabata-soft.github.io/d3dk4hgn9m/ 。
- **エンジンとデータを分離した(v1.1.0)**: 作品データは `src/album/`(album.ts=題名・カタログ・ライナー・奥付、tracks.ts=曲目・解説、sync.ts=歌詞の同期データ(生成物)、media.ts=画像・音源の対応、assets=画像と音源)に集約。エンジン(`src/` のそのほか)は `src/album/` だけを参照する。新しいアルバムはデータ差し替えだけで作れる(手順: `docs/PRODUCTION.md`)。
- Service Worker は vite-plugin-pwa の自動生成。「更新」ボタン方式。音源は実行時キャッシュ(CacheFirst、キャッシュ名 `kiso-album-audio`)、画像は事前キャッシュ。
- 移行前の手書き版一式は、作業フォルダの `../app/`(移行元)と Git の旧コミットに残っている。

- **v1.1.14 の変更（オーナー指示、2026-11-05）**: 曲目画面の上部を、ブックレットと同じ帯（.bar）に変更し、ホームボタンを帯の左端に置いた（中央にタイトル「曲目」、右端は空き）。v1.1.13 で付けた浮いた丸ボタンは廃止。#view-tracks は align-items: center のため、帯には align-self: stretch が必要（CSS に明記済み）。
- **v1.1.13 の変更（オーナー指示、2026-11-05）**: ①曲目画面上部の「‹ ジャケット」テキストリンクを、再生画面と同じ家の形の丸いアイコンボタンに変更（aria-label「ジャケットへ戻る」、46px）。②表紙の「全曲再生」ボタンは、すでに再生中（または一時停止中）のときは最初から再生し直さず、再生中の曲の再生画面へ戻るだけにした。なお、再生はループするため、全曲が終わって止まる状態はない。どちらも e2e で振る舞いを固定済み。
- v1.1.12: 正式タイトル『ニコラスケイジと木曽と私』への表記統一（題字・アイコン再生成）。v1.1.11: 表ジャケットを候補A3の一枚絵にし、裏面は印刷曲目リスト入りのモザイクに変更（`printedBackList: true`）。

## やりかけ

- なし

## 次にやること(優先順)

1. 実機(iPhone)で受け入れ確認(初回読み込み、オフライン再生、更新バナーの出方、ステータスバーが不透明になった分の見え方)。
2. NK-002 を作るときは `docs/PRODUCTION.md` の手順で。作りながら「作ごとに違うもの」が見つかったら、境界(データ契約)を更新する。

## 注意・気づいたこと

- 仕様として決まっていること(変えるときはオーナー確認): ジャケットは紙ジャケット様式(つや消し・角丸2px・内側の細い縁・背は藍の布調・小口はクリーム)。バージョン表示とインストール入口はブックレット末尾に置く(CLAUDE.md の逸脱メモ参照)。
- ブックレット「聴き方について」にあった「行をタップすれば、その場所から聴き直すこともできます」の一文は、歌詞タップでシークする機能が未実装のため、オーナー判断で削除した（v1.1.10）。機能を実装する話になったら、そのときに文面も戻す。
- 歌詞の漢字の当て方で確認待ちが7箇所ある(凍える銀の幕「何で/都市の風」ほか)。一覧は移行元の作業メモ(日本語歌詞_変換案.md)参照。訂正が来たら `src/album/sync.ts` の該当行の本文だけを直す。
- `src/album/sync.ts` を作り直すとき: 各 mp4 の字幕(mov_text)を抽出し、`{ "曲のsrc": [[秒, "歌詞"], ...] }` の形で、`src/album/tracks.ts` の `src` とキーをそろえる。時刻は字幕の開始時刻。整合は `npm run check:content`(sync-keys)と `npm test`(data.test.ts)が確かめる。
- Netlify 側の旧サイト(nicholas-kiso.netlify.app 等)は凍結したまま触らない(サウンド単行本の納品枠を温存する決まり)。

## 再開のときの指示文

```
docs/HANDOVER.md と最近の変更(git log)を読んで、今の状態と最初の作業の案を出して。
```
