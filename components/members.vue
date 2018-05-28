<template>
  <div id="members">
    <ul id="members-list">
      <li
        v-for="(member, sid) in members"
        :key="sid"
        :style="memberBgColor(member)"
        class="members-item">
        {{ member.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    roomId: {
      type: String,
      default: ''
    },
    socket: {
      type: Object,
      default: null
    },
    members: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'members'
    }
  },
  methods: {
    memberBgColor(member) {
      if (this.mode === 'members') return {};

      return {
        backgroundColor: member.color
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#members {
  width: 300px;
  font-size: 80%;
  #members-list {
    border: 1px solid #dfdfdf;
    border-radius: 0.5em;
    margin: 1em 0;
    padding: 0;
    list-style-type: none;
    .members-item {
      margin: 0;
      padding: 0.2em;
    }
  }
}
</style>
