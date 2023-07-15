import { create } from 'zustand';

const useStore = create((set) => ({
    recipes: [],
    setRecipes: (arr) => set({ recipes: arr }),
    selectedRecipes: [],
    setSelectedRecipes: (arr) => set({ selectedRecipes: arr }),
    scrolledRecipies: 15,
    setScrolledRecipies: (newValue) => {
        set({ scrolledRecipies: newValue });
    },
    incrementRecipies: () => set((state) => ({ scrolledRecipies: state.scrolledRecipies + 10 }))
}));

export default useStore;