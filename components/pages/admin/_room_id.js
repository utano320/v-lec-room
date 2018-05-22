import Vue from 'vue';
import io from 'socket.io-client';

export default {
  validate({ params }) {
    return /^[a-z]{4}$/.test(params.room_id);
  },
  data() {
    return {
      roomId: this.$route.params.room_id,
      msg: '',
      socket: null,
      logs: []
    };
  },
  mounted: function() {
    this.socket = io(process.env.WS_HOST);
    this.socket.on('emit_from_server', this.addLogs);
    this.socket.json.emit('join', {
      room: this.roomId
    });
  },
  methods: {
    send() {
      this.socket.json.emit('emit_from_client', {
        room: this.roomId,
        msg: this.msg
      });
      this.msg = '';
    },
    addLogs(data) {
      Vue.set(this.logs, this.logs.length, data);
    }
  }
};