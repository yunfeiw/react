/**
 * @description: token
 */
const initToken = localStorage.getItem('token') || null;
const Token = (state = initToken, action) => {
    switch (action.type) {
        case "GET_TOKEN":
            return state;
        case "SET_TOKEN":
            localStorage.setItem('token', action.value);
            return action.value;
        default:
            return state;
    }


}
export default Token;