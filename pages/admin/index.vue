<template>
  <div id="app">
    <p>RoomId を入力してください。</p>
    <form action="/admin/room">
      <input
        v-model="roomId"
        type="text"
        name="id">
      <input
        type="submit"
        value="移動">
    </form>
  </div>
</template>

<script src="~/components/pages/admin/index.js"></script>
<style scoped lang="scss" src="~/components/pages/admin/index.scss"></style>
