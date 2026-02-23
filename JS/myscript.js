var product_list = JSON.parse(localStorage.getItem("products")) || [];
let filteredProducts = [...product_list];
const searchInput = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
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

