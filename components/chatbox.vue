<template>
  <div id="chatbox">
    <ul id="chatbox-list">
      <li
        v-for="log in logs"
        :key="log"
        class="chatbox-item"
        v-html="log" />
    </ul>
    <form
      class="chatbox-input"
      autocomplete="off">
      <input
        id="msg"
        v-model="msg"
        type="text"
        class="chatbox-msg">
      <input
        type="submit"
        class="chatbox-send"
        value="送信"
        @click.prevent="sendMessage">
    </form>
  </div>
</template>

<script>
export default {
  props: {
    roomId: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    socket: {
      type: Object,
      default: () => {
        return {};
      }
    },
    logs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    send: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    sendMessage() {
      this.send(this.msg);
      this.msg = '';
      document.getElementById('msg').focus();
    }
  }
};
</script>

<style scoped lang="scss">
#chatbox {
  margin-top: 1em;
  #chatbox-list {
    height: 200px;
    overflow: auto;
    background-color: #dfdfdf;
    color: #333;
    list-style: none;
    margin-bottom: 0;
    padding: 0;
    margin: 0;
    .chatbox-item {
      font-size: 80%;
      margin: 0.5em;
    }
  }
  .chatbox-input {
    width: 100%;
    background-color: #efefef;
    padding: 3px 0;
    .chatbox-msg {
      width: 77%;
      margin: 0 3%;
      padding: 1%;
      border: 0;
      font-size: 80%;
    }
    .chatbox-send {
      width: 12%;
      margin: 0 3% 0 0;
      padding: 1% 0;
      border: 0;
      font-size: 80%;
      background-color: #ccf;
      border-radius: 0.2em;
      font-weight: bold;
      color: #339;
    }
  }
}
</style>
