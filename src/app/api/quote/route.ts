import { type NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  if (symbol == null) {
    return Response.json(
      {
        error: "Missing parameter",
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  const quote = await yahooFinance.quote(symbol);
  const { regularMarketPrice, currency } = quote;

  return Response.json(
    {
      unitPrice: regularMarketPrice,
      currency,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
