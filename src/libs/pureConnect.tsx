import React, { FC } from "react";

export function pureConnect<P extends object, G extends Partial<P>>(
  contextToProps: () => G,
  Cmp: FC<P>,
) {
  const MemoCmp = React.memo(Cmp);
  return function (props: Omit<P, keyof G>) {
    const contextProps = contextToProps();
    return <MemoCmp {...(props as P)} {...(contextProps as G)} />;
  };
}
