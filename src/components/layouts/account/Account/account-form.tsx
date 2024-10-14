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
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast.info("تم تحديث حسابك.");
  }

  return (
    <div className="flex items-start gap-32 flex-col lg:flex-row">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-start gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input placeholder="اسمك" value={field.value} {...field} />
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
                  <FormLabel>اسم الشركه</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم شركتك" {...field} />
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
                  <FormLabel>الايميل</FormLabel>
                  <FormControl>
                    <Input placeholder="ايميلك" {...field} />
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
                  <FormLabel>رقم الجوال</FormLabel>
                  <FormControl>
                    <Input placeholder="رقم جوالك" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">تحديث الحساب</Button>
        </form>
      </Form>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمه المرور القديمه</FormLabel>
                <FormControl>
                  <Input placeholder="كلمه المرور القديمه" {...field} />
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
                <FormLabel>كلمه المرور الجديده</FormLabel>
                <FormControl>
                  <Input placeholder="كلمه المرور الجديده" {...field} />
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
                <FormLabel>تاكيد كلمه المرور الجديده</FormLabel>
                <FormControl>
                  <Input placeholder="تاكيد كلمه المرور الجديده" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">تحديث الحساب</Button>
        </form>
      </Form>
    </div>
  );
}
