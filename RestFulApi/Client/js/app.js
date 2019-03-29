const mainBtn = document.getElementById('mainBtn');

//disp();
function disp(){

const ajax = new XMLHttpRequest();
    const url = "http://localhost:3000/products/";
    ajax.open('GET',url,true);
    ajax.onload=function(){
        if(this.status ===200 ){
            const data = JSON.parse(this.responseText);

            data.forEach(el => {
                console.log(el.price);
                console.log(el._id);
                console.log(el.name);
                var node = document.createElement("LI");
                var textnode1 = document.createTextNode("ID: "+el._id +', Name: ' +el.name+', Price: '+el.price);
                node.appendChild(textnode1);
                document.getElementById("list").appendChild(node);
              })
            } else {
              console.log('error')
            }
        }
    ajax.onerror = function(){
        console.log("There was an error");
        
    }
    ajax.send();
}
mainBtn.addEventListener('click',function(){
    const ajax = new XMLHttpRequest();
    const url = "http://localhost:3000/products/";
    ajax.open('GET',url,true);
    ajax.onload=function(){
        if(this.status ===200 ){
            const data = JSON.parse(this.responseText);

            data.forEach(el => {
                console.log(el.price);
                console.log(el._id);
                console.log(el.name);
                var node = document.createElement("LI");
                var textnode1 = document.createTextNode("ID: "+el._id +', Name: ' +el.name+', Price: '+el.price);
                node.appendChild(textnode1);
                document.getElementById("list").appendChild(node);
              })
            } else {
              console.log('error')
            }
        }
    ajax.onerror = function(){
        console.log("There was an error");
        
    }
    ajax.send();
})


function make_visible() {
    var x = document.getElementById("vis2");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}
postbtn_2.addEventListener('click',function(){
    var name = document.getElementById("post_name_id").value;
    var price = document.getElementById("post_price_id").value;

    let product = {
        'name':name,
        'price':price
    };
    
    fetch('http://localhost:3000/products/', {
                method: 'POST',
                //headers : new Headers(),
                body:JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                }
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    //disp();
});



deleteBtn.addEventListener('click',function(){
    var deleteID = document.getElementById("delete_id").value;
    var url = "http://localhost:3000/products/";
    deleteData(deleteID,url);
    alert("Deleted successfully!");
});

function deleteData(item, url) {
    return fetch(url + '/' + item, {
      method: 'delete'
    })
    .then(response => response.json());
  };


  patchbtn_2.addEventListener('click',function(){
    var id = document.getElementById("patch_id").value;
    var name = document.getElementById("patch_name_id").value;

    let product = [{
        "propName" : "name",
        "value" : name
    }];
    var url = "http://localhost:3000/products/";

    fetch(url + '/' + id, {
                method: 'PATCH',
                //headers : new Headers(),
                body:JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                }
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    //disp();
});
