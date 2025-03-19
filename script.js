document.addEventListener("DOMContentLoaded", function () {
    const menu = {
        burgers: [
            { nome: "Hambúrguer Smash", preco: 14.90, imagem: "images/burger1.jpg", descricao: "Pão brioche, carne 160g, queijo prato e maionese da casa." },
            { nome: "Hambúrguer Bacon", preco: 22.90, imagem: "images/burger2.jpg", descricao: "Pão brioche, carne 160g, bacon, queijo prato e maionese da casa." }
        ],
        salgados: [
            { nome: "Hambúrguer Smash", preco: 14.90, imagem: "images/burger1.jpg", descricao: "Pão brioche, carne 160g, queijo prato e maionese da casa." },
            { nome: "Hambúrguer Bacon", preco: 22.90, imagem: "images/burger2.jpg", descricao: "Pão brioche, carne 160g, bacon, queijo prato e maionese da casa." }
        ],
        drinks: [
            { nome: "Coca-Cola", preco: 6.90, imagem: "images/coca-cola.jpg", descricao: "Lata 350ml" },
            { nome: "Guaraná Antarctica", preco: 5.90, imagem: "images/guarana.jpg", descricao: "Lata 350ml" }
            
        ]
    };

    const cart = [];
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const clearCartButton = document.getElementById("clearCart");
    const finalizeOrderButton = document.getElementById("finalizeOrder");

    function renderMenu(category, containerId) {
        const container = document.getElementById(containerId);
        menu[category].forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
            menuItem.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <strong>R$ ${item.preco.toFixed(2)}</strong>
                <input type="number" class="item-qty" min="1" value="1">
                <button class="add-to-cart" data-nome="${item.nome}" data-preco="${item.preco}">Adicionar ao Carrinho</button>
            `;
            container.appendChild(menuItem);
        });
    }

    renderMenu("burgers", "burgers");
    renderMenu("drinks", "drinks");

    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", function () {
            const nome = this.getAttribute("data-nome");
            const preco = parseFloat(this.getAttribute("data-preco"));
            const quantidade = parseInt(this.previousElementSibling.value);

            const itemIndex = cart.findIndex(item => item.nome === nome);
            if (itemIndex !== -1) {
                cart[itemIndex].quantidade += quantidade; // Atualiza a quantidade se o item já estiver no carrinho
            } else {
                cart.push({ nome, preco, quantidade });
            }

            atualizarCarrinho();
        });
    });

    function atualizarCarrinho() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.preco * item.quantidade;
            const li = document.createElement("li");
            li.innerHTML = `${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
                <button class="remove-item" data-index="${index}">❌</button>`;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = `R$ ${total.toFixed(2)}`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                atualizarCarrinho();
            });
        });
    }

    clearCartButton.addEventListener("click", function () {
        cart.length = 0;
        atualizarCarrinho();
    });

    finalizeOrderButton.addEventListener("click", function () {
        const paymentMethod = document.getElementById("paymentMethod").value;
        const customerName = document.getElementById("customerName").value;
        const customerAddress = document.getElementById("customerAddress").value;

        if (!customerName || !customerAddress || cart.length === 0) {
            alert("Preencha todas as informações e adicione itens ao carrinho!");
            return;
        }

        alert(`Pedido finalizado! \nCliente: ${customerName} \nEndereço: ${customerAddress} \nForma de pagamento: ${paymentMethod}`);
        cart.length = 0;
        atualizarCarrinho();
    });
});
