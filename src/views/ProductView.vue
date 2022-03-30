<template>
  <div class="container mt-5">
    <template v-if="product.category">
      <!-- <div class="card mb-3 text-center">
        <div>
          <img
            :src="product.imageUrl"
            class="card-img-top primary-image img-fluid"
            style="width: 200px; height: 200px; object-fit: cover"
            alt="主圖"
          />
        </div>
        <div class="card-body">
          <h3 class="card-title">
            {{ product.title }}
            <span class="badge bg-primary ms-2">{{ product.category }}</span>
          </h3>
          <p><span class="fs-4">商品描述：</span> <br />{{ product.description }}</p>
          <p><span class="fs-4">商品內容：</span> <br />{{ product.content }}</p>
          <div class="d-flex justify-content-center">
            <p class="card-text me-2">{{ product.price }}</p>
            <p class="card-text text-secondary">
              <del>{{ product.origin_price }}</del>
            </p>
            {{ product.unit }} / 元
          </div>
          <div>
            <button type="button" class="btn btn-secondary" @click="$router.back">返回</button>
          </div>
        </div>
      </div> -->

      <div class="row">
        <div class="col-sm-6">
          <img class="img-fluid" :src="product.imageUrl" alt="產品圖片" />
        </div>
        <div class="col-sm-6">
          <h2>{{ product.title }}</h2>
          <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
          <p>商品描述：{{ product.description }}</p>
          <p>商品內容：{{ product.content }}</p>
          <div class="h5" v-if="!product.origin_price">{{ product.price }} 元</div>
          <template v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5" style="color: #ff3f3f;">現在只要 {{ product.price }} 元</div>
          </template>
          <div>
            <div class="input-group">
              <input type="number" class="form-control" min="1" max="10" v-model.number="qty" />
              <button
                type="button"
                class="btn btn-primary"
                :disabled="isLoading"
                @click="addCart(product.id)"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading"
                ></span>
                加入購物車
              </button>
            </div>
          </div>
          <div class="mt-3">
            <button type="button" class="btn btn-secondary" @click="$router.back">返回</button>
          </div>
        </div>
        <!-- col-sm-6 end -->
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      qty: 1,
      cartData: [],
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      console.log(this.$route);
      const { id } = this.$route.params;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        });
    },
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    addCart(id) {
      const cart = {
        data: {
          product_id: id,
          qty: this.qty,
        },
      };

      this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, cart)
        .then(() => {
          this.isLoading = false;
          // alert('已成功')
          /* eslint-disable */
          alert('已成功');
          /* eslint-enable */
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
