<template>
	<div>
		<p>Test Notifications</p>
	</div>
</template>

<script>
	export default {
		mounted() {
			console.log(this.$messaging);
			console.log(
				this.$messaging()
					.getToken({
						vapidKey:
							"BF8XG5_LgA52ZkFWqZAQ27fiQAU75RAjIXQimDLtWuidkx1URjz_9G_d9dvqTqkJO8gFxSPnGHZcBEYOlE7MMzY",
					})
					.then((currentToken) => {
						if (currentToken) {
							console.log("client token", currentToken);
						} else {
							console.log(
								"No registration token available. Request permission to generate one."
							);
						}
					})
					.catch((err) => {
						console.log(
							"An error occurred while retrieving token. ",
							err
						);
					})
			);
		},
	};
</script>