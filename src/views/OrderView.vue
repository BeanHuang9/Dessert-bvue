<template>
  <h2 class="text-center">結帳</h2>
  <div class="my-5 row justify-content-center">
    <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name" name="姓名" type="text" class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名" rules="required"
          v-model="orderForm.user.name"></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field id="email" name="email" type="email" class="form-control"
          :rules="{required: true, email: true}" placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors['email'] }" v-model="orderForm.user.email">
        </Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field id="tel" name="電話" type="text" class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          :rules="{required: true, min: 8}
          " placeholder="不需要輸入符號，例：01-2345678，請輸入成 012345678"
          v-model="orderForm.user.tel"></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field id="address" name="地址" type="text" class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址" rules="required"
          v-model="orderForm.user.address"></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <Field as="textarea" name="message" id="message"
          class="form-control" cols="30" rows="10"
          v-model="orderForm.message"></Field>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger"
          :disabled="!cartData.carts?.length">
          <span class="spinner-border spinner-border-sm" role="status"
            aria-hidden="true" v-if="isLoading"></span>
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: [],
      orderForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
    };
  },
  methods: {
    createOrder() {
      this.isLoading = true;
      this.$http.post(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
        { data: this.orderForm },
      ).then(() => {
        this.$refs.form.resetForm();
      }).catch((err) => {
        console.dir(err);
      }).then(() => {
        this.isLoading = false;
      });
    },
    getCart() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        }).catch((err) => {
          console.dir(err);
        });
    },
  },
  components: {
  },
  created() {
    this.getCart();
  },
};
</script>
