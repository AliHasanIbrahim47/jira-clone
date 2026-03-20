import { createFileRoute } from "@tanstack/react-router";

import { SignInCard } from "@/features/auth/components/sign-in-card";

export const Route = createFileRoute("/(auth)/_auth-layout/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div>
      <SignInCard />
    </div>
  );
}
