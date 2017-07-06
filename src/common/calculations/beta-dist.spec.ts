import { BetaDist } from "./beta-dist";

describe('Component: Beta Distribution', () => {
   it('should calculate a beta distribution: 0.5, 1, 1', () => {
      let dist = new BetaDist();
      const val = dist.beta(0.5, 1, 1);
      expect(val.toFixed(5)).toBe('0.50000');
   });

   it('should calculate a beta distribution: 0.5, 0.8, 1', () => {
      let dist = new BetaDist();
      const val = dist.beta(0.5, 0.8, 1);
      expect(val.toFixed(5)).toBe('0.57435');
   });
    
   it('should calculate a beta distribution: 0.45, 0.75, 0.25', () => {
      let dist = new BetaDist();
      const val = dist.beta(0.45, 0.75, 0.25);
      expect(val.toFixed(5)).toBe('0.19746');
   });
});
