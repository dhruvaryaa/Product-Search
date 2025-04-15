let products = [];
        const productsContainer = document.getElementById('products');
        const searchInput = document.getElementById('search');

        
        async function fetchProducts() {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                products = data.products;
                displayProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        
        function displayProducts(productsToShow) {
            productsContainer.innerHTML = '';
            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <p class="price">$${product.price}</p>
                `;
                productsContainer.appendChild(productCard);
            });
        }

        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });

        
        fetchProducts();