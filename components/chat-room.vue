<template>
  <div id="chat-room">
    <div>
      ユーザ名：
      <input
        id="name"
        v-model="name"
        type="text">
      <span
        v-if="mode === 'members'"
        id="status"
        :style="{backgroundColor:statusColor}" />
    </div>

    <chatbox
      :name="name"
      :room-id="roomId"
      :socket="socket"
      :logs="logs"
      :send="send"
    />

    <div
      v-if="mode === 'members'"
      id="actionbox">
      <button
        class="action-blue"
        @click="action('skyblue')">理解してる</button>
      <button
        class="action-yellow"
        @click="action('#f9f999')">あやしい</button>
      <button
        class="action-red"
        @click="action('tomato')">わからない</button>
      <button
        class="action-gray"
        @click="action('lightgray')">質問したい</button>
      <button
        class="action-white"
        @click="action('white')">クリア</button>
    </div>

    <members
      :room-id="roomId"
      :socket="socket"
      :members="members"
      :mode="mode"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import io from 'socket.io-client';
import url from 'url';
import chatbox from '~/components/chatbox.vue';
import members from '~/components/members.vue';

export default {
  components: {
    chatbox,
    members
  },
  props: {
    mode: {
      type: String,
      default: 'members'
    }
  },
  data() {
    return {
      roomId: '',
      name: '',
      socket: null,
      members: {},
      logs: [],
      statusColor: 'white'
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.socket = io(process.env.WS_HOST);

      this.roomId = this.initRoomId();
      if (this.roomId === '') location.href = '/members/';

      this.name = this.initName();

      this.socket.on('message', this.addLogs);
      this.socket.on('room', this.setRoom);

      this.socket.json.emit('join', { room: this.roomId, name: this.name });
    }, 200);
  },
  methods: {
    send(msg) {
      if (msg === '') return;

      this.socket.json.emit('send', {
        room: this.roomId,
        name: this.name,
        msg: msg
      });
    },
    addLogs(data) {
      Vue.set(this.logs, this.logs.length, data);
      this.scrollLogs();
    },
    setRoom(data) {
      Vue.set(this.$data, 'logs', data.logs);
      Vue.set(this.$data, 'members', data.members);
      this.scrollLogs();
    },
    scrollLogs() {
      setTimeout(() => {
        let chatBoxList = document.getElementById('chatbox-list');
        chatBoxList.scrollTop = chatBoxList.scrollHeight - chatBoxList.clientHeight;
      }, 200);
    },
    initName() {
      if (localStorage.getItem('name')) return localStorage.getItem('name');

      let defaultName = 'teacher';
      if (this.mode === 'members') {
        const l = 4;
        const cList = 'abcdefghijklmnopqrstuvwxyz';
        let name = '';
        for (let i = 0; i < l; i++) name += cList[Math.floor(Math.random() * cList.length)];
        defaultName = 'guest_' + name;
      }

      return defaultName;
    },
    initRoomId() {
      let parseUrl = url.parse(location.href, true);
      let roomId = parseUrl.query['id'];
      return roomId && roomId.match(/^[a-z]{4}$/) ? roomId : '';
    },
    action(statusColor) {
      this.statusColor = statusColor;
      this.socket.json.emit('status', { color: statusColor });
    }
  }
};
</script>

<style scoped lang="scss">
#chat-room {
  font-family: Verdana, sans-serif;

  #name {
    border: 1px solid #ccc;
    border-radius: 0.2em;
    font-size: 1em;
    padding: 0.2em;
  }

  #status {
    display: block;
    width: 100px;
    height: 1em;
    margin: 1em;
    border-radius: 0.5em;
    border: 1px solid #dfdfdf;
  }

  #actionbox {
    button {
      border: 0;
      font-size: 80%;
      margin: 1em;
      font-weight: bold;
      padding: 1em;
      border-radius: 1em;
      width: 8em;
      outline: 0;
      cursor: pointer;
    }
    .action-blue {
      background-color: skyblue;
    }
    .action-yellow {
      background-color: #f9f999;
    }
    .action-red {
      background-color: tomato;
    }
    .action-gray {
      background-color: lightgray;
    }
    .action-white {
      border: 1px solid #efefef;
    }
  }
}
</style>
