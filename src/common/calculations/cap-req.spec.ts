import { CapReq } from "../index";

describe('Component: Capital Requirement Calculations', () => {
   it('should SME calculate SME Cap Requirements - Basel', () => {
      let val;
      val = CapReq.SMEBasel.calc(0.03, 0.45, 3, 5);
      expect(val.toFixed(5)).toBe('0.08183');
   });
   it('should SME calculate SME Cap Requirements - CRR Capital', () => {
      let val;
      val = CapReq.SMECRR.calc(0.03, 0.45, 3, 5, 1.06);
      expect(val.toFixed(5)).toBe('0.08674');
   });
   it('should SME calculate SME Cap Requirements - RW', () => {
      let val;
      val = CapReq.SMERW.calc(0.03, 0.45, 3, 5, 1.06, 12.5);
      expect(val.toFixed(5)).toBe('1.08422');
   });
});
