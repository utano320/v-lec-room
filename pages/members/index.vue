<template>
  <div id="app">
    <p>RoomId を入力してください。</p>
    <form :action="'/members/' + roomId">
      <input
        v-model="roomId"
        type="text">
      <input
        type="submit"
        value="移動">
    </form>
  </div>
</template>

<script src="~/components/pages/members/index.js"></script>
<style scoped lang="scss" src="~/components/pages/members/index.scss"></style>
