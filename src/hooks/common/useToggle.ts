"use client";

import { useCallback, useState } from "react";

export default function useToggle(_default = false) {
  const [active, setActive] = useState(_default);

  const onToggle = useCallback(
    () => setActive((prevActive) => !prevActive),
    []
  );

  const setToggle = useCallback(
    (newActive: boolean) => setActive(newActive),
    []
  );

  return {
    state: { active },
    handle: { toggle: onToggle, setToggle },
  };
}
