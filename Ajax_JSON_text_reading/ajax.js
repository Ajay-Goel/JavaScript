const btn = document.querySelector('.btn');
const info = document.querySelector('.info');

//THE AJAX IS USED TO call the data without loading the whole page.

function getData(url){
    const ajax = new XMLHttpRequest();
    console.log(ajax);
    ajax.open('GET',url,true);
    ajax.onreadystatechange = function(){
        if(this.status ===200 && this.readyState===4){
            // we can avoid writing ready State==4 by,
            // checking if the page is loaded or not by ajax.load=function()
            //{
                //if(this.status==200)
            //}
            console.log('success');
            console.log(this.responseText);
            info.textContent = this.responseText;    
        } else{
            console.log(this.statusText);
        }
    };

    ajax.onerror = function(){
        console.log("There was an error");
    }
    ajax.send();
}

btn.addEventListener('click',function(){
        getData('info.txt');
        //getData('info.txt');
    });