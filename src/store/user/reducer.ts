import { IUser } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: IUser = {
    username: "",
    email: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            return action.payload;
        },
    },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
