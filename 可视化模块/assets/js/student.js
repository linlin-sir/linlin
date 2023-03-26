// 获取到表单元素
const body = document.querySelector('body')
const tbody = document.querySelector('tbody')
const province=document.querySelector('[name=province]')
const city=document.querySelector('[name=city]')
const county = document.querySelector('[name=county]')
const form = document.querySelector('form')
// 定义全局变量id，因为提交按钮与显示模态框不在同一个作用域
let id;
// 封装渲染函数
async function render() {
    const list = (await axios({ url: '/student/list' })).data.data
    tbody.innerHTML= list.map(({id,
        name,
        sex,
        age,
        group,
        phone,
        salary,
        truesalary,
        province,
        city,
        county,
        user_id,
        jing,
        wei
    })=> {
            return `<tr>
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>${age}</td>
            <td>${sex}</td>
            <td>${group}</td>
            <td>${phone}</td>
            <td>${truesalary}</td>
            <td>${salary}</td>
            <td>${(province+city+county)}</td>
            <td>
              <button type="button" class="btn btn-primary btn-sm update-btn" data-id='${id}'>修改</button>
              <button type="button" class="btn btn-danger btn-sm ">删除</button>
            </td>
          </tr>`
        }).join('')
}
// 封装省市区的渲染函数
async function renderselect(element, url, params) {
    const list = (await axios({ url, params })).data
    element.innerHTML = list.map((e => `<option value=${e}>${e}</option>`)).join('');
}
// 定义初始化省市区的函数
async function init() {
    await renderselect(province, '/geo/province', {})
    await renderselect(city, '/geo/city', {pname: province.value})
    renderselect(county,'/geo/county',{pname:province.value,cname:city.value})
}
// 给省份下拉菜单绑定change事件
province.addEventListener('change', async() => {
    await renderselect(city, '/geo/city', { pname: province.value })
    renderselect(county,'/geo/county',{pname:province.value,cname:city.value})
})
// 给城市下拉菜单绑定change事件
city.addEventListener('change', () => renderselect(county, '/geo/county', { pname: province.value, cname: city.value }))
// 给body添加点击事件
body.addEventListener('click', async (e) => {
    if (e.target.classList.contains('update-btn')) {
        $("#addModal").modal("show");
        init();
        form.reset();
        document.querySelector("#addModalLabel").innerText = "修改学员";
        document.querySelector('[type=submit]').innerText= "确定修改"
        id = e.target.dataset.id;
        const res = await axios({ url: "/student/one", params: { id } });
        const obj = res.data.data;
        await renderselect(city, '/geo/city', { pname: obj.province })
        await renderselect(county,'/geo/county',{pname:obj.province,cname:obj.city})
        for (const key in obj) {
            const formEle = document.querySelector(`[name=${key}]`);
            if (formEle && key !== "sex") {
                formEle.value = obj[key]
            }
        }
        document.querySelector(`[name=sex][value=${obj.sex}]`).checked = true;
    } else if (e.target.classList.contains('add-btn')) {
        init();
        form.reset();
        $("#addModal").modal("show");
        document.querySelector("#addModalLabel").innerText = "添加新学员";
        document.querySelector('[type=submit]').innerText= "确定添加"
    }
});
// 给form表单添加提交事件
form.addEventListener('submit', async function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 获取所有填写好的表单的值
    const data = serialize(form, { hash: true, empty: true });
    // 给填写好的值判断,如果为空返回
    for (const key in data) {
        if (!data[key]) {
            toastr.error('请检查输入是否符合规范', '爸爸')
            return
       }
    }
    // 获取当前提交事件的表头值
    const formtitle = document.querySelector("#addModalLabel").innerText;
    // 添加判断,在判断外定义一个变量接受axios返回的值
    let res;
    // 如果标头是添加就发送添加请求  否则就发送修改请求
    if (formtitle==='添加新学员') {
         res = await axios({ url: '/student/add',method:'post',data})
    } else {
        data.id = id;
        res = await axios({ url: '/student/update',method:'put',data})
    }
    // 等判断完成再判断返回是否成功
    if (res.data.code === 0) {
        toastr.success(res.data.message, '爸爸');
        render();
        $("#addModal").modal("hide");
    }
})

// 进入页面先调用渲染函数
init();
render();
