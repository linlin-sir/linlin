import request from '@/utils/request'

export const getArticleList = data => {
    return request.get('/admin/interview/query', {
        params: data
    })
}
export const createArticle = data => {
    return request.post('/admin/interview/create', data)
}
/**
 * 
 * @param {string} id 删除对应id删除元素 
 */

export const removeArticle = (id) => {
    return request.delete("/admin/interview/remove", {
        data: {
            id,
        },
    });
};
/**
 * @param {string} id 查找对应id元素
 */
export const getArticleDetail = (id) => {
    return request.get("/admin/interview/show", {
        params: {
            id,
        },
    });
};

export const updateArticle = (data) => {
    return request.put("/admin/interview/update", data);
  };