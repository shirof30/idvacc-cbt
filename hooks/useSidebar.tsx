import { create } from "zustand";

interface Sidebar {
  isMinimized: boolean;
  toggle: () => void;
}

export const useSidebar = create<Sidebar>((set) => ({
  isMinimized: false,
  toggle: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));