<script lang="ts">
	import '@picocss/pico';
	import { _calcOrmTableData } from './+page.ts';

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// VARIABLES - One rep max
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	let ormTableData: number[][] = [];
	let ormWeightLifted: number | null = null;
	let ormRepsPerformed = 3;

	function updateTable1RM() {
		// Constrain reps <= 20
		if (ormRepsPerformed > 20) {
			alert("Reps can't exceed 20!");
			ormRepsPerformed = 20;
		}
		// Constrain reps >= 0
		if (ormRepsPerformed < 0) {
			alert("Reps can't be less than 0!");
			ormRepsPerformed = 0;
		}
		// Constrain weight > 0
		if (ormWeightLifted && ormWeightLifted < 0) {
			alert('Weight must be greater than 0!');
			ormWeightLifted = 0;
		}

		// Update table info
		ormTableData = _calcOrmTableData(ormWeightLifted || 0, ormRepsPerformed || 0);
	}

	// Call once to initialize table
	updateTable1RM();
</script>

<title>Calculators | NutraTech</title>

<main class="container">
	<h1>Calculators</h1>
	<p><a href="/">Home page</a> - Click to go back</p>
	<p>Calculators for various fitness metrics.</p>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- One rep max -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>One-rep max</h2>
	<form>
		<p>Weight lifted</p>
		<input
			type="number"
			placeholder="Weight lifted, e.g. 85"
			min="0"
			step="5"
			bind:value={ormWeightLifted}
			on:input={updateTable1RM}
		/>
		<p>Number of reps performed</p>
		<input
			type="number"
			min="1"
			max="20"
			placeholder="Reps performed, e.g. 10"
			bind:value={ormRepsPerformed}
			on:input={updateTable1RM}
		/>
	</form>
	<!-- Table -->
	<h3>Predicted max weight</h3>
	<p>You lifted {ormWeightLifted} for {ormRepsPerformed} reps!</p>
	<table>
		<thead>
			<tr>
				<th># reps</th>
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

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Calorie expenditure (BMR) -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Calorie expenditure (BMR)</h2>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Body fat % -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Body fat</h2>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Lean body limits -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Lean body limits (young men)</h2>
</main>
