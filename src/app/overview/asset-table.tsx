"use client";

import { useStock } from "../api/stock/useStock";
import { Asset, columns } from "./columns";
import { DataTable } from "./data-table";

export default function AssetTable({ assets }: { assets: Asset[] }) {
  const stock = useStock();
  const data = stock.assets(assets);
  console.log("AssetTable", assets, data.data);
  // useEffect(() => {
  //   console.log("AssetTable eff", assets, data.data);
  // }, []);
  const dat = [
    {
      id: 1,
      symbol: "APPL",
      quantity: 1,
      price: 100,
    },
  ];
  if (data.data) return <DataTable columns={columns} data={data.data ?? dat} />;
  return null;
}
