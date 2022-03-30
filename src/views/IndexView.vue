<template>
  <!-- <h2>首頁</h2> -->
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="banner1" class="d-block w-100" alt="" />
        <div class="carousel-caption d-none d-md-block">
          <h3>Skateboarding isn’t a sport, it’s a lifestyle.</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="banner2" class="d-block w-100" alt="" />
        <div class="carousel-caption d-none d-md-block">
          <h3>Enjoy Skateboarding. Break all rules.</h3>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <div class="container py-3">
    <div class="d-flex bd-highlight">
      <div class="p-2 bd-highlight icon_box flex-grow-1 text-center align-items-center">
        <img :src="adicon1" class="d-block adicon" alt="" />
        <p>消費滿 $1000 - 超取免運<br />消費滿 $2000 - 宅配免運</p>
      </div>
      <div class="p-2 bd-highlight icon_box flex-grow-1 text-center align-items-center">
        <img :src="adicon2" class="d-block adicon" alt="" />
        <p>111.04.01 ～ 111.04.30<br />消費滿 $800 - <span>贈</span>收納袋</p>
      </div>
    </div>
  </div>
  <div class="container py-3">
    <div class="d-flex bd-highlight">
      <div class="p-2 bd-highlight adimgBox">
        <img :src="ad1" class="d-block w-100" alt="" />
        <div class="btncover">
          <a href="#/products" class="btn btn-outline-secondary">滑板推薦</a>
        </div>
      </div>
      <div class="p-2 bd-highlight adimgBox">
        <img :src="ad2" class="d-block w-100" alt="" />
        <div class="btncover">
          <a href="#/qa" class="btn btn-outline-secondary">常見問題</a>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5 my-5">
    <div class="row row-cols-4 gy-4">
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
            <button type="button" class="btn btn-secondary w-100"
              @click="getModalProduct(product)">查看更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="parallax">
    <div class="caption">
      <span class="captionCont">滑板文化從1950年代至2020年，發展至今日已是價值數十億美元的產業，其透過一種既是藝術也是運動的形式，
        影響著全球數以百萬人的生計。就其自身歷史，滑板也擁有展現文化脈絡的博物館、授予人們榮耀的名人堂、規劃有據可查的歷史紀事，鞏固這自由文化核心的特別之處。
      </span>
    </div>
  </div>
  <productModal ref="productModalOuter" :product="product"></productModal>

  <FooterView></FooterView>
</template>

<style lang="scss">
.carousel-caption h3{     font-size: 2rem;
    letter-spacing: 1px;
    font-weight: 400;}
.adimgBox {position: relative; width: 100%; height: 100%;}
.adimgBox .adimgBox .btncover {
  background: rgba(57, 63, 88, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  transition: all .2s linear;
  width: 100%;
  opacity: 0;
}
.adimgBox .btncover .btn{    background: none;
    color: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;font-size: 24px; border: 1px solid #fff;
}
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

.card-text.descriptionBox{
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.icon_box .adicon {
  width: 130px; color: #fff; padding: 10px; margin: 0px auto;
}
.parallax {
  background-image: url('https://images.unsplash.com/photo-1617034840325-b10d81550042?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'); min-height: 500px; background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; position: relative;
}
.caption {
  position: absolute; left: 15%; top: 40%; width: 75%; text-align: justify; color: #000;
  background-color: rgb(100 100 100 / 62%);

  & span.captionCont { color: #fff; padding: 18px; font-size: 22px; letter-spacing: 4px;
  line-height: 2.5rem; }

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
      copyright: '僅供學習用無任何商業用途',
      year: new Date().getFullYear(),
      banner1:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648106563073.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DdJ3qHA9IRdpARt0%2B%2FGDtxMkWXNohK8TbMF0uf9eXjdQM%2BDhusqjKppss27zuCZTFt7cTTgo991YDqc%2BKwX%2F9zDnDTn5GtPds%2F63Zm8dntzt0Hn7U7UatBSYOIXsUA%2F%2BCx55Cssmh9pmVNPNLW2LIgoi9Gcthni%2FQjZ1IjsI3PnkOD3irp5XvAP%2BeA8OGqfFdwnHxRnDLUPQeqJ9rKXCJ4KCyX7PzN%2BHAMAeA2DTNVa6yGx8mimB%2F9%2BRoSXabfFnGtP503y2mq3%2BiVeqDrrFa%2BzT0ET7fjBTaGybbFmjhUeOwOmC%2F2Z6S%2BxQbWl2vCPLTphuC7qQ4b%2BkSQ5ihXjuEg%3D%3D',
      banner2:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648106587135.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=EbHvCE5OkY7CZ3BQYhJ%2BkWntVSoPXrFyYAtJ2%2Brl0FqFYbXJFXJOOlS5aUbg1RAOAin6adXV06V9IoI14J8cMG5i4PC%2FpU3AK%2F3je0N%2BE51uewTRqnxBtgASTYQtmR8Y3qc6Dm1KoFjJEl3pb4icdOTLX%2F3xs5zbuUYMsgpGx28%2Fh2EbtPT8wrSIQGXZLkVSpDtkEGKCOWsDqZdbllZ90rpbTTVGIo8O9kTBesQwhOMDqt8Ls7224XrfZvVMfuKX6W%2FmpK%2FPyZ9HBs%2FXzx%2Bnw%2FC1gaEvQOilJWzfMb2Jf1QuhbBtycP7VWWn3a9b5to5c1PidAUG7FXsTAgLXRICeg%3D%3D',
      ad1:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648641334962.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SUUIeFtvNTC4nLkDO7tR0h4NP596TrqCh52nUJo%2FZaP52A%2BW40K%2FJmXyLC60xdCGLBs7FnjbEhTGaC%2FArH4gTsoEuTw848jq5r%2FKr8CPIzxxoz1DVsrqmAY2ON1cTrjTkmWJY2E1fe8FGfnC12NCNju27XSq7EzLBcK%2FGUAqv4XrxCqKRMbqjLQz2Cvg%2FWbYxAH%2BBAPbpo9XO3qsvyLTDrKvyBhjmYA6F9Z8XjaKb0X0KC1PBbQr8A0rNY6oIzbsTZwU9Zs07fnOh5r6XUPprsAM5WJQ7kLTCKeR8frjJTO7%2BrSUIPquGHqlIRumNdKVYCyQyo5HgIsq2UqDfuRN3A%3D%3D',
      ad2:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648653692738.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UAE2VsYHBxUKZHAab%2FcIA6K9FOVWpPZB9Kit%2BFcMcCPgExNRc6ZzGlTXhSWIz5vP9H5ZARXfTAtOu3EzFWttlVDQj%2FJsd89jHqGtpRsCrJLqp14k08Lc5jKMazw9D6GLiQunXh4Ueo7rHHq7LLF2dU4N490VUaf5mor0b0ucsHOoUDuX61VgtmOZJvynJKpuJpIgVnUPRktihGu3nIsmdAd0AUwp3raZO75k%2B9sMOh3Ug0IoFNtzKeb7OzGNcp0RKkfPaIKPWUtGcERGi75c9ZM85EHbCsD7Z0vS7I7x%2Fm0tJvDUatyzPAio9eeALpORlNnfx60%2BtSUWZtyZ01MXCg%3D%3D',
      adicon1:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648114943714.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=L3YQCgcWdZUF2O8XQNg7boAtbQA6eccewqxg5E6dn4hOqR0%2B68DMQa68%2B4t1jvXeF4s3PI585KOl422cEJIm1o8seVLUyU4FOiiYqUb4rivHiKJbgD5n1Aurqsi7w6UDnWN7zRHzU92KTVB83XHHlENdjjlYRqRBRyZpLfKEwa4gh1RAAVcrt%2BgH21UHXNSj1mZ1YXbUeSNehueJNKmoqYtPitMYmZHsZ0HobtUGlmAMigOgce21t0NDrXGdHlCizl%2B%2BYm51frpyIsEHSZ1vnmxaxmcffROJ2dxVANkcje9FDEoBweAAyRjR1MOtEsxE8%2FPumZOl1Ir0W8jpsJuEvA%3D%3D',
      adicon2:
        'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648115723436.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PAYJKfo1amSF6RK00jA2443KR1Uqs4Mw80gsSrnEyQMObjDCqVUBuL7GOvUJ%2BPM5jDPQOnlxV9Of1kFjxx2AuM1IEmjYEkH8ajcB0utKOc%2Ft%2BUnwv5gSNgAljF2v3%2FKw%2BHSRL7LxVW2f0L7hBXHdziCovcW%2BpcVt0lzkRJaqKIgs2ZyKqUL5PUN5vZMYqE23xOlxaX1mlCtDw22qd6K2rTy%2FoK4ykLt1OuXRB2eueDakR4llo20Fc0laGMBEcZ3SVmSugqkRxl7IjAnx6%2FdHbnbqb9mk6eaB5UiDeS7%2FSgw4vmDugsIG%2BW9UO4RCF7ymIGXhAzONML8lYJtQARwOdg%3D%3D',
    };
  },
  methods: {
    getProducts() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          // this.productsData = res.data.products.filter((item, index) => index < 4);
          // console.log(res.data.products);
          const tempArr = res.data.products;
          for (let i = 0; i < 4; i += 1) {
            const index = Math.floor(Math.random() * tempArr.length);
            this.productsData.push(tempArr[index]);
            tempArr.splice(index, 1);
          }
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
  mounted() {
    this.getProducts();
  },
};
</script>
