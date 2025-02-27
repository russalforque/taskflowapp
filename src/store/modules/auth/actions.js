import SignupValidations from "@/services/SignupValidations";
import { LOGIN_ACTION, SET_USER_TOKEN_MUTATION, SIGNUP_ACTION, LOADING_SPINNER_SHOW_MUTATION } from "@/store/storeconstants";
import axios from "axios";

export default {
    async [LOGIN_ACTION]({ commit }, payload) {
        commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCR2l4bd-iVKgGDZ52EEmHmN1zShGIyu8`,
                postData
            );

            if (response.status === 200) {
                commit(SET_USER_TOKEN_MUTATION, {
                    email: response.data.email,
                    token: response.data.idToken,
                    expiresIn: response.data.expiresIn, 
                    refreshToken: response.data.refreshToken,
                    userId: response.data.localId,
                });
            }
            return response;
        } catch(err) {
            const errorCode = err.response?.data?.error?.message || 'UNKNOWN_ERROR';
            const errorMessage = SignupValidations.getErrorMessageFromCode(errorCode);
            throw errorMessage;
        } finally {
            commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
        }
    },

    async [SIGNUP_ACTION]({ commit }, payload) {
        commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCR2l4bd-iVKgGDZ52EEmHmN1zShGIyu8`,
                postData
            );

            if (response.status === 200) {
                // Store user data in Firebase Realtime Database
                await axios.put(
                    `https://your-firebase-url/users/${response.data.localId}.json?auth=${response.data.idToken}`,
                    {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        email: payload.email
                    }
                );

                commit(SET_USER_TOKEN_MUTATION, {
                    email: response.data.email,
                    token: response.data.idToken,
                    expiresIn: response.data.expiresIn, 
                    refreshToken: response.data.refreshToken,
                    userId: response.data.localId,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                });
            }
            return response;
        } catch(err) {
            const errorCode = err.response?.data?.error?.message || 'UNKNOWN_ERROR';
            const errorMessage = SignupValidations.getErrorMessageFromCode(errorCode);
            throw errorMessage;
        } finally {
            commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
        }
    },
};