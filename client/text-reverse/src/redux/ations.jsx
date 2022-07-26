import axios from 'axios';
export const REVERSE_TEXT = "REVERSE_TEXT";

export const reverseText = (text) => {
    return async (dispatch) =>{
        return axios(`iecho?text=${text}`)
        .then(res => dispatch({type: REVERSE_TEXT , payload: res.data}))
    }
}