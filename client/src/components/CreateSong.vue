<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
          <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

          <v-text-field
          label="Artist"
          required
          :rules=[required]
          v-model="song.artist"
        ></v-text-field>

          <v-text-field
          label="Genre"
          required
          :rules=[required]
          v-model="song.genre"
        ></v-text-field>

          <v-text-field
          label="Album"
          required
          :rules=[required]
          v-model="song.album"
        ></v-text-field>

          <v-text-field
          label="Album Image URL"
          required
          :rules=[required]
          v-model="song.albumImageUrl"
        ></v-text-field>

          <v-text-field
          label="Youtube ID"
          required
          :rules=[required]
          v-model="song.youtubeId"
        ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
          <v-text-field
          label="Tab"
          multi-line
          required
          :rules=[required]
          v-model="song.tab"
        ></v-text-field>

        <v-text-field
          label="Lyrics"
          multi-line
          required
          :rules=[required]
          v-model="song.lyrics"
        ></v-text-field>
      </panel>
      <div class="danger-alert"
        v-if="error">
        {{ error }}
      </div>
      <v-btn class="cyan" @click="create" dark>Create Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      // Set error back to a default stage
      this.error = null
      // Loop all over the keys of my song
      // and verify every single values of that key is defined
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
