import React from "react";

export function useInterval(handler: () => void, timeout: number) {
  React.useEffect(() => {
    const id = setInterval(handler, timeout);
    return () => clearInterval(id);
  });
}
