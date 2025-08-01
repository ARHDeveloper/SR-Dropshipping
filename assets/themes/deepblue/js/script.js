// pre loader
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
    setTimeout(() => {
        // preloader.style.cssText = `opacity: 0; visibility: hidden;`;
    }, 1000);
});

// active nav item
const navItem = document.getElementsByClassName("nav-link");
for (const element of navItem) {
    element.addEventListener("click", () => {
        for (const ele of navItem) {
            ele.classList.remove("active");
        }
        element.classList.add("active");
    });
}

// tab
const tabs = document.getElementsByClassName("tab");
const contents = document.getElementsByClassName("content");
for (const element of tabs) {
    const tabId = element.getAttribute("tab-id");
    const content = document.getElementById(tabId);
    element.addEventListener("click", () => {
        for (const t of tabs) {
            t.classList.remove("active");
        }
        for (const c of contents) {
            c.classList.remove("active");
        }
        element.classList.add("active");
        content.classList.add("active");
    });
}

$(document).ready(function () {
    // SKITTER SLIDER
    $(function () {
        $(".skitter-large").skitter({
            dots: true,
            interval: 3000,
            stop_over: false,
        });
    });

    $("#shareBlock").socialSharingPlugin({
        urlShare: window.location.href,
        description: $("meta[name=description]").attr("content"),
        title: $("title").text(),
    });



    // owl carousel
    $(".testimonials").owlCarousel({
        loop: true,
        margin: 25,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
            },
        },
    });
    // owl carousel
    $(".partners").owlCarousel({
        loop: true,
        margin: 25,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
    });
    // owl carousel
    $(".services").owlCarousel({
        loop: true,
        margin: 25,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });

    // AOS ANIMATION
    AOS.init();

    // COUNTER UP
    $(".counter").counterUp({
        delay: 10,
        time: 3000,
    });

    // SCROLL TOP
    $(".scroll-up").fadeOut();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".scroll-up").fadeIn();
        } else {
            $(".scroll-up").fadeOut();
        }
    });
});

/*********************/
// Shopping Cart JS
/*********************/

var shoppingCart = (function () {

    cart = [];

    // Constructor
    function Item(id, name, price, count, image, currency, quantity = null, attributes, attributesName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.image = image;
        this.currency = currency;
        this.quantity = quantity;
        this.attributes = attributes;
        this.attributesName = attributesName;

    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function (id, name, price, count, image = null, currency, quantity = null, attributes, attributesName) {

        var attempt = 0;
        for (var item in cart) {
            if (cart[item].name === name && JSON.stringify(cart[item].attributes) == JSON.stringify(attributes)) {
                if (quantity == null) {
                    cart[item].count++;
                    saveCart();
                    return;
                } else {
                    cart[item].count += parseInt(quantity);
                    saveCart();
                    return;
                }

            } else {
                var attempt = 0;
            }
        }


        if (attempt == 0 && quantity != null) {
            var item = new Item(id, name, price, count, image, currency, quantity, attributes, attributesName);
            var first = 1;
            for (var i = quantity; i > 0; i--) {
                if (first == 1) {
                    first = 0;
                    cart.push(item);
                    saveCart();
                } else {
                    shoppingCart.addItemToCart(id, name, price, 1, image, currency, null, attributes, attributesName);
                }
            }
        }

        if (quantity == null) {
            var item = new Item(id, name, price, count, image, currency, null, attributes, attributesName);
            cart.push(item);
            saveCart();
        }
    }
// Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
// Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

// Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

// Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

// Count cart
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

// Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
            if (cart[item].count === 0) {
                totalCart = 0;
                break;
            }
        }

        var total = `${Number(totalCart.toFixed(2))}`;
        return total;

    }

// List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();


// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();

    var id = $(this).data('id');
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var image = $(this).data('image');
    var currency = $(this).data('currency');
    var quantity = $(this).data('quantity');
    var attributes = $(this).data('attributes');
    var route = $(this).data('route');

    var attributesName = null;

    $.ajax({
        url: route,
        method: "get",
        data: {
            productId: id,
            attributeIds: attributes,
        },
        success: function (response) {
            attributesName = JSON.stringify(response.attributes);
            shoppingCart.addItemToCart(id, name, price, 1, image, currency, quantity, attributes, attributesName);
            displayCart();
            Notiflix.Notify.Success("Added to Cart");
        }
    });



});

// Clear items
$('.clear-cart').on('click', function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {

        var myString = cartArray[i].attributesName;
        let attributes = myString.replace(/[{}\"\[\]']+/g,'');
        let attributeName =  attributes.split(',').join(' ');

        output += `<li>
                       <a class="dropdown-item" href="javascript:void(0)">
                          <img src="${cartArray[i].image}" alt="" />
                          <div class="text">
                             <p>${cartArray[i].name}</p>
                             <span class="price">Price: ${cartArray[i].currency}${cartArray[i].price}</span> <br />
                             <span class="quantity">Qty: ${cartArray[i].count}</span><br>
                             <span class="attributesName">${attributeName}</span>
                             <button class="close delete-item" data-name="${cartArray[i].name}">
                                <i class="fal fa-times-circle"></i>
                             </button>
                          </div>
                       </a>
                    </li>`;
    }

    if (output.count === 0) {
        $('.total-count').html(0);
    } else {
        $('.total-count').html(shoppingCart.totalCount());
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());


}

// Delete item button
$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    Notiflix.Notify.Success("Remove from Cart");
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})

// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();
