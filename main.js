Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: false
        },
        description: {
            type: String,
            required: false,
            default: 'No description'
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
      <p>{{showDescription}}<p>
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
        :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
      </div>
      <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
      <button v-on:click="removeFromCart">Remove from Cart</button>
      <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
        <p>{{review.name}}</p>
        <p>Rating: {{review.rating}}</p>
        <p>{{review.review}}</p>
        <p>Recommendations: {{review.recommend}}</p>
        </li>
      </ul>
    </div>
      <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.productReview
            this.reviews.push(productReview)
            console.log(this.reviews)
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
        },
        showDescription() {
            return this.description
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>
    <label for="recommend">Do you recommend this product?</label>
    <select id="recommend" v-model.number="recommend">
    <option>Yes</option>
    <option>No</option>
  </select>    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommendation required.")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        description: 'here\'s a description',
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            let index = this.cart.indexOf(id)
            this.cart.splice(index, 1)
        }
    }
})