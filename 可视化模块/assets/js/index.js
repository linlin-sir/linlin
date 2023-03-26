// 绑定点击事件  如果confirm返回值为true 删除本地存储里的值
document.querySelector('.logout').addEventListener('click', e => confirm('确定退出吗？') ? localStorage.removeItem('baba') : '')
// 给一级标题显示隐藏
document.querySelectorAll('.nav>li>a').forEach((one) => {
    one.addEventListener('click',function (e) {
     one.nextElementSibling.classList.toggle('show')      
    })
})
// 给二级标题高亮
document.querySelectorAll('.nav ul a').forEach((two) => {
    two.addEventListener('click', () => {
        document.querySelector('.nav ul a.active').classList.remove('active')
        two.classList.add('active')
    })
})

myaxios('/init/data')
