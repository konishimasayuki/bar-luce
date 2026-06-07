"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Home, Package, ScanLine, TrendingUp, Plus, Search, X,
  Trash2, ArrowLeft, ChevronRight, ClipboardList, Camera,
  Pencil, Download, ChevronLeft
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

/* ═══ SAMPLE DATA ════════════════════════════════════════════ */
const SEED_P = [
  { id:"p1", jan:"4904230013009", name:"アサヒ スーパードライ 350ml", category:"ビール", unit:"缶", cost:140, price:550 },
  { id:"p2", jan:"4904230014006", name:"アサヒ スーパードライ 500ml", category:"ビール", unit:"缶", cost:185, price:700 },
  { id:"p3", jan:"4901411001016", name:"キリン 一番搾り 350ml", category:"ビール", unit:"缶", cost:130, price:550 },
  { id:"p4", jan:"4901411001023", name:"キリン 一番搾り 500ml", category:"ビール", unit:"缶", cost:175, price:700 },
  { id:"p5", jan:"4901880903019", name:"サッポロ 黒ラベル 350ml", category:"ビール", unit:"缶", cost:135, price:550 },
  { id:"p6", jan:"4901880903026", name:"サッポロ 黒ラベル 500ml", category:"ビール", unit:"缶", cost:180, price:700 },
  { id:"p7", jan:"4901777211253", name:"サントリー プレミアムモルツ 350ml", category:"ビール", unit:"缶", cost:175, price:650 },
  { id:"p8", jan:"4901777211260", name:"サントリー プレミアムモルツ 500ml", category:"ビール", unit:"缶", cost:230, price:850 },
  { id:"p9", jan:"4901055620016", name:"ヱビスビール 350ml", category:"ビール", unit:"缶", cost:165, price:650 },
  { id:"p10", jan:"4901055620023", name:"ヱビスビール 500ml", category:"ビール", unit:"缶", cost:220, price:850 },
  { id:"p11", jan:"4904011100014", name:"オリオンドラフト 350ml", category:"ビール", unit:"缶", cost:145, price:600 },
  { id:"p12", jan:"4560141460015", name:"コロナ エキストラ 355ml", category:"ビール", unit:"缶", cost:195, price:750 },
  { id:"p13", jan:"4524110106002", name:"ハイネケン 330ml", category:"ビール", unit:"缶", cost:185, price:750 },
  { id:"p14", jan:"4560141490012", name:"ギネス スタウト 330ml", category:"ビール", unit:"缶", cost:210, price:800 },
  { id:"p15", jan:"4562398580019", name:"よなよなエール 350ml", category:"ビール", unit:"缶", cost:250, price:900 },
  { id:"p16", jan:"4562398580026", name:"インドの青鬼 IPA 350ml", category:"ビール", unit:"缶", cost:270, price:950 },
  { id:"p17", jan:"4901880953014", name:"サッポロ ラガービール 350ml", category:"ビール", unit:"缶", cost:130, price:550 },
  { id:"p18", jan:"4904230503018", name:"アサヒ ドライゼロ 350ml", category:"ビール", unit:"缶", cost:110, price:500 },
  { id:"p19", jan:"4901777213028", name:"プレモル マスターズドリーム 370ml", category:"ビール", unit:"缶", cost:215, price:800 },
  { id:"p20", jan:"4901411031013", name:"キリン ラガービール 350ml", category:"ビール", unit:"缶", cost:125, price:550 },
  { id:"p21", jan:"4901777302180", name:"サントリー 角瓶 700ml", category:"ウイスキー", unit:"本", cost:1800, price:3500 },
  { id:"p22", jan:"4901777302075", name:"サントリー 白角 700ml", category:"ウイスキー", unit:"本", cost:1600, price:3200 },
  { id:"p23", jan:"4901085641606", name:"山崎 12年 700ml", category:"ウイスキー", unit:"本", cost:5200, price:8000 },
  { id:"p24", jan:"4901085641590", name:"山崎 NAS 700ml", category:"ウイスキー", unit:"本", cost:3800, price:6500 },
  { id:"p25", jan:"4901085641613", name:"白州 12年 700ml", category:"ウイスキー", unit:"本", cost:4800, price:7500 },
  { id:"p26", jan:"4901085641620", name:"白州 NAS 700ml", category:"ウイスキー", unit:"本", cost:3600, price:6000 },
  { id:"p27", jan:"4901085641644", name:"響 17年 700ml", category:"ウイスキー", unit:"本", cost:18000, price:25000 },
  { id:"p28", jan:"4901085641651", name:"響 BLENDER\'S CHOICE 700ml", category:"ウイスキー", unit:"本", cost:4200, price:7000 },
  { id:"p29", jan:"4904230701019", name:"ニッカ 竹鶴 17年 700ml", category:"ウイスキー", unit:"本", cost:7500, price:12000 },
  { id:"p30", jan:"4904230701002", name:"ニッカ 竹鶴 NAS 700ml", category:"ウイスキー", unit:"本", cost:3200, price:5500 },
  { id:"p31", jan:"4904230810017", name:"ニッカ フロム・ザ・バレル 500ml", category:"ウイスキー", unit:"本", cost:2800, price:4800 },
  { id:"p32", jan:"4904230401016", name:"ニッカ ブラックニッカ クリア 700ml", category:"ウイスキー", unit:"本", cost:950, price:2000 },
  { id:"p33", jan:"4901085627401", name:"キリン 富士山麓 50° 700ml", category:"ウイスキー", unit:"本", cost:2200, price:4000 },
  { id:"p34", jan:"5010314310101", name:"マッカラン 12年 700ml", category:"ウイスキー", unit:"本", cost:4500, price:7500 },
  { id:"p35", jan:"5000299213734", name:"グレンリベット 12年 700ml", category:"ウイスキー", unit:"本", cost:3200, price:5500 },
  { id:"p36", jan:"5000289026108", name:"グレンフィディック 12年 700ml", category:"ウイスキー", unit:"本", cost:3000, price:5000 },
  { id:"p37", jan:"5010326031027", name:"ラフロイグ 10年 700ml", category:"ウイスキー", unit:"本", cost:3500, price:6000 },
  { id:"p38", jan:"5010326031034", name:"アードベッグ 10年 700ml", category:"ウイスキー", unit:"本", cost:4200, price:7000 },
  { id:"p39", jan:"5021349009052", name:"グレンモーレンジィ 10年 700ml", category:"ウイスキー", unit:"本", cost:3600, price:6000 },
  { id:"p40", jan:"4901045140018", name:"ジャックダニエル ブラック 700ml", category:"ウイスキー", unit:"本", cost:1800, price:3500 },
  { id:"p41", jan:"4901045140025", name:"ジャックダニエル シングルバレル 700ml", category:"ウイスキー", unit:"本", cost:4500, price:8000 },
  { id:"p42", jan:"4523091056018", name:"メーカーズマーク 700ml", category:"ウイスキー", unit:"本", cost:2200, price:4000 },
  { id:"p43", jan:"4523091115012", name:"ワイルドターキー 8年 700ml", category:"ウイスキー", unit:"本", cost:2400, price:4200 },
  { id:"p44", jan:"5010106113218", name:"バランタイン 17年 700ml", category:"ウイスキー", unit:"本", cost:6500, price:10000 },
  { id:"p45", jan:"5000267024007", name:"ジョニーウォーカー ブラック 700ml", category:"ウイスキー", unit:"本", cost:2200, price:4000 },
  { id:"p46", jan:"4998603001027", name:"メルシャン フランジア 赤 750ml", category:"ワイン", unit:"本", cost:980, price:2800 },
  { id:"p47", jan:"4998603001034", name:"メルシャン フランジア 白 750ml", category:"ワイン", unit:"本", cost:980, price:2800 },
  { id:"p48", jan:"4998603001041", name:"シャトーメルシャン 甲州 750ml", category:"ワイン", unit:"本", cost:2200, price:5000 },
  { id:"p49", jan:"4998603001058", name:"スパークリング ブリュット 750ml", category:"ワイン", unit:"本", cost:1800, price:4500 },
  { id:"p50", jan:"3185370524015", name:"マルベック アルゼンチン 750ml", category:"ワイン", unit:"本", cost:1500, price:3800 },
  { id:"p51", jan:"8004015100507", name:"キャンティ クラシコ 750ml", category:"ワイン", unit:"本", cost:2800, price:6000 },
  { id:"p52", jan:"8052024410041", name:"バローロ 750ml", category:"ワイン", unit:"本", cost:4500, price:9000 },
  { id:"p53", jan:"3250410011012", name:"コート・デュ・ローヌ 赤 750ml", category:"ワイン", unit:"本", cost:1600, price:4000 },
  { id:"p54", jan:"9414676000193", name:"NZ ソーヴィニヨン・ブラン 750ml", category:"ワイン", unit:"本", cost:2000, price:5000 },
  { id:"p55", jan:"3760038980018", name:"ブルゴーニュ ピノ・ノワール 750ml", category:"ワイン", unit:"本", cost:3800, price:8000 },
  { id:"p56", jan:"3185370591002", name:"モエ・エ・シャンドン NV 750ml", category:"ワイン", unit:"本", cost:4500, price:9000 },
  { id:"p57", jan:"3185370591019", name:"ヴーヴ・クリコ イエローラベル 750ml", category:"ワイン", unit:"本", cost:5500, price:11000 },
  { id:"p58", jan:"4903086114015", name:"フレシネ コルドン・ネグロ 750ml", category:"ワイン", unit:"本", cost:1200, price:3200 },
  { id:"p59", jan:"8411969012024", name:"バロン・デ・レイ テンプラニーリョ 750ml", category:"ワイン", unit:"本", cost:1400, price:3500 },
  { id:"p60", jan:"4903086116019", name:"カレラ シャルドネ 750ml", category:"ワイン", unit:"本", cost:1600, price:4000 },
  { id:"p61", jan:"4994566013109", name:"黒霧島 芋 900ml", category:"焼酎", unit:"本", cost:850, price:2200 },
  { id:"p62", jan:"4994566013116", name:"赤霧島 芋 900ml", category:"焼酎", unit:"本", cost:1100, price:2800 },
  { id:"p63", jan:"4994566013123", name:"白霧島 芋 900ml", category:"焼酎", unit:"本", cost:850, price:2200 },
  { id:"p64", jan:"4994566013130", name:"茜霧島 芋 900ml", category:"焼酎", unit:"本", cost:1200, price:3000 },
  { id:"p65", jan:"4980067100016", name:"伊佐美 芋 900ml", category:"焼酎", unit:"本", cost:1500, price:3500 },
  { id:"p66", jan:"4970573027019", name:"田苑 麦 720ml", category:"焼酎", unit:"本", cost:1200, price:3000 },
  { id:"p67", jan:"4904230002010", name:"二階堂 麦 900ml", category:"焼酎", unit:"本", cost:900, price:2200 },
  { id:"p68", jan:"4904250007011", name:"鍛高譚 しそ 900ml", category:"焼酎", unit:"本", cost:900, price:2200 },
  { id:"p69", jan:"4904930008010", name:"白岳 米 720ml", category:"焼酎", unit:"本", cost:1100, price:2800 },
  { id:"p70", jan:"4902506100014", name:"残波 白 泡盛 750ml", category:"焼酎", unit:"本", cost:1200, price:3000 },
  { id:"p71", jan:"4521417030034", name:"久保田 千寿 720ml", category:"日本酒", unit:"本", cost:1400, price:3500 },
  { id:"p72", jan:"4521417030041", name:"久保田 碧寿 720ml", category:"日本酒", unit:"本", cost:2000, price:5000 },
  { id:"p73", jan:"4537264000012", name:"獺祭 純米大吟醸 50 720ml", category:"日本酒", unit:"本", cost:1500, price:3800 },
  { id:"p74", jan:"4537264000029", name:"獺祭 磨き三割九分 720ml", category:"日本酒", unit:"本", cost:2200, price:5500 },
  { id:"p75", jan:"4904250031016", name:"八海山 純米大吟醸 720ml", category:"日本酒", unit:"本", cost:2500, price:6000 },
  { id:"p76", jan:"4904930018019", name:"黒龍 特選吟醸 720ml", category:"日本酒", unit:"本", cost:1800, price:4500 },
  { id:"p77", jan:"4903986003013", name:"上善如水 純米吟醸 720ml", category:"日本酒", unit:"本", cost:1200, price:3200 },
  { id:"p78", jan:"4970013001013", name:"眞澄 辛口特別純米 720ml", category:"日本酒", unit:"本", cost:1400, price:3500 },
  { id:"p79", jan:"4902506200013", name:"〆張鶴 雪 本醸造 720ml", category:"日本酒", unit:"本", cost:1100, price:2800 },
  { id:"p80", jan:"4906750001012", name:"大関 上撰 本醸造 1800ml", category:"日本酒", unit:"本", cost:1600, price:4000 },
  { id:"p81", jan:"4901777238016", name:"サントリー ほろよい 白いサワー 350ml", category:"缶チューハイ", unit:"缶", cost:120, price:500 },
  { id:"p82", jan:"4901777238023", name:"サントリー -196° ストロングゼロ 350ml", category:"缶チューハイ", unit:"缶", cost:130, price:530 },
  { id:"p83", jan:"4901411030016", name:"キリン 氷結 シチリアレモン 350ml", category:"缶チューハイ", unit:"缶", cost:125, price:510 },
  { id:"p84", jan:"4901411030023", name:"キリン 氷結 グレープフルーツ 350ml", category:"缶チューハイ", unit:"缶", cost:125, price:510 },
  { id:"p85", jan:"4904230053015", name:"アサヒ もぎたて 350ml", category:"缶チューハイ", unit:"缶", cost:120, price:500 },
  { id:"p86", jan:"4901880963013", name:"サッポロ 99.99 350ml", category:"缶チューハイ", unit:"缶", cost:155, price:600 },
  { id:"p87", jan:"4901351036126", name:"サントリー ハイボール缶 350ml", category:"缶チューハイ", unit:"缶", cost:140, price:550 },
  { id:"p88", jan:"4901351036133", name:"コカ・コーラ 檸檬堂 350ml", category:"缶チューハイ", unit:"缶", cost:125, price:520 },
  { id:"p89", jan:"4901777238030", name:"サントリー ゆずサワー 350ml", category:"缶チューハイ", unit:"缶", cost:120, price:500 },
  { id:"p90", jan:"4901411030030", name:"キリン 本搾りチューハイ 350ml", category:"缶チューハイ", unit:"缶", cost:130, price:530 },
  { id:"p91", jan:"4902102072601", name:"アサヒ クリアアサヒ 350ml", category:"缶チューハイ", unit:"缶", cost:110, price:480 },
  { id:"p92", jan:"4902102072618", name:"コカ・コーラ 350ml缶", category:"ソフトドリンク", unit:"缶", cost:65, price:400 },
  { id:"p93", jan:"4901777236012", name:"サントリー 天然水 500ml", category:"ソフトドリンク", unit:"本", cost:55, price:350 },
  { id:"p94", jan:"4902102099003", name:"三ツ矢サイダー 350ml缶", category:"ソフトドリンク", unit:"缶", cost:65, price:400 },
  { id:"p95", jan:"4901085064016", name:"サントリー BOSS 微糖 185g缶", category:"ソフトドリンク", unit:"缶", cost:80, price:400 },
  { id:"p96", jan:"4908540101015", name:"ジンジャーエール 250ml缶", category:"ソフトドリンク", unit:"缶", cost:70, price:400 },
  { id:"p97", jan:"5010666100015", name:"ゴードン ドライジン 700ml", category:"その他", unit:"本", cost:1800, price:3500 },
  { id:"p98", jan:"5021349000012", name:"タンカレー ジン 750ml", category:"その他", unit:"本", cost:2800, price:5500 },
  { id:"p99", jan:"4523091001018", name:"スミノフ ウォッカ 750ml", category:"その他", unit:"本", cost:1800, price:3500 },
  { id:"p100", jan:"4902720027013", name:"バカルディ スペリオール ホワイトラム 750ml", category:"その他", unit:"本", cost:1800, price:3500 },
  { id:"p101", jan:"4902506101011", name:"クエルボ シルバー テキーラ 750ml", category:"その他", unit:"本", cost:2200, price:4000 },
  { id:"p102", jan:"7896067900012", name:"カルーア コーヒーリキュール 700ml", category:"その他", unit:"本", cost:1800, price:3500 },
  { id:"p103", jan:"4523091115029", name:"マリブ ホワイトラム 700ml", category:"その他", unit:"本", cost:2000, price:3800 },
];

const SEED_SESS = [
  { id:"sess_mar", year:2026, month:3, name:"2026年03月棚卸し",
    status:"completed", createdAt:"2026-03-31", completedAt:"2026-03-31",
    counts:{"4904230013009":60,"4904230014006":24,"4901411001016":48,"4901411001023":20,"4901880903019":36,"4901777211253":24,"4901055620016":18,"4560141460015":12,"4524110106002":10,"4562398580019":8,"4901777302180":14,"4901777302075":10,"4901085641606":6,"4901085641590":4,"4901085641613":3,"4904230701019":2,"4904230810017":5,"4904230401016":8,"5010314310101":4,"5000299213734":6,"5000289026108":5,"4901045140018":8,"4523091056018":4,"5000267024007":6,"4998603001027":9,"4998603001034":8,"4998603001041":4,"3185370524015":5,"3185370591002":3,"3185370591019":2,"4903086114015":6,"4994566013109":10,"4994566013116":6,"4994566013123":8,"4994566013130":4,"4904230002010":6,"4521417030034":8,"4537264000012":6,"4537264000029":4,"4904250031016":3,"4901777238016":24,"4901777238023":20,"4901411030016":18,"4901411030023":16,"4901351036126":20,"4901777211260":12,"4901055620023":8,"4901085641644":1,"5010326031027":3,"4523091001018":4,"4902720027013":3,"5010666100015":4,"4901085641651":4,"4904930008010":4,"4521417030041":3,"4906750001012":3} },
  { id:"sess_apr", year:2026, month:4, name:"2026年04月棚卸し",
    status:"completed", createdAt:"2026-04-30", completedAt:"2026-04-30",
    counts:{"4904230013009":54,"4904230014006":20,"4901411001016":42,"4901411001023":17,"4901880903019":32,"4901777211253":20,"4901055620016":16,"4560141460015":10,"4524110106002":9,"4562398580019":7,"4901777302180":11,"4901777302075":8,"4901085641606":4,"4901085641590":3,"4901085641613":2,"4904230701019":2,"4904230810017":4,"4904230401016":7,"5010314310101":3,"5000299213734":5,"5000289026108":4,"4901045140018":7,"4523091056018":3,"5000267024007":5,"4998603001027":7,"4998603001034":7,"4998603001041":3,"3185370524015":4,"3185370591002":2,"3185370591019":2,"4903086114015":5,"4994566013109":8,"4994566013116":5,"4994566013123":7,"4994566013130":3,"4904230002010":5,"4521417030034":7,"4537264000012":5,"4537264000029":3,"4904250031016":3,"4901777238016":20,"4901777238023":18,"4901411030016":16,"4901411030023":14,"4901351036126":18,"4901777211260":10,"4901055620023":7,"4901085641644":1,"5010326031027":2,"4523091001018":3,"4902720027013":3,"5010666100015":3,"4901085641651":3,"4904930008010":3,"4521417030041":2,"4906750001012":3} },
  { id:"sess0", year:2026, month:5, name:"2026年05月棚卸し",
    status:"completed", createdAt:"2026-05-31", completedAt:"2026-05-31",
    counts:{"4904230013009":48,"4904230014006":18,"4901411001016":36,"4901411001023":15,"4901880903019":28,"4901777211253":16,"4901055620016":14,"4560141460015":8,"4524110106002":8,"4562398580019":6,"4901777302180":8,"4901777302075":6,"4901085641606":3,"4901085641590":2,"4901085641613":2,"4904230701019":1,"4904230810017":3,"4904230401016":6,"5010314310101":3,"5000299213734":4,"5000289026108":4,"4901045140018":6,"4523091056018":3,"5000267024007":4,"4998603001027":5,"4998603001034":5,"4998603001041":3,"3185370524015":3,"3185370591002":2,"3185370591019":1,"4903086114015":4,"4994566013109":6,"4994566013116":4,"4994566013123":6,"4994566013130":3,"4904230002010":4,"4521417030034":6,"4537264000012":4,"4537264000029":3,"4904250031016":2,"4901777238016":18,"4901777238023":15,"4901411030016":14,"4901411030023":12,"4901351036126":16,"4901777211260":8,"4901055620023":6,"4901085641644":1,"5010326031027":2,"4523091001018":3,"4902720027013":2,"5010666100015":3,"4901085641651":2,"4904930008010":3,"4521417030041":2,"4906750001012":2} },
];

const SEED_SALES = [
  { id:"d1", date:"2026-03-31", year:2026, month:3, customers:42, total:66700 },
  { id:"d2", date:"2026-04-30", year:2026, month:4, customers:58, total:77400 },
  { id:"d3", date:"2026-05-31", year:2026, month:5, customers:71, total:99800 },
  { id:"d4", date:"2026-06-03", year:2026, month:6, customers:18, total:27400 },
];
const MOCK_API = {
  "4901777302075": { name:"サントリー 白角 700ml",    category:"ウイスキー"   },
  "4901045140018": { name:"ジャックダニエル 700ml",   category:"ウイスキー"   },
  "4901351036126": { name:"サントリー ハイボール缶",  category:"缶チューハイ" },
  "4521417030034": { name:"久保田 千寿 720ml",        category:"日本酒"       },
};

/* ═══ CONSTANTS ══════════════════════════════════════════════ */
const CATEGORIES = ["ビール","ウイスキー","ワイン","焼酎","日本酒","缶チューハイ","ソフトドリンク","その他"];
const CAT = {
  "ビール":        { bg:"rgba(234,179,8,.12)",  color:"#a16207" },
  "ウイスキー":    { bg:"rgba(245,158,11,.12)", color:"#b45309" },
  "ワイン":        { bg:"rgba(225,29,72,.1)",   color:"#9f1239" },
  "焼酎":          { bg:"rgba(22,163,74,.1)",   color:"#15803d" },
  "日本酒":        { bg:"rgba(37,99,235,.1)",   color:"#1d4ed8" },
  "缶チューハイ":  { bg:"rgba(124,58,237,.1)",  color:"#6d28d9" },
  "ソフトドリンク":{ bg:"rgba(6,182,212,.1)",   color:"#0e7490" },
  "その他":        { bg:"rgba(107,114,128,.1)", color:"#4b5563" },
};
const CC = {
  "ビール":"#f59e0b","ウイスキー":"#92400e","ワイン":"#be123c",
  "焼酎":"#15803d","日本酒":"#1d4ed8","缶チューハイ":"#6d28d9",
  "ソフトドリンク":"#0e7490","その他":"#9ca3af",
};
const CCL = ["#d97706","#92400e","#be123c","#15803d","#1d4ed8","#6d28d9","#0e7490","#9ca3af"];
const Z = {
  bg:"#f5f3ef", white:"#ffffff", sur:"#faf9f7",
  bdr:"#e6dfd4", txt:"#1a1713", mut:"#8b7c6a", fnt:"#c9b89e",
  amb:"#d97706", ambDk:"#92400e", ambL:"#fffbeb", ambBdr:"rgba(217,119,6,.2)",
  ok:"#f0fdf4",  okBdr:"rgba(22,163,74,.25)",  okTxt:"#15803d",
  info:"#eff6ff",infoBdr:"rgba(37,99,235,.25)",infoTxt:"#1d4ed8",
  sh:"0 1px 3px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.04)",
};

/* ═══ UTILS ══════════════════════════════════════════════════ */
const uid  = () => Math.random().toString(36).slice(2,9);
const now  = () => new Date().toISOString().slice(0,10);
const mlab = (y,m) => `${y}年${String(m).padStart(2,"0")}月`;
const yen  = n => "¥" + Math.round(n||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
const fmtQ = v => { const n=+v; return isNaN(n)?"":Number.isInteger(n)?String(n):String(n); };
const yenAbbr = n => {
  if(!n||n===0)return "";
  if(n>=10000)return `¥${n>=100000?Math.round(n/10000):(n/10000).toFixed(1)}万`;
  return `¥${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;
};

/* ── localStorage helpers ── */
const load = (k,fb) => { try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch{ return fb; } };
const save = (k,v)  => { try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} };

const downloadCSV = (headers, rows, filename) => {
  const bom = "\uFEFF";
  const csv = bom + [headers,...rows]
    .map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
};

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [tab,      setTab]     = useState("home");
  const [products, setProducts]= useState([]);
  const [sessions, setSessions]= useState([]);
  const [sales,    setSales]   = useState([]);
  const [activeId, setActiveId]= useState(null);
  const [ready,    setReady]   = useState(false);
  const saveTimer              = useRef(null);

  // ── localStorage から読み込む（初回はサンプルデータ）──
  useEffect(()=>{
    const sp = load("bar:p", null);
    const ss = load("bar:s", null);
    const sl = load("bar:sales", null);
    // 古いデータ（6商品以下 / 旧形式）はSEEDで上書き
    setProducts(sp && sp.length >= 100 ? sp : SEED_P);
    setSessions(ss && ss.filter(x=>x.status==="completed").length >= 3 ? ss : SEED_SESS);
    setActiveId(load("bar:a", null));
    setSales(sl && sl[0] && !sl[0].items ? sl : SEED_SALES);
    setReady(true);
  },[]);

  // ── localStorage へ保存（800ms デバウンス）────────────
  useEffect(()=>{
    if(!ready)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>{
      save("bar:p",products); save("bar:s",sessions);
      save("bar:a",activeId); save("bar:sales",sales);
    },800);
  },[products,sessions,activeId,sales,ready]);

  const addProduct    = p   => setProducts(v=>[...v,{id:uid(),...p}]);
  const delProduct    = id  => setProducts(v=>v.filter(p=>p.id!==id));
  const addSale       = e   => setSales(v=>[...v,e]);
  const delSale       = id  => setSales(v=>v.filter(e=>e.id!==id));
  const updateSession = (sId,counts) =>
    setSessions(v=>v.map(s=>s.id===sId?{...s,counts}:s));
  const startSession = () => {
    const d=new Date();
    const s={ id:uid(), year:d.getFullYear(), month:d.getMonth()+1,
      name:mlab(d.getFullYear(),d.getMonth()+1)+"棚卸し",
      status:"active", createdAt:now(), counts:{} };
    setSessions(v=>[...v,s]); setActiveId(s.id); setTab("inventory");
  };
  const setCount = (sId,jan,qty) => setSessions(v=>v.map(s=>{
    if(s.id!==sId)return s;
    const c={...s.counts}, n=parseFloat(qty);
    if(isNaN(n)||n<=0)delete c[jan]; else c[jan]=n;
    return{...s,counts:c};
  }));
  const complete = sId => {
    setSessions(v=>v.map(s=>s.id===sId?{...s,status:"completed",completedAt:now()}:s));
    setActiveId(null); setTab("home");
  };
  const active = sessions.find(s=>s.id===activeId)||null;

  if(!ready) return(
    <div style={{height:"100vh",background:Z.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:44,marginBottom:10}}>🥃</div>
        <p style={{color:Z.mut,fontSize:14,letterSpacing:"0.05em"}}>Bar L'UCE</p>
      </div>
    </div>
  );

  return(
    <div className="app-root" style={{background:Z.bg,color:Z.txt,fontFamily:"'DM Sans',sans-serif",
      display:"flex",flexDirection:"column",maxWidth:448,margin:"0 auto",position:"relative",overflow:"hidden"}}>
      <style>{`
        .fdp{font-family:'Playfair Display',serif} .fdpi{font-family:'Playfair Display',serif;font-style:italic}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        input,select{color:${Z.txt};background:transparent;font-family:inherit;font-size:16px}
        input[type=number]::-webkit-inner-spin-button{opacity:1}
        input::placeholder{color:${Z.fnt}} input:focus,select:focus,button:focus{outline:none}
        button{cursor:pointer;border:none;padding:0;background:none}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#e6dfd4;border-radius:2px}
        @keyframes scanline{0%,100%{top:8%}50%{top:88%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin .75s linear infinite}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:rgba(217,119,6,.85);animation:scanline 2s ease-in-out infinite}
      `}</style>

      <div style={{flex:1,overflowY:"auto",paddingBottom:"calc(64px + env(safe-area-inset-bottom))"}}>
        {tab==="home"      && <DashboardTab products={products} sessions={sessions} sales={sales} active={active} onStart={startSession} onNav={setTab}/>}
        {tab==="products"  && <ProductsTab  products={products} onAdd={addProduct} onDel={delProduct}/>}
        {tab==="inventory" && <InventoryTab products={products} sessions={sessions} session={active}
            onAdd={addProduct} onCount={setCount} onComplete={complete}
            onStart={startSession} onUpdateSession={updateSession}/>}
        {tab==="sales"     && <SalesTab products={products} sales={sales} onAdd={addSale} onDel={delSale}/>}
      </div>

      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"100%",maxWidth:448,background:Z.white,
        borderTop:`1px solid ${Z.bdr}`,display:"grid",gridTemplateColumns:"repeat(4,1fr)",zIndex:50,
        paddingBottom:"env(safe-area-inset-bottom)"}}>
        {[
          {id:"home",     Icon:Home,       label:"ダッシュ"},
          {id:"products", Icon:Package,    label:"商品"},
          {id:"inventory",Icon:ScanLine,   label:"棚卸し"},
          {id:"sales",    Icon:TrendingUp, label:"売上"},
        ].map(({id,Icon,label})=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{padding:"10px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:2,
              color:tab===id?Z.amb:Z.fnt,transition:"color .15s"}}>
            <Icon size={20} strokeWidth={tab===id?2:1.5}/>
            <span style={{fontSize:10,letterSpacing:"0.04em"}}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════ */
function DashboardTab({products,sessions,sales,active,onStart,onNav}){
  const d=new Date(); const cy=d.getFullYear(), cm=d.getMonth()+1;
  const prevM=cm===1?{y:cy-1,m:12}:{y:cy,m:cm-1};

  const monthlySales=useMemo(()=>{
    const map={};
    sales.forEach(e=>{const k=`${e.year}-${e.month}`;map[k]=(map[k]||0)+(e.total||0);});
    return Array.from({length:6},(_,i)=>{
      const dd=new Date(cy,cm-1-i,1);
      return{name:`${dd.getMonth()+1}月`,売上:map[`${dd.getFullYear()}-${dd.getMonth()+1}`]||0};
    }).reverse();
  },[sales,cy,cm]);

  // 在庫評価額推移（売上チャートと同じく直近6ヶ月固定）
  const inventoryHistory=useMemo(()=>{
    const map={};
    sessions.filter(s=>s.status==="completed").forEach(s=>{
      const value=Object.entries(s.counts).reduce((sum,[jan,qty])=>{
        const p=products.find(x=>x.jan===jan);
        return sum+(p?.cost||0)*(parseFloat(qty)||0);
      },0);
      map[`${s.year}-${s.month}`]=value;
    });
    return Array.from({length:6},(_,i)=>{
      const dd=new Date(cy,cm-1-i,1);
      const k=`${dd.getFullYear()}-${dd.getMonth()+1}`;
      return{name:`${dd.getMonth()+1}月`,value:map[k]||0};
    }).reverse();
  },[sessions,products]);

  const thisMonthTotal=sales.filter(e=>e.year===cy&&e.month===cm).reduce((s,e)=>s+(e.total||0),0);
  const lastMonthTotal=sales.filter(e=>e.year===prevM.y&&e.month===prevM.m).reduce((s,e)=>s+(e.total||0),0);
  const pct=lastMonthTotal>0?((thisMonthTotal-lastMonthTotal)/lastMonthTotal*100).toFixed(1):null;

  // 客単価（今月→直近月にフォールバック）
  const thisMonthCustomers=sales.filter(e=>e.year===cy&&e.month===cm).reduce((s,e)=>s+(e.customers||0),0);
  const thisUnit=thisMonthCustomers>0?Math.round(thisMonthTotal/thisMonthCustomers):null;
  const recentEntry=[...sales].sort((a,b)=>a.year!==b.year?b.year-a.year:b.month-a.month).find(e=>e.customers);
  const displayUnit=thisUnit||(recentEntry?Math.round(recentEntry.total/recentEntry.customers):null);
  const unitLabel=thisUnit?"今月":(recentEntry?`${recentEntry.year}年${recentEntry.month}月`:null);

  const latestSess=sessions.filter(s=>s.status==="completed").at(-1);
  const catStock=useMemo(()=>{
    if(!latestSess)return[];
    const map={};
    Object.entries(latestSess.counts).forEach(([jan,qty])=>{
      const cat=(products.find(x=>x.jan===jan)?.category)||"その他";
      map[cat]=(map[cat]||0)+(parseFloat(qty)||0);
    });
    return Object.entries(map).map(([name,数量])=>({name,数量})).sort((a,b)=>b.数量-a.数量);
  },[latestSess,products]);

  const catSales=useMemo(()=>{
    const map={};
    sales.filter(e=>e.year===cy&&e.month===cm).forEach(e=>{
      if(!e.items)return;
      e.items.forEach(it=>{const cat=it.category||"その他";map[cat]=(map[cat]||0)+(it.subtotal||0);});
    });
    return Object.entries(map).map(([name,売上])=>({name,売上})).sort((a,b)=>b.売上-a.売上);
  },[sales,cy,cm]);

  const exportInventoryCSV=()=>{
    if(!latestSess)return;
    const rows=Object.entries(latestSess.counts).map(([jan,qty])=>{
      const p=products.find(x=>x.jan===jan)||{name:jan,category:"",unit:"",cost:""};
      return[latestSess.completedAt,p.name,jan,p.category,p.unit,fmtQ(qty),p.cost||"",Math.round((p.cost||0)*(parseFloat(qty)||0))];
    });
    downloadCSV(["日付","商品名","JANコード","カテゴリ","単位","数量","仕入単価(円)","在庫金額(円)"],rows,`bar_luce_inventory_${latestSess.completedAt}.csv`);
  };

  return(
    <div>
      <div style={{background:Z.white,padding:"32px 20px 20px",borderBottom:`1px solid ${Z.bdr}`}}>
        <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 2px"}}>棚卸し & 売上管理</p>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between"}}>
          <h1 className="fdpi" style={{fontSize:32,margin:0}}>Bar L'UCE</h1>
          {latestSess&&<button onClick={exportInventoryCSV} style={{display:"flex",alignItems:"center",gap:4,background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,color:Z.mut}}><Download size={12}/> 在庫CSV</button>}
        </div>
      </div>
      <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:14}}>
        {active&&(
          <button onClick={()=>onNav("inventory")} style={{background:Z.ambL,border:`1px solid ${Z.ambBdr}`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",textAlign:"left"}}>
            <div>
              <p style={{color:Z.amb,fontSize:11,fontWeight:600,margin:"0 0 1px"}}>棚卸し実施中</p>
              <p style={{fontWeight:600,margin:"0 0 1px"}}>{active.name}</p>
              <p style={{color:Z.mut,fontSize:11,margin:0}}>{Object.keys(active.counts).length}商品カウント済み</p>
            </div>
            <ChevronRight size={16} style={{color:Z.amb}}/>
          </button>
        )}

        {/* KPIカード: 今月売上 + 客単価 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,padding:14,boxShadow:Z.sh}}>
            <p style={{color:Z.mut,fontSize:11,margin:"0 0 4px"}}>今月の売上</p>
            <p style={{color:Z.amb,fontSize:20,fontWeight:700,margin:"0 0 2px"}}>{yen(thisMonthTotal)}</p>
            {pct!=null&&<p style={{color:Z.mut,fontSize:11,margin:0}}>前月比 {pct>0?"+":""}{pct}%</p>}
          </div>
          <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,padding:14,boxShadow:Z.sh}}>
            <p style={{color:Z.mut,fontSize:11,margin:"0 0 4px"}}>客単価</p>
            <p style={{color:Z.amb,fontSize:20,fontWeight:700,margin:"0 0 2px"}}>{displayUnit?yen(displayUnit):"—"}</p>
            {unitLabel&&<p style={{color:Z.mut,fontSize:11,margin:0}}>{unitLabel}</p>}
          </div>
        </div>

        {/* 月別売上推移 */}
        <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:14,padding:16,boxShadow:Z.sh}}>
          <p style={{color:Z.txt,fontSize:13,fontWeight:600,margin:"0 0 12px"}}>月別売上推移</p>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={monthlySales} margin={{top:22,right:4,bottom:0,left:0}}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11,fill:Z.mut}}/>
              <YAxis hide={true}/>
              <Tooltip formatter={v=>[yen(v),"売上"]} contentStyle={{border:"none",borderRadius:10,boxShadow:"0 4px 12px rgba(0,0,0,.1)",fontSize:12}} cursor={{fill:"rgba(0,0,0,.04)"}}/>
              <Bar dataKey="売上" fill={Z.amb} radius={[4,4,0,0]}
                label={{position:"top",fontSize:9,fill:Z.mut,formatter:v=>yenAbbr(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 在庫評価額推移（直近6ヶ月） */}
        {(
          <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:14,padding:16,boxShadow:Z.sh}}>
            <p style={{color:Z.txt,fontSize:13,fontWeight:600,margin:"0 0 4px"}}>在庫評価額推移</p>
            <p style={{color:"#475569",fontSize:22,fontWeight:700,margin:"0 0 14px"}}>{yen(inventoryHistory.at(-1)?.value||0)}</p>
            <ResponsiveContainer width="100%" height={175}>
              <BarChart data={inventoryHistory} margin={{top:22,right:4,bottom:0,left:0}}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11,fill:Z.mut}}/>
                <YAxis hide={true}/>
                <Tooltip formatter={v=>[yen(v),"在庫評価額"]} contentStyle={{border:"none",borderRadius:10,boxShadow:"0 4px 12px rgba(0,0,0,.1)",fontSize:12}} cursor={{fill:"rgba(0,0,0,.04)"}}/>
                <Bar dataKey="value" fill="#64748b" radius={[4,4,0,0]}
                  label={{position:"top",fontSize:9,fill:Z.mut,formatter:v=>yenAbbr(v)}}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* カテゴリ別在庫 */}
        {catStock.length>0&&(
          <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:14,padding:16,boxShadow:Z.sh}}>
            <p style={{color:Z.txt,fontSize:13,fontWeight:600,margin:"0 0 12px"}}>在庫数 カテゴリ別<span style={{color:Z.mut,fontSize:11,fontWeight:400,marginLeft:6}}>{latestSess?.name}</span></p>
            <ResponsiveContainer width="100%" height={catStock.length*34+8}>
              <BarChart data={catStock} layout="vertical" margin={{top:0,right:48,bottom:0,left:0}}>
                <XAxis type="number" hide={true}/>
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize:12,fill:Z.txt}} width={80}/>
                <Tooltip formatter={v=>[`${v}点`,"在庫"]} contentStyle={{border:"none",borderRadius:10,fontSize:12}} cursor={{fill:"rgba(0,0,0,.04)"}}/>
                <Bar dataKey="数量" radius={[0,4,4,0]} label={{position:"right",fontSize:11,fill:Z.mut}}>
                  {catStock.map((e,i)=><Cell key={i} fill={CC[e.name]||CCL[i%CCL.length]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {catSales.length>0&&(
          <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:14,padding:16,boxShadow:Z.sh}}>
            <p style={{color:Z.txt,fontSize:13,fontWeight:600,margin:"0 0 12px"}}>今月の売上 カテゴリ別</p>
            <ResponsiveContainer width="100%" height={catSales.length*34+8}>
              <BarChart data={catSales} layout="vertical" margin={{top:0,right:72,bottom:0,left:0}}>
                <XAxis type="number" hide={true}/>
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize:12,fill:Z.txt}} width={80}/>
                <Tooltip formatter={v=>[yen(v),"売上"]} contentStyle={{border:"none",borderRadius:10,fontSize:12}} cursor={{fill:"rgba(0,0,0,.04)"}}/>
                <Bar dataKey="売上" radius={[0,4,4,0]} label={{position:"right",fontSize:11,fill:Z.mut,formatter:v=>yen(v)}}>
                  {catSales.map((e,i)=><Cell key={i} fill={CC[e.name]||CCL[i%CCL.length]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {!active&&(
          <button onClick={onStart} style={{background:Z.amb,borderRadius:12,padding:13,display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",textAlign:"left",boxShadow:"0 2px 8px rgba(217,119,6,.25)"}}>
            <div><p style={{color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:500,margin:"0 0 2px"}}>今月の棚卸しを開始</p><p style={{color:"#fff",fontWeight:700,fontSize:16,margin:0}}>新規セッション作成</p></div>
            <Plus size={20} style={{color:"rgba(255,255,255,.7)"}}/>
          </button>
        )}
      </div>
    </div>
  );
}
function ProductsTab({products,onAdd,onDel}){
  const [q,setQ]=useState(""); const [cat,setCat]=useState("すべて");
  const [camera,setCamera]=useState(false); const [modal,setModal]=useState(null);
  const handleScan=async jan=>{
    setCamera(false);
    if(products.find(p=>p.jan===jan)){alert(`JAN ${jan} はすでに登録されています`);return;}
    const api=MOCK_API[jan];
    setModal(api?{jan,name:api.name,category:api.category}:{jan});
  };
  const filtered=products.filter(p=>(!q||p.name.includes(q)||p.jan.includes(q))&&(cat==="すべて"||p.category===cat));
  return(
    <div>
      <div style={{padding:"32px 20px 16px",borderBottom:`1px solid ${Z.bdr}`,background:Z.white}}>
        <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 4px"}}>Master</p>
        <h2 className="fdp" style={{fontSize:26,margin:0}}>商品管理</h2>
      </div>
      <div style={{padding:"12px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,borderBottom:`1px solid ${Z.bdr}`,background:Z.white}}>
        <button onClick={()=>setCamera(true)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:Z.amb,color:Z.white,borderRadius:10,padding:"10px 0",fontSize:13,fontWeight:600}}><Camera size={15}/> バーコード登録</button>
        <button onClick={()=>setModal({})} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:Z.white,color:Z.txt,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 0",fontSize:13,fontWeight:600}}><Pencil size={14}/> 手動で登録</button>
      </div>
      <div style={{padding:"12px 20px 0"}}>
        <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,display:"flex",alignItems:"center",padding:"0 12px",gap:8,boxShadow:Z.sh}}>
          <Search size={14} style={{color:Z.fnt}}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="商品名 / JANコード" style={{flex:1,padding:"10px 0",fontSize:13,border:"none"}}/>
          {q&&<button onClick={()=>setQ("")}><X size={14} style={{color:Z.fnt}}/></button>}
        </div>
      </div>
      <div style={{padding:"10px 20px 4px",display:"flex",gap:8,overflowX:"auto"}}>
        {["すべて",...CATEGORIES].map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{background:cat===c?Z.amb:Z.white,color:cat===c?Z.white:Z.mut,border:`1px solid ${cat===c?Z.amb:Z.bdr}`,borderRadius:9999,padding:"4px 12px",fontSize:12,fontWeight:500,whiteSpace:"nowrap",flexShrink:0}}>{c}</button>
        ))}
      </div>
      <div style={{padding:"10px 20px",display:"flex",flexDirection:"column",gap:8}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:Z.fnt}}><Package size={30} style={{margin:"0 auto 8px",opacity:.4}}/><p style={{fontSize:13,margin:0}}>商品が見つかりません</p></div>}
        {filtered.map(p=>{
          const cs=CAT[p.category]??CAT["その他"];
          return(
            <div key={p.id} style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:Z.sh}}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontWeight:500,fontSize:14,margin:"0 0 4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</p>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <span style={{color:Z.fnt,fontFamily:"monospace",fontSize:11}}>{p.jan}</span>
                  <span style={{background:cs.bg,color:cs.color,fontSize:10,padding:"1px 7px",borderRadius:9999,fontWeight:500}}>{p.category}</span>
                  {p.cost&&<span style={{color:Z.mut,fontSize:11}}>仕入 {yen(p.cost)}</span>}
                  {p.price&&<span style={{color:Z.amb,fontSize:11,fontWeight:500}}>売値 {yen(p.price)}</span>}
                </div>
              </div>
              <span style={{color:Z.fnt,fontSize:12,flexShrink:0}}>{p.unit}</span>
              <button onClick={()=>onDel(p.id)} style={{color:Z.fnt}}><Trash2 size={14}/></button>
            </div>
          );
        })}
      </div>
      {camera&&<CameraScanner onScan={handleScan} onClose={()=>setCamera(false)}/>}
      {modal!=null&&<AddModal prefill={modal} onClose={()=>setModal(null)} onAdd={p=>{onAdd(p);setModal(null)}}/>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CAMERA SCANNER
═══════════════════════════════════════════════════════════ */
function CameraScanner({onScan,onClose}){
  const [status,setStatus]=useState("loading");
  const [error,setError]=useState("");
  const [janInput,setJanInput]=useState("");
  const scannerRef=useRef(null);
  const doneRef=useRef(false);
  const READER_ID="bar-luce-qr-reader";

  useEffect(()=>{
    let mounted=true;
    const start=async()=>{
      try{
        // 動的インポート: Safari含む全ブラウザ対応
        // CDN から動的に読み込む（npmパッケージ不要・Safari対応）
        if(!window.Html5Qrcode){
          await new Promise((res,rej)=>{
            const s=document.createElement("script");
            s.src="https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js";
            s.onload=res; s.onerror=()=>rej(new Error("load failed"));
            document.head.appendChild(s);
          });
        }
        if(!mounted)return;
        const scanner=new window.Html5Qrcode(READER_ID);
        scannerRef.current=scanner;
        await scanner.start(
          {facingMode:"environment"},
          {fps:10,qrbox:(w,h)=>({width:Math.min(260,Math.floor(w*.78)),height:Math.min(120,Math.floor(h*.38))})},
          (code)=>{
            if(!doneRef.current&&mounted){
              doneRef.current=true;
              scanner.stop().finally(()=>onScan(code));
            }
          },
          ()=>{}
        );
        if(mounted)setStatus("scanning");
      }catch(e){
        if(!mounted)return;
        const n=e?.name||""; const m=e?.message||"";
        if(n==="NotAllowedError"||m.includes("NotAllowed"))setError("カメラへのアクセスが拒否されました");
        else if(n==="NotFoundError"||m.includes("NotFound"))setError("カメラが見つかりません");
        else setError("カメラを起動できませんでした");
        setStatus("error");
      }
    };
    start();
    return()=>{
      mounted=false;
      try{scannerRef.current?.stop().catch(()=>{});}catch{}
    };
  },[]);

  return(
    <div style={{position:"fixed",inset:0,zIndex:200,background:"#000",display:"flex",flexDirection:"column"}}>
      <div style={{flexShrink:0,padding:"env(safe-area-inset-top, 16px) 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:1,position:"relative",paddingTop:"max(env(safe-area-inset-top), 16px)"}}>
        <p style={{color:"#fff",fontSize:13,fontWeight:600,margin:0}}>バーコードをスキャン</p>
        <button onClick={onClose} style={{color:"#fff",background:"rgba(255,255,255,.15)",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={18}/></button>
      </div>

      {(status==="loading"||status==="scanning")&&(
        <div style={{flex:1,position:"relative",overflow:"hidden"}}>
          <div id={READER_ID} style={{position:"absolute",inset:0}}/>
          {/* オーバーレイ */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
            <div style={{position:"relative",width:260,height:120}}>
              <div style={{position:"absolute",inset:-2000,background:"rgba(0,0,0,.45)"}}/>
              <div style={{position:"relative",width:"100%",height:"100%",border:"2px solid rgba(255,255,255,.8)",borderRadius:8,overflow:"hidden"}}>
                <div className="scan-line"/>
                {[[0,0],[0,1],[1,0],[1,1]].map(([b,r],i)=>(
                  <div key={i} style={{position:"absolute",width:18,height:18,top:b?undefined:0,left:r?undefined:0,bottom:b?0:undefined,right:r?0:undefined,borderTop:!b?`3px solid ${Z.amb}`:undefined,borderLeft:!r?`3px solid ${Z.amb}`:undefined,borderBottom:b?`3px solid ${Z.amb}`:undefined,borderRight:r?`3px solid ${Z.amb}`:undefined}}/>
                ))}
              </div>
            </div>
            <p style={{color:"rgba(255,255,255,.9)",fontSize:13,margin:0,textShadow:"0 1px 4px rgba(0,0,0,.8)"}}>{status==="loading"?"カメラを起動中...":"バーコードを枠内に向けてください"}</p>
          </div>
          {status==="loading"&&(
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.7)"}}>
              <div className="spin" style={{width:36,height:36,border:"3px solid rgba(255,255,255,.25)",borderTopColor:"#fff",borderRadius:"50%"}}/>
            </div>
          )}
        </div>
      )}

      {status==="error"&&(
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,gap:14,background:"#111"}}>
          <div style={{fontSize:48}}>📷</div>
          <p style={{color:"#fff",fontWeight:600,textAlign:"center",margin:0,fontSize:15,lineHeight:1.6}}>{error}</p>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,margin:0,textAlign:"center"}}>JANコードを直接入力してください</p>
          <div style={{display:"flex",gap:8,width:"100%",maxWidth:320}}>
            <input value={janInput} onChange={e=>setJanInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&janInput.trim()&&onScan(janInput.trim())}
              placeholder="4901777302180" autoFocus
              style={{flex:1,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:10,padding:"12px 14px",fontSize:16,color:"#fff",fontFamily:"monospace"}}/>
            <button onClick={()=>janInput.trim()&&onScan(janInput.trim())}
              style={{background:Z.amb,color:"#fff",borderRadius:10,padding:"0 16px",fontWeight:600,fontSize:14,flexShrink:0}}>
              検索
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function AddModal({onClose,onAdd,prefill={}}){
  const [form,setForm]=useState({jan:prefill.jan||"",name:prefill.name||"",category:prefill.category||"ビール",unit:"本",cost:"",price:""});
  const set=(k,v)=>setForm(f=>({...f,[k]:v})); const ok=form.jan.trim()&&form.name.trim();
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"flex-end",zIndex:100}} onClick={onClose}>
      <div style={{width:"100%",maxWidth:448,margin:"0 auto",background:Z.white,borderTop:`1px solid ${Z.bdr}`,borderRadius:"20px 20px 0 0",padding:20}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h3 className="fdp" style={{fontSize:20,margin:0}}>商品登録</h3><button onClick={onClose}><X size={18} style={{color:Z.mut}}/></button></div>
        {[{k:"jan",l:"JANコード",p:"4901777302180"},{k:"name",l:"商品名",p:"サントリー 角瓶 700ml"}].map(({k,l,p})=>(
          <div key={k} style={{marginBottom:10}}><label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:3}}>{l}</label><input value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={p} style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:13,display:"block"}}/></div>
        ))}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          {[{k:"category",l:"カテゴリ",opts:CATEGORIES},{k:"unit",l:"単位",opts:["本","缶","袋","箱","個"]}].map(({k,l,opts})=>(
            <div key={k}><label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:3}}>{l}</label><select value={form[k]} onChange={e=>set(k,e.target.value)} style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:13,display:"block",color:Z.txt}}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[{k:"cost",l:"仕入単価（円）",p:"1800"},{k:"price",l:"売値（円）",p:"3500"}].map(({k,l,p})=>(
            <div key={k}><label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:3}}>{l}</label><input type="number" inputMode="numeric" value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={p} style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:13,display:"block"}}/></div>
          ))}
        </div>
        <button onClick={()=>ok&&onAdd({...form,cost:form.cost?parseFloat(form.cost):undefined,price:form.price?parseFloat(form.price):undefined})} style={{width:"100%",background:ok?Z.amb:Z.sur,color:ok?Z.white:Z.fnt,border:`1px solid ${ok?Z.amb:Z.bdr}`,borderRadius:12,padding:"13px 0",fontWeight:700,fontSize:14}}>登録する</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INVENTORY
═══════════════════════════════════════════════════════════ */
function InventoryTab({products,sessions,session,onAdd,onCount,onComplete,onStart,onUpdateSession}){
  const [jan,setJan]=useState(""); const [scan,setScan]=useState(null);
  const [qtyInput,setQtyInput]=useState(""); const [prefill,setPrefill]=useState(null);
  const [camera,setCamera]=useState(false); const [detail,setDetail]=useState(null);
  const inputRef=useRef();
  if(detail){ const sess=sessions.find(s=>s.id===detail); return <SessionDetail session={sess} products={products} onBack={()=>setDetail(null)} onUpdate={onUpdateSession}/>; }
  const lookup=async code=>{
    const c=code.trim(); if(!c)return;
    setJan("");
    const local=products.find(p=>p.jan===c);
    if(local){setScan({s:"found",p:local});setQtyInput(String(session?.counts?.[c]||""));return;}
    setScan({s:"loading"});
    await new Promise(r=>setTimeout(r,800));
    const api=MOCK_API[c];
    if(api)setScan({s:"api",p:{jan:c,...api}});
    else setScan({s:"none",jan:c});
  };
  const commit=(jan,qty)=>{
    const v=parseFloat(qty); if(!session||isNaN(v)||v<0)return;
    onCount(session.id,jan,v); setScan(null); setQtyInput(""); setTimeout(()=>inputRef.current?.focus(),60);
  };
  const counted=session?Object.entries(session.counts):[];
  const completed=sessions.filter(s=>s.status==="completed").reverse();
  return(
    <div>
      <div style={{padding:"32px 20px 16px",borderBottom:`1px solid ${Z.bdr}`,background:Z.white}}>
        {session?(<><p style={{color:Z.amb,fontSize:12,fontWeight:600,margin:"0 0 4px"}}>実施中</p><h2 className="fdp" style={{fontSize:26,margin:"0 0 4px"}}>{session.name}</h2><p style={{color:Z.mut,fontSize:12,margin:0}}>{counted.length}商品カウント済み</p></>)
        :(<><p style={{color:Z.mut,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 4px"}}>Inventory</p><h2 className="fdp" style={{fontSize:26,margin:0}}>棚卸し</h2></>)}
      </div>
      {!session&&<div style={{padding:"16px 20px"}}><button onClick={onStart} style={{width:"100%",background:Z.amb,borderRadius:12,padding:14,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 8px rgba(217,119,6,.25)"}}><div style={{textAlign:"left"}}><p style={{color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:500,margin:"0 0 2px"}}>今月の棚卸しを開始</p><p style={{color:"#fff",fontWeight:700,fontSize:16,margin:0}}>新規セッション作成</p></div><Plus size={20} style={{color:"rgba(255,255,255,.7)"}}/></button></div>}
      {session&&(
        <>
          <div style={{padding:"16px 20px 0"}}>
            <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 6px"}}>JANコード入力 / スキャン</p>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setCamera(true)} style={{background:Z.amb,color:Z.white,borderRadius:10,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Camera size={18}/></button>
              <div style={{flex:1,background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:10,display:"flex",alignItems:"center",padding:"0 12px",gap:8,boxShadow:Z.sh}}>
                <ScanLine size={14} style={{color:Z.fnt}}/>
                <input ref={inputRef} value={jan} onChange={e=>setJan(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookup(jan)} placeholder="スキャンまたはJANコードを入力..." autoFocus style={{flex:1,padding:"11px 0",fontSize:16,fontFamily:"monospace",border:"none"}}/>
              </div>
              <button onClick={()=>lookup(jan)} style={{background:Z.txt,color:Z.white,borderRadius:10,padding:"0 14px",fontWeight:600,fontSize:13,flexShrink:0}}>検索</button>
            </div>
            <p style={{color:Z.fnt,fontSize:11,margin:"5px 0 0"}}>テスト用 JANコード: <span style={{fontFamily:"monospace",color:Z.mut}}>4901777302180</span>（登録済）· <span style={{fontFamily:"monospace",color:Z.mut}}>4901777302075</span>（DB検索）</p>
          </div>
          {scan&&(
            <div style={{margin:"12px 20px 0",borderRadius:12,border:"1px solid",overflow:"hidden",
              borderColor:scan.s==="found"?Z.okBdr:scan.s==="api"?Z.infoBdr:scan.s==="loading"?Z.ambBdr:Z.bdr,
              background:scan.s==="found"?Z.ok:scan.s==="api"?Z.info:scan.s==="loading"?Z.ambL:Z.white}}>
              {scan.s==="loading"&&<div style={{padding:16,display:"flex",alignItems:"center",gap:12}}><div className="spin" style={{width:18,height:18,border:`2px solid ${Z.amb}`,borderTopColor:"transparent",borderRadius:"50%",flexShrink:0}}/><div><p style={{color:Z.ambDk,fontSize:13,fontWeight:600,margin:"0 0 2px"}}>商品を検索中...</p><p style={{color:Z.mut,fontSize:11,margin:0}}>商品データベースを照会しています</p></div></div>}
              {scan.s==="found"&&(
                <div style={{padding:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                    <div><p style={{color:Z.okTxt,fontSize:12,fontWeight:600,margin:"0 0 2px"}}>✓ 商品が見つかりました</p><p style={{fontWeight:600,fontSize:15,margin:"0 0 4px"}}>{scan.p.name}</p><span style={{...(CAT[scan.p.category]??CAT["その他"]),fontSize:10,padding:"2px 8px",borderRadius:9999,fontWeight:500}}>{scan.p.category}</span></div>
                    <button onClick={()=>{setScan(null);setQtyInput("")}}><X size={16} style={{color:Z.mut}}/></button>
                  </div>
                  <label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:4}}>数量（{scan.p.unit}）</label>
                  <div style={{display:"flex",gap:8}}>
                    <input type="number" inputMode="decimal" step="any" min="0" value={qtyInput} onChange={e=>setQtyInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&commit(scan.p.jan,qtyInput)} placeholder="0" autoFocus style={{flex:1,background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 14px",fontSize:22,fontWeight:700,textAlign:"center"}}/>
                    <button onClick={()=>commit(scan.p.jan,qtyInput)} style={{background:Z.okTxt,color:Z.white,borderRadius:10,padding:"0 18px",fontWeight:700,fontSize:13}}>記録</button>
                  </div>
                  {session.counts[scan.p.jan]!=null&&<p style={{color:Z.mut,fontSize:12,margin:"5px 0 0"}}>現在の記録: {session.counts[scan.p.jan]} {scan.p.unit}</p>}
                </div>
              )}
              {scan.s==="api"&&(
                <div style={{padding:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div><p style={{color:Z.infoTxt,fontSize:12,fontWeight:600,margin:"0 0 2px"}}>データベースで見つかりました（未登録）</p><p style={{fontWeight:600,fontSize:15,margin:"0 0 2px"}}>{scan.p.name}</p><p style={{color:Z.mut,fontFamily:"monospace",fontSize:11,margin:0}}>{scan.p.jan}</p></div>
                    <button onClick={()=>setScan(null)}><X size={16} style={{color:Z.mut}}/></button>
                  </div>
                  <label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:4}}>数量</label>
                  <div style={{display:"flex",gap:8,marginBottom:10}}><input type="number" inputMode="decimal" step="any" min="0" value={qtyInput} onChange={e=>setQtyInput(e.target.value)} placeholder="0" autoFocus style={{flex:1,background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 14px",fontSize:22,fontWeight:700,textAlign:"center"}}/></div>
                  <button onClick={()=>{if(!qtyInput)return;onAdd({jan:scan.p.jan,name:scan.p.name,category:scan.p.category,unit:"本"});commit(scan.p.jan,qtyInput);}} style={{width:"100%",background:Z.infoTxt,color:Z.white,borderRadius:10,padding:"10px 0",fontSize:13,fontWeight:600}}>マスタ登録してカウント記録</button>
                </div>
              )}
              {scan.s==="none"&&(
                <div style={{padding:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div><p style={{color:Z.mut,fontSize:12,margin:"0 0 2px"}}>商品が見つかりません</p><p style={{fontFamily:"monospace",fontSize:13,margin:0}}>{scan.jan}</p></div><button onClick={()=>setScan(null)}><X size={16} style={{color:Z.mut}}/></button></div>
                  <button onClick={()=>setPrefill({jan:scan.jan})} style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 0",color:Z.txt,fontSize:13,fontWeight:600}}>手動で商品を登録する</button>
                </div>
              )}
            </div>
          )}
          {counted.length>0&&(
            <div style={{padding:"14px 20px 0"}}>
              <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 8px"}}>カウント済み</p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {counted.map(([jan,qty])=>{const p=products.find(x=>x.jan===jan)||{name:jan,unit:"個"};return <CountRow key={jan} label={p.name} unit={p.unit} value={qty} onChange={v=>onCount(session.id,jan,v)}/>;})}
              </div>
            </div>
          )}
          <div style={{padding:"14px 20px"}}><button onClick={()=>onComplete(session.id)} disabled={counted.length===0} style={{width:"100%",borderRadius:12,padding:"14px 0",fontWeight:700,fontSize:14,border:"1px solid",background:counted.length>0?Z.amb:Z.sur,color:counted.length>0?Z.white:Z.fnt,borderColor:counted.length>0?Z.amb:Z.bdr}}>棚卸しを完了する（{counted.length}商品）</button></div>
        </>
      )}
      {completed.length>0&&(
        <div style={{padding:"0 20px 16px"}}>
          <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",margin:"8px 0 8px"}}>過去の棚卸し</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {completed.map(s=>(
              <button key={s.id} onClick={()=>setDetail(s.id)} style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:11,padding:"11px 14px",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:Z.sh}}>
                <div><p style={{fontWeight:500,fontSize:14,margin:"0 0 2px"}}>{s.name}</p><p style={{color:Z.mut,fontSize:12,margin:0}}>{s.completedAt} · {Object.keys(s.counts).length}商品</p></div>
                <ChevronRight size={15} style={{color:Z.fnt}}/>
              </button>
            ))}
          </div>
        </div>
      )}
      {camera&&<CameraScanner onScan={jan=>{setCamera(false);lookup(jan)}} onClose={()=>setCamera(false)}/>}
      {prefill&&<AddModal prefill={prefill} onClose={()=>setPrefill(null)} onAdd={p=>{onAdd(p);onCount(session.id,p.jan,1);setPrefill(null);setScan(null);setTimeout(()=>inputRef.current?.focus(),60);}}/>}
    </div>
  );
}
function CountRow({label,unit,value,onChange}){
  const [v,setV]=useState(String(value)); useEffect(()=>setV(String(value)),[value]);
  return(<div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:11,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:Z.sh}}><span style={{flex:1,fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</span><input type="number" inputMode="decimal" step="any" min="0" value={v} onChange={e=>setV(e.target.value)} onBlur={()=>{const n=parseFloat(v);isNaN(n)?setV(String(value)):onChange(n)}} style={{width:72,background:Z.ambL,border:`1px solid ${Z.ambBdr}`,borderRadius:8,padding:"5px 8px",fontSize:14,fontWeight:700,color:Z.ambDk,textAlign:"center"}}/><span style={{color:Z.fnt,fontSize:12,width:20}}>{unit}</span></div>);
}
function SessionDetail({session,products,onBack,onUpdate}){
  const [editMode,setEditMode]=useState(false); const [editCounts,setEditCounts]=useState({});
  if(!session)return null;
  const src=editMode?editCounts:session.counts; const entries=Object.entries(src);
  const total=entries.reduce((s,[,v])=>s+(parseFloat(v)||0),0);
  const groups={}; entries.forEach(([jan,qty])=>{const p=products.find(x=>x.jan===jan)||{name:jan,category:"その他",unit:"個"};if(!groups[p.category])groups[p.category]=[];groups[p.category].push({...p,qty});});
  const exportCSV=()=>{ const rows=entries.map(([jan,qty])=>{const p=products.find(x=>x.jan===jan)||{name:jan,category:"",unit:"",cost:""};return[session.completedAt,p.name,jan,p.category,p.unit,fmtQ(qty),p.cost||"",Math.round((p.cost||0)*(parseFloat(qty)||0))];});downloadCSV(["日付","商品名","JANコード","カテゴリ","単位","数量","仕入単価(円)","在庫金額(円)"],rows,`bar_luce_inv_${session.completedAt}.csv`); };
  return(
    <div>
      <div style={{padding:"32px 20px 16px",borderBottom:`1px solid ${Z.bdr}`,background:Z.white}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}><button onClick={()=>{if(editMode)setEditMode(false);else onBack()}} style={{color:Z.mut,marginTop:6}}><ArrowLeft size={20}/></button><div><h2 className="fdp" style={{fontSize:24,margin:"0 0 4px"}}>{session.name}</h2><p style={{color:Z.mut,fontSize:12,margin:0}}>{session.completedAt} 完了</p></div></div>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <button onClick={exportCSV} style={{display:"flex",alignItems:"center",gap:4,background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,color:Z.mut}}><Download size={12}/> CSV</button>
            {!editMode?<button onClick={()=>{setEditCounts({...session.counts});setEditMode(true);}} style={{display:"flex",alignItems:"center",gap:4,background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,color:Z.txt}}><Pencil size={12}/> 編集</button>:<button onClick={()=>{onUpdate(session.id,editCounts);setEditMode(false);}} style={{background:Z.amb,color:Z.white,borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:600}}>保存</button>}
          </div>
        </div>
      </div>
      <div style={{padding:"16px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[{l:"商品種類",v:`${Object.keys(src).length}種`},{l:"総数量",v:`${total}点`}].map(({l,v})=>(
            <div key={l} style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,padding:14,textAlign:"center",boxShadow:Z.sh}}><p style={{color:Z.amb,fontWeight:700,fontSize:24,margin:"0 0 2px"}}>{v}</p><p style={{color:Z.mut,fontSize:12,margin:0}}>{l}</p></div>
          ))}
        </div>
        {Object.entries(groups).map(([cat,items])=>{
          const cs=CAT[cat]??CAT["その他"];
          return(<div key={cat} style={{marginBottom:18}}><span style={{background:cs.bg,color:cs.color,fontSize:11,padding:"3px 10px",borderRadius:9999,fontWeight:600,display:"inline-block",marginBottom:8}}>{cat}</span><div style={{display:"flex",flexDirection:"column",gap:6}}>
            {items.map(item=>{const qv=editMode?(editCounts[item.jan]??item.qty):item.qty;return(
              <div key={item.jan} style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:11,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:Z.sh}}>
                <span style={{fontSize:13,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:12}}>{item.name}</span>
                {editMode?(<div style={{display:"flex",alignItems:"center",gap:6}}><input type="number" inputMode="decimal" step="any" min="0" value={qv} onChange={e=>setEditCounts(c=>({...c,[item.jan]:e.target.value}))} style={{width:70,background:Z.ambL,border:`1px solid ${Z.ambBdr}`,borderRadius:8,padding:"5px 8px",fontSize:14,fontWeight:700,color:Z.ambDk,textAlign:"center"}}/><span style={{color:Z.fnt,fontSize:12}}>{item.unit}</span><button onClick={()=>setEditCounts(c=>{const n={...c};delete n[item.jan];return n;})} style={{color:Z.fnt}}><Trash2 size={13}/></button></div>)
                :(<span style={{color:Z.ambDk,fontWeight:700,flexShrink:0}}>{fmtQ(item.qty)}<span style={{color:Z.mut,fontWeight:400,fontSize:11,marginLeft:2}}>{item.unit}</span></span>)}
              </div>
            );})}
          </div></div>);
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SALES
═══════════════════════════════════════════════════════════ */
function SalesTab({products,sales,onAdd,onDel}){
  const d=new Date(); const [year,setYear]=useState(d.getFullYear()); const [month,setMonth]=useState(d.getMonth()+1); const [showEntry,setShowEntry]=useState(false);
  const prevM=()=>{ if(month===1){setYear(y=>y-1);setMonth(12);}else setMonth(m=>m-1); };
  const nextM=()=>{ if(month===12){setYear(y=>y+1);setMonth(1);}else setMonth(m=>m+1); };
  const entries=sales.filter(e=>e.year===year&&e.month===month).sort((a,b)=>b.date.localeCompare(a.date));
  const total=entries.reduce((s,e)=>s+(e.total||0),0);
  const totalCustomers=entries.reduce((s,e)=>s+(e.customers||0),0);
  const avgUnit=totalCustomers>0?Math.round(total/totalCustomers):0;

  const exportCSV=()=>{
    const rows=entries.map(e=>[e.date,e.customers||"",e.total||"",e.customers?Math.round(e.total/e.customers):""])
    downloadCSV(["日付","客数(人)","売上高(円)","客単価(円)"],rows,`bar_luce_sales_${year}${String(month).padStart(2,"00")}.csv`);
  };
  const exportAll=()=>{
    const rows=[...sales].sort((a,b)=>a.date.localeCompare(b.date)).map(e=>[e.date,e.customers||"",e.total||"",e.customers?Math.round(e.total/e.customers):""])
    downloadCSV(["日付","客数(人)","売上高(円)","客単価(円)"],rows,"bar_luce_sales_all.csv");
  };

  return(
    <div>
      <div style={{padding:"32px 20px 16px",borderBottom:`1px solid ${Z.bdr}`,background:Z.white}}>
        <p style={{color:Z.mut,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 4px"}}>Sales</p>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><h2 className="fdp" style={{fontSize:26,margin:0}}>売上管理</h2><button onClick={exportAll} style={{display:"flex",alignItems:"center",gap:4,background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:600,color:Z.mut}}><Download size={12}/> 全件CSV</button></div>
      </div>
      <div style={{background:Z.white,padding:"12px 20px",borderBottom:`1px solid ${Z.bdr}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={prevM} style={{color:Z.mut,padding:4}}><ChevronLeft size={20}/></button>
        <p style={{fontWeight:600,fontSize:15,margin:0}}>{mlab(year,month)}</p>
        <button onClick={nextM} style={{color:Z.mut,padding:4}}><ChevronRight size={20}/></button>
      </div>
      <div style={{padding:"14px 20px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:14,padding:"16px 20px",boxShadow:Z.sh}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <p style={{color:Z.mut,fontSize:12,margin:"0 0 4px"}}>月間売上合計</p>
              <p style={{color:Z.amb,fontSize:28,fontWeight:700,margin:"0 0 8px"}}>{yen(total)}</p>
              <div style={{display:"flex",gap:16}}>
                {totalCustomers>0&&<span style={{color:Z.mut,fontSize:12}}>客数 {totalCustomers}人</span>}
                {avgUnit>0&&<span style={{color:Z.ambDk,fontSize:12,fontWeight:600}}>客単価 {yen(avgUnit)}</span>}
              </div>
            </div>
            <button onClick={exportCSV} style={{display:"flex",alignItems:"center",gap:5,background:Z.ambL,border:`1px solid ${Z.ambBdr}`,borderRadius:9,padding:"8px 12px",fontSize:12,fontWeight:600,color:Z.ambDk}}><Download size={13}/> CSV</button>
          </div>
        </div>
        <button onClick={()=>setShowEntry(true)} style={{width:"100%",background:Z.amb,borderRadius:12,padding:13,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 2px 8px rgba(217,119,6,.2)"}}><span style={{color:"#fff",fontWeight:700,fontSize:14}}>売上を登録する</span><Plus size={20} style={{color:"rgba(255,255,255,.7)"}}/></button>
        {entries.length===0&&(
          <div style={{textAlign:"center",padding:"40px 0",color:Z.fnt}}><TrendingUp size={30} style={{margin:"0 auto 8px",opacity:.35}}/><p style={{fontSize:13,margin:0}}>{mlab(year,month)}の売上記録はありません</p></div>
        )}
        {entries.map(e=>{
          const unit=e.customers&&e.customers>0?Math.round(e.total/e.customers):null;
          return(
            <div key={e.id} style={{background:Z.white,border:`1px solid ${Z.bdr}`,borderRadius:12,padding:"14px 16px",boxShadow:Z.sh}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:e.customers?8:0}}>
                <div>
                  <p style={{fontWeight:600,fontSize:18,margin:"0 0 2px"}}>{yen(e.total)}</p>
                  <p style={{color:Z.mut,fontSize:12,margin:0}}>{e.date}</p>
                </div>
                <button onClick={()=>onDel(e.id)} style={{color:Z.fnt}}><Trash2 size={14}/></button>
              </div>
              {e.customers&&(
                <div style={{display:"flex",gap:20,paddingTop:8,borderTop:`1px solid ${Z.bdr}`}}>
                  <span style={{color:Z.mut,fontSize:13}}>👥 {e.customers}人</span>
                  {unit&&<span style={{color:Z.ambDk,fontSize:13,fontWeight:600}}>客単価 {yen(unit)}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showEntry&&<SalesEntryModal
        defaultDate={`${year}-${String(month).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
        onClose={()=>setShowEntry(false)}
        onSave={e=>{onAdd(e);setShowEntry(false);setYear(new Date(e.date).getFullYear());setMonth(new Date(e.date).getMonth()+1);}}/>}
    </div>
  );
}
function SalesEntryModal({defaultDate,onClose,onSave}){
  const [date,setDate]=useState(defaultDate||now());
  const [customers,setCustomers]=useState("");
  const [amount,setAmount]=useState("");
  const unit=+customers>0&&+amount>0?Math.round(+amount/+customers):null;
  const ok=+customers>0&&+amount>0;
  const save=()=>{
    if(!ok)return;
    const d=new Date(date);
    onSave({id:uid(),date,year:d.getFullYear(),month:d.getMonth()+1,customers:+customers,total:+amount});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{background:Z.white,borderRadius:"20px 20px 0 0",padding:"20px 20px 36px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 className="fdp" style={{fontSize:20,margin:0}}>売上登録</h3>
          <button onClick={onClose}><X size={18} style={{color:Z.mut}}/></button>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:4}}>日付</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:16,display:"block"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div>
            <label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:4}}>客数（人）</label>
            <input type="number" inputMode="numeric" min="1" value={customers} onChange={e=>setCustomers(e.target.value)} placeholder="25"
              style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:16,display:"block",fontWeight:600}}/>
          </div>
          <div>
            <label style={{color:Z.mut,fontSize:12,display:"block",marginBottom:4}}>売上高（円）</label>
            <input type="number" inputMode="numeric" min="0" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="48000"
              style={{width:"100%",background:Z.sur,border:`1px solid ${Z.bdr}`,borderRadius:10,padding:"10px 12px",fontSize:16,display:"block",fontWeight:600}}/>
          </div>
        </div>
        {unit&&(
          <div style={{background:Z.ambL,border:`1px solid ${Z.ambBdr}`,borderRadius:12,padding:"14px 16px",marginBottom:16,textAlign:"center"}}>
            <p style={{color:Z.mut,fontSize:12,margin:"0 0 4px"}}>客単価（自動計算）</p>
            <p style={{color:Z.ambDk,fontSize:32,fontWeight:700,margin:0,letterSpacing:"-0.02em"}}>{yen(unit)}</p>
          </div>
        )}
        <button onClick={save} disabled={!ok}
          style={{width:"100%",background:ok?Z.amb:Z.sur,color:ok?Z.white:Z.fnt,borderRadius:12,padding:"14px 0",fontWeight:700,fontSize:14,border:"none"}}>
          保存する
        </button>
      </div>
    </div>
  );
}
