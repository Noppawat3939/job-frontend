import { create } from "zustand";

type CollapseSidebarStore = {
  collapse: boolean;
  toggleCollapse: () => void;
};

export const collapseSidebarStore = create<CollapseSidebarStore>(
  (set, get) => ({
    collapse: false,
    toggleCollapse: () => set({ collapse: !get().collapse }),
  })
);
