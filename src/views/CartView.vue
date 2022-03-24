<template>
<div class="container mt-5 my-5">
  <h2 class="fw-bold mt-5">我的購物車</h2>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button"
      :disabled="!cartData.carts?.length || isLoadingBtn.status === 'delCart'"
      @click="delAllCart">
      <i class="fas fa-spinner fa-pulse" v-show="isLoadingBtn.status === 'delCart'"></i>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
        v-if="isLoadingBtn.status === 'delCart'"
      ></span>
      清空購物車
    </button>
  </div>
  <table class="table align-middle mt-3">
    <thead>
      <tr>
        <th width="100"></th>
        <th width="200"></th>
        <th>品名</th>
        <th width="200">單價</th>
        <th class="text-center" style="width: 150px">數量/單位</th>
      </tr>
    </thead>
    <tbody>
      <tr v-show="!cartData.carts?.length">
        <td colspan="5" class="border-0 text-center text-muted py-5">
          購物車內沒有商品
        </td>
      </tr>
      <tr v-show="cartData.carts?.length" v-for="item in cartData.carts" :key="`cart_${item.id}`">
        <td class="text-center">
          <button type=" button" class="btn btn-outline-danger btn-sm" @click="delProduct(item)"
            :disabled="isLoadingBtn.id === item.product_id && isLoadingBtn.status === 'delProduct'">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
              v-if="isLoadingBtn.id === item.product_id && isLoadingBtn.status === 'delProduct'"
            ></span>
            <span v-else>x</span>
          </button>
        </td>
        <td>
          <img class="img-fluid" :src="item.product.imageUrl" alt="產品圖片">
        </td>
        <td>
          {{ item.product.title }}
        </td>
        <td>
          {{ item.product.price }}
        </td>
        <td>
          <div class="input-group">
            <input type="number" class="form-control text-center"
              :value="item.qty" @click="updateCart($event, item)">
              <span class="input-group-text" id="basic-addon2">
                {{ item.product.unit }}
              </span>
            </div>
          </td>
        </tr>
    </tbody>
    <tfoot v-show="cartData.carts?.length">
      <tr>
        <td colspan="4" class="text-end">總計</td>
        <td class="text-end">{{ cartData.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <div class="text-end">
    <router-link class="btn btn-danger fs-5 px-5"
      to="/order">結帳</router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      cartData: [],
      isLoadingBtn: {
        id: '',
        status: '',
      },
    };
  },
  methods: {
    getCart() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        }).catch((err) => {
          console.dir(err);
        });
    },
    delAllCart() {
      this.isLoadingBtn.status = 'delCart';
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(() => {
          this.getCart();
        }).catch((err) => {
          console.dir(err);
        }).then(() => {
          this.isLoadingBtn.status = '';
        });
    },
    delProduct(product) {
      this.isLoadingBtn.status = 'delProduct';
      this.isLoadingBtn.id = product.product_id;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${product.id}`)
        .then(() => {
          this.getCart();
        }).catch((err) => {
          console.dir(err);
        }).then(() => {
          this.isLoadingBtn = {
            status: '',
            id: '',
          };
        });
    },
    updateCart(e, product) {
      const cart = {
        data: {
          product_id: product.product_id,
          qty: parseInt(e.target.value, 10),
        },
      };
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${product.id}`, cart)
        .then(() => {
          this.getCart();
        }).catch((err) => {
          console.dir(err);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
