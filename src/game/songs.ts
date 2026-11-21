// リズムゲームの収録曲（この作品のデータ）。デジタルCDエンジン v1.4.1 の任意モジュール。
// CD 側の曲目（src/album/tracks.ts）と並び・タイトルを一致させる。
// - id: 曲 ID（譜面・歌詞データのキー）
// - audioUrl / jacketUrl: ゲーム用の音源（CD の MP4 から抽出した MP3 192kbps）とジャケット
// - accent: 曲のテーマ色（パターン3＝曲ごとに切り替え、オーナー決定 2026-11-20）。
//   各曲のジャケットから scripts/jacket-accent.py で抽出（視認性のため明度・彩度を持ち上げ済み）
// - frameInset: ジャケット絵の四辺に焼き込まれた紙枠の幅（px、1024px 基準）。
//   本作の11枚は全面絵（地色や黒地も絵の一部）で紙枠は無いため全曲 0
// - bonus: ボーナストラックなら true（CD 側 tracks.ts の bonus と一致。スライドに金色の BONUS チップ）
// - album: 収録アルバム名（表示用） / genre: ジャンル（表示用）
import audio01 from './assets/track01.mp3';
import audio02 from './assets/track02.mp3';
import audio03 from './assets/track03.mp3';
import audio04 from './assets/track04.mp3';
import audio05 from './assets/track05.mp3';
import audio06 from './assets/track06.mp3';
import audio07 from './assets/track07.mp3';
import audio08 from './assets/track08.mp3';
import audio09 from './assets/track09.mp3';
import audio10 from './assets/track10.mp3';
import audio11 from './assets/track11.mp3';
import jacket01 from './assets/track01.jpg';
import jacket02 from './assets/track02.jpg';
import jacket03 from './assets/track03.jpg';
import jacket04 from './assets/track04.jpg';
import jacket05 from './assets/track05.jpg';
import jacket06 from './assets/track06.jpg';
import jacket07 from './assets/track07.jpg';
import jacket08 from './assets/track08.jpg';
import jacket09 from './assets/track09.jpg';
import jacket10 from './assets/track10.jpg';
import jacket11 from './assets/track11.jpg';

export interface GameSongDef {
  id: string;
  audioUrl: string;
  jacketUrl: string;
  accent: string;
  frameInset: number;
  slidePosition?: string;
  bonus?: boolean;
  album: string;
  genre: string;
}

const ALBUM = 'NK-001 ニコラスケイジと木曽と私';

export const SONG_DEFS: GameSongDef[] = [
  {
    id: 'kogoe',
    audioUrl: audio01,
    jacketUrl: jacket01,
    accent: '#5199d6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Avant-Garde Theatrical Rock',
  },
  {
    id: 'samurai',
    audioUrl: audio02,
    jacketUrl: jacket02,
    accent: '#518cd6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Golden Era Boom Bap',
  },
  {
    id: 'ginmaku',
    audioUrl: audio03,
    jacketUrl: jacket03,
    accent: '#51c8d6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Showa Kayokyoku',
  },
  {
    id: 'nicolas',
    audioUrl: audio04,
    jacketUrl: jacket04,
    accent: '#d6a351',
    // 紙枠あり（2026-11-21 検品で実測）: 紙色（R−B＞22、R 85〜215）の画素割合が
    // 左・上で約16px まで ほぼ 1.0 で続き、境界で急に 0 へ落ちる（測り方は
    // digitalcd-engine docs/PRODUCTION.md「frameInset（紙枠）の測り方」）。
    // 当初は左・上の実測で 17 としたが、全曲再実測（v1.2.4）で右辺は割合 1.0 が
    // 20px まで続き 23px 付近まで紙が残ると分かったため、四辺の最大に合わせて 24。
    frameInset: 24,
    album: ALBUM,
    genre: 'Modern Enka',
  },
  {
    id: 'yoru',
    audioUrl: audio05,
    jacketUrl: jacket05,
    accent: '#d65171',
    frameInset: 0,
    album: ALBUM,
    genre: 'Enka',
  },
  {
    id: 'silhouette',
    audioUrl: audio06,
    jacketUrl: jacket06,
    accent: '#5190d6',
    // 白枠あり（2026-11-21 オーナー指摘で実測）: ポスター風の白い縁取りが
    // 焼き込まれている。紙色テスト（暖色）では検出できず、白〜無彩色の明るい画素
    // （min(R,G,B)＞190、色のばらつき＜36）の割合で測ると、右辺は 29px まで 1.0
    // で 30px で 0 へ落ちる（上 14px、下 4px＋擦れ、左 3px と非対称）。
    // frameInset は四辺一律なので、最大の右辺に合わせて 31（境界＋1）。
    frameInset: 31,
    album: ALBUM,
    genre: '90s J-Pop / Eurobeat',
  },
  {
    id: 'kyoran',
    audioUrl: audio07,
    jacketUrl: jacket07,
    accent: '#d66051',
    frameInset: 0,
    album: ALBUM,
    genre: 'Avant-garde Cabaret Rock',
  },
  {
    id: 'fire',
    audioUrl: audio08,
    jacketUrl: jacket08,
    accent: '#d66d51',
    frameInset: 0,
    album: ALBUM,
    genre: 'Cinematic Hip-Hop',
  },
  {
    id: 'highway',
    audioUrl: audio09,
    jacketUrl: jacket09,
    accent: '#b651d6',
    frameInset: 0,
    album: ALBUM,
    genre: '90s J-Pop / Eurobeat',
  },
  {
    id: 'kiri',
    audioUrl: audio10,
    jacketUrl: jacket10,
    accent: '#60d651',
    frameInset: 0,
    album: ALBUM,
    genre: '―',
  },
  {
    id: 'actor',
    audioUrl: audio11,
    jacketUrl: jacket11,
    accent: '#d67351',
    frameInset: 0,
    bonus: true,
    album: ALBUM,
    genre: '80s Showa-era Kayokyoku',
  },
];
