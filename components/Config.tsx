import { SWRConfig } from "swr";

export default function Config(props: { children: JSX.Element }) {
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
