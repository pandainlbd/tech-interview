<template>
	<div>
		<button class="p-2 my-2 bg-gray-100" @click="toggleRecord">Record</button>
	</div>
</template>

<script>

export default {
	data: () => ({
		stream: null,
	}),
	mounted() {
	},
	methods: {
		async toggleRecord() {
			await this.getMicMediaStream();

			// ...
		},
		async getMicMediaStream() {
			try {
				this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
			} catch (e) {
				window.alert(e);
			}
		}
	}
}
</script>

<style scoped>
</style>
