"use client";

import { useCallback, useState } from "react";

export default function useToggle() {
  const [active, setActive] = useState(false);

  const onToggle = useCallback(
    () => setActive((prevActive) => !prevActive),
    []
  );

  return { state: { active }, handle: { toggle: onToggle } };
}
