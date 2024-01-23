import { configureStore } from "@reduxjs/toolkit"
import voicecommandSlice from "./voice-command";
const voicecommandStore = configureStore({
    reducer: {
        voicecommand: voicecommandSlice.reducer,
    }
});

export default voicecommandStore;