
const form = document.getElementById("productForm");
const nameInput = document.getElementById("p_name");
const priceInput = document.getElementById("p_price");
const descInput = document.getElementById("p_desc");
const fileInput = document.getElementById("formFile");
const previewImg = document.getElementById("imagePreview");

document.addEventListener("DOMContentLoaded", function () {

    let imageData = "";
    const nameRegex = /^[A-Za-z0-9\s]{1,30}$/;
    const priceRegex = /^\d+$/;

    nameInput.addEventListener("input", function () {
        const name = this.value;
        if ((!nameRegex.test(name)) && (name !== "")) {
            document.querySelector(".p-name-error").innerHTML = "Only alphabets, numbers and space is allowed (Max 30 characters)"
        } else {
            document.querySelector(".p-name-error").innerHTML = "";
        }
    });
    priceInput.addEventListener("keydown", function (e) {
        if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
            e.preventDefault();
        }
    });
    priceInput.addEventListener("input", function () {
        const price = this.value;
        console.log(price);
        if (!priceRegex.test(price) && (price !== "")) {
            document.querySelector(".p-price-error").innerHTML = "Only positive integers allowed";
        } else {
            document.querySelector(".p-price-error").innerHTML = "";
        }
    });
    descInput.addEventListener("input", function () {
        if (this.value.length > 200) {
            this.value = this.value.substring(0, 200);
        }
    })

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                document.querySelector(".p-img-error").innerHTML = "Image must be less than 5MB";
                this.value = "";
                previewImg.classList.add("d-none");
                return;
            }
            document.querySelector(".p-img-error").innerHTML = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {

                previewImg.src = e.target.result;
                previewImg.classList.remove("d-none");
                imageData = e.target.result;
            }
        }
    })
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const price = priceInput.value.trim();
        const desc = descInput.value.trim();

        var name_error = document.querySelector(".p-name-error").innerHTML;
        var price_error = document.querySelector(".p-price-error").innerHTML;

        var img_error = document.querySelector(".p-img-error").innerHTML;


        if (name_error != "") {
            showAlert("Fill correct product name!", "danger");
            nameInput.focus();
            return;

        } else if (price_error != "") {
            showAlert("Fill correct product price!", "danger");
            priceInput.focus();
            return;

        } else if (img_error != "") {
            showAlert("Select correct product image!", "danger");
            fileInput.focus();
            return;
        }

        if (name == "") {
            showAlert("Fill the product name!", "danger");
            nameInput.focus();
            return;
        } else if (price == "") {
            showAlert("Fill the product price!", "danger");
            priceInput.focus();
            return;

        } else if (fileInput.value == "") {
            showAlert("Select the product image!", "danger");
            fileInput.focus();
            return;

        } else if (desc == "") {
            showAlert("Fill the product description!", "danger");
            descInput.focus();
            return;
        }


        if (!nameRegex.test(name) || !priceRegex.test(price) || desc.length === 0 || !imageData) {
            showAlert("Please fix errors before submitting", "danger");
            return;
        }
        const newProduct = {
            p_id: generateId(),
            p_img: imageData,
            p_name: name,
            p_desc: desc,
            p_price: price + "₹"
        };

        product_list.push(newProduct);
        localStorage.setItem("products", JSON.stringify(product_list));
        showAlert("Product Added Successfully!", "success");
        formReset();
        setTimeout(() => {
            goToHome();
        }, 1000);
    })
})

function generateId() {
    if (product_list.length === 0) return 1;
    const lastProduct = product_list[product_list.length - 1];
    return lastProduct.p_id + 1;
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

function formReset() {
    nameInput.value = ""
    priceInput.value = ""
    descInput.value = ""
    fileInput.value = ""
    previewImg.src = ""
    previewImg.classList.add("d-none")
}



