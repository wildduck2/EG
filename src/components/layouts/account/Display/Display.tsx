"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { toast } from "sonner";

// قائمة العناصر القابلة للاختيار
const items = [
  {
    id: "recents",
    label: "الأخيرة",
  },
  {
    id: "home",
    label: "الصفحة الرئيسية",
  },
  {
    id: "applications",
    label: "التطبيقات",
  },
  {
    id: "desktop",
    label: "سطح المكتب",
  },
  {
    id: "downloads",
    label: "التنزيلات",
  },
  {
    id: "documents",
    label: "المستندات",
  },
] as const;

// مخطط التحقق باستخدام Zod
const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "يجب عليك اختيار عنصر واحد على الأقل.",
  }),
});

// النوع الخاص ببيانات النموذج المستنبط من المخطط
type DisplayFormValues = z.infer<typeof displayFormSchema>;

// القيم الافتراضية للنموذج
const defaultValues: Partial<DisplayFormValues> = {
  items: ["recents", "home"],
};

// مكون نموذج العرض
export function DisplayForm() {
  // إعداد نموذج React Hook مع التحقق باستخدام Zod
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  // وظيفة معالجة إرسال النموذج
  function onSubmit(data: DisplayFormValues) {
    toast.success("تم الحفظ بنجاح!!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">الشريط الجانبي</FormLabel>
                <FormDescription>
                  اختر العناصر التي تريد عرضها في الشريط الجانبي.
                </FormDescription>
              </div>
              {/* عرض العناصر لإنشاء مربعات اختيار */}
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* زر لإرسال النموذج */}
        <Button type="submit">تحديث العرض</Button>
      </form>
    </Form>
  );
}
