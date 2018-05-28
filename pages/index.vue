<template>
  <div id="app">
    <a href="/admin">講師はこちら</a>
    <a href="/members">受講者はこちら</a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#app {
  font-family: Verdana, sans-serif;
  color: skyblue;
  width: 100%;

  a {
    display: block;
    width: 10em;
    text-decoration: none;
    margin: 2em auto;
    padding: 1em;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #339;
    background-color: skyblue;
    border-radius: 1em;
  }
}
</style>
