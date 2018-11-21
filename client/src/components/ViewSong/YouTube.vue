<template>
  <panel title="Youtube Viideo">
    <youtube
      :video-id="youtubeId"
      :player-width="400"
      :player-height="330">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>
</style>
