import Vue from 'vue';
import io from 'socket.io-client';

export default {
  validate({ params }) {
    return /^[a-z]{4}$/.test(params.room_id);
  },
  data() {
    return {
      roomId: this.$route.params.room_id,
      name: '',
      msg: '',
      socket: null,
      logs: [],
      members: {},
      statusColor: 'white'
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.name = this.initName();

      this.socket = io(process.env.WS_HOST);
      this.socket.on('message', this.addLogs);
      this.socket.on('room', this.setMembers);

      this.socket.json.emit('join', {
        room: this.roomId,
        name: this.name
      });
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
      localStorage.setItem('name', this.name);
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

      const l = 4;
      const cList = 'abcdefghijklmnopqrstuvwxyz';
      let name = '';
      for (let i = 0; i < l; i++) name += cList[Math.floor(Math.random() * cList.length)];
      return 'guest_' + name;
    },
    action(statusColor) {
      this.statusColor = statusColor;
      this.socket.json.emit('status', { color: statusColor });
    }
  }
};
