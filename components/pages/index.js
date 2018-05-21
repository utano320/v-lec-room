// import Vue from 'vue';
import moment from 'moment';

export default {
  data() {
    return {
      msg: 'Hello MyApp!'
    };
  },
  methods: {
    now() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
