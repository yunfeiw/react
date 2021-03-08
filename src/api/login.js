/**
 * @description:登录
 */
import http from '../util/http';
import { PROXY } from './index';
import { PRO_PATH } from './index';
export const login = {
    login(data) {
        console.log(`${PRO_PATH}${PROXY}/data`)
        return http.get(`${PRO_PATH}${PROXY}/data`, data);
    }
}