"use client";
import { Button } from "@/components/ui/button";
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

const Asset = () => {
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
    await fetch(`/api/quote?stock=${values.stock}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAsset(json.regularMarketPrice * values.shares);
      });
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
  return (
    <main className="flex flex-col items-center justify-center space-y-1">
      <Asset />
      <Asset />
    </main>
  );
}
