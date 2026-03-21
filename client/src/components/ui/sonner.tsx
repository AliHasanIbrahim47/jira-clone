import type { ToasterProps } from "sonner";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "border shadow-lg",
          success: "!bg-emerald-50 !text-emerald-800 !border-emerald-200",
          error: "!bg-red-50 !text-red-800 !border-red-200",
          warning: "!bg-amber-50 !text-amber-800 !border-amber-200",
          info: "!bg-blue-50 !text-blue-800 !border-blue-200",
          loading: "!bg-gray-50 !text-gray-800 !border-gray-200",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
