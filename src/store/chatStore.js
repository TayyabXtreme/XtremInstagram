import {create} from 'zustand';

const useChatStore = create((set) => ({
  messages: [],
  userId: null, 

  setMessages: (messages) => set({ messages }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}));

export default useChatStore;
