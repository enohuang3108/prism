"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Asset } from "./columns";

export default function AddAssetDialog() {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    symbol: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    quantity: z.coerce.number().min(0, {
      message: "Username must be at least 0 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      quantity: 0,
    },
  });

  function updateOrAddObject(
    assets: Asset[],
    newAsset: { symbol: string; quantity: number }
  ) {
    const index = assets.findIndex((obj) => obj.symbol === newAsset.symbol);

    if (index !== -1) {
      assets[index] = { id: index, ...newAsset };
    } else {
      assets.push({ id: assets.length, ...newAsset });
    }

    return assets;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const asset: string = localStorage.getItem("asset") ?? "[]";
    const assetJson: Asset[] = JSON.parse(asset); // use zod to verify
    updateOrAddObject(assetJson, {
      symbol: values.symbol,
      quantity: values.quantity,
    });

    localStorage.setItem("asset", JSON.stringify(assetJson));
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
