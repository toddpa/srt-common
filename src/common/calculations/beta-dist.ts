export class BetaDist {
   constructor() {
   }

   logGamma(Z: number): number {
      let S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - .00000536382 / (Z + 5);
      return (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
   }

   betinc(X: number, A: number, B: number): number {
      let A0 = 0;
      let B0 = 1;
      let A1 = 1;
      let B1 = 1;
      let M9 = 0;
      let A2 = 0;
      let C9;
      while (Math.abs((A1 - A2) / A1) > .00001) {
         A2 = A1;
         C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
         A0 = A1 + C9 * A0;
         B0 = B1 + C9 * B0;
         M9 = M9 + 1;
         C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
         A1 = A0 + C9 * A1;
         B1 = B0 + C9 * B1;
         A0 = A0 / B1;
         B0 = B0 / B1;
         A1 = A1 / B1;
         B1 = 1;
      }
      return A1 / A
   }

   beta(Z: number, A: number, B: number): number {
      let beta: number; 
      let S: number;
      let BT: number;

      if (A <= 0) {
         alert("alpha must be positive")
      } else if (B <= 0) {
         alert("beta must be positive")
      } else if (Z <= 0) {
         beta = 0
      } else if (Z >= 1) {
         beta = 1
      } else {
         S = A + B;
         BT = Math.exp(this.logGamma(S) - this.logGamma(B) - this.logGamma(A) + A * Math.log(Z) + B * Math.log(1 - Z));
         if (Z < (A + 1) / (S + 2)) {
            beta = BT * this.betinc(Z, A, B)
         } else {
            beta = 1 - BT * this.betinc(1 - Z, B, A)
         }
      }
      return beta;
   }
} 