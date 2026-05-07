import { create } from 'zustand';

interface ChatState {
  hasStarted: boolean;
  chatMessage: string;
  startChat: () => void;
  updateMessage: (msg: string) => void;
}

export const useChatStore = create<ChatState>(set => ({
  hasStarted: false,
  chatMessage: '',
  startChat: () => set({ hasStarted: true }),
  updateMessage: msg => set({ chatMessage: msg }),
}));
