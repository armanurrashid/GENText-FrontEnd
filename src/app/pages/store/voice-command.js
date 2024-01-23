import { createSlice } from "@reduxjs/toolkit";

const voicecommandSlice = createSlice({
    name: 'voicecommand',
    initialState: { command: "" },
    reducers: {
        add: (state, action) => {
            state.command = action.payload;
            console.log(state.command)
        },
    }
});

export const voicecommandActions = voicecommandSlice.actions;

export default voicecommandSlice;
