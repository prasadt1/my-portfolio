/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_COMPETITION_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export {};
