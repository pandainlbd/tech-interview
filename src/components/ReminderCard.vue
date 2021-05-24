<template>
  <div :class="['rounded-md', 'p-3', 'my-4', 'mx-3', reminder_color]">
    <h3 class="font-medium mb-1.5 text-3xl text-gray-600">{{ name }}</h3>
    <div>
      <p>{{ datetime }}</p>
      <p>{{ description }}</p>
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
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
