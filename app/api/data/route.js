import { NextResponse } from "next/server";
// Upstash未設定: フロントエンドの localStorage を使用します
export async function GET() {
  return NextResponse.json({ products: null, sessions: null, activeId: null, sales: null });
}
export async function POST() {
  return NextResponse.json({ ok: true });
}
