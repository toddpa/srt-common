import * as Gaussian from "gaussian"
import { Formula } from "./formula"
import { BetaDist } from "./beta-dist"

type Reg = {
   r : {
      CRR: number,
      RW: number
   }
};

export class CapReqCalculator extends Formula {
   /**
    * 
    * @param pd - probability of default
    * @param lgd - loss given default
    * @param M - 
    * @param s - 
    */

   static reg = {
      eu: {
         CRR: 1.06,
         RW: 12.5 
      }
   };

   static smeBasel(pd: number, lgd: number, M: number, s: number): number {
      let dist = Gaussian(0, 1);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd))) - 0.04 * (1 - (s - 5) / 45);

      let b: number = Formula.b(pd);
      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b);
   }

   static smeCRRCapital(pd: number, lgd: number, M: number, s: number, crr: number): number {
      return CapReqCalculator.smeBasel(pd, lgd, M, s) * crr;
   }

   static smeRW(pd: number, lgd: number, M: number, s: number, crr: number, rw: number): number {
      return CapReqCalculator.smeBasel(pd, lgd, M, s) * crr * rw;
   }
   
   static hv_cre(pd: number, lgd: number, M: number, s: number): number {
      let dist = Gaussian(0, 1);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.3 * (1 - (1 - Math.exp(-50.0 * pd)));
      let b: number = Formula.b(pd);

      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b);
   }

   static revolving(pd: number, lgd: number) {
      let dist = Gaussian(0, 1);
      let R = 0.4;
      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999))) - pd * lgd;
   }

   static residential(pd: number, lgd: number) {
      let dist = Gaussian(0, 1);
      let R = 0.15;
      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999))) - pd * lgd;
   }

   static otherRetail(pd: number, lgd: number) {
      let dist = Gaussian(0, 1);
      let R: number = 0.03 * (1 - Math.exp(-35.0 * pd)) / (1 - Math.exp(-35.0)) + 0.16 * (1 - (1 - Math.exp(-35.0 * pd)) / (1 - Math.exp(-35.0)));
      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999))) - pd * lgd;
   }

   static sovPP(pd: number, lgd: number, M: number, pdpp: number): number {
      let dist = Gaussian(0, 1);
      let pdmin = Math.min(pd, pdpp);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)));
      let b: number = Formula.b(pdmin);
      return lgd * (dist.cdf(Formula.rR(1, R) * dist.ppf(pd) + Formula.rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b) + Formula.capitalPP(pdpp);
   }

   static sov(pd: number, lgd: number) {
      let dist = Gaussian(0, 1);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-35.0)));
      let b: number = Formula.b(pd);
   }

   static capitalCorrelationSOV(pd: number) {
      return 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-35.0)));
   }
}
