import SignupValidations from "@/services/SignupValidations";
import { LOGIN_ACTION, SET_USER_TOKEN_MUTATION, SIGNUP_ACTION, } from "@/store/storeconstants";
import axios from "axios";


export default {
    async [LOGIN_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = '';

        try {
            response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCR2l4bd-iVKgGDZ52EEmHmN1zShGIyu8`,
                postData,
        );
        } catch(err) {
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.erros[0].message,
            );
            throw errorMessage;
        }

        if (response.status === 200) {
            context.commit(SET_USER_TOKEN_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn, 
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            });
       }
    },
    async [SIGNUP_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };
        let response = '';
        try {
            response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCR2l4bd-iVKgGDZ52EEmHmN1zShGIyu8`
            ,
                postData,
        );
        } catch(err) {
            let errorMessage = SignupValidations.getErrorMessageFromCode(
                err.response.data.error.erros[0].message,
            );
            throw errorMessage;
        }

       if (response.status === 200) {
            context.commit(SET_USER_TOKEN_MUTATION, {
                email: response.data.email,
                token: response.data.idToken,
                expiresIn: response.data.expiresIn, 
                refreshToken: response.data.refreshToken,
                userId: response.data.localId,
            });
       }
    },
};