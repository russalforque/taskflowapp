import { GET_USER_TOKEN_GETTER } from "@/store/storeconstants";

export default {
    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.token;
    },
};