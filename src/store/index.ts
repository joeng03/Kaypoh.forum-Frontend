import userReducer from "./user/reducer";
import postsReducer from "./posts/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import type { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
    },
});

export default store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
