/* =========================================================
   SANWALIYA
   Mobile & Technology Store
   FINAL FRONTEND JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. GLOBAL DATA
   ========================================================= */

/*
    Get previously saved cart from localStorage.

    If old/invalid cart data exists, start with an empty cart.
*/

let cart = [];

try {
    const savedCart = localStorage.getItem("sanwaliyaCart");

    cart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.error("Could not load cart:", error);

    cart = [];
}


/*
    Slider state
*/

let currentSlide = 0;
let sliderInterval = null;


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

/* Navigation */

const menuButton =
    document.querySelector(".menu-button");

const navLinks =
    document.querySelector(".nav-links");


/* Products dropdown */

const dropdown =
    document.querySelector(".dropdown");

const dropdownToggle =
    document.querySelector(".dropdown-toggle");


/* Search */

const searchBox =
    document.querySelector(".search-box");

const searchInput =
    document.querySelector(".search-box input");


/* Cart */

const cartCount =
    document.querySelector(".cart-count");

const cartSection =
    document.querySelector("#cart");

const cartContainer =
    cartSection
        ? cartSection.querySelector(".cart-container")
        : null;


/* Slider */

const slides =
    document.querySelectorAll(".hero-slide");

const sliderDots =
    document.querySelectorAll(".slider-dot");

const previousButton =
    document.querySelector(".slider-prev");

const nextButton =
    document.querySelector(".slider-next");

const heroSection =
    document.querySelector(".hero-section");


/* Product cards */

const productCards =
    document.querySelectorAll(".product-card");


/* Navigation links */

const navigationLinks =
    document.querySelectorAll(".nav-link");


/* =========================================================
   3. HELPER FUNCTIONS
   ========================================================= */


/*
    Format numbers into Indian Rupee format.

    Example:

    49999
    becomes
    ₹49,999
*/

function formatPrice(price) {

    const numericPrice =
        Number(price) || 0;

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(numericPrice);
}


/*
    Convert product price text into a number.

    Examples:

    ₹49,999       → 49999
    ₹1,29,999     → 129999
    49999         → 49999
*/

function getNumericPrice(priceText) {

    if (typeof priceText === "number") {
        return priceText;
    }

    if (!priceText) {
        return 0;
    }

    const cleanedPrice =
        String(priceText)
            .replace(/[^0-9.]/g, "");

    return Number(cleanedPrice) || 0;
}


/*
    Save cart to browser storage.
*/

function saveCart() {

    localStorage.setItem(
        "sanwaliyaCart",
        JSON.stringify(cart)
    );
}


/* =========================================================
   4. MOBILE NAVIGATION
   ========================================================= */

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/*
    Close mobile navigation after clicking a normal nav link.
*/

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 850) {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        }

    });

});


/* =========================================================
   5. PRODUCTS DROPDOWN
   ========================================================= */

if (dropdown && dropdownToggle) {

    dropdownToggle.addEventListener(
        "click",
        event => {

            /*
                Desktop:
                CSS hover handles dropdown.

                Mobile:
                JavaScript handles click.
            */

            if (window.innerWidth <= 850) {

                event.preventDefault();

                dropdown.classList.toggle("active");

                const isOpen =
                    dropdown.classList.contains("active");

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }

        }
    );

}


/*
    Close dropdown when clicking outside.
*/

document.addEventListener("click", event => {

    if (!dropdown) {
        return;
    }

    if (
        window.innerWidth <= 850 &&
        !dropdown.contains(event.target)
    ) {

        dropdown.classList.remove("active");

        if (dropdownToggle) {

            dropdownToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* =========================================================
   6. HERO SLIDER
   ========================================================= */

function showSlide(index) {

    if (!slides.length) {
        return;
    }


    /*
        Keep index within valid range.
    */

    if (index >= slides.length) {

        currentSlide = 0;

    }

    else if (index < 0) {

        currentSlide =
            slides.length - 1;

    }

    else {

        currentSlide = index;

    }


    /*
        Remove active state.
    */

    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    sliderDots.forEach(dot => {

        dot.classList.remove("active");

    });


    /*
        Activate current slide.
    */

    slides[currentSlide]
        .classList.add("active");


    /*
        Activate current dot.
    */

    if (sliderDots[currentSlide]) {

        sliderDots[currentSlide]
            .classList.add("active");

    }

}


/*
    Next slide.
*/

function nextSlide() {

    showSlide(currentSlide + 1);

}


/*
    Previous slide.
*/

function previousSlide() {

    showSlide(currentSlide - 1);

}


/*
    Start automatic slider.
*/

function startSlider() {

    if (slides.length <= 1) {
        return;
    }

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {

        nextSlide();

    }, 5000);

}


/*
    Restart automatic slider.
*/

function restartSlider() {

    clearInterval(sliderInterval);

    startSlider();

}


/*
    Next button.
*/

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();

        restartSlider();

    });

}


/*
    Previous button.
*/

if (previousButton) {

    previousButton.addEventListener("click", () => {

        previousSlide();

        restartSlider();

    });

}


/*
    Slider dots.
*/

sliderDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartSlider();

    });

});


/*
    Pause slider while mouse is over it.
*/

if (heroSection) {

    heroSection.addEventListener(
        "mouseenter",
        () => {

            clearInterval(sliderInterval);

        }
    );


    heroSection.addEventListener(
        "mouseleave",
        () => {

            startSlider();

        }
    );

}


/*
    Initialize slider.
*/

showSlide(0);

startSlider();


/* =========================================================
   7. PRODUCT SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();


            productCards.forEach(card => {

                const productName =
                    card.querySelector(
                        ".product-name"
                    )?.textContent
                        .toLowerCase() || "";


                const productCategory =
                    card.dataset.category
                        ?.toLowerCase() || "";


                const productBrand =
                    card.dataset.brand
                        ?.toLowerCase() || "";


                const productText =
                    card.textContent
                        .toLowerCase();


                const matches =
                    searchTerm === "" ||
                    productName.includes(searchTerm) ||
                    productCategory.includes(searchTerm) ||
                    productBrand.includes(searchTerm) ||
                    productText.includes(searchTerm);


                card.style.display =
                    matches
                        ? ""
                        : "none";

            });

        }
    );

}


/*
    Search form.

    This is frontend-only, so we prevent page reload.
*/

if (searchBox) {

    searchBox.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            if (!searchInput) {
                return;
            }


            const searchTerm =
                searchInput.value.trim();


            if (!searchTerm) {

                searchInput.focus();

                return;

            }


            const productsSection =
                document.querySelector(
                    "#smartphones"
                );


            if (productsSection) {

                productsSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

}


/* =========================================================
   8. ADD PRODUCT TO CART
   ========================================================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const productCard =
                button.closest(".product-card");


            if (!productCard) {
                return;
            }


            /*
                Product name.
            */

            const productName =
                productCard.querySelector(
                    ".product-name"
                )?.textContent
                    .trim();


            /*
                Product price.
            */

            const priceElement =
                productCard.querySelector(
                    ".product-price"
                );


            const priceText =
                priceElement?.textContent
                ?.trim() || "0";


            /*
                Convert price into a number.
            */

            const price =
                getNumericPrice(priceText);


            /*
                Product image.
            */

            const productImage =
                productCard.querySelector(
                    "img"
                )?.src || "";


            /*
                Product ID.

                If data-id does not exist,
                use product name.
            */

            const productId =
                productCard.dataset.id ||
                productName;


            if (!productName) {

                console.error(
                    "Product name not found."
                );

                return;

            }


            /*
                Check whether product already
                exists in cart.
            */

            const existingProduct =
                cart.find(
                    item =>
                        item.id === productId
                );


            if (existingProduct) {

                existingProduct.quantity += 1;

            }

            else {

                cart.push({

                    id: productId,

                    name: productName,

                    price: price,

                    image: productImage,

                    quantity: 1

                });

            }


            /*
                Save cart.
            */

            saveCart();


            /*
                Update cart number.
            */

            updateCartCount();


            /*
                Re-render cart.
            */

            renderCart();


            /*
                Button feedback.
            */

            const originalText =
                button.textContent;


            button.textContent =
                "Added ✓";


            button.classList.add("added");


            setTimeout(() => {

                button.textContent =
                    originalText;

                button.classList.remove(
                    "added"
                );

            }, 1500);

        }
    );

});


/* =========================================================
   9. CART COUNT
   ========================================================= */

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    cartCount.textContent =
        totalItems;

}


/* =========================================================
   10. CART PRICE TOTALS
   ========================================================= */

function calculateCartTotals() {

    const subtotal =
        cart.reduce(
            (total, item) => {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 0;

                return total +
                    (price * quantity);

            },
            0
        );


    /*
        Free shipping for orders
        of ₹999 or more.

        Otherwise ₹99.
    */

    const shipping =
        subtotal === 0
            ? 0
            : subtotal >= 999
                ? 0
                : 99;


    const grandTotal =
        subtotal + shipping;


    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    return {

        subtotal,

        shipping,

        grandTotal,

        totalItems

    };

}


/* =========================================================
   11. RENDER CART
   ========================================================= */

function renderCart() {

    if (!cartContainer) {
        return;
    }


    /*
        Empty cart.
    */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to your cart
                    and they will appear here.
                </p>

                <a
                    href="#smartphones"
                    class="btn btn-primary">
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    /*
        Calculate totals.
    */

    const totals =
        calculateCartTotals();


    /*
        Create cart items.

        IMPORTANT:
        The HTML is inside backticks.
        This is required for JavaScript
        template literals.
    */

    const cartItemsHTML =
        cart.map(
            (item, index) => `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${item.image || ""}"
                            alt="${item.name || "Product"}"
                        >

                    </div>


                    <div class="cart-item-details">

                        <h3>
                            ${item.name || "Product"}
                        </h3>

                        <p class="cart-item-price">

                            ${formatPrice(
                                Number(item.price) || 0
                            )}

                        </p>


                        <div class="cart-quantity">

                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="changeQuantity(${index}, -1)"
                                aria-label="Decrease quantity">
                                −
                            </button>


                            <span>
                                ${Number(item.quantity) || 0}
                            </span>


                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="changeQuantity(${index}, 1)"
                                aria-label="Increase quantity">
                                +
                            </button>

                        </div>

                    </div>


                    <div class="cart-item-total">

                        ${formatPrice(
                            (Number(item.price) || 0) *
                            (Number(item.quantity) || 0)
                        )}

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                        onclick="removeFromCart(${index})"
                        aria-label="Remove ${item.name}">
                        ×
                    </button>

                </div>

            `
        ).join("");


    /*
        Complete cart.
    */

    cartContainer.innerHTML = `

        <div class="cart-items">

            ${cartItemsHTML}

        </div>


        <div class="cart-summary">

            <div class="summary-row">

                <span>
                    Items (${totals.totalItems})
                </span>

                <strong>
                    ${formatPrice(totals.subtotal)}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Shipping
                </span>

                <strong>

                    ${
                        totals.shipping === 0
                            ? "FREE"
                            : formatPrice(
                                totals.shipping
                            )
                    }

                </strong>

            </div>


            ${
                totals.shipping === 0 &&
                totals.subtotal > 0
                    ? `
                        <p class="shipping-message">
                            You have unlocked free shipping.
                        </p>
                    `
                    : ""
            }


            <div class="summary-divider"></div>


            <div class="summary-row total-row">

                <span>
                    Grand Total
                </span>

                <strong>
                    ${formatPrice(
                        totals.grandTotal
                    )}
                </strong>

            </div>


            <button
                type="button"
                class="btn btn-primary checkout-btn"
                onclick="checkoutMessage()">

                Proceed to Checkout

            </button>

        </div>

    `;

}


/* =========================================================
   12. CHANGE QUANTITY
   ========================================================= */

function changeQuantity(index, change) {

    if (!cart[index]) {
        return;
    }


    /*
        Make sure quantity is a number.
    */

    cart[index].quantity =
        Number(cart[index].quantity) || 1;


    /*
        Change quantity.
    */

    cart[index].quantity += change;


    /*
        Remove product if quantity becomes zero.
    */

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    /*
        Save updated cart.
    */

    saveCart();


    /*
        Update UI.
    */

    updateCartCount();

    renderCart();

}


/* =========================================================
   13. REMOVE PRODUCT
   ========================================================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   14. CHECKOUT
   ========================================================= */

function checkoutMessage() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const totals =
        calculateCartTotals();


    alert(

        "Checkout is ready for backend integration.\n\n" +

        "Items: " +
        totals.totalItems +

        "\nSubtotal: " +
        formatPrice(totals.subtotal) +

        "\nShipping: " +
        (
            totals.shipping === 0
                ? "FREE"
                : formatPrice(totals.shipping)
        ) +

        "\nGrand Total: " +
        formatPrice(totals.grandTotal)

    );

}


/* =========================================================
   15. WISHLIST
   ========================================================= */

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");


wishlistButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            button.classList.toggle("active");


            const isActive =
                button.classList.contains(
                    "active"
                );


            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );


            /*
                Change heart symbol.

                Only change it if the button
                actually contains a heart.
            */

            if (
                button.textContent.includes("♡") ||
                button.textContent.includes("♥")
            ) {

                button.textContent =
                    isActive
                        ? "♥"
                        : "♡";

            }

        }
    );

});


/* =========================================================
   16. NEWSLETTER FORM
   ========================================================= */

const newsletterForm =
    document.querySelector(
        ".newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    'input[type="email"]'
                );


            if (
                !emailInput ||
                !emailInput.value.trim()
            ) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            alert(
                "Thank you! You have successfully subscribed to Sanwaliya."
            );


            newsletterForm.reset();

        }
    );

}


/* =========================================================
   17. CONTACT FORM
   ========================================================= */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const requiredInputs =
                contactForm.querySelectorAll(
                    "input[required], textarea[required], select[required]"
                );


            let isValid = true;


            requiredInputs.forEach(input => {

                if (!input.value.trim()) {

                    isValid = false;

                    input.focus();

                }

            });


            if (!isValid) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            alert(
                "Thank you! Your message has been received."
            );


            contactForm.reset();

        }
    );

}


/* =========================================================
   18. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {

                return;

            }


            /*
                Let the Products dropdown
                work normally on mobile.
            */

            if (
                link.classList.contains(
                    "dropdown-toggle"
                ) &&
                window.innerWidth <= 850
            ) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


            /*
                Close mobile navigation.
            */

            if (
                navLinks &&
                window.innerWidth <= 850
            ) {

                navLinks.classList.remove(
                    "active"
                );

            }

        }
    );

});


/* =========================================================
   19. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;


        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   20. ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        /*
            Close mobile menu.
        */

        if (navLinks) {

            navLinks.classList.remove(
                "active"
            );

        }


        /*
            Close dropdown.
        */

        if (dropdown) {

            dropdown.classList.remove(
                "active"
            );

        }


        if (dropdownToggle) {

            dropdownToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   21. WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            If user changes from mobile
            to desktop, reset mobile menu.
        */

        if (window.innerWidth > 850) {

            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );

            }


            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   22. INITIALIZE CART
   ========================================================= */

updateCartCount();

renderCart();

updateActiveNavigation();


/* =========================================================
   23. FINAL MESSAGE
   ========================================================= */

console.log(
    "Sanwaliya frontend JavaScript loaded successfully."
);