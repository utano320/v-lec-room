import Vue from 'vue';
import io from 'socket.io-client';

export default {
  validate({ params }) {
    return /^[a-z]{4}$/.test(params.room_id);
  },
  data() {
    return {
      roomId: this.$route.params.room_id,
      name: 'teacher',
      msg: '',
      socket: null,
      logs: [],
      members: {}
    };
  },
  mounted: function() {
    this.socket = io(process.env.WS_HOST);
    this.socket.on('message', this.addLogs);
    this.socket.on('room', this.setMembers);

    this.socket.json.emit('join', {
      room: this.roomId,
      name: this.name
    });
  },
  methods: {
    send() {
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
      setTimeout(() => {
        let chatBoxList = document.getElementById('chatbox-list');
        chatBoxList.scrollTop = chatBoxList.scrollHeight - chatBoxList.clientHeight;
      }, 200);
    },
    setMembers(data) {
      Vue.set(this.$data, 'members', data.members);
    }
  }
};
