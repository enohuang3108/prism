"use client";

import { Asset } from "@/app/overview/columns";
import { useQuery } from "@tanstack/react-query";

type Quote = {
  price: number;
  currency: string;
};

const getQuote = async (symbol: string): Promise<Quote> => {
  return await fetch(`/api/quote?symbol=${symbol}`, {
    method: "GET",
  }).then((res) => res.json());
};

const getAssets = async (assets: Asset[]) => {
  const promises = assets;
  console.log("quote", assets);

  return Promise.all(promises);
};

export const useStock = () => {
  const quote = (stock: string) =>
    useQuery({
      queryKey: ["quote"],
      queryFn: () => getQuote(stock),
    });

  const assets = (assets: Asset[]) =>
    useQuery({
      queryKey: ["assets"],
      queryFn: () => console.log("u", assets),
    });

  return { quote, assets };
};
