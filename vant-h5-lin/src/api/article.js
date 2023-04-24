import request from "@/utils/request";
// 1.
export const getArticlesAPI = (obj) => {
    return request({
        url: "/h5/interview/query",
        params: {
            current: obj.current,
            pageSize: 10,
            sorter: "weight_desc",
        },
    });
};
export const getDetailByIdAPI = (id) => {
    return request({
        url: '/h5/interview/show',
        params: { id }
    })
}
export const updateDetailAPI = (id, optType) => {
    return request({
        url: '/h5/interview/opt',
        method: 'post',
        data: {
            id,
            optType,
        },
    })
}