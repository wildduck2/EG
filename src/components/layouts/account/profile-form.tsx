"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Link } from "@tanstack/react-router";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "يجب أن يتكون اسم المستخدم من حرفين على الأقل.",
    })
    .max(30, {
      message: "يجب ألا يزيد طول اسم المستخدم عن 30 حرفًا.",
    }),
  email: z
    .string({
      required_error: "يرجى اختيار بريد إلكتروني للعرض.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "يرجى إدخال رابط URL صالح." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "أنا بطة برية.",
  urls: [
    { value: "https://duckui.vercel.app" },
    { value: "http://twitter.com/wilduck2" },
  ],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast.success("لقد أرسلت القيم التالية:");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="wildduck" {...field} />
              </FormControl>
              <FormDescription>
                هذا هو الاسم الذي سيتم عرضه بشكل عام. يمكن أن يكون اسمك الحقيقي
                أو اسمًا مستعارًا. يمكنك تغييره مرة واحدة كل 30 يومًا فقط.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر بريدًا إلكترونيًا موثوقًا للعرض" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                يمكنك إدارة عناوين البريد الإلكتروني الموثوقة في{" "}
                <Link href="/examples/forms">إعدادات البريد الإلكتروني</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          // <FormField
          //         control={form.control}
          //         name="bio"
          //         render={({ field }) => (
          //           <FormItem>
          //             <FormLabel>السيرة الذاتية</FormLabel>
          //             <FormControl>
          //               <Textarea
          //                 placeholder="أخبرنا قليلاً عن نفسك"
          //                 className="resize-none"
          //                 {...field}
          //               />
          //             </FormControl>
          //             <FormDescription>
          //               يمكنك <span>@ذكر</span> المستخدمين الآخرين والمنظمات للارتباط
          //               بهم.
          //             </FormDescription>
          //             <FormMessage />
          //           </FormItem>
          //         )}
          //       />
        }
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    روابط URL
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    أضف روابط لموقعك الإلكتروني أو مدونتك أو حسابات وسائل
                    التواصل الاجتماعي.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            إضافة رابط URL
          </Button>
        </div>
        <Button type="submit">تحديث الملف الشخصي</Button>
      </form>
    </Form>
  );
}
