<template>
  <div id="app">
    <div>
      ユーザ名：
      <input 
        id="name" 
        v-model="name" 
        type="text">
      <span 
        id="status" 
        :style="{backgroundColor:statusColor}" />
    </div>
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
          @click.prevent="send">
      </form>
    </div>
    <div id="actionbox">
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
    <div id="members">
      <ul id="members-list">
        <li 
          v-for="(member, sid) in members" 
          :key="sid" 
          :id="sid" 
          class="members-item">
          {{ member.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="~/components/pages/members/_room_id.js"></script>
<style scoped lang="scss" src="~/components/pages/members/_room_id.scss"></style>
