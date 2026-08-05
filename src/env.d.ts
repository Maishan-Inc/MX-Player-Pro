/// <reference types="vite/client" />

/** 构建时由 vite.config.ts 注入，来源是 CI 的 APP_VERSION 环境变量。 */
declare const __APP_VERSION__: string
