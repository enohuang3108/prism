"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Asset = {
  id: number;
  symbol: string;
  quantity: number;
  price?: number;
};

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
