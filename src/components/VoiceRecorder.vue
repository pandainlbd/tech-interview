<template>
  <div>
    <button
      class="p-2 my-2 bg-gray-100"
      @click="toggleRecording"
      ref="toggleButton"
    >
      {{ recorder ? "Stop" : "Record" }}
    </button>
    <audio ref="preview"></audio>
  </div>
</template>

<script>
export default {
  data: () => ({
    stream: null,
    recorder: null,
    audio: null,
  }),
  mounted() {},
  methods: {
    toggleRecording() {
      if (this.recorder && this.recorder.state == "recording") {
        this.recorder.stop();
        this.stream.getAudioTracks()[0].stop();
        this.$refs.toggleButton.style.display = "none";
      } else {
        this.startRecording();
      }
    },
    async startRecording() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.recorder = new MediaRecorder(this.stream);
      this.recorder.ondataavailable = (e) => {
        this.audio = e.data.toText();
        var url = URL.createObjectURL(e.data);
        this.$refs.preview.controls = true;
        this.$refs.preview.src = url;
        this.$emit("audio_available", this.audio);
      };
      this.recorder.start();
    },
  },
};
</script>

<style scoped>
</style>
