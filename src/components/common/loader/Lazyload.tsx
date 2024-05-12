import { type PropsWithChildren, type ReactNode, Suspense } from "react";
import { Spinner } from ".";

type LazyloadProps = PropsWithChildren & { fallback?: ReactNode };

export default function Lazyload({ children, fallback }: LazyloadProps) {
  return <Suspense fallback={fallback || <Spinner />}>{children}</Suspense>;
}
