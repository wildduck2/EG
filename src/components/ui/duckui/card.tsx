import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

interface CardPreviewProps extends React.HTMLProps<HTMLDivElement> {}

export const CardPreview = React.forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col gap-8", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface CardPreviewHeaderProps
  extends React.HTMLProps<HTMLDivElement> {}

export const CardPreviewHeader = React.forwardRef<
  HTMLDivElement,
  CardPreviewHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

export interface CardPreviewTitleProps extends React.HTMLProps<HTMLDivElement> {
  showUnderline?: boolean;
}

export const CardPreviewTitle = React.forwardRef<
  HTMLDivElement,
  CardPreviewTitleProps
>(({ className, children, showUnderline, ...props }, ref) => {
  return (
    <div className={cn("relative z-[2]", className)} ref={ref} {...props}>
      <h2
        className={cn(
          "font-bold text-[23px] flex justify-center items-center gap-2 underline__sudo",
        )}
      >
        {children}
      </h2>
      {showUnderline && (
        <span className="absolute bottom-[-6px] right-0 w-full h-full z-[-1]"></span>
      )}
    </div>
  );
});

export interface CardPreviewContentProps
  extends React.HTMLProps<HTMLDivElement> {}

export const CardPreviewContent = React.forwardRef<
  HTMLDivElement,
  CardPreviewContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
