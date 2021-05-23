<template>
	<div>
		<h1 class="text-3xl text-gray-800 font-bold mb-4">Your reminders for this week:</h1>
		<reminder-card
			v-for="reminder in reminders"
			:key="reminder._id"
			:name="reminder.name"
			:description="reminder.description"
			:datetime="reminder.datetime"
			/>
		<div>
			<button class="p-2 my-2 bg-gray-100" @click="openReminderModal">Create</button>
		</div>
		<reminder-modal
			ref="reminderModal"
			@on-reminder-created="reloadReminders"
			/>
	</div>
</template>

<script>
import ReminderModal from './ReminderModal.vue';
import ReminderCard from './ReminderCard.vue';

export default {
	components: {
		ReminderCard,
		ReminderModal,
	},
	data: () => ({
		reminders: [],
	}),
	async mounted() {
		await this.reloadReminders();
	},
	methods: {
		async reloadReminders() {
			const reminders = await (await fetch('/reminder/get-range')).json();
			// Convert date strings to Date
			reminders.forEach(r => r.datetime = new Date(r.datetime));
			this.reminders = reminders;
		},
		openReminderModal() {
			this.$refs.reminderModal.open();
		},
	}
}
</script>

<style>
</style>
