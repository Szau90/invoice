export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      MONGO_URL: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
