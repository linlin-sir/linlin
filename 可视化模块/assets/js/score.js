const tbody = document.querySelector('tbody')
// 封装渲染函数
async function restule() {
    const res = await axios({
        url: "/score/list",
    })
    let html = '';
    for (const key in res.data.data) {
        const {name,score} = res.data.data[key]
        html += `<tr>
        <th scope="row">${key}</th>
            <td>${name}</td>
        <td class="score" data-stu_id=${key} data-batch=${1}>${score[0]}</td>
        <td class="score" data-stu_id=${key} data-batch=${2}>${score[1]}</td>
        <td class="score" data-stu_id=${key} data-batch=${3}>${score[2]}</td>
        <td class="score" data-stu_id=${key} data-batch=${4}>${score[3]}</td>
        <td class="score" data-stu_id=${key} data-batch=${5}>${score[4]}</td>
      </tr>`
    }
    tbody.innerHTML = html;
    
    // let key = 2520;
    // tbody.innerHTML = Object.values(res.data.data).map((e, i) => {
    //     key++;
    //     return `<tr>
    //     <th scope="row">${i}</th>
    //         <td>${e.name}</td>
    //     <td class="score" data-stu_id=${key} data-batch=${1}>${e.score[0]}</td>
    //     <td class="score" data-stu_id=${key} data-batch=${2}>${e.score[1]}</td>
    //     <td class="score" data-stu_id=${key} data-batch=${3}>${e.score[2]}</td>
    //     <td class="score" data-stu_id=${key} data-batch=${4}>${e.score[3]}</td>
    //     <td class="score" data-stu_id=${key} data-batch=${5}>${e.score[4]}</td>
    //   </tr>`
    // }).join('')
}
restule();
tbody.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('score')) {
        const target = e.target;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = target.innerText;
        target.appendChild(input);
        input.focus();
        input.addEventListener('blur', async () => {
            const { stu_id, batch } = target.dataset;
            const score = input.value;
            const res = await myaxios('/score/entry', 'post', data = { stu_id, batch, score });
            if (res.data.code === 0) toastr.success(res.data.message, '爸爸');
            if (res.data.code !== 0) toastr.info(res.data.message, '爸爸');
            input.remove();
            restule();
        })
        input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) input.blur();
        })
    }
})



