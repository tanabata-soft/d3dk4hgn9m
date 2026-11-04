// 曲目と解説（このアルバムのデータ）。src は歌詞データ（src/album/sync.ts）のキー。
// 並びが曲順。そのまま表示と再生の順番になる。
import type { TrackMeta } from '../logic';

export const TRACKS: TrackMeta[] = [
  { src: '凍える銀の幕', title: '凍える銀の幕', genre: 'Avant-Garde Theatrical Rock', time: '2:58', note: '「銀の幕が開く日、僕らの旅路が今始まる」――開幕宣言そのものの一曲。凍てつく風、袖に隠した刃、黒衣の姿。夢か幻か分からないまま、物語はここから動き出す。' },
  { src: 'Kiso_ji_Samurai_Flow', title: 'Kiso-ji: Samurai Flow', genre: 'Golden Era Boom Bap', time: '2:43', note: '中山道を越える道中記。侍が駆け抜けた道をビートに乗せ、五平餅と蕎麦を全力で讃える旅の歌。軽快さが、旅立ちの気分をそのまま運んでくる。' },
  { src: '銀幕の木曽路', title: '銀幕の木曽路', genre: 'Showa Kayokyoku', time: '3:00', note: '日の落ちる木曽路で、見慣れた顔が霧の中に立っていた。昭和歌謡の王道で歌う「奇跡の出逢い」。中盤の語りは、映画のモノローグのようでもある。' },
  { src: 'ニコラスケイジと木曽と私', title: 'ニコラスケイジと木曽と私', genre: 'Modern Enka', time: '2:59', note: '夜更けの宿場、揺れる灯りとシネマの幕。タイトルフレーズ「ニコラスケイジと木曽と私」が初めて姿を現す、アルバムの主題歌的な一曲。' },
  { src: '木曽路のニコラス', title: '木曽路のニコラス', genre: 'Enka', time: '2:53', note: '囲炉裏を囲んで観るシネマ、雨の中山道、「哀しい夢の終着駅」。ど真ん中の演歌が、物語の心臓になる。' },
  { src: 'Kiso_Night_Silhouette', title: 'Kiso Night Silhouette', genre: '90s J-Pop / Eurobeat', time: '3:00', note: '霧の夜に現れたシルエットと歩く石畳。木曽漆器に映る瞳、そば粉の香り。ときめきを担当する、夜の散策歌。' },
  { src: '木曽路、狂乱の舞台', title: '木曽路、狂乱の舞台', genre: 'Avant-garde Cabaret Rock', time: '2:57', note: '「怪演の幕が上がる」。五平餅の焦げる匂いと硝子の破片、すんきの酸味まで脳を灼く深夜のキャバレーロック。理性のネジが外れる章。' },
  { src: 'Nakasendo_Fire', title: 'Nakasendo Fire', genre: 'Cinematic Hip-Hop', time: '2:58', note: '本人が名乗りを上げて全開になる饗宴。すんきで朝食、五平餅は straight fire。情熱の頂点は、この炎にある。' },
  { src: '石畳のハイウェイ', title: '石畳のハイウェイ', genre: '90s J-Pop / Eurobeat', time: '3:00', note: '『Face/Off』『Con Air』『Gone in 60 Seconds』――出演作の名を連ねて石畳を駆け抜ける、疾走のクライマックス。「奇跡を始めようぜ」。' },
  { src: '木曽の霧と狂気の瞳', title: '木曽の霧と狂気の瞳', genre: '―', time: '2:32', note: '狂乱のあとの雨上がり。現実と妄想の境目を一人で歩き、「すべては幻だったのかもしれない」と夜が明ける。熱狂の直後に置かれた、静かなエピローグ。' },
  { src: 'The_Actor_in_the_Mist', title: 'The Actor in the Mist', genre: '80s Showa-era Kayokyoku', time: '3:01', bonus: true, note: '本編の一夜を英語で歌い直した、もう一つの版。字幕のない上映のように、物語を知る人だけが二度楽しめるボーナストラック。' },
];
