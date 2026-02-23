let deleteId = null;
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
        if (deleteId !== null) {
            product_list = filteredProducts.filter(product => product.p_id !== deleteId);
            localStorage.setItem("products", JSON.stringify(product_list));
            renderProducts();
            deleteId = null;
            const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"))
            modal.hide();
            showAlert("Product Deleted", "danger")
            renderProducts();
        }
    })
})
function openDeleteModal(id) {
    deleteId = id;
    const deleteModal = new bootstrap.Modal(
        document.getElementById("deleteModal")
    )
    deleteModal.show();
}

