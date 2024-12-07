import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./scss/styles.scss";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createRouter } from "@tanstack/react-router";
import "./i18n.ts";
import { buttonVariants, Toaster, TooltipProvider } from "@/components/ui";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { cn } from "./lib/utils";
import { atom } from "jotai";

export const banners = atom([]);

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="min-h-screen grid place-content-center gap-4">
          <p className="text-4xl">
            Ops!, Not found!, page maybe it's under maintenance
          </p>
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-fit mx-auto",
            )}
          >
            Go home
          </Link>
        </div>
      </div>
    );
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a client
export const queryClient = new QueryClient({});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </TooltipProvider>,
  );
}
