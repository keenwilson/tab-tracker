<template>
<div>
  <v-layout>
    <v-flex xs6>
      <song-metadata :song="song"/>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <you-tube :youtubeId="song.youtubeId"/>
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
    <v-flex xs6 >
      <tab :song="song"/>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <lyrics :song="song"/>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import Lyrics from './Lyrics'
import Tab from './Tab'
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  // index.js only concerns about fetching the song
  async mounted () {
    // Grab the state of Vuex store and get the songId from the URL
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: this.song.id
      })
    }
  },
  components: {
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>
</style>
