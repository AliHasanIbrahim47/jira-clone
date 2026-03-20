import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/_auth-layout")({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <nav className="flex items-center justify-between">
        <img src="/logo.svg" height={56} width={152} alt="logo" />
        <Button variant="secondary">
          <Link to={pathName === "/sign-up" ? "/sign-in" : "/sign-up"}>
            {pathName === "/sign-up" ? "Sign In" : "Sign Up"}
          </Link>
        </Button>
      </nav>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        <Outlet />
      </div>
    </div>
  );
}
