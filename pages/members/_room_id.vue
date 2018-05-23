<template>
  <div id="app">
    <div>
      ユーザ名：
      <input v-model="name" type="text">
    </div>
    <div id="chatbox">
      <ul id="chatbox-list">
        <li v-for="log in logs" :key="log" class="chatbox-item" v-html="log" />
      </ul>
      <form class="chatbox-input" autocomplete="off">
        <input id="msg" v-model="msg" type="text" class="chatbox-msg">
        <input type="submit" class="chatbox-send" value="送信" @click.prevent="send">
      </form>
    </div>
    <div id="members">
      <ul id="members-list">
        <li v-for="(member, sid) in members" :key="sid" class="members-item">
          {{ member.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="~/components/pages/members/_room_id.js"></script>
<style scoped lang="scss" src="~/components/pages/members/_room_id.scss"></style>
