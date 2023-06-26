import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "./models/post";

interface ActionProps {
    payload: PostType[] | undefined  | null 
}
export const postSlice = createSlice({
    name: "posts",
    initialState: {
        value:  null
    },
    reducers: {
        post: (state: { value: PostType[] | undefined  | null }, action: ActionProps) => {
            state.value = action.payload;
        }
    }
})

export const { post } = postSlice.actions;
export default postSlice.reducer;