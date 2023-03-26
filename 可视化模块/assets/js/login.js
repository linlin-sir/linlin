// 获取A元素并获取对应的显示隐藏div
const logina = document.querySelector('.login-a');
const logindiv = document.querySelector('.login');
const loginform = document.querySelector('.login form')
const registera = document.querySelector('.register-a');
const registerdiv = document.querySelector('.register');
const registerform = document.querySelector('.register form')
// 点击A模块里的a标签，让A模块隐藏B模块显示。
logina.addEventListener('click', () => {
    logindiv.style.display = 'none';
    registerdiv.style.display = 'block';
})
// 点击B模块里的a标签，让B模块隐藏A模块显示。
registera.addEventListener('click', () => {
    logindiv.style.display = 'block';
    registerdiv.style.display = 'none';
})
// 点击提交按钮，阻止默认刷新行为，获取到值，判断值是否符合规范，不符合返回，符合向后端发起请求，返回res.data.messages的值
// 并且做出判断，如果符合条件，就弹窗提醒并延时跳转登录框
registerform.addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = registerform.querySelector('input[name=username]').value.trim();
    const password = registerform.querySelector('input[name=password]').value.trim();
    if (!username || !password) return 
    const res = await myaxios('/api/register', 'post', data = { username, password })
    if (res.data.code === 0) {
        toastr.success(res.data.message, '爸爸');
        setTimeout(() => {
            registera.click();
        }, 1500)
        registerform.reset();
    }else {
        toastr.info(res.data.message, '爸爸');
    }
})
loginform.addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = loginform.querySelector('input[name=username]').value.trim();
    const password = loginform.querySelector('input[name=password]').value.trim();
    if (!username || !password) return 
    const res = await myaxios('/api/login', 'post', data = { username, password })
    if (res.data.code === 0) {
        setTimeout(() => {
            location.href='./index.html'
        }, 1500)
        toastr.success(res.data.message, '爸爸');
        localStorage.setItem('baba',res.data.token)
        registerform.reset();
    }else {
        toastr.warning(res.data.message, '爸爸');
    }
})

