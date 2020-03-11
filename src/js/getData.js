import storage from './storage.js';

// раскомментируйте строку 5, чтобы очистить localStorage;
// затем перезугрузите страницу и снова закомментируйте
// localStorage.setItem('sold', '');


// при загрузке подгружаем товары в корзине
storage.getStorage();

// получаем все кнопки для покупок и даем им событие
const btnBuy = document.querySelectorAll('.btn-buy');

for(let i = 0; i < btnBuy.length; i++) {
    if(btnBuy[i].classList.contains('btn-normal')) {
        btnBuy[i].addEventListener('click', () => getData(i));
    }
}

// обращаемся к серверу
function getData(i) {
    if(!btnBuy[i].classList.contains('btn-basket')) {
        const url = 'https://jsonplaceholder.typicode.com/posts/' + (i+1);

        // прелоадер
        btnBuy[i].innerHTML = "<section><div class='sk-wave'><div class='sk-rect sk-rect-1'></div><div class='sk-rect sk-rect-2'></div><div class='sk-rect sk-rect-3'></div><div class='sk-rect sk-rect-4'></div><div class='sk-rect sk-rect-5'></div></div></section>";

        fetch("url", {
            method: "GET",
            headers:{"content-type":"application/x-www-form-urlencoded"}
        }).then( response => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            return response.text()
        }).then( () => {
            storage.btnSold(i);
            storage.setStorage(i);
        })
    }
}