import type { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  user?: User;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const userStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: undefined }),
}));
