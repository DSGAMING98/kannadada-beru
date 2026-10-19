"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      let reloading = false;
      const hadControllerAtMount = navigator.serviceWorker.controller !== null;
      const resetReloadGuard = window.setTimeout(() => sessionStorage.removeItem("sw-controller-reloaded"), 3000);
      const onControllerChange = () => {
        // A first install can claim the page without reloading it. Reload only
        // when an already controlled session receives a newer worker.
        if (!hadControllerAtMount) return;
        if (reloading || sessionStorage.getItem("sw-controller-reloaded") === "1") return;
        reloading = true;
        sessionStorage.setItem("sw-controller-reloaded", "1");
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
      navigator.serviceWorker.register("/sw.js").then((registration) => registration.update()).catch(() => undefined);
      return () => {
        window.clearTimeout(resetReloadGuard);
        navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      };
    }
  }, []);
  return null;
}
