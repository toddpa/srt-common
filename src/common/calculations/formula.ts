import * as Gaussian from "gaussian"

export class Formula {
   constructor() {

   }
   static b(pd: number) {
      return Math.pow(0.11852 - 0.05478 * Math.log(pd), 2);
   }

   static rR(a: number, R: number): number {
      return Math.pow(a / (1 - R), 0.5)
   }

   static capitalPP(pdpp: number){
      return 0.15 + 160 * pdpp;
   }

}