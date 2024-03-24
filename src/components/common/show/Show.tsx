import { Fragment, type PropsWithChildren, type ReactNode } from "react";

type ShowProps = {
  when?: boolean;
  otherwise?: ReactNode;
} & PropsWithChildren;

export default function Show({ when, otherwise, children }: ShowProps) {
  if (!when && !otherwise) return null;

  return <Fragment>{when ? children : otherwise}</Fragment>;
}
