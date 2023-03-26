import request from "@/utils/request";
export const registerAPI = (data) => {
    return request.post('/h5/user/register', data)
};
export const loginAPI = (data) => {
    return request.post("/h5/user/login", data);
};
