<template>
  <div
    :class="[
      'rounded-md shadow-lg p-3 pb-5 my-4 mx-3 cursor-pointer',
      reminder_color,
    ]"
    @click="editReminder"
  >
    <div class="flex justify-between mb-2">
      <h3 class="font-medium mb-1.5 text-xl text-gray-600 self-center">
        {{ name }}
      </h3>
      <button
        v-show="audio"
        @click="toggle"
        class="
          bg-gray-900
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
    </div>
    <div>
      <p class="text-xs text-gray-600">{{ datetime }}</p>
      <p>{{ description }}</p>
    </div>
    <!-- <button
      v-show="audio"
      @click="toggle"
      class="
        bg-gray-900
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded-full
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
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
      audioObject: null,
    };
  },
  mounted() {
    if (this.audio) {
      this.audioObject = new Audio(this.audio.replace(",codecs=opus", ""));
    }
  },
  methods: {
    toggle() {
      this.audioObject.play();
    },
    editReminder() {
      this.$emit("edit-reminder", this.index);
    },
  },
};
</script>

<style scoped>
</style>
