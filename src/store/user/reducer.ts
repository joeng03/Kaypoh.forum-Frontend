import { IUser } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: IUser = {
    token: "",
    id: 0,
    email: "",
    username: "",
    profilePic: "",
    stars: 0,
    bio: "",
    created_at: new Date(0),
    updated_at: new Date(0),
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
