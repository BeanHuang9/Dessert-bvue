<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <!-- <h1 class="fs-4 mb-0">逼波波</h1> -->
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
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">後台登入</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />

  <!-- <div class="container py-3">
  </div> -->
</template>

<style lang="scss">
  .AlumarsLogo{ width: 200px;}
</style>
<script>
export default {
  data() {
    return {
      imgSrc: 'https://storage.googleapis.com/vue-course-api.appspot.com/beanhuang/1648104044842.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nE9yLegk7qbR%2FAvWVEHBbimFVQL%2FG8MvRjA90%2FenRv%2FMdrYIo23njGL1vn82F7BrrpZVKj7vPpcZ8pGWTvklo%2FPjiFWC80rxPgVOUGTvDFivIst%2Bts%2FrpozmiPTvPVLSGyq%2B%2BxL%2BquREzamxo7ZoYblPgsaFC16F%2FSmkK8ndYBThBJhKY0PtDmog3lGWOmmdO%2FDasVMwb2INs3hxjUkDbekCJaJaeOgdb5bbOyC65QbOoLs1ds6BrZFFQoyua8Q3DpmRYrc1jjTIFdJC5aEifKBi2aTfdxaqipi4%2FWhTqp5N8phMld7KYcnvaHk3zwTkGl%2Fe%2Bof1wz%2Bs5uznJfwt1Q%3D%3D',
    };
  },
};
</script>
