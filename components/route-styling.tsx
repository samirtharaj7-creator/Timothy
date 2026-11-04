"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteStyling() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const path = pathname.replace(/\/$/, "") || "/";
    const chapterMatch = path.match(/^\/(?:1-timothy|2-timothy)\/(\d+)$/);

    const resetReaderViewport = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      html.scrollTop = 0;
      body.scrollTop = 0;
    };

    html.classList.add("dark");
    html.style.colorScheme = "dark";
    body.classList.add("mbe-shell-managed");
    body.removeAttribute("data-timothy-chapter");

    if (path === "/") body.dataset.timothyRoute = "home";
    else if (path === "/background") body.dataset.timothyRoute = "introduction";
    else if (chapterMatch) {
      body.dataset.timothyRoute = "commentary";
      body.dataset.timothyChapter = chapterMatch[1];
      resetReaderViewport();
    } else body.removeAttribute("data-timothy-route");
  }, [pathname]);

  return null;
}
