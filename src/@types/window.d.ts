interface Window {
  adsbygoogle?: { [key: string]: unknown }[];
  dataLayer: Record<string, unknown>[];
}

declare global {
  const window: Window;
}
