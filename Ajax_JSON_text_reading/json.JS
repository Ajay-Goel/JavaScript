const btn = document.querySelector('.btn');
const cartInfo = document.querySelector('.cartInfo');
const itemInfo = document.querySelector('.itemInfo');

//gather data from JSON and dispalying it

btn.addEventListener('click',function(){
    getData('cart.json');
});

function getData(url){
    const ajax = new XMLHttpRequest();
    ajax.open("GET",url,true);
    ajax.onload = function(){
        if(this.status===200){
            //console.log(this.responseText);
            const data = JSON.parse(this.responseText);
            console.log(data);
            cartInfo.innerHTML = `
            <p>${data.cartInfo.name}</p>
            <p>${data.cartInfo.store}</p>
            `;
            let display = '';
            const specialItems = data.cartItems.filter(function(item){
                return item.price>1;
            })

            specialItems.forEach(function(item){
                display+=   `<div class='item'>
                                <p>item id: ${item.id}</p>
                                <p>item name: ${item.name}</p>
                                <p>item price: ${item.price}</p>
                            </div>`;
                itemInfo.innerHTML = display;
            })
        }
        else{
            //this.onerror();
            console.log(this.statusText);
            
        };
    };

        ajax.onerror = function(){
            console.log("There was an werror");
            
        };

    
    ajax.send();
}



