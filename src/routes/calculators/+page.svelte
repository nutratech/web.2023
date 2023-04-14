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

	let bfSkinFoldChest: number | null = 7;
	let bfSkinFoldAbdominal: number | null = 13;
	let bfSkinFoldThigh: number | null = 10;
	let bfSkinFoldTricep: number | null = 9;
	let bfSkinFoldSubscapula: number | null = 9;
	let bfSkinFoldSuprailiac: number | null = 11;
	let bfSkinFoldMidaxillary: number | null = 10;

	function updateTableBf() {
		// attempt to calculate
		bfTableData = _calcBfTableData(
			gender,
			age,
			height,
			bfWaist,
			bfNeck,
			bfHip,
			bfSkinFoldChest,
			bfSkinFoldAbdominal,
			bfSkinFoldThigh,
			bfSkinFoldTricep,
			bfSkinFoldSubscapula,
			bfSkinFoldSuprailiac,
			bfSkinFoldMidaxillary
		);
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
				on:input={updateTableBf}
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
				on:input={updateTableBf}
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
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Neck (cm)
			<input
				type="number"
				min="5"
				max="90"
				placeholder="e.g. 40"
				bind:value={bfNeck}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Hip (cm)
			<!--suppress HtmlWrongAttributeValue -->
			<input
				disabled={gender === 'MALE'}
				type="number"
				min="15"
				max="210"
				placeholder="e.g. 80"
				bind:value={bfHip}
				on:input={updateTableBf}
			/>
		</label>
		<!-- Three site values -->
		<label>
			Chest (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldChest}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Chest (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldChest}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Chest (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldChest}
				on:input={updateTableBf}
			/>
		</label>
		<!-- Seven site values -->
		<label>
			Tricep (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldTricep}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Subscapula (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldSubscapula}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Suprailiac (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldSuprailiac}
				on:input={updateTableBf}
			/>
		</label>
		<label>
			Midaxillary (mm)
			<input
				type="number"
				min="2"
				max="70"
				placeholder="e.g. 20"
				bind:value={bfSkinFoldMidaxillary}
				on:input={updateTableBf}
			/>
		</label>
	</form>

	<!-- Table -->
	<table>
		<thead>
			<tr>
				<th>Navy</th>
				<th>3 Site</th>
				<th>7 Site</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				{#each Object.values(bfTableData) as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		</tbody>
	</table>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Lean body limits -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Lean body limits (young men)</h2>
</main>
