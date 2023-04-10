<script lang="ts">
	import '@picocss/pico';
	import { _calcBmrTableData, _calcOrmTableData } from './+page.ts';

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// 1RM
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

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// BMR
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	let bmrTableData: (number | string)[][] = [
		['Katch McArdle', NaN, NaN],
		['Cunningham', NaN, NaN],
		['Mifflin St. Jeor', NaN, NaN],
		['Harris Benedict', NaN, NaN]
	];

	let bmrActivityLevel = 2;
	let bmrWeight: number | null = 73;
	let bmrBodyFat: number | null = 15;
	let bmrGender: string | null = null;
	let bmrHeight: number | null = 179;
	let bmrAge: number | null = 30;

	function updateTableBmr() {
		console.log(bmrGender);
		console.log(`${bmrHeight} cm`);
		// two required fields for all 4 calculators
		if (bmrWeight != null && bmrBodyFat != null) {
			// attempt to calculate
			bmrTableData = _calcBmrTableData(
				bmrActivityLevel,
				bmrWeight,
				bmrBodyFat,
				bmrGender,
				bmrHeight,
				bmrAge
			);
		}
	}

	// Call once to initialize table
	updateTableBmr();
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
	<form>
		<p>Weight (kg)</p>
		<input
			type="number"
			placeholder="e.g. 75"
			min="0"
			max="400"
			bind:value={bmrWeight}
			on:input={updateTableBmr}
		/>
		<p>Activity Factor (1-5, sedentary-intense)</p>
		<input
			type="number"
			min="1"
			max="5"
			placeholder="value from 1 to 5"
			bind:value={bmrActivityLevel}
			on:input={updateTableBmr}
		/>
		<p>Body fat (%)</p>
		<input
			type="number"
			min="0"
			max="75"
			placeholder="e.g. 15"
			bind:value={bmrBodyFat}
			on:input={updateTableBmr}
		/>
		<p>Gender</p>
		<select bind:value={bmrGender} on:input={updateTableBmr}>
			<option>MALE</option>
			<option>FEMALE</option>
		</select>
		<p>Height (cm)</p>
		<input
			type="number"
			min="30"
			max="275"
			placeholder="e.g. 180"
			bind:value={bmrHeight}
			on:input={updateTableBmr}
		/>
		<p>Age (years)</p>
		<input
			type="number"
			min="0"
			max="175"
			placeholder="e.g. 25"
			bind:value={bmrAge}
			on:input={updateTableBmr}
		/>
	</form>
	<table>
		<thead>
			<tr>
				<th>Equation</th>
				<th>BMR</th>
				<th>TDEE</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.values(bmrTableData) as row}
				<tr>
					{#each Object.values(row) as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Body fat % -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Body fat</h2>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Lean body limits -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Lean body limits (young men)</h2>
</main>
