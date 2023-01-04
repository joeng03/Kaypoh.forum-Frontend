import { ITopic } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialTopicsState: ITopic[] = [];

const topicsSlice = createSlice({
    name: "topics",
    initialState: initialTopicsState,
    reducers: {
        createTopic(state, action) {
            state.push(action.payload);
        },
        setTopics(state, action: PayloadAction<ITopic[]>) {
            return action.payload;
        },

        updateTopic(state, action: PayloadAction<ITopic>) {
            const updatedTopic = action.payload;
            state[state.findIndex((topic) => topic.id === updatedTopic.id)] = updatedTopic;
        },
        deleteTopic(state, action: PayloadAction<number>) {
            const deletedTopic_id = action.payload;
            state.splice(
                state.findIndex((topic) => topic.id === deletedTopic_id),
                1,
            );
        },
    },
});
export const { createTopic, setTopics, updateTopic, deleteTopic } = topicsSlice.actions;

export default topicsSlice.reducer;
