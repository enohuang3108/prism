"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   localStorage.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

const formSchema = z.object({
  symbol: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  quantity: z.coerce.number().min(0, {
    message: "Username must be at least 0 characters.",
  }),
});

export default function ProfileForm() {
  const [asset, setAsset] = useState(0);
  // const data =  getData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      quantity: 0,
    },
  });

  const setLocalStorage = (key: string, value: number) => {
    const asset = localStorage.getItem("asset");

    const assetJson = asset ? JSON.parse(asset) : {};
    assetJson[key] = value;
    localStorage.setItem("asset", JSON.stringify(assetJson));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`/api/quote?symbol=${values.symbol}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAsset(json.unitPrice * values.quantity);
        setLocalStorage(values.symbol, values.quantity);
        window.location.reload();
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-end justify-end space-x-4"
        >
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol</FormLabel>
                <FormControl>
                  <Input placeholder="AAPL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* <DataTable columns={columns} data={data} /> */}
      <button
        onClick={() => {
          console.log(localStorage.key(1));
        }}
      >
        a
      </button>
    </main>
  );
}
