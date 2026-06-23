import "server-only";

export const serverLog = (err: unknown, fileName: string): never => {
  console.log(
    `Error in ${fileName}: ${err instanceof Error ? err.stack : String(err)}`,
  );
  throw new Error("We have received an error");
};
