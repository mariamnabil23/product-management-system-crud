// get total
// create product
// save data in local storage
// clear inputs after creating
// read (displing created product)
//delete
//cout
//update
//search
//clean data

//get elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let dicscount = document.getElementById('dicscount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let tbody = document.getElementById('tbody');
let delete_all_data = document.getElementById('delete-all-data');
let mood = 'create';
let temp;

// get total
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +dicscount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
    }
};


// create product
let dataProduct;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}

create.onclick=()=>{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dicscount: dicscount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if(title.value != '' && price.value != '' && count.value < 10){
        if(mood === 'create'){
            //count
            if(newPro.count > 1){
                for(let i=0 ; i < newPro.count ; i++){
    
                    //create product many times , according count
                    dataProduct.push(newPro);
                }
                }else{
                    //create product only once
                    dataProduct.push(newPro);
            }
        }else{
            // important point.....
            dataProduct[temp] = newPro;
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = 'block';
        }
        //calling
        clearData();
    }

    //save data in local storage
    localStorage.setItem( 'product' , JSON.stringify(dataProduct));

    //calling
    displayData();
};


// clear inputs after creating
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    dicscount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};


// read (displing created product)
function displayData(){

    let table = '';
    for(let i=0 ; i < dataProduct.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].dicscount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    };
    tbody.innerHTML = table;

    if(dataProduct.length > 0){
        delete_all_data.innerHTML = `
        <button onclick="deleteAllData()">delete all (${dataProduct.length})</button>
        `
    }else{
        delete_all_data.innerHTML ='';
    }

    getTotal();
};
displayData()


//delete product
function deleteData(i){
    //delete only from array , but not local storage 
    dataProduct.splice(i , 1);

    //after handling array , then add it to local storage
    localStorage.product = JSON.stringify(dataProduct);

    //calling it to update data after deleting
    displayData();
};


//delete all data
function deleteAllData(){
    //delete all from ls
    localStorage.clear();
    //delete all from array
    dataProduct.splice(0);
    //update data after daeleting all
    displayData();
};


//update data
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    dicscount.value = dataProduct[i].dicscount;
    category.value = dataProduct[i].category;
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'update';
    mood = 'update';
    //to use i in the create function ... (global)
    temp = i;
    //scrolling top
    scroll({
        top:0,
        behavior: "smooth"
    })
};


//search
let searchMood = 'title';

function search(id){
    let search = document.getElementById('search');
    if(id === 'search-title'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = "search by " + searchMood;
    search.focus();
    search.value = '';
    displayData();
};

function searchData(value){
    let table = '';

    for(let i=0 ; i < dataProduct.length ; i++){

        if(searchMood === 'title'){

                if(dataProduct[i].title.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].dicscount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `;
                }
            

        }
        else{
            
                if(dataProduct[i].category.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].dicscount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `;
                }

            }

    }

    tbody.innerHTML = table;
};



