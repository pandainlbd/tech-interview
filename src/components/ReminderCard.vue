<template>
  <div :class="['rounded-md', 'p-3', 'my-4', 'mx-3', reminder_color]">
    <h3 class="font-medium mb-1.5 text-3xl text-gray-600">{{ name }}</h3>
    <div>
      <p>{{ datetime }}</p>
      <p>{{ description }}</p>
      <audio v-if="audio" :src="audioURL" controls></audio>
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
      type: Object,
      required: false,
    },
  },
  mounted() {},
  methods: {},
  computed: {
    audioURL() {
      // return this.audio ? URL.createObjectURL(new Blob(this.audio, {type: "application/zip"}) : "";
      return "";
    },
  },
};
</script>

<style scoped>
</style>
