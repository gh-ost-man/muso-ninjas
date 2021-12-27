<template>
  <div class="user-playlist">
    <h2>MyPlaylist</h2>
    <div v-if="playlists">
        <ListView :playlists="playlists"/>
    </div>
    <router-link class="btn" :to="{name: 'CreatePlaylist'}">Create  a new playlist</router-link>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style>
</style>