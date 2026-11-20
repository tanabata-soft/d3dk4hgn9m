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
    genre: 'Cinematic Ballad',
  },
  {
    id: 'samurai',
    audioUrl: audio02,
    jacketUrl: jacket02,
    accent: '#518cd6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Hip Hop / Trap',
  },
  {
    id: 'ginmaku',
    audioUrl: audio03,
    jacketUrl: jacket03,
    accent: '#51c8d6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Folk Ballad',
  },
  {
    id: 'nicolas',
    audioUrl: audio04,
    jacketUrl: jacket04,
    accent: '#d6a351',
    frameInset: 0,
    album: ALBUM,
    genre: 'City Pop',
  },
  {
    id: 'yoru',
    audioUrl: audio05,
    jacketUrl: jacket05,
    accent: '#d65171',
    frameInset: 0,
    album: ALBUM,
    genre: 'Enka / Kayōkyoku',
  },
  {
    id: 'silhouette',
    audioUrl: audio06,
    jacketUrl: jacket06,
    accent: '#5190d6',
    frameInset: 0,
    album: ALBUM,
    genre: 'Synthwave',
  },
  {
    id: 'kyoran',
    audioUrl: audio07,
    jacketUrl: jacket07,
    accent: '#d66051',
    frameInset: 0,
    album: ALBUM,
    genre: 'Theatrical Rock',
  },
  {
    id: 'fire',
    audioUrl: audio08,
    jacketUrl: jacket08,
    accent: '#d66d51',
    frameInset: 0,
    album: ALBUM,
    genre: 'Festival EDM',
  },
  {
    id: 'highway',
    audioUrl: audio09,
    jacketUrl: jacket09,
    accent: '#b651d6',
    frameInset: 0,
    album: ALBUM,
    genre: 'AOR / City Pop',
  },
  {
    id: 'kiri',
    audioUrl: audio10,
    jacketUrl: jacket10,
    accent: '#60d651',
    frameInset: 0,
    album: ALBUM,
    genre: 'Dark Ambient Ballad',
  },
  {
    id: 'actor',
    audioUrl: audio11,
    jacketUrl: jacket11,
    accent: '#d67351',
    frameInset: 0,
    bonus: true,
    album: ALBUM,
    genre: 'Cinematic Pop',
  },
];
