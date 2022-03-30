<template>
<div class="container mt-5 my-5">
  <h2>產品列表</h2>
  <div class="row row-cols-4 gy-4 mt-3">
    <div class="col-6 col-lg-3" v-for="product in productsData" :key="product.id">
      <div class="card">
        <div class="card-img-top ratio ratio-1x1 bg-cover"
          :style="`background-image: url('${product.imageUrl}')`">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text descriptionBox">{{ product.description }}</p>
        </div>
        <div class="card-footer">
          <!-- <button type="button" class="btn btn-dark w-100"
            @click="getModalProduct(product)">查看更多</button> -->
            <router-link :to="`/product/${product.id}`" class="btn btn-secondary btnfull">
              查看更多
            </router-link>

        </div>
      </div>
    </div>
  </div>
  <productModal ref="productModalOuter" :product="product"></productModal>
</div>
<FooterView></FooterView>

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
.btn.btnfull{ width: 100%;}
.btn:hover{
  opacity: 0.75;
}

.card-text.descriptionBox{
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

<script>
import productModal from '@/components/CustomProductModal.vue';
import FooterView from '@/components/FooterView.vue';

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
          // const tempArr = res.data.products;
          // for (let i = 0; i < 12; i += 1) {
          //   const index = Math.floor(Math.random() * tempArr.length);
          //   this.productsData.push(tempArr[index]);
          //   tempArr.splice(index, 1);
          // }
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
    FooterView,
  },
  created() {
    this.getProducts();
  },
};
</script>
