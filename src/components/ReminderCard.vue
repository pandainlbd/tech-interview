<template>
  <div :class="['rounded-md shadow p-3 pb-5 my-4 mx-3', reminder_color]">
    <h3 class="font-medium mb-1.5 text-3xl text-gray-600">{{ name }}</h3>
    <div>
      <p class="text-xs text-gray-600">{{ datetime }}</p>
      <p>{{ description }}</p>
      <audio ref="player"></audio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    reminder_color: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      audioBlob: null,
      audioURL: null,
    };
  },
  async mounted() {
    const base64Response = await fetch(this.audio);
    this.audioBlob = await base64Response.blob();
    this.audioBlob = new Blob([this.audioBlob], {
      type: "audio/ogg,codecs=opus",
    });
    console.log(this.audioBlob);
    this.audioURL = URL.createObjectURL(this.audioBlob);
    this.$refs.player.controls = true;
    this.$refs.player.src = this.audioURL;
  },
  methods: {},
};
</script>

<style scoped>
</style>
