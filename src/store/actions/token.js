/**
 * @description:token 读取 设置
 */

export const getToken = () => {
    return {
        type: "GET_TOKEN"
    }
}

export const setToken = (value) => {
    return {
        type: "SET_TOKEN",
        value
    }
}