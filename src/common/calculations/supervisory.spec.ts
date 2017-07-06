import { Supervisory } from "./supervisory";

describe('Component: Supervisory Formula', () => {
   it('should calculate: ', () => {
      let supervisory = new Supervisory();
      let K: number = 0.11;
      let L: number = 0.01;
      let detach: number = 0.12;
      let N: number = 180;
      let LGD: number = 0.45;
      let tau = 1000;
      let omega = 20;
      let val;
      for (let i = 0; i < 1000; i++) {
         val = supervisory.calc(K, L, detach, N, LGD, tau, omega);
      }
      console.log(supervisory.log);
      expect(val.toFixed(5)).toBe('0.10623');
   });
});
