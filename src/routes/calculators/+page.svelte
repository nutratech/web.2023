<script lang="ts">
	import '@picocss/pico';
	import { _calcBfTableData, _calcBmrTableData, _calcOrmTableData } from './+page.ts';

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// 1RM
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	let ormTableData: number[][] = [];
	let ormWeightLifted: number | null = null;
	let ormRepsPerformed = 5;

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

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// BMR
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	let bmrTableData: (number | string)[][] = [
		['Katch McArdle', String(), String()],
		['Cunningham', String(), String()],
		['Mifflin St. Jeor', String(), String()],
		['Harris Benedict', String(), String()]
	];

	let bmrActivityLevel = 2;
	let bmrWeight: number | null = 73;
	let bmrBodyFat: number | null = 15;
	let gender = 'MALE';
	let height: number | null = 179;
	let age: number | null = 30;

	function updateTableBmr() {
		// two required fields for all 4 calculators
		if (bmrWeight != null && bmrBodyFat != null) {
			// attempt to calculate
			bmrTableData = _calcBmrTableData(
				bmrActivityLevel,
				bmrWeight,
				bmrBodyFat,
				gender,
				height,
				age
			);
		}
	}

	// Call once to initialize table
	updateTableBmr();

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Body fat
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	let bfTableData: number[] = [];

	let bfWaist: number | null = 82;
	let bfNeck: number | null = 40;
	let bfHip: number | null = null;

	function updateTableBf() {
		// attempt to calculate
		bfTableData = _calcBfTableData(gender, age, height, bfWaist, bfNeck, bfHip);
	}

	// Call once to initialize table
	updateTableBf();
</script>

<title>Calculators | NutraTech</title>

<main class="container">
	<h1>Calculators</h1>
	<p><a href="/">Home page</a> - Click to go back</p>
	<p>Calculators for various fitness metrics.</p>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- One rep max -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>One-rep max</h2>
	<form>
		<label>
			Weight lifted
			<input
				type="number"
				placeholder="e.g. 85"
				min="0"
				step="5"
				bind:value={ormWeightLifted}
				on:input={updateTable1RM}
			/>
		</label>
		<label
			>Number of reps performed
			<input
				type="number"
				min="1"
				max="20"
				placeholder="Reps performed, e.g. 10"
				bind:value={ormRepsPerformed}
				on:input={updateTable1RM}
			/>
		</label>
	</form>

	<!-- Table -->
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

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Calorie expenditure (BMR) -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Calorie expenditure (BMR)</h2>
	<form>
		<label>
			Weight (kg)
			<input
				type="number"
				placeholder="e.g. 75"
				min="0"
				max="400"
				bind:value={bmrWeight}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Activity Factor (1-5, sedentary-intense)
			<input
				type="number"
				min="1"
				max="5"
				placeholder="value from 1 to 5"
				bind:value={bmrActivityLevel}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Body fat (%)
			<input
				type="number"
				min="0"
				max="75"
				placeholder="e.g. 15"
				bind:value={bmrBodyFat}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Gender
			<select bind:value={gender} on:change={updateTableBmr}>
				<option>MALE</option>
				<option>FEMALE</option>
			</select>
		</label>
		<label>
			Height (cm)
			<input
				type="number"
				min="30"
				max="275"
				placeholder="e.g. 180"
				bind:value={height}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Age (years)
			<input
				type="number"
				min="0"
				max="175"
				placeholder="e.g. 25"
				bind:value={age}
				on:input={updateTableBmr}
			/>
		</label>
	</form>

	<!-- Table -->
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

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Body fat % -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Body fat</h2>
	<form>
		<label>
			Gender
			<select bind:value={gender} on:change={updateTableBmr}>
				<option>MALE</option>
				<option>FEMALE</option>
			</select>
		</label>
		<label>
			Height (cm)
			<input
				type="number"
				min="30"
				max="275"
				placeholder="e.g. 180"
				bind:value={height}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Age (years)
			<input
				type="number"
				min="0"
				max="175"
				placeholder="e.g. 25"
				bind:value={age}
				on:input={updateTableBmr}
			/>
		</label>
		<label>
			Waist (cm)
			<input
				type="number"
				min="15"
				max="400"
				placeholder="e.g. 90"
				bind:value={bfWaist}
				on:input={updateTableBmr}
			/>
		</label>
	</form>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Lean body limits -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Lean body limits (young men)</h2>
</main>
