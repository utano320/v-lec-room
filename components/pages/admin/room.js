import Vue from 'vue';
import io from 'socket.io-client';
import url from 'url';

export default {
  data() {
    return {
      roomId: false,
      name: '',
      msg: '',
      socket: null,
      logs: [],
      members: {}
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.roomId = this.initRoomId();
      if (!this.roomId) location.href = '/admin/';

      this.name = this.initName();

      this.socket = io(process.env.WS_HOST);
      this.socket.on('message', this.addLogs);
      this.socket.on('room', this.setMembers);

      this.socket.json.emit('join', { room: this.roomId, name: this.name });
    }, 200);
  },
  methods: {
    send() {
      if (this.msg === '') return;

      this.socket.json.emit('send', {
        room: this.roomId,
        name: this.name,
        msg: this.msg
      });
      this.msg = '';
      document.getElementById('msg').focus();
    },
    addLogs(data) {
      Vue.set(this.logs, this.logs.length, data);
      this.scrollLogs();
    },
    scrollLogs() {
      setTimeout(() => {
        let chatBoxList = document.getElementById('chatbox-list');
        chatBoxList.scrollTop = chatBoxList.scrollHeight - chatBoxList.clientHeight;
      }, 200);
    },
    setMembers(data) {
      Vue.set(this.$data, 'logs', data.logs);
      Vue.set(this.$data, 'members', data.members);
      this.scrollLogs();
    },
    initName() {
      if (localStorage.getItem('name')) return localStorage.getItem('name');
      return 'teacher';
    },
    initRoomId() {
      let parseUrl = url.parse(location.href, true);
      let roomId = parseUrl.query['id'];
      return roomId && roomId.match(/^[a-z]{4}$/) ? roomId : false;
    }
  }
};
