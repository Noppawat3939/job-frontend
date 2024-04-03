import { useEffect } from "react";

export default function useChangeTitleWindow(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
