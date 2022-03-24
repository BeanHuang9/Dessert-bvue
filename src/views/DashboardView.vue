<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img :src="imgSrc" class="AlumarsLogo" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              訂單
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">
              優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="../"> 回前台 </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container py-3">
    <router-view v-if="isLogin" />
  </div>
</template>

<style lang="scss">
  .AlumarsLogo{ width: 200px;}
</style>
<script>
export default {
  data() {
    return {
      isLogin: false,
      imgSrc: 'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648105113091.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mVLZzu1AaJX2pEKbx59Nyutx52Nm0NelVji4nj5eXt0R99P%2B%2FJgN77w0rJLY5j71JIgv3MkYb7NaeZ%2B0JnFACDZGSAZx36TnKmxECDFgphia7bc1WUnX3t4blRYEvOWysOTPPc78ZM0ZFVVqw8NkfgnDIP%2FST6inH2HvGFolZ%2B34bxNJNTo0mBuedUhocCkxp5ls5V2m407aGNlbT1G2ngBcGdelNNx91ZWuDmyAa5ZYvQhyTonBSNWJ75Z8B8c02%2Fpeu9z%2BEAq3wdxqCqio1oIVhnGMCmwqLkAlwrDrE2oiQ5kQGpE6%2F9meRd8H2nJv2HrtQTj8sGKCTMV0oLfiyA%3D%3D',
    };
  },
  methods: {
    checkLogin(token) {
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        const api = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http.post(api, { token })
          .then(() => {
            this.isLogin = true;
          }).catch((err) => {
            alert(err.data.message); // eslint-disable-line
            this.$router.push({
              name: 'Login',
            });
          });
      } else {
        alert('請登入帳號。'); // eslint-disable-line
        this.$router.push({
          name: 'Login',
        });
      }
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)noodleShopToken\s*\=\s*([^;]*).*$)|^.*$/, // eslint-disable-line
      '$1',
    );
    this.checkLogin(token);
  },
};
</script>
