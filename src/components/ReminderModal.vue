<template>
  <dialog ref="dialog" class="border border-black rounded-md shadow-md">
    <div class="flex flex-col">
      <button class="absolute top-0 right-0 m-2 p-2" @click="close">x</button>
      <h2 class="text-2xl text-gray-800 font-bold mb-4">New reminder</h2>
      <input class="p-2 my-2" type="text" v-model="name" placeholder="name" />
      <textarea
        class="p-2 my-2"
        type="text"
        v-model="description"
        placeholder="description"
      />
      <input class="p-2 my-2 w-full" type="datetime-local" v-model="datetime" />
      <select
        name="colors"
        id="colors"
        :class="{ 'p-2': true, 'text-gray-300': reminder_color == 'default' }"
        v-model="reminder_color"
      >
        <option value="default" disabled selected>
          select a color you like
        </option>
        <option value="bg-red-200">Red</option>
        <option value="bg-yellow-200">Yellow</option>
        <option value="bg-green-200">Green</option>
      </select>
      <voice-recorder @audio_available="receive_audio" />
      <button class="p-2 my-2 bg-gray-300 font-medium" @click="create">Create</button>
    </div>
  </dialog>
</template>

<script>
import VoiceRecorder from "./VoiceRecorder.vue";

export default {
  components: { VoiceRecorder },
  data: () => ({
    isOpen: true,
    name: "",
    description: "",
    datetime: new Date().toLocaleString("sv").replace(" ", "T"),
    reminder_color: "default",
    audio: null,
  }),
  mounted() {},
  methods: {
    open() {
      this.name = "";
      this.description = "";
      this.datetime = new Date().toLocaleString("sv").replace(" ", "T");
      this.$refs.dialog.showModal();
    },
    close() {
      this.$refs.dialog.close();
    },
    async create() {
      const res = await (
        await fetch("/reminder/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            description: this.description,
            datetime: this.datetime,
            reminder_color: this.reminder_color,
            audio: this.audio,
          }),
        })
      ).json();
      console.log(res);
      if (res.err) {
        window.alert(res.err);
        return;
      }
      this.$emit("on-reminder-created");
      this.close();
    },
    receive_audio(audio) {
      this.audio = audio;
      console.log("Audio received!");
    },
  },
};
</script>

<style scoped>
</style>
