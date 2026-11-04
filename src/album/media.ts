// 収録メディア（曲ごとのジャケット画像と音源）。Vite が dist/assets へ配置する。
// 音源は事前キャッシュに入れず、初回起動時に一括ダウンロードして実行時キャッシュへ入れる（src/download.ts）。
import img01 from './assets/img/track01.jpg';
import img02 from './assets/img/track02.jpg';
import img03 from './assets/img/track03.jpg';
import img04 from './assets/img/track04.jpg';
import img05 from './assets/img/track05.jpg';
import img06 from './assets/img/track06.jpg';
import img07 from './assets/img/track07.jpg';
import img08 from './assets/img/track08.jpg';
import img09 from './assets/img/track09.jpg';
import img10 from './assets/img/track10.jpg';
import img11 from './assets/img/track11.jpg';
import audio01 from './assets/audio/track01.mp4';
import audio02 from './assets/audio/track02.mp4';
import audio03 from './assets/audio/track03.mp4';
import audio04 from './assets/audio/track04.mp4';
import audio05 from './assets/audio/track05.mp4';
import audio06 from './assets/audio/track06.mp4';
import audio07 from './assets/audio/track07.mp4';
import audio08 from './assets/audio/track08.mp4';
import audio09 from './assets/audio/track09.mp4';
import audio10 from './assets/audio/track10.mp4';
import audio11 from './assets/audio/track11.mp4';

/** 曲ごとのジャケット画像（TRACKS と同じ順） */
export const TRACK_IMG: string[] = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11];

/** 曲ごとの音源（TRACKS と同じ順） */
export const TRACK_AUDIO: string[] = [audio01, audio02, audio03, audio04, audio05, audio06, audio07, audio08, audio09, audio10, audio11];
