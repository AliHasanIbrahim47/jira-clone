import { createFileRoute } from "@tanstack/react-router";

import { SignUpCard } from "@/features/auth/components/sign-up-card";

export const Route = createFileRoute("/(auth)/_auth-layout/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div>
      <SignUpCard />
    </div>
  );
}
