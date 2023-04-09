<script>
	import '@picocss/pico';
	import { ormRepsPerformed, ormTableData, ormWeightLifted, updateTable1RM } from "./+page.js";
</script>

<title>Calculators | NutraTech</title>

<main class="container">
	<h1>Calculators</h1>
	<p><a href="/">Home page</a> - Click to go back</p>
	<p>Calculators for various fitness metrics.</p>
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!--	One rep max-->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>One-rep max</h2>
	<form>
		<p>Weight lifted</p>
		<input
			type="number"
			placeholder="Weight lifted, e.g. 85"
			min="0"
			bind:value={ormWeightLifted}
			on:input={updateTable1RM}
		/>
		<p>Number of reps performed</p>
		<input
			type="number"
			min="0"
			max="20"
			placeholder="Reps performed, e.g. 10"
			bind:value={ormRepsPerformed}
			on:input={updateTable1RM}
		/>
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
		<tbody>
			{#each Object.values(ormTableData) as row}
				<tr>
					{#each Object.values(row) as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Calorie expenditure (BMR)</h2>

	<h2>Body fat</h2>

	<h2>Lean body limits (young men)</h2>
</main>
