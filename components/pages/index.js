import Vue from 'vue';
import io from 'socket.io-client';

export default {
  data() {
    return {
      msg: '',
      socket: null,
      logs: []
    };
  },
  mounted: function() {
    this.socket = io(process.env.WS_HOST);
    this.socket.on('emit_from_server', this.addLogs);
  },
  methods: {
    send() {
      this.socket.json.emit('emit_from_client', {
        msg: this.msg
      });
      this.msg = '';
    },
    addLogs(data) {
      Vue.set(this.logs, this.logs.length, data);
    }
  }
};
