import { Supervisory } from "./supervisory";

describe('Component: Supervisory Formula', () => {
   it('should calculate: 0.07', () => {
      let supervisory = new Supervisory();
      let K: number = 0.11;
      let L: number = 0.2;
      let detach: number = 1;
      let N: number = 130;
      let LGD: number = 0.45;
      let tau = 1000;
      let omega = 20;
      let val;
      val = supervisory.calc(K, L, detach, N, LGD, tau, omega);
      console.log(supervisory.log);
      expect(val.toFixed(2)).toBe('0.07');
   });

   it('should calculate: 100% capital i.e 12.5 RW', () => {
      let supervisory = new Supervisory();
      let K: number = 0.11;
      let L: number = 0;
      let detach: number = 0.01;
      let N: number = 130;
      let LGD: number = 0.45;
      let tau = 1000;
      let omega = 20;
      let val;
      val = supervisory.calc(K, L, detach, N, LGD, tau, omega);
      console.log(supervisory.log);
      expect(val.toFixed(1)).toBe('12.5');
   });

   // {"formula":"supervisory","K":1.35,"L":3.55,"detach":0.75,"N":150,"LGD":0.45}
   it('should calculate: 100% capital i.e 12.5 RW', () => {
      let supervisory = new Supervisory();
      let K: number = 0.12;
      let L: number = 0.03;
      let detach: number = 0.75;
      let N: number = 150;
      let LGD: number = 0.45;
      let tau = 1000;
      let omega = 20;
      let val;
      val = supervisory.calc(K, L, detach, N, LGD, tau, omega);
      console.log(supervisory.log);
      expect(val.toFixed(4)).toBe('1.7683');
   });
});
