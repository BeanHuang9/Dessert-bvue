<template>
  <h2>產品列表</h2>
  <div class="row row-cols-4 gy-4">
    <div class="col" v-for="product in productsData" :key="product.id">
      <div class="card">
        <div class="card-img-top ratio ratio-4x3 bg-cover"
          :style="`background-image: url('${product.imageUrl}')`">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-dark w-100"
            @click="getModalProduct(product)">查看更多</button>
        </div>
      </div>
    </div>
  </div>

  <productModal ref="productModalOuter" :product="product"></productModal>
</template>

<style lang="scss">
.card-img-top{
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.card-footer{
  background: #fff;
  border: none;
}
.btn:hover{
  opacity: 0.75;
}
</style>

<script>
import productModal from '@/components/CustomProductModal.vue';

export default {
  data() {
    return {
      productsData: [],
      product: {},
    };
  },
  methods: {
    getProducts() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsData = res.data.products;
        }).catch((err) => {
          console.dir(err);
        });
    },
    getModalProduct(product) {
      this.product = product;
      this.$refs.productModalOuter.showModal();
    },
  },
  components: {
    productModal,
  },
  created() {
    this.getProducts();
  },
};
</script>
