import { NextResponse } from "next/server";

const MOCK = {
  "4901777302075": { name: "サントリー 白角 700ml",   category: "ウイスキー"   },
  "4901045140018": { name: "ジャックダニエル 700ml",  category: "ウイスキー"   },
  "4901351036126": { name: "サントリー ハイボール缶", category: "缶チューハイ" },
  "4521417030034": { name: "久保田 千寿 720ml",       category: "日本酒"       },
};

export async function GET(request, { params }) {
  const code = params.code;
  const appId = process.env.YAHOO_APP_ID;
  if (appId) {
    try {
      const url = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${appId}&jan_code=${code}&results=1&image_size=0`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = await res.json();
      const item = data.hits?.[0];
      if (item) return NextResponse.json({ name: item.name, category: item.genreCategory?.name || "その他" });
    } catch (e) { console.error("Yahoo API error:", e); }
  }
  if (MOCK[code]) return NextResponse.json(MOCK[code]);
  return NextResponse.json({ error: "not found" }, { status: 404 });
}
