Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">
    <div class="product-image">
      <a :href="link">
        <img v-bind:src="image">
      </a>
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="inStock">In Stock</p>
      <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
      <p v-else :class="{lineThrough: !inStock}">Out of Stock</p>
      <p>Shipping: {{shipping}}</p>
      <p v-if="onSale">On Sale!</p>
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
        :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
      </div>
      <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
      <div class="cart">
        <p>Cart({{cart}})</p>
      </div>
    </div>
  </div>`,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            // image: './vmSocks-green-onWhite.jpg',
            // inStock: true,
            link: 'https://www.bertrandshao.com/',
            // inventory: 100,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./vmSocks-blue-onWhite.jpg"
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart++
        },
        removeFromCart() {
            this.cart--
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return '$2.99'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
// var app = new Vue({
//     el: '#app',
    // data: {
    //     brand: 'Vue Mastery',
    //     product: 'Socks',
    //     selectedVariant: 0,
    //     // image: './vmSocks-green-onWhite.jpg',
    //     // inStock: true,
    //     link: 'https://www.bertrandshao.com/',
    //     // inventory: 100,
    //     onSale: true,
    //     details: ["80% cotton", "20% polyester", "Gender-neutral"],
    //     variants: [
    //         {
    //             variantId: 2234,
    //             variantColor: "green",
    //             variantImage: "./vmSocks-green-onWhite.jpg",
    //             variantQuantity: 10
    //         },
    //         {
    //             variantId: 2235,
    //             variantColor: "blue",
    //             variantImage: "./vmSocks-blue-onWhite.jpg"
    //         }
    //     ],
    //     cart: 0
    // },
    // methods: {
    //     addToCart() {
    //         this.cart++
    //     },
    //     removeFromCart() {
    //         this.cart--
    //     },
    //     updateProduct(index) {
    //         this.selectedVariant = index
    //     }
    // },
    // computed: {
    //     title() {
    //         return this.brand + ' ' + this.product
    //     },
    //     image() {
    //         return this.variants[this.selectedVariant].variantImage
    //     },
    //     inStock() {
    //         return this.variants[this.selectedVariant].variantQuantity
    //     }
    // }
// })