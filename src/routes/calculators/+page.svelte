<script>
	import '@picocss/pico';

	export function submitForm(elem) {
		if (elem.value) {
			console.info(`elem.value=${elem.value}`);
			elem.form.submit();
		}
	}
</script>

<title>Calculators | NutraTech</title>

<main class="container">
	<h1>Calculators</h1>
	<p><a href="/">Home page</a> - Click to go back</p>
	<p>Calculators for various fitness metrics.</p>

	<h2>One-rep max</h2>
	<form>
		<p>Weight lifted</p>
		<input type="number" placeholder="Weight lifted, e.g. 85" onchange="this.form.submit()" />
		<p>Number of reps performed</p>
		<input type="number" placeholder="Reps performed, e.g. 10" onchange="this.form.submit()" />
	</form>
	<p>Predicted max weight (for <i>n</i> reps)</p>
	<table>
		<thead>
			<tr>
				<th>n</th>
				<th>Epley</th>
				<th>Brzycki</th>
				<th>dos Remedios</th>
			</tr>
		</thead>
		<tbody />
	</table>

	<h2>Calorie expenditure (BMR)</h2>

	<h2>Body fat</h2>

	<h2>Lean body limits (young men)</h2>
</main>
