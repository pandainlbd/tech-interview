<template>
  <div>
    <button
      class="p-2 my-2 bg-gray-100"
      @click="toggleRecording"
      ref="toggleButton"
    >
      {{ recorder ? "Stop" : "Record" }}
    </button>
    <audio class="bg-gray-100 mt-3 rounded-xl" ref="preview"></audio>
  </div>
</template>

<script>
export default {
  data: () => ({
    stream: null,
    recorder: null,
    audio: null,
    audioBlob: null,
  }),
  mounted() {},
  methods: {
    toggleRecording() {
      if (this.recorder && this.recorder.state == "recording") {
        this.recorder.stop();
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
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
      this.recorder.ondataavailable = async (e) => {
        this.audioBlob = new Blob([e.data], {
          type: "audio/ogg,codecs=opus",
        });

        console.log(this.audioBlob);

        // this.$emit("audio_available", JSON.stringify(audioFile));
        // var elem = window.document.createElement("a");
        // elem.href = window.URL.createObjectURL(audioFile);
        // elem.download = "my_recording.ogg";
        // document.body.appendChild(elem);
        // elem.click();
        var reader = new FileReader();
        reader.onloadend = () => {
          let base64 = reader.result;
          this.$emit("audio_available", base64);
        };
        reader.readAsDataURL(this.audioBlob);

        var url = URL.createObjectURL(this.audioBlob);
        this.$refs.preview.controls = true;
        this.$refs.preview.src = url;
      };
      this.recorder.start();
    },
  },
};
</script>

<style scoped>
</style>
