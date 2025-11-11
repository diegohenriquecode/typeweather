
interface ImportMetaEnv {
  readonly VITE_HTTP_TIMEOUT_MS?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
