import { create } from "zustand";
import FirebaseService from "../../api/services/FirebaseService";

export const useMoodStore = create((set, get) => ({
    // State
    selectedMood: null,
    moodNote: "",
    isSubmitting: false,
    moodEntries: [],

    // Actions
    setSelectedMood: (mood) => set({ selectedMood: mood }),
    setMoodNote: (note) => set({ moodNote: note }),
    setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
    setMoodEntries: (entries) => set({ moodEntries: entries }),

    // Submit mood entry
    submitMoodEntry: async (userId) => {
        const state = get();

        if (!state.selectedMood) {
            throw new Error("Please select a mood");
        }

        set({ isSubmitting: true });

        try {
            const moodEntry = {
                id: `entry_${Date.now()}`,
                date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
                mood: state.selectedMood,
                note: state.moodNote || "",
                timestamp: new Date().toISOString(),
            };

            await FirebaseService.saveMoodEntry(userId, moodEntry);

            // Add to local state
            set({
                moodEntries: [...state.moodEntries, moodEntry],
                selectedMood: null,
                moodNote: "",
                isSubmitting: false,
            });

            console.log("Mood entry saved successfully:", moodEntry);
            return true;
        } catch (error) {
            console.error("Error saving mood entry:", error);
            set({ isSubmitting: false });
            throw error;
        }
    },

    // Reset form
    resetForm: () =>
        set({
            selectedMood: null,
            moodNote: "",
        }),
}));
