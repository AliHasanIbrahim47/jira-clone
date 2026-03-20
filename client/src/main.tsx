import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { NotFound } from "./components/not-found";
import { ErrorComponent } from "./components/error-component";
import { routeTree } from "./routeTree.gen";
import { Loader2Icon } from "lucide-react";

import "./globals.css";

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: { queryClient },
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorComponent,
  defaultPendingComponent: () => (
    <div className="mx-auto mt-8 flex flex-col items-center justify-center">
      <Loader2Icon className="animate-spin" />
      <p className="mt-2 text-sm text-muted-foreground">
        Loading...
      </p>
    </div>
  )
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
