import "server-only";

export const serverLog = (log: any, fileName: string) => {
  console.log(`Error in ${fileName}: ${JSON.stringify(log)}`);
  throw new Error("We have received an error");
};
