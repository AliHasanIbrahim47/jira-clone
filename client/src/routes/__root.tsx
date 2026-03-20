import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto grow p-4">
          <Outlet />
        </main>
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
