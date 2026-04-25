import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Estrategia específica para cachear los audios del juego (mp3)
    {
      matcher: ({ request, url }) => 
        request.destination === "audio" || url.pathname.endsWith(".mp3"),
      handler: "CacheFirst",
      options: {
        cacheName: "camrequiz-audio-cache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
      },
    },
    // Estrategias de caché por defecto para Next.js (imágenes, estáticos, etc.)
    ...defaultCache,
  ],
});

serwist.addEventListeners();