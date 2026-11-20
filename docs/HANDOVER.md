# 引き継ぎメモ

作業の区切りごとに書き直す(次の作業を始める人や AI が、ここだけ読めば再開できるように)。古くなった内容は消し、今の状態だけを残す。

更新: 2026-11-21・版 v1.2.1（公開済み・実機確認待ち）

## v1.2.1 紙枠修正（2026-11-21 完了）

公開後の検品（みゅう実施）で判明した1件の不具合を修正し、v1.2.1 として公開済み。

- 不具合: **nicolas（『ニコラスケイジと木曽と私』、track04）のジャケットに紙枠があるのに frameInset が 0 のまま**だった。実測: 紙色（R−B＞22、R 85〜215）の画素割合が端から約16px まで ほぼ 1.0 で続き、内側の境界で急に 0 へ落ちる。ほかの10曲は同じ実測で枠なし（yoru の端の明るさは雪と煙の絵柄、kogoe は擦れの質感で、割合が漸減し境界が曖昧）。引き継ぎ時の「11枚とも全面絵」という目視判定が nicolas だけ誤っていた。
- 修正: `src/game/songs.ts` の nicolas の `frameInset` を **17** にした（根拠コメント付き）。版数を **1.2.1** に上げた（package.json と package-lock.json のルート version）。ほかの曲・譜面・歌詞には触っていない。実測は修正担当側でも track04.jpg で再確認済み（左辺 x=16 まで 0.95〜1.0・x=19 で 0.04、上辺 y=15 まで 1.0・y=16 で 0.1）。
- 検証: `npm run verify` 通過（単体テスト36件）、e2e 25件全て通過（4173番ポートの空きを確認してから実行。今回は layer-rules のタイムアウトも「なおす」修復テストの失敗も発生しなかった）。選曲スライドと演奏画面の両方で nicolas の枠が消えたことをスクリーンショットで目視確認済み。
- 公開記録: PR #22 を squash マージ（merge commit a29d7f2f2a07ac6e65c81ffe5d04a96304bc530e）。CI（check 1分17秒 / e2e 11分56秒）通過、GitHub Pages 配信確認済み（配信中バンドル assets/index-LnuJWWX2.js がローカル build と一致し "1.2.1" を含む、HTTP 200）。
- 検証時の環境注意（変更の成否とは別）: ①単体テストの layer-rules は VM 負荷時に 5 秒タイムアウトで落ちることがある（`--testTimeout` を延ばして単独実行すれば通る）。②e2e の「なおす」修復テストはローカルで落ちることがある（修復自体は約6.5秒で完了し正常。CI では通過する）。e2e の前に 4173 番ポートの持ち主を確認すること。
- 紙枠の測り方の正本は、エンジン（mmishina-art/digitalcd-engine）の `docs/PRODUCTION.md`「リズムゲーム（任意モジュール）」内の「frameInset（紙枠）の測り方」。

## v1.2.0 リズムゲーム適用（2026-11-20 開始、2026-11-21 完了）

オーナー指示で NK-001 本体へリズムゲームを統合した（単体の『キソ・ケイジ・ビート』とは別物）。作業は 2026-11-20 に別 AI が下準備をして引き継ぎ、2026-11-21 に譜面生成から再開して完了した。状態はこの節が正。残るのはオーナーの実機確認（ゲームの叩き心地）のみ。

- v1.2.0 公開記録（2026-11-21）: PR #19 を squash マージ（merge commit 4fcabc216c47f06f2711c0429523320b4b0a35ce）、ブランチ feat/rhythm-game は削除済み。CI（check / e2e）通過、GitHub Pages 再デプロイ成功。https://tanabata-soft.github.io/d3dk4hgn9m/ は HTTP 200、配信中 JS バンドル（assets/index-rB4s6Pex.js）がローカル build と一致し "1.2.0" を含むことを確認済み

### 済んでいること

- デジタルCDエンジン v1.4.1（mmishina-art/digitalcd-engine）の任意モジュール「リズムゲーム」を移植済み。コピー物: `src/game/` 一式（data/ を除く）、`src/debug.ts`（registerDebugActions 追加版へ差し替え）、`scripts/`（generate-charts.py / gen-game-lyrics.mjs / check-two-thumb.py / verify-autoplay-full.mjs / jacket-accent.py）、`tests/game-data.test.ts`、`e2e/game.spec.ts`
- 配線済み: index.html に「遊ぶ」ボタン（btn-open-game）と `#view-game` セクション、src/main.ts に enterGameMode の import とクリック処理、vite.config.ts の precache に mp3・wav を追加
- 素材済み: CD の MP4 11曲から MP3 192kbps を抽出して `src/game/assets/track01〜11.mp3`、曲ジャケットを `track01〜11.jpg` にコピー、hit-sample.wav も配置
- `src/game/songs.ts` 作成済み。全11曲、ID は kogoe / samurai / ginmaku / nicolas / yoru / silhouette / kyoran / fire / highway / kiri / actor（actor は bonus: true で CD 側 tracks.ts と一致）。album 表示は「NK-001 ニコラスケイジと木曽と私」、genre は CD 側の表記どおり（引き継ぎ時点では実際には全曲 CD と異なる表記だったため、2026-11-21 に CD 表記へ修正した。NK-S007 の先行例でも game 側 genre は CD と一致。kiri は CD 側が「―」のため game 側も「―」）
- テーマ色はパターン3（曲ごとに切替、オーナー決定 2026-11-20 で確定）。accent は scripts/jacket-accent.py の抽出値: kogoe #5199d6 / samurai #518cd6 / ginmaku #51c8d6 / nicolas #d6a351 / yoru #d65171 / silhouette #5190d6 / kyoran #d66051 / fire #d66d51 / highway #b651d6 / kiri #60d651 / actor #d67351
- frameInset は v1.2.0 時点で全曲 0 としたが、nicolas（track04）だけ紙枠の見落としがあり、v1.2.1 で 17 に修正済み（上の節）。ほかの10曲は枠なしで正しい（track02 の地色クリーム、track06 の夜景、track10 の黒地＋虹色の星は絵の一部。端の低分散だけで判断しないこと。測り方はエンジン PRODUCTION.md の「frameInset（紙枠）の測り方」が正本）
- `scripts/generate-charts.py` の SONGS 表を本作11曲に差し替え済み。FEVER 区間は歌詞（src/album/sync.ts）のサビ反復ブロックから決定（ブロック先頭行の開始秒〜末尾行の歌唱終了頃）。chorus_layer は "vocal"、chorus_bonus は 0.5（NK-S003 のオーナー指示のパターン）
- `scripts/gen-game-lyrics.mjs` の対応表、`tests/game-data.test.ts`（11曲の ID・タイトル・対応表）、`e2e/game.spec.ts`（スライド11枚・kogoe / samurai・ベストスコア表示文）を本作向けに適合済み。ただし対応表は 2026-11-21 に要修正だった: sync.ts のキーは表示タイトルではなく tracks.ts の src（英語曲は src ≠ タイトル。例 Kiso_ji_Samurai_Flow）で、タイトル引きの表では歌詞生成が落ちた。両ファイルを src キー（ID_BY_SRC）に直して解決済み
- バージョンは 1.1.15 → 1.2.0 に bump 済み（package.json と package-lock.json のルート version 2箇所）。注意: package-lock.json には旧来から name が "pwa-app" のまま等のドリフトがある（今回の変更ではない）

### 譜面生成（2026-11-21 完了）

- kiri のブロッカーは解消した。原因: hard は間引き（thin）でレーン分布を守る仕組みが無く、実体化時のバランス圧（fit_cost の累積カウント項、既定 2.0）だけでは、最も静かな kiri でレーン3が 72/416＝0.173 と下限 0.18 を3ノーツ分だけ割った
- 対策: 生成器に曲別調整 `lane_balance_w`（既定 2.0、Realizer の balance_w）を新設し、kiri のエントリだけ 5.0 にした。kiri/hard は [111, 114, 108, 80]＝[0.269, 0.276, 0.262, 0.194] で全レーン範囲内。既定値の曲は従来どおりで、kogoe の再生成結果が引き継ぎ時の記録（196/389/778）と完全一致することを確認済み
- 全11曲の生成が完了し `src/game/data/charts.json`（170,287 バイト）を書き出した。両親指チェック違反 0（生成時＋単独実行の両方で確認）。BPM とノーツ数（easy/normal/hard）: kogoe 125・196/389/778、samurai 90・147/287/494、ginmaku 120・179/393/671、nicolas 152・190/377/800、yoru 152・181/362/809、silhouette 150・191/388/810、kyoran 125・192/397/790、fire 120・127/401/786、highway 135・198/388/697、kiri 96・105/203/413、actor 124・163/371/658
- 歌詞も生成済み（`src/game/data/lyrics.json`、全11曲 21〜55行、sync.ts の検証済み時刻から変換）
- 生成の実行環境: librosa 入りの venv が必要。この VM では `~/workspace/nk001-rhythm/.venv`（repo の外。repo 内に置くと eslint が .venv 内の JS を拾って verify の lint が落ちるので注意）。再実行は `<venv>/bin/python scripts/generate-charts.py`（1曲あたり約25〜60秒だった）

### 検証結果（2026-11-21）

- `npm run verify` 通過（lint／単体テスト 7ファイル36件／build（precache 41 entries）／check:dist／check:content エラー0）
- e2e 25件全て通過（4173番ポートは空きを確認してから実行）
- 完走確認はオーナー決定（2026-11-20）により代替方式で実施: 全11曲×3難易度の譜面健全性（レーン割合・時刻順・尺超過・ロングノーツ終端）を一括検査して全て正常＋オートプレイ完走3曲（kogoe hard 778/778、kiri hard 413/413、actor hard 658/658、いずれも PERFECT のみ・MISS 0 のフルコンボ）
- 単体プレビュー（dist-preview/preview.html、97,635 KB）を作成し、埋め込み MP3 11曲の長さが原音源と完全一致（差 0.000 秒）、hit-sample.wav 1件の埋め込みも確認済み。オーナー確認用に ~/workspace/your_files/NK-001-preview.html へコピー済み

### 残件

- オーナーの実機確認（リズムゲームの叩き心地と表示）。公開後の検品で判明した紙枠の不具合は v1.2.1 で修正済み

### 曲データ（ID / タイトル / 尺・MP3実測）

- kogoe「凍える銀の幕」178.24秒 / samurai「Kiso-ji: Samurai Flow」162.56秒 / ginmaku「銀幕の木曽路」180.14秒 / nicolas「ニコラスケイジと木曽と私」178.58秒 / yoru「木曽路のニコラス」172.80秒 / silhouette「Kiso Night Silhouette」179.88秒 / kyoran「木曽路、狂乱の舞台」176.77秒 / fire「Nakasendo Fire」177.98秒 / highway「石畳のハイウェイ」179.58秒 / kiri「木曽の霧と狂気の瞳」152.00秒 / actor「The Actor in the Mist」180.51秒

## 【デジタルCD台帳反映用レポート】

- カタログ番号：NK-001
- タイトル：ニコラスケイジと木曽と私
- 形態：アルバム
- 制作担当：シリーズ制作チャット
- 状態：確認待ち
- 現行バージョン：1.2.1
- リポジトリ：tanabata-soft/d3dk4hgn9m
- 公開URL：https://tanabata-soft.github.io/d3dk4hgn9m/
- 収録曲数：11（本編10曲・ボーナストラック1曲）
- 総再生時間：約32分
- 残件・仮置き：リズムゲームの実機確認（オーナー）のみ。その他の仮置きなし
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
