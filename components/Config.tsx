import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export default function Config(props: PropsWithChildren<Record<never, never>>) {
  return (
    <SWRConfig
      value={{
        errorRetryInterval: 1000,
        refreshInterval: 400,
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        focusThrottleInterval: 1000,
      }}
    >
      {props.children}
    </SWRConfig>
  );
}
