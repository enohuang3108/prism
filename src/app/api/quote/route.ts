import { NextResponse, type NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "AAPL";

  const quote = await yahooFinance.quote(query);
  const { regularMarketPrice, currency } = quote;

  const json = {
    regularMarketPrice,
  };

  return NextResponse.json(json);
}
