
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VARIABLES - One rep max
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export let ormWeightLifted = 0;
export let ormRepsPerformed = 0;
export let ormTableData: Array<Array<number>> = [[]];

export function updateTable1RM() {
    if (ormWeightLifted > 0 && ormRepsPerformed > 0) {
        ormTableData = [[ormRepsPerformed, ormWeightLifted, ormWeightLifted, ormWeightLifted]];
    } else {
        ormTableData = [[]];
    }
}