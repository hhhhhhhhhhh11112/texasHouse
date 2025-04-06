let cart = [];
        let itemToAdd = null;
        let couponApplied = false;

        // Show selected category
        function showCategory(category) {
            document.querySelectorAll('.items').forEach(item => item.classList.remove('visible'));
            document.getElementById(category).classList.add('visible');
        }

        // Event delegation for item clicks
        document.querySelectorAll('.grid').forEach(grid => {
            grid.addEventListener('click', (event) => {
                const item = event.target.closest('.item');
                if (item) {
                    const name = item.getAttribute('data-name');
                    const price = parseFloat(item.getAttribute('data-price'));
                    askConfirmation(name, price);
                }
            });
        });

        // Ask for confirmation before adding item to cart
        function askConfirmation(name, price) {
            itemToAdd = { name, price };
            const message = `Do you want to add ${name} to your cart for $${price}?`;
            document.getElementById('confirmation-message').textContent = message;
            document.getElementById('confirmation-modal').style.display = 'flex';
        }

        // Confirm adding item to cart
        function confirmAdd() {
            if (itemToAdd) {
                cart.push(itemToAdd);
                updateCart();
                closeModal();
            }
        }

        // Close the modal
        function closeModal() {
            document.getElementById('confirmation-modal').style.display = 'none';
            itemToAdd = null;
        }

        // Update the cart UI
        function updateCart() {
            const cartList = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');
            const cartCount = document.getElementById('cart-count');
            cartList.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                const li = document.createElement('li');
                li.innerHTML = `${item.name} - $${item.price} <button class="remove-button" onclick='removeItem(${index})'>Remove</button>`;
                cartList.appendChild(li);
            });
            totalElement.textContent = total;
            cartCount.textContent = cart.length;
        }

        // Remove item from cart
        function removeItem(index) {
            cart.splice(index, 1);
            updateCart();
        }

        // Clear the cart
        function clearCart() {
            cart = [];
            couponApplied = false; // Reset coupon status
            updateCart();
            document.getElementById('coupon').value = ''; // Clear coupon code input
            document.getElementById('message').textContent = ''; // Clear message
        }

        // Toggle cart visibility
        function toggleCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
        }

        // Close cart when clicking outside
        window.addEventListener('click', (event) => {
            const cartDiv = document.getElementById('cart');
            if (cartDiv.style.display === 'block' && !cartDiv.contains(event.target) && !event.target.matches('.cart-button')) {
                cartDiv.style.display = 'none';
            }
        });

        // Handle checkout
        function checkout() {
            const couponCode = document.getElementById('coupon').value;
            let total = parseFloat(document.getElementById('total').textContent);

            // Apply coupon if valid
            if (couponCode === 'DISCOUNT10' && !couponApplied) {
                total *= 0.9; // Apply 10% discount
                couponApplied = true;
                document.getElementById('message').textContent = 'Coupon applied! Discount: 10%';
                document.getElementById('message').classList.remove('error');
            } else if (couponCode !== '' && couponApplied) {
                document.getElementById('message').textContent = 'Coupon can only be used once per purchase.';
                document.getElementById('message').classList.add('error');
                return;
            } else if (couponCode === '') {
                document.getElementById('message').textContent = '';
            }

            // Final purchase and cart clear
            alert(`Purchase complete! Total: $${total.toFixed(2)}`);
            clearCart(); // Clear cart after purchase
        }