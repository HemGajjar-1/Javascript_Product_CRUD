var product_list = JSON.parse(localStorage.getItem("products")) || [];
let filteredProducts = [...product_list];
const searchInput = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    product_list = [];
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase();
            filteredProducts = product_list.filter(product =>
                product.p_name.toLowerCase().includes(keyword) ||
                product.p_desc.toLowerCase().includes(keyword) ||
                product.p_price.toLowerCase().includes(keyword) ||
                product.p_id.toString().includes(keyword)
            );
            renderProducts();
        })
    }
    // Adding some default products for easy review
    let p1 = {
        "p_id": 1,
        "p_img": "data:image/jpeg;base64,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",
        "p_name": "Shoes",
        "p_desc": "This are some nice pair of shoes.",
        "p_price": "800₹"
    }
    let p2 = {
        "p_id": 2,
        "p_img": "data:image/jpeg;base64,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",
        "p_name": "Coffee Mug",
        "p_desc": "This is a durable coffee mug",
        "p_price": "500₹"
    }
    product_list.push(p1);
    product_list.push(p2);
    localStorage.setItem("products", JSON.stringify(product_list));
    console.log(product_list)
    renderProducts();
})

function renderProducts() {

    var tbody = document.getElementById("table-body")
    if (!tbody) {
        return;
    }
    tbody.innerHTML = ""
    if (filteredProducts.length === 0) {
        const row = ` <tr>
                    <td colspan="6"> No Products</td>
                </tr>`
        tbody.innerHTML += row
    } else {
        filteredProducts.forEach((x) => {
            const row = ` <tr>
                    <td>${x.p_id}</td>
                    <td class="col-2">
                        <img src="${x.p_img}" class="border border-dark" style="max-width:15vh;max-height: 15vh;" alt="">
                    </td>
                    <td class="col-2">${x.p_name}</td>
                    <td class="col-4" style="text-align: justify;">${x.p_desc}</td>
                    <td class="col-1">${x.p_price}</td>
                    <td class="col-2 align-items-center">
                        <button type="button" id="${x.p_id}" class="btn btn-sm btn-dark m-1" onclick="goToView(${x.p_id})">View</button>
                        <button type="button" id="${x.p_id}" class="btn btn-sm btn-dark m-1" onclick="goToEdit(${x.p_id})">Edit</button>
                        <button type="button" id="${x.p_id}" onclick="openDeleteModal(${x.p_id})" class="btn btn-sm btn-dark m-1" >Delete</button>
                    </td>
                </tr>`
            tbody.innerHTML += row
        })
    }

    product_list = JSON.parse(localStorage.getItem("products")) || [];
    filteredProducts = [...product_list];
}
function goToHome(id) {
    window.location.href = `index.html`;
}
function goToAdd() {
    window.location.href = "add_product.html"
}
function goToEdit(id) {
    window.location.href = `edit_product.html?id=${id}`;
}
function goToView(id) {
    window.location.href = `view_product.html?id=${id}`;
}

let currentSortField = "";
let isAscending = true;

function sortProducts(field) {
    if (currentSortField === field) {
        isAscending = !isAscending;
    } else {
        currentSortField = field;
        isAscending = true;
    }

    filteredProducts.sort((a, b) => {
        let valA, valB;
        if (field === "id") {
            valA = a.p_id;
            valB = b.p_id;
        }
        if (field === "name") {
            valA = a.p_name;
            valB = b.p_name;
        }
        if (field === "price") {
            valA = parseInt(a.p_price);
            valB = parseInt(b.p_price);
        }
        if (valA < valB) return isAscending ? -1 : 1;
        if (valA > valB) return isAscending ? 1 : -1;
        return 0;
    })
    renderProducts();
}


function showAlert(msg, type) {
    mycontainer = document.getElementById("alert-container");
    mycontainer.innerHTML = `<div class="alert alert-${type}" role="alert">
                ${msg}
            </div>`
    setTimeout(() => {
        mycontainer.innerHTML = "";
    }, 3000);
}

