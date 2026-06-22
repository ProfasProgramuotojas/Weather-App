import "server-only";

type LogType = "error" | "info";

export const serverLog = (
  log: any,
  fileName: string,
  type: LogType = "info",
) => {
  switch (type) {
    case "info":
      console.log(`Info from ${fileName}: ${JSON.stringify(log)}`);
      break;
    case "error":
      console.log(`Error in ${fileName}: ${JSON.stringify(log)}`);
      break;
  }
};
