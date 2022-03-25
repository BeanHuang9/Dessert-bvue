<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
      建立新的優惠券
    </button>
  </div>
  <table class="table table-hover mt-4">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">名稱</th>
        <th scope="col">折扣百分比</th>
        <th scope="col">到期日</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, id) in coupon" :key="id">
        <th scope="row"></th>
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ item.due_date }}</td>
        <td>
          <div v-if="item.is_enabled === 1">啟用</div>
          <div v-else>未啟用</div>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DeleteProductModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"></DeleteProductModal>
  <PaginationView
    class="d-flex justify-content-center"
    :pages="pagination"
    @emitPages="getCoupon"
  ></PaginationView>
  <FooterView></FooterView>

</template>

<script>
import PaginationView from '@/components/Pagination.vue';
import CouponModal from '@/components/CouponModal.vue';
import DeleteProductModal from '@/components/DelModal.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  data() {
    return {
      coupon: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
      pagination: {},
    };
  },
  components: {
    PaginationView,
    CouponModal,
    DeleteProductModal,
    FooterView,
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    if (token) this.getCoupon();
  },
  methods: {
    getCoupon(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then((response) => {
          console.log(response);
          const { coupons, pagination } = response.data;
          this.coupon = coupons;
          this.pagination = pagination;
          console.log(this.coupon, this.pagination);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethods = 'post';
      let data = tempCoupon;

      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethods = 'put';
        data = this.tempCoupon;
      }

      this.$http[httpMethods](url, { data })
        .then((response) => {
          this.isLoading = false;
          console.log(response);
          this.getCoupon();
          this.$refs.couponModal.hideModal();
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false;
          console.log(response);
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getCoupon();
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>
