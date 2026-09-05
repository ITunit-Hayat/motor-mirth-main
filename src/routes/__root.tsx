import type { ReactNode } from "react";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import type { QueryClient } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { LanguageProvider } from "@/context/LanguageContext";
import { DealershipProvider } from "@/context/DealershipContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { UserAuthProvider } from "@/context/UserAuthContext";

type RouterCtx = { queryClient: QueryClient };

export const Route = createRootRouteWithContext<RouterCtx>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#2d1c13" },
      { title: "MZAB MOTORS — منصة مزاب موتورز للسيارات" },
      { name: "description", content: "منصة مزاب موتورز الرائدة لتجارة وشراء وبيع السيارات في الجزائر بالدينار الجزائري." },
      { property: "og:title", content: "MZAB MOTORS — مزاب موتورز" },
      { property: "og:description", content: "منصة مزاب موتورز لشراء وبيع وحجز أحدث السيارات المعتمدة بالدينار الجزائري." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <DealershipProvider>
            <AdminAuthProvider>
              <UserAuthProvider>
                <Outlet />
                <Toaster richColors position="top-right" />
              </UserAuthProvider>
            </AdminAuthProvider>
          </DealershipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center p-8">
        <div className="text-7xl font-bold text-accent">404</div>
        <p className="mt-2 text-muted-foreground">Page not found.</p>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6">
      <div className="max-w-md text-center">
        <div className="text-3xl font-bold text-destructive">Something went wrong</div>
        <p className="mt-2 text-muted-foreground text-sm">{error.message}</p>
      </div>
    </div>
  );
}
