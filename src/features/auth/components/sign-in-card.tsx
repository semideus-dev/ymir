"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import SocialAuthCard from "@/features/auth/components/social-auth-card";
import { signInSchema } from "@/features/auth/schemas";
import { useSignIn } from "@/features/auth/api/use-sign-in";

export default function SignInCard() {
  const { mutate, isPending } = useSignIn();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    mutate({ json: values });
  }

  return (
    <Card className="w-[90%] md:w-[70%]">
      <CardHeader className="text-center">
        <CardTitle>Account Credentials</CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary underline underline-offset-2 transition-all hover:underline-offset-4"
          >
            Sign Up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              effect="expandIcon"
              icon={ArrowRight}
              iconPlacement="right"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <div className="my-8 h-[1px] w-full bg-gray-300" />
        <SocialAuthCard />
      </CardContent>
    </Card>
  );
}
