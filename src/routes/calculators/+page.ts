// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// One rep max
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const commonNReps = [1, 2, 3, 5, 6, 8, 10, 12, 15, 20];

function ormEpley(weight: number, reps: number): Record<number, number> {
	const oneRepMax = reps <= 0 ? 0 : Math.round(weight * (1 + (reps - 1) / 30));

	const result: Record<number, number> = { 0: 0 };
	for (const n of commonNReps) {
		result[n] = Math.round((oneRepMax * 30) / (29 + Number(n)));
	}
	return result;
}

function ormBrzycki(weight: number, reps: number): Record<number, number> {
	const oneRepMax = reps <= 0 ? 0 : Math.round((weight * 36) / (36.995 - reps + 0.005 * reps ** 2));

	const result: Record<number, number> = { 0: 0 };
	for (const n of commonNReps) {
		result[n] = Math.round((oneRepMax * (36.995 - Number(n) + 0.005 * Number(n) ** 2)) / 36);
	}
	return result;
}

function ormDosRemedios(weight: number, reps: number): Record<number, number> {
	const maxRepRatios: Record<number, number> = {
		1: 1,
		2: 0.92,
		3: 0.9,
		4: 0.89, // NOTE: I added this
		5: 0.87,
		6: 0.82,
		7: 0.781, // NOTE: I added this
		8: 0.75,
		9: 0.72375, // NOTE: I added this
		10: 0.7,
		11: 0.674286, // NOTE: I added this
		12: 0.65,
		13: 0.628571, // NOTE: I added this
		14: 0.611429, // NOTE: I added this
		15: 0.6,
		16: 0.588, // NOTE: I added this
		17: 0.5775, // NOTE: I added this
		18: 0.568, // NOTE: I added this
		19: 0.559, // NOTE: I added this
		20: 0.55 // NOTE: I added this, 20 reps is NOT in the original equation.
	};
	const oneRepMax = reps <= 0 ? 0 : Math.round(weight / maxRepRatios[reps]);

	const result: Record<number, number> = { 0: 0 };
	for (const n of commonNReps) {
		result[n] = Math.round(oneRepMax * maxRepRatios[Number(n)]);
	}
	return result;
}

export function _calcOrmTableData(weight: number, reps: number): number[][] {
	// Compute results
	const epleyResults = ormEpley(weight, reps);
	const brzyckiResults = ormBrzycki(weight, reps);
	const dosRemediosResults = ormDosRemedios(weight, reps);

	const rows = [];
	for (const n of commonNReps) {
		const row: number[] = [Number(n), epleyResults[n], brzyckiResults[n], dosRemediosResults[n]];
		rows.push(row);
	}

	// Return them
	return rows;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// BMR
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const activityFactors = [0.2, 0.375, 0.55, 0.725, 0.9];
function bmrKatchMcardle(activityFactor: number, weight: number, bodyFat: number): number[] {
	const lbm = weight * (1 - bodyFat);
	const bmr = 370 + 21.6 * lbm;
	const tdee = bmr * (1 + activityFactor);

	return [Math.round(bmr), Math.round(tdee)];
}

function bmrCunningham(activityFactor: number, weight: number, bodyFat: number): number[] {
	const lbm = weight * (1 - bodyFat);
	const bmr = 500 + 22 * lbm;
	const tdee = bmr * (1 + activityFactor);

	return [Math.round(bmr), Math.round(tdee)];
}

function bmrMifflinStJeor(
	activityFactor: number,
	weight: number,
	gender: string,
	height: number,
	age: number
): number[] {
	function genderSpecificBMR(bmr: number) {
		const _secondTerm: Record<string, number> = {
			MALE: 5,
			FEMALE: -161
		};
		return bmr + _secondTerm[gender];
	}

	const bmr = genderSpecificBMR(10 * weight + 6.25 + 6.25 * height - 5 * age);
	const tdee = bmr * (1 + activityFactor);

	return [Math.round(bmr), Math.round(tdee)];
}

function bmrHarrisBenedict(
	activityFactor: number,
	weight: number,
	gender: string,
	height: number,
	age: number
): number[] {
	function genderSpecificBMR() {
		const genderSpecificBmr: Record<string, number> = {
			MALE: 13.397 * weight + 4.799 * height - 5.677 * age + 88.362,
			FEMALE: 9.247 * weight + 3.098 * height - 4.33 * age + 447.593
		};
		return genderSpecificBmr[gender];
	}

	const bmr = genderSpecificBMR();
	const tdee = bmr * (1 + activityFactor);

	return [Math.round(bmr), Math.round(tdee)];
}

export function _calcBmrTableData(
	activityLevel: number,
	weight: number,
	bodyFat: number | null,
	gender: string,
	height: number | null,
	age: number | null
): (number | string)[][] {
	const activityFactor = activityFactors[activityLevel - 1];

	// Compute results
	let rows =
		bodyFat != null ? bmrKatchMcardle(activityFactor, weight, bodyFat / 100) : [String(), String()];
	const resultsKatchMcArdle = ['Katch McArdle', ...rows];

	rows =
		bodyFat != null ? bmrCunningham(activityFactor, weight, bodyFat / 100) : [String(), String()];
	const resultsCunningham = ['Cunningham', ...rows];

	rows =
		height != null && age != null
			? bmrMifflinStJeor(activityFactor, weight, gender, height, age)
			: [String(), String()];
	const resultsMifflinStJeor = ['Mifflin St Jeor', ...rows];

	rows =
		height != null && age != null
			? bmrHarrisBenedict(activityFactor, weight, gender, height, age)
			: [String(), String()];
	const resultsHarrisBenedict = ['Harris Benedict', ...rows];

	// Return them
	return [resultsKatchMcArdle, resultsCunningham, resultsMifflinStJeor, resultsHarrisBenedict];
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Body fat
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function bfNavy(
	gender: string,
	height: number,
	waist: number,
	neck: number,
	hip: number | null
): number {
	// Validate and assign default to nullable "hip"
	if (gender == 'FEMALE' && hip == null) {
		return NaN;
	} else if (hip == null) {
		hip = 0; // placeholder value, not used for men anyway
	}

	const genderSpecificDenominator: Record<string, number> = {
		MALE: 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height),
		FEMALE: 1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)
	};

	return Number((495 / genderSpecificDenominator[gender] - 450).toFixed(2));
}

function bf3Site(
	gender: string,
	age: number,
	chest: number,
	abdominal: number,
	thigh: number
): number {
	// Compute values
	const st3 = chest + abdominal + thigh;
	const genderSpecificDenominator: Record<string, number> = {
		MALE: 1.10938 - 0.0008267 * st3 + 0.0000016 * st3 * st3 - 0.0002574 * age,
		FEMALE: 1.089733 - 0.0009245 * st3 + 0.0000025 * st3 * st3 - 0.0000979 * age
	};

	return Number((495 / genderSpecificDenominator[gender] - 450).toFixed(2));
}

function bf7Site(
	gender: string,
	age: number,
	// 3-Site values
	chest: number,
	abdominal: number,
	thigh: number,
	// 7-Site values
	tricep: number,
	subscapula: number,
	suprailiac: number,
	midaxillary: number
): number {
	// Compute values
	const st7 = chest + abdominal + thigh + tricep + subscapula + suprailiac + midaxillary;
	const genderSpecificDenominator: Record<string, number> = {
		MALE: 1.112 - 0.00043499 * st7 + 0.00000055 * st7 * st7 - 0.00028826 * age,
		FEMALE: 1.097 - 0.00046971 * st7 + 0.00000056 * st7 * st7 - 0.00012828 * age
	};

	return Number((495 / genderSpecificDenominator[gender] - 450).toFixed(2));
}

export function _calcBfTableData(
	gender: string,
	age: number | null,
	height: number | null,
	waist: number | null,
	neck: number | null,
	hip: number | null,
	// 3-Site values
	chest: number | null,
	abdominal: number | null,
	thigh: number | null,
	// 7-Site values
	tricep: number | null,
	subscapula: number | null,
	suprailiac: number | null,
	midaxillary: number | null
): number[] {
	// Gather navy, 3-site, and 7-site
	const navyValid = height != null && waist != null && neck != null;
	const navy = navyValid ? bfNavy(gender, height, waist, neck, hip) : NaN;

	const threeSiteValid = age != null && chest != null && abdominal != null && thigh != null;
	const threeSite = threeSiteValid ? bf3Site(gender, age, chest, abdominal, thigh) : NaN;

	const sevenSiteValid =
		threeSiteValid &&
		tricep != null &&
		subscapula != null &&
		suprailiac != null &&
		midaxillary != null;
	const sevenSite = sevenSiteValid
		? bf7Site(gender, age, chest, abdominal, thigh, tricep, subscapula, suprailiac, midaxillary)
		: NaN;

	// Return tuple of values
	return [navy, threeSite, sevenSite];
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Lean body limits
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function lblBerkhan(height: number): string[] {
	const minWeight = Number(((height - 102) * 2.205).toFixed(1));
	const maxWeight = Number(((height - 98) * 2.205).toFixed(1));
	return ['Berkhan', 'Lean (5-6%)', `${minWeight} ~ ${maxWeight} lbs`];
}

function lblHelms(height: number, desiredBodyFat: number): (number | string)[] {
	const minWeight = Number(((4851.0 * (height * 0.01) ** 2) / (100.0 - desiredBodyFat)).toFixed(1));
	const maxWeight = Number(
		((5402.25 * (height * 0.01) ** 2) / (100.0 - desiredBodyFat)).toFixed(1)
	);
	return ['Helms', `${desiredBodyFat}% body fat`, `${minWeight} ~ ${maxWeight} lbs`];
}

function lblCasey(
	height: number,
	desiredBodyFat: number,
	wrist: number,
	ankle: number
): (number | string)[] {
	// Convert to imperial units
	height /= 2.54;
	wrist /= 2.54;
	ankle /= 2.54;

	const lbm = Number(
		(
			height ** (3 / 2) *
			(Math.sqrt(wrist) / 22.667 + Math.sqrt(ankle) / 17.0104) *
			(1 + desiredBodyFat / 100 / 2.24)
		).toFixed(1)
	);
	const weight = Number((lbm / (1 - desiredBodyFat / 100)).toFixed(1));

	return [
		// eq
		'Casey',
		// condition
		`${desiredBodyFat}% body fat`,
		// weight
		`${weight} lbs`
		// // lbm
		// `${lbm} lbs`,
		// // chest
		// Number((1.625 * wrist + 1.3682 * ankle + 0.3562 * height).toFixed(2)),
		// // arm
		// Number((1.1709 * wrist + 0.135 * height).toFixed(2)),
		// // forearm
		// Number((0.95 * wrist + 0.1041 * height).toFixed(2)),
		// // neck
		// Number((1.1875 * wrist + 0.1301 * height).toFixed(2)),
		// // thigh
		// Number((1.4737 * ankle + 0.1918 * height).toFixed(2)),
		// // calf
		// Number((0.9812 * ankle + 0.125 * height).toFixed(2))
	];
}

export function _calcLblTableData(
	height: number | null,
	desiredBodyFat: number | null,
	wrist: number | null,
	ankle: number | null
) {
	const validBerkhan = height != null;
	const berkhan = validBerkhan
		? lblBerkhan(height)
		: ['Berkhan', String(), 'Berkhan equation failed!'];
	const validHelms = validBerkhan && desiredBodyFat != null;
	const helms = validHelms
		? lblHelms(height, desiredBodyFat)
		: ['Helms', String(), 'Helms equation failed!'];
	const casey =
		validHelms && wrist != null && ankle != null
			? lblCasey(height, desiredBodyFat, wrist, ankle)
			: ['Casey', String(), 'Casey equation failed!'];

	return [berkhan, helms, casey];
}
