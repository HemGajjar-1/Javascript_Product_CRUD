var product_list = JSON.parse(localStorage.getItem("products")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const product = product_list.find(p => p.p_id == id);
    if (!product) {
        showAlert("Product not found!", "danger");
        window.location.href = "index.html";
        return;
    }
    document.getElementById("p-id").innerHTML = product.p_id;
    document.getElementById("p-name").innerHTML = product.p_name;
    document.getElementById("p-desc").innerHTML = product.p_desc;
    document.getElementById("p-price").innerHTML = product.p_price;
    document.getElementById("p-img").src = product.p_img;
})