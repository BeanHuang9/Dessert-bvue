<template>
  <div class="modal fade" id="productModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="productModalInner">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="產品圖片">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5" v-if="!product.origin_price">{{ product.price }} 元</div>
              <template v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </template>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" max="10" v-model.number="qty">
                  <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="isLoading"
                    @click="addCart(product.id)">
                    <span class="spinner-border spinner-border-sm"
                      role="status" aria-hidden="true"
                      v-if="isLoading"></span>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: {},
      qty: 1,
      cartData: [],
      isLoading: false,
    };
  },
  props: ['product'],
  methods: {
    showModal() {
      this.modal.show();
      this.qty = 1;
    },
    hideModal() {
      this.modal.hide();
    },
    getCart() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        }).catch((err) => {
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

      const product = this.cartData.carts.find((item) => item.product_id === id);
      if (product) {
        cart.data.qty += product.qty;
      }

      this.isLoading = true;
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, cart)
        .then(() => {
          this.hideModal();
        }).catch((err) => {
          console.dir(err);
        }).then(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModalInner);
    this.getCart();
  },
};
</script>
