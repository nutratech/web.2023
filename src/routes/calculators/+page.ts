const commonNReps = [1, 2, 3, 5, 6, 8, 10, 12, 15, 20];

function ormEpley(weight: number, reps: number): Record<number, number> {
	const oneRepMax = Math.round(weight * (1 + (reps - 1) / 30));

	const result: Record<number, number> = {};
	for (const n of commonNReps) {
		result[n] = Math.round((oneRepMax * 30) / (29 + Number(n)));
	}
	return result;
}

function ormBrzycki(weight: number, reps: number): Record<number, number> {
	const oneRepMax = Math.round((weight * 36) / (36.995 - reps + 0.005 * reps ** 2));

	const result: Record<number, number> = {};
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
	const oneRepMax = Math.round(weight / maxRepRatios[reps]);

	const result: Record<number, number> = {};
	for (const n of commonNReps) {
		result[n] = Math.round(oneRepMax * maxRepRatios[Number(n)]);
	}
	return result;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// One rep max
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function _calcOrmTableData(weight: number, reps: number): number[][] {
	const epleyResults = ormEpley(weight, reps);
	const brzyckiResults = ormBrzycki(weight, reps);
	const dosRemediosResults = ormDosRemedios(weight, reps);

	const rows = [];
	for (const n of commonNReps) {
		const row: number[] = [Number(n), epleyResults[n], brzyckiResults[n], dosRemediosResults[n]];
		rows.push(row);
	}
	return rows;
}
