import * as Gaussian from "gaussian"

export namespace CapitalRequirements {
   export function SMECalculation(pd: number, lgd: number, M: number, s: number): number {
      let dist = Gaussian(0, 1);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd))) - 0.04 * (1 - (s - 5) / 45);
      let Ri: number = 1 / (1 - R);
      let rRi: number = Math.pow(Ri, 0.5);
      let b: number = Math.pow(0.11852 - 0.05478 * Math.log(pd), 2);
      return lgd * (dist.cdf(rRi * dist.ppf(pd) + rRi * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b);
   }
   
   export  function AnotherCalculation(pd: number, lgd: number, M: number, s: number): number {
      let dist = Gaussian(0, 1);
      let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd))) - 0.04 * (1 - (s - 5) / 45);
      let Ri: number = 1 / (1 - R);
      let rRi: number = Math.pow(Ri, 0.5);
      let b: number = Math.pow(0.11852 - 0.05478 * Math.log(pd), 2);
      return (lgd * (dist.cdf(rRi * dist.ppf(pd) + rRi * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b));
   }
}
