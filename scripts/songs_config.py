"""作品の曲設定（NK-001）。

単位D（生成器一本化）: 生成器本体の正はテンプレート repo
（mmishina-art/digitalcd-engine）の scripts/chartgen/ パッケージ1か所。
作品側はこの SONGS メタデータと歌詞入力（src/game/data/lyrics.json）だけを
持ち、scripts/generate-charts.py（入口ブートストラップ）がテンプレートの
chartgen を参照して生成する。曲を足すときはここに1曲分を足す。
各キーの意味はテンプレート scripts/chartgen/config.py のコメント参照。
"""

SONGS = {
    # 雛形の仮データ（テンプレートシングルの2曲。新作では収録曲に書き換える）。
    # 音源は src/game/assets/track0N.mp3（制作入口で用意した唯一の正規音源 MP3
    # 192kbps で書き出したもの。雛形のゲーム側仮音源だけは、譜面生成の検証に
    # 使えるよう打音のある合成曲を scripts/make-sample-game-audio.py で作った）。
    # FEVER（サビ）区間は、歌詞（src/album/sync.ts）の反復ブロックから決める:
    # サビの歌詞ブロックの先頭行の開始秒を開始、末尾行の歌唱が終わる頃を終了とし、
    # 波形の RMS の盛り上がりとも一致することを確認する（NK-S003 での決め方）。
    # NK-001『ニコラスケイジと木曽と私』全11曲。FEVER は歌詞（src/album/sync.ts）の
    # サビ反復ブロックから決定（ブロック先頭行の開始秒〜末尾行の歌唱終了頃）。
    # サビは歌に合わせる（chorus_layer "vocal"、chorus_bonus 0.5。NK-S003 のオーナー指示）
    "kogoe": {
        "title": "凍える銀の幕",
        "audio": "src/game/assets/track01.mp3",
        "fever": [[49.0, 75.0], [112.0, 139.0], [151.0, 165.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 11, "normal": 14, "hard": 18},
        "ballad": False,
    },
    "samurai": {
        "title": "Kiso-ji: Samurai Flow",
        "audio": "src/game/assets/track02.mp3",
        "fever": [[32.0, 55.0], [74.0, 95.0], [117.0, 138.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 9, "normal": 13, "hard": 14},
        "ballad": False,
    },
    "ginmaku": {
        "title": "銀幕の木曽路",
        "audio": "src/game/assets/track03.mp3",
        "fever": [[64.0, 92.0], [112.0, 140.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 14, "normal": 18, "hard": 25},
        "ballad": False,
    },
    "nicolas": {
        "title": "ニコラスケイジと木曽と私",
        "audio": "src/game/assets/track04.mp3",
        "fever": [[61.0, 87.0], [140.0, 164.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 9, "normal": 14, "hard": 21},
        "ballad": False,
    },
    "yoru": {
        "title": "木曽路のニコラス",
        "audio": "src/game/assets/track05.mp3",
        "fever": [[64.0, 98.0], [117.0, 150.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 13, "normal": 19, "hard": 28},
        "ballad": False,
    },
    "silhouette": {
        "title": "Kiso Night Silhouette",
        "audio": "src/game/assets/track06.mp3",
        "fever": [[40.0, 68.0], [99.0, 126.0], [142.0, 171.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 14, "normal": 16, "hard": 27},
        "ballad": True,
        "flick_lock": [[29722,3,0],[40914,3,0],[42516,0,2],[50132,1,0],[51920,1,2],[53336,3,1],[55333,2,2],[56935,0,0],[58514,0,2],[64528,2,0],[72516,1,0],[80922,1,0],[98128,1,2],[100124,3,0],[101727,3,2],[109320,3,0],[111131,0,2],[112919,3,1],[114521,3,2],[116123,1,0],[117725,0,2],[123724,3,0],[143314,3,0],[144916,3,2],[146332,2,2],[148120,0,0],[154111,3,0]],
    },
    "kyoran": {
        "title": "木曽路、狂乱の舞台",
        "audio": "src/game/assets/track07.mp3",
        "fever": [[41.0, 65.0], [87.0, 111.0], [143.0, 164.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 6, "normal": 11, "hard": 19},
        "ballad": False,
    },
    "fire": {
        "title": "Nakasendo Fire",
        "audio": "src/game/assets/track08.mp3",
        "fever": [[40.0, 80.0], [105.0, 135.0], [141.0, 168.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 17, "normal": 24, "hard": 34},
        "ballad": False,
    },
    "highway": {
        "title": "石畳のハイウェイ",
        "audio": "src/game/assets/track09.mp3",
        "fever": [[66.0, 88.0], [144.0, 161.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 9, "normal": 9, "hard": 12},
        "ballad": False,
    },
    "kiri": {
        "title": "木曽の霧と狂気の瞳",
        "audio": "src/game/assets/track10.mp3",
        "fever": [[32.0, 54.0], [91.0, 126.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        # 最も静かな曲で hard のレーン3が 0.173 と下限を割ったため、分布を均す圧力を上げる
        "lane_balance_w": 5.0,
        "flick": True,
        "flick_budget": {"easy": 10, "normal": 16, "hard": 18},
        "ballad": False,
    },
    "actor": {
        "title": "The Actor in the Mist",
        "audio": "src/game/assets/track11.mp3",
        "fever": [[64.0, 96.0], [114.0, 146.0]],
        "chart_v5": True,
        "chorus_layer": "vocal",
        "chorus_bonus": 0.5,
        "flick": True,
        "flick_budget": {"easy": 11, "normal": 17, "hard": 23},
        "ballad": False,
    },
}
