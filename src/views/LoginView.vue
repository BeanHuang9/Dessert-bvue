<template>
  <div class="row justify-content-center">
    <div class="footer-bottom col-md-6 mb-auto">
      <h2 class="text-center mb-4">登入</h2>
      <Form ref="form" v-slot="{ errors }" @submit="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
            :rules="{required: true, email: true}"
            :class="{ 'is-invalid': errors['email'] }"
            v-model="user.username"
            placeholder="請輸入 Email">
          </Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">密碼</label>
          <Field id="password" name="密碼" type="password" class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            rules="required"
            v-model="user.password"
            placeholder="請輸入密碼"
            autocomplete
          ></Field>
          <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
        </div>

        <span class="text-danger mb-4" v-if="isErr">Email 或是 密碼 不正確</span>
        <button type="submit" class="btn btn-primary w-100">
          <span class="spinner-border spinner-border-sm"
            role="status"  aria-hidden="true" v-if="isLoading"></span>
          登入
        </button>
      </Form>
    </div>
  </div>
  <p class="py-5 text-center text-muted">
    &copy; 2021~∞ - 六角學院
  </p>
</template>

<style>
.footer-bottom{
  min-height: calc(100vh - 120px - 56px);
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isErr: false,
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          this.isErr = false;
          const { token, expired } = res.data;
          document.cookie = `noodleShopToken=${token}; expires=${new Date(expired)};`;

          this.$router.push({
            name: 'AdminProducts',
          });
        }).catch((err) => {
          this.isErr = !err.response.data.success;
        }).then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
