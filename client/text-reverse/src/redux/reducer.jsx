import { REVERSE_TEXT } from "./ations";

const initialState = {
    textReversed: []
}

export const reducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case REVERSE_TEXT: 
            state.textReversed.unshift(payload)
            return {
                ...state,
                textReversed: [...state.textReversed]
            }
        default: return state;
    }

}