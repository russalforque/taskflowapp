import { SET_USER_TOKEN_MUTATION } from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_MUTATION](state, payload) {
        state.email = payload.email;
        state.token = payload.token;
        state.expiresIn = payload.expiresIn;
        state.refreshToken = payload.refreshToken;
        state.userId = payload.userId;
    },
};