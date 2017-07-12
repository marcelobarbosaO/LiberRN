import { LOGIN_FACE } from '../types';

const INITIAL_STATE = {
    profile: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_FACE:
            return {...state, profile: action.perfil};
        default:
            return state;
    }
};