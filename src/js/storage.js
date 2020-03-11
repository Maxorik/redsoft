export default {
    
    // получаем данные из localStorage, если они есть; меняем стиль кнопок
    getStorage() {
        if(localStorage.getItem('sold')) {
            const buyedBtns = JSON.parse(localStorage.getItem("sold"));
            const btnBuy = document.querySelectorAll('.btn-buy');
            
            for(let i = 0; i < buyedBtns.length; i++) {
                this.btnSold(buyedBtns[i]);
            }
        }
    },
    
    // запоминаем кнопку в localStorage
    setStorage(i) {
        const btnBuy = document.querySelectorAll('.btn-buy');
        
        if(!localStorage.getItem('sold')) {
            const btns = [];
            localStorage.setItem('sold', JSON.stringify(btns));
        }
        
        const buyedBtns = JSON.parse(localStorage.getItem("sold"));
        buyedBtns.push(i);
        localStorage.setItem('sold', JSON.stringify(buyedBtns));
    },
    
    // изменение стиля кнопки
    btnSold(i) {
        const btnBuy = document.querySelectorAll('.btn-buy');
        btnBuy[i].classList.remove('btn-normal');
        btnBuy[i].classList.add('btn-basket');
        btnBuy[i].innerHTML = '<span class = "fa fa-check fa-lg"></span> В корзине';
    }
}