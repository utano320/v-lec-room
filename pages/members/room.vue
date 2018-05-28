<template>
  <div id="app">
    <chat-room
      :mode="'members'"
    />
  </div>
</template>

<script>
import chatRoom from '~/components/chat-room.vue';

export default {
  components: {
    'chat-room': chatRoom
  }
};
</script>
