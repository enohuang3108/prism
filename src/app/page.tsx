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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AssetForm = () => {
  const [asset, setAsset] = useState(0);
  const formSchema = z.object({
    stock: z.string().min(1).max(10),
    shares: z.coerce.number().min(0).max(9999),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: "AAPL",
      shares: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await fetch(`/api/quote?stock=${values.stock}`, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);
    //     setAsset(json.regularMarketPrice * values.shares);
    //   });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row space-x-1"
      >
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ex:AAPL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shares"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ex:10.001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {asset}
      </form>
    </Form>
  );
};

export default function Page() {
  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ];

  return (
    <main className="flex flex-col items-center justify-center space-y-1">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <AssetForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
