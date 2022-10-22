/**
 * @function formatCentsToDollars
 * @param cents the value to be converted
 * @description Coverts currency from cent to Dollars
 * @returns the converted value
 */
export function formatCentsToDollars(cents: number): string {
    if (cents < 10) { // equate the converted value to zero if cent is less than 10
      return `$0.0${cents}`; 
    }
  
    let d = (cents / 100) >> 0;
    let c = cents % 100;
  
    return `$${d}.${c}`; // the new converted value
};