<template>
  <footer>
    <div id="copyrights" class="text-center mt-3">
      <p>©{{ year }}{{ copyright }} 建議瀏覽器 chrome / IE 11.0 以上</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: '僅供學習用無任何商業用途',
      year: new Date().getFullYear(),
    };
  },
};
</script>
