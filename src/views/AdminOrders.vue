<template>
  <div class="container">
    <!-- <h2>後台訂單</h2> -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ new Date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}{{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="showModal('edit', item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="showModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <Pagination :pages="pagination" @get-orders="getOrders"></Pagination>
    <!-- 分頁元件 -->
  </div>
  <!-- Modal -->
  <OrderModal ref="orderModal" :order="tempOrder" v-on:get-orders="getOrders"></OrderModal>
  <DelOrderModal ref="delOrderModal" :order="tempOrder" v-on:get-orders="getOrders"></DelOrderModal>
  <!-- Modal -->
  <FooterView></FooterView>

</template>
<script>
import OrderModal from '@/components/AdminOrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import Pagination from '@/components/Pagination.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
    };
  },
  components: {
    OrderModal,
    DelOrderModal,
    Pagination,
    FooterView,
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    showModal(act, order) {
      if (act === 'edit') {
        this.tempOrder = { ...order };
        // console.log(this.tempProduct);
        this.$refs.orderModal.openModal();
      } else if (act === 'delete') {
        this.tempOrder = { ...order };
        this.$refs.delOrderModal.openModal();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
