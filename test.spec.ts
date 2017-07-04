import { CapReqCalculator } from "./index";

/*
 * pd= 0.03
 * lgd=0.4
 * M=3
 * s=25
 * 
 */
/*
let val = ca.capitalRequirementsSME(0.03, 0.4, 3, 25);
console.log('Capital requirement calculation: ' + val);

val = cre.capitalRequirementsSME2(0.03, 0.4, 3, 25);
console.log('Capital requirement calculation 2: ' + val);
*/

describe('Component: Capital Requirement Calculations', () => {
   it('should SME calculate SME Cap req', () => {
      let val = CapReqCalculator.sme(0.03, 0.3, 3, 25);
      // console.log('Value: ' + val);
      expect(val.toFixed(5)).toBe('0.32059');
   });
   it('should SME calculate SME Cap req', () => {
      let val = CapReqCalculator.sme(0.03, 0.4, 3, 25);
      // console.log('Value: ' + val);
      expect(val.toFixed(5)).toBe('0.42746');
   });
});
