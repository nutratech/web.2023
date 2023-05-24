<script lang="ts">
	import '@picocss/pico';
	import {
		_calcBfTableData,
		_calcBmrTableData,
		_calcLblTableData,
		_calcOrmTableData
	} from './calculators.ts';
	import Header from '../Header.svelte';
	import Footer from '../Footer.svelte';

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
	let bmrTableData: (number | string)[][] = [];

	let bmrActivityLevel = 2;
	let bmrActivityLevelStrDict: Record<number, string> = {
		1: 'Sedentary 1/5',
		2: 'Light 2/5',
		3: 'Moderate 3/5',
		4: 'High 4/5',
		5: 'Extreme 5/5'
	};

	let bmrWeight: number | null = null;
	let bmrBodyFat: number | null = null;
	let gender = 'MALE';
	let height: number | null = null;
	let age: number | null = null;

	function updateTableBmr() {
		// console.info(bmrActivityLevel);
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

	let bfWaist: number | null = null;
	let bfNeck: number | null = null;
	let bfHip: number | null = null;

	let bfSkinFoldChest: number | null = 15;
	let bfSkinFoldAbdominal: number | null = 15;
	let bfSkinFoldThigh: number | null = 15;
	let bfSkinFoldTricep: number | null = 15;
	let bfSkinFoldSubscapula: number | null = 15;
	let bfSkinFoldSuprailiac: number | null = 15;
	let bfSkinFoldMidaxillary: number | null = 15;

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

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Lean body limits
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	let lblTableData: (number | string | Record<string, number>)[][] = [];

	let lblDesiredBodyFat: number | null = 5.5;
	let lblWrist: number | null = null;
	let lblAnkle: number | null = null;

	function updateTableLbl() {
		// attempt to calculate
		lblTableData = _calcLblTableData(height, lblDesiredBodyFat, lblWrist, lblAnkle);
	}

	// Call once to initialize table
	updateTableLbl();
</script>

<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<!-- HTML -->
<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

<!-- Head -->
<title>Calculators | NutraTech</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta
	name="description"
	content="Calculate 1 rep max (1RM), BMR, body fat (bodyfat), and muscle potential."
/>

<!-- Body -->
<Header />

<main class="container">
	<h1>Calculators</h1>
	<p>Calculators for various fitness metrics.</p>
	<p>
		This page requires JavaScript ES6. Provided since Windows 7, Ubuntu 16.04, or macOS 10.10. Older
		operating systems can use our CLI, available with
	</p>
	<pre>pip3 install nutra
n calc -h</pre>

	<p>
		Note that this page does not use cookies, network requests, or save your information. All
		calculations happen within your web browser. If you close or refresh this page, your progress
		will be lost and you will need to start again.
	</p>
	<p>Enjoy the calculators. Let us know of any mistakes, suggestions, or requests.</p>

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
			>{ormRepsPerformed} reps performed
			<input
				type="range"
				min="1"
				max="20"
				bind:value={ormRepsPerformed}
				on:input={updateTable1RM}
			/>
		</label>
	</form>

	<!-- Table -->
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

	<!-- Sources -->
	<h3>Sources</h3>
	<ul>
		<li>
			<a href="https://en.wikipedia.org/wiki/One-repetition_maximum">
				1 rep-max Equations, Epley & Brzycki (Wikipedia)
			</a>
		</li>
		<li>
			<a href="https://www.peterrobertscoaching.com/blog/the-best-way-to-calculate-1-rep-max">
				1 rep-max Equation, dos Remedios
			</a>
		</li>
	</ul>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Calorie expenditure (BMR) -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Calorie expenditure (BMR)</h2>
	<form>
		<!-- McArdle & Cunningham -->
		<h4>McArdle & Cunningham</h4>
		<div class="grid">
			<label>
				Weight (kg)
				<input
					type="number"
					placeholder="e.g. 75"
					min="0"
					max="400"
					step="0.5"
					bind:value={bmrWeight}
					on:input={updateTableBmr}
				/>
			</label>
			<!-- TODO: tooltip showing info on different levels -->
			<label>
				Activity Factor<br />[{bmrActivityLevelStrDict[bmrActivityLevel]}]
				<input
					type="range"
					min="1"
					max="5"
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
		</div>

		<!-- St. Jeor & Benedict -->
		<h4>St. Jeor & Benedict</h4>
		<div class="grid">
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
		</div>
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

	<!-- Sources -->
	<h3>Sources</h3>
	<ul>
		<li>
			<a href="https://www.calculatorpro.com/calculator/katch-mcardle-bmr-calculator/">
				Caloric Expenditure Equation, Katch McArdle (Source 1)
			</a>
		</li>
		<li>
			<a href="https://tdeecalculator.net/about.php">
				Caloric Expenditure Equation, Katch McArdle (& Harris Benedict)
			</a>
		</li>
		<li>
			<a href="https://www.slideshare.net/lsandon/weight-management-in-athletes-lecture">
				Caloric Expenditure Equation, Cunningham
			</a>
		</li>
		<li>
			<a href="https://www.myfeetinmotion.com/mifflin-st-jeor-equation/">
				Caloric Expenditure Equation, Mifflin St. Jeor
			</a>
		</li>
	</ul>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Body fat % -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Body fat</h2>
	<form>
		<!-- Navy values -->
		<h4>Navy</h4>
		<div class="grid">
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
					step="0.5"
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
					step="0.5"
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
		</div>

		<!-- Three site values -->
		<h4>Three site</h4>
		<div class="grid">
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
				Abdominal (mm)
				<input
					type="number"
					min="2"
					max="70"
					placeholder="e.g. 20"
					bind:value={bfSkinFoldAbdominal}
					on:input={updateTableBf}
				/>
			</label>
			<label>
				Thigh (mm)
				<input
					type="number"
					min="2"
					max="70"
					placeholder="e.g. 20"
					bind:value={bfSkinFoldThigh}
					on:input={updateTableBf}
				/>
			</label>
		</div>

		<!-- Seven site values -->
		<h4>Seven site</h4>
		<div class="grid">
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
		</div>
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

	<!-- Sources -->
	<h3>Sources</h3>
	<ul>
		<li>
			<a
				href="https://www.thecalculator.co/health/Navy-Method-Body-Fat-Measurement-Calculator-1112.html"
			>
				Body Fat Equation, Navy
			</a>
		</li>
		<li>
			<a
				href="https://www.thecalculator.co/health/Body-Fat-Percentage-3-Site-Skinfold-Test-1113.html"
			>
				Body Fat Equation, 3 Site (skin calipers)
			</a>
		</li>
		<li>
			<a
				href="https://www.thecalculator.co/health/Body-Fat-Percentage-7-Site-Skinfold-Calculator-1115.html"
			>
				Body Fat Equation, 7 Site (skin calipers)
			</a>
		</li>
	</ul>

	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<!-- Lean body limits -->
	<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
	<h2>Lean body limits (young men)</h2>
	<form>
		<!-- Berkhan & Helms values -->
		<h4>Berkhan & Helms</h4>
		<div class="grid">
			<label>
				Height (cm)
				<input
					type="number"
					min="30"
					max="275"
					placeholder="e.g. 180"
					bind:value={height}
					on:input={updateTableLbl}
				/>
			</label>
			<label>
				Desired Body Fat %
				<input
					type="number"
					min="4"
					max="70"
					step="0.5"
					placeholder="e.g. 15"
					bind:value={lblDesiredBodyFat}
					on:input={updateTableLbl}
				/>
			</label>
		</div>

		<!-- Casey Butt values -->
		<h4>Casey Butt, PhD</h4>
		<div class="grid">
			<label>
				Wrist (cm)
				<input
					type="number"
					min="4"
					max="40"
					step="0.25"
					placeholder="e.g. 17.5"
					bind:value={lblWrist}
					on:input={updateTableLbl}
				/>
			</label>
			<label>
				Ankle (cm)
				<input
					type="number"
					min="4"
					max="70"
					step="0.25"
					placeholder="e.g. 21.5"
					bind:value={lblAnkle}
					on:input={updateTableLbl}
				/>
			</label>
		</div>
	</form>

	<!-- Table -->
	<table>
		<thead>
			<tr>
				<th>Equation</th>
				<th>Condition</th>
				<th>Weight</th>
			</tr>
		</thead>
		<!-- TODO: Split last 7 elements (chest - calf) into separate table -->
		<tbody>
			{#each Object.values(lblTableData) as row}
				<tr>
					{#each Object.values(row.slice(0, 3)) as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- 2nd Table -->
	<h4>Casey Butt</h4>
	<table>
		<thead>
			<tr>
				<th>Measurement</th>
				<th>Max value (inches)</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(lblTableData.slice(-1)[0].slice(-1)[0]) as row}
				<tr>
					<td>{row[0]}</td>
					<td>{row[1]}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<!-- Sources -->
	<h3>Sources</h3>
	<ul>
		<li>
			<a href="https://rippedbody.com/maximum-muscular-potential/">
				Lean Body Limits Equation (young men), Berkhan
			</a>
		</li>
		<li>
			<a
				href="https://www.alanaragonblog.com/wp-content/uploads/2014/11/Aug-2014-AARR-Eric-Helms-Article.pdf"
			>
				Lean Body Limits Equation (young men), Eric Helms [Solved with BMI equations]
			</a>
		</li>
		<li>
			<a href="https://fastfoodmacros.com/maximum-muscular-potential-calculator.asp">
				Lean Body Limits Equation (young men), Casey Butt
			</a>
		</li>
		<li>
			<a
				href="https://www.poseidonperformance.com/blog/what-is-the-maximum-muscular-potential-of-drug-free-athletes-or-natural-bodybuilders"
			>
				Lean Body Limits Equation (young men), Casey Butt (Source 2)
			</a>
		</li>
	</ul>

	<!-- Footer -->
	<Footer />
</main>
