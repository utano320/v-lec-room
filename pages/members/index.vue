<template>
  <div id="app">
    <p>RoomId を入力してください。</p>
    <form action="/members/room">
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

<script>
export default {
  data() {
    return {
      roomId: ''
    };
  }
};
</script>

<style scoped lang="scss">
#app {
  font-family: Verdana, sans-serif;
  color: skyblue;

  p {
    color: tomato;
  }
}
</style>
