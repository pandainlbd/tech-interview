<template>
	<div>
		<h1 class="text-3xl text-gray-800 font-bold mb-4">Your reminders for this week:</h1>
		<ul class="ml-4 list-disc">
			<li v-for="reminder in reminders">{{ reminder }}</li>
		</ul>
		<div>
			<button class="p-2 my-2 bg-gray-100" @click="openReminderModal">Create</button>
		</div>
		<reminder-modal ref="reminderModal" />
	</div>
</template>

<script>
import ReminderModal from './ReminderModal.vue';

export default {
	components: {
		ReminderModal,
	},
	data: () => ({
		reminders: ['asda', 'asdasd'],
	}),
	mounted() {
	},
	methods: {
		openReminderModal() {
			this.$refs.reminderModal.open();
		}
	}
}
</script>

<style>
</style>
