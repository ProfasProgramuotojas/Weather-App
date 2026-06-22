import { ReactNode } from "react";

export const Empty = ({ children }: { children: ReactNode }) => {
  return <div data-testid={"empty-state"}>{children}</div>;
};
