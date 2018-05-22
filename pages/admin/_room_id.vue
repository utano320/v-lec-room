<template>
  <div id="app">
    <input
      id="msg"
      v-model="msg"
      type="text">
    <button @click="send">送信</button>
    <ul>
      <li
        v-for="log in logs"
        :key="log">{{ log }}</li>
    </ul>
  </div>
</template>

<script src="~/components/pages/admin/_room_id.js"></script>
<style scoped lang="scss" src="~/components/pages/admin/_room_id.scss"></style>
