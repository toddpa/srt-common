import { CapReqCalculator } from "./index";

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
   it('should SME calculate SME Cap req', () => {
      let val = CapReqCalculator.sme2(0.03, 0.4, 3, 25);
      // console.log('Value: ' + val);
      expect(val.toFixed(5)).toBe('100.42746');
   });
});
