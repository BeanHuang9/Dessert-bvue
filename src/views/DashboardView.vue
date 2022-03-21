<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <h1 class="fs-4 mb-0">逼波波</h1>
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

<script>
export default {
  data() {
    return {
      isLogin: false,
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
