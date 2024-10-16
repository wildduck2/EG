"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Calendar,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "الإنجليزية", value: "en" },
  { label: "الفرنسية", value: "fr" },
  { label: "الألمانية", value: "de" },
  { label: "الإسبانية", value: "es" },
  { label: "البرتغالية", value: "pt" },
  { label: "الروسية", value: "ru" },
  { label: "اليابانية", value: "ja" },
  { label: "الكورية", value: "ko" },
  { label: "الصينية", value: "zh" },
] as const;

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "يجب أن يكون الاسم مكونًا من حرفين على الأقل.",
    })
    .max(30, {
      message: "يجب ألا يزيد الاسم عن 30 حرفًا.",
    }),
  dob: z.date({
    required_error: "تاريخ الميلاد مطلوب.",
  }),
  language: z.string({
    required_error: "يرجى اختيار لغة.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// يمكن أن تأتي هذه البيانات من قاعدة بياناتك أو API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "اسمك",
  // dob: new Date("2023-01-23"),
};

export function AccountForm() {
  const { t, i18n } = useTranslation();
  const account = t("account");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast.info("تم تحديث حسابك.");
  }

  return (
    <div className="flex items-start 2xl:gap-32 gap-8 flex-col xl:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 border-border border border-solid rounded-md w-full"
        >
          <div className="flex items- gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{account.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={account.name}
                      value={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{account.company}</FormLabel>
                  <FormControl>
                    <Input placeholder={account.company} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-start gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{account.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={account.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{account.phone}</FormLabel>
                  <FormControl>
                    <Input placeholder={account.phone} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">{account.save}</Button>
        </form>
      </Form>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 border-border border border-solid w-full rounded-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{account.oldpassword}</FormLabel>
                <FormControl>
                  <Input placeholder={account.oldpassword} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{account.newpassword}</FormLabel>
                <FormControl>
                  <Input placeholder={account.newpassword} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{account.confirmnewpassword}</FormLabel>
                <FormControl>
                  <Input placeholder={account.confirmnewpassword} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{account.save}</Button>
        </form>
      </Form>
    </div>
  );
}
