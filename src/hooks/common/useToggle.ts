"use client";

import { useCallback, useState } from "react";

export default function useToggle() {
  const [active, setActive] = useState(false);

  const onToggle = useCallback(
    () => setActive((prevActive) => !prevActive),
    []
  );

  const setToggle = (newActive: boolean) => setActive(newActive);

  return {
    state: { active },
    handle: { toggle: onToggle, setToggle },
  };
}
