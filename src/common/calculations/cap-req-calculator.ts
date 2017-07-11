import * as Gaussian from "gaussian"
import { BetaDist } from "./beta-dist"
import { ArgsAsJSON } from "./formula"

export namespace CapReq {
   function funcB(pd: number): number {
      return Math.pow(0.11852 - 0.05478 * Math.log(pd), 2);
   }

   function rR(a: number, R: number): number {
      return Math.pow(a / (1 - R), 0.5)
   }

   function capitalPP(pdpp: number) {
      return 0.15 + 160 * pdpp;
   }

   export class SMEBasel implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SMEBasel.calc(args.pd, args.lgd, args.M, args.s);
      }

      /**
       * 
       * @param pd - probability of default
       * @param lgd - loss given default
       * @param M - 
       * @param s - 
       */
      static calc(pd: number, lgd: number, M: number, s: number): number {
         let dist = Gaussian(0, 1);
         let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd))) - 0.04 * (1 - (s - 5) / 45);
         let b: number = funcB(pd);
         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b);
      }
   }

   export class SMECRR implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SMECRR.calc(args.pd, args.lgd, args.M, args.s, args.crr);
      }

      static calc(pd: number, lgd: number, M: number, s: number, crr: number): number {
         return SMEBasel.calc(pd, lgd, M, s) * crr;
      }
   }

   export class SMERW implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SMERW.calc(args.pd, args.lgd, args.M, args.s, args.crr, args.rw);
      }

      static calc(pd: number, lgd: number, M: number, s: number, crr: number, rw: number): number {
         return SMEBasel.calc(pd, lgd, M, s) * crr * rw;
      }
   }

   export class HVCRE implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return HVCRE.calc(args.pd, args.lgd, args.M, args.s);
      }

      static calc(pd: number, lgd: number, M: number, s: number): number {
         let dist = Gaussian(0, 1);
         let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.3 * (1 - (1 - Math.exp(-50.0 * pd)));
         let b: number = funcB(pd);

         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b);
      }
   }

   export class Revolving implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return Revolving.calc(args.pd, args.lgd);
      }

      static calc(pd: number, lgd: number) {
         let dist = Gaussian(0, 1);
         let R = 0.4;
         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999))) - pd * lgd;
      }
   }

   export class Residential implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return Residential.calc(args.pd, args.lgd);
      }

      static calc(pd: number, lgd: number) {
         let dist = Gaussian(0, 1);
         let R = 0.15;
         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999))) - pd * lgd;
      }
   }

   export class OtherRetail implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SOVPP.calc(args.pd, args.lgd, args.M, args.pdpp);
      }

      static calc(pd: number, lgd: number) {
         let dist = Gaussian(0, 1);
         let R: number = 0.03 * (1 - Math.exp(-35.0 * pd)) / (1 - Math.exp(-35.0)) + 0.16 * (1 - (1 - Math.exp(-35.0 * pd)) / (1 - Math.exp(-35.0)));
         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999))) - pd * lgd;
      }
   }

   export class SOVPP implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SOVPP.calc(args.pd, args.lgd, args.M, args.pdpp);
      }

      static calc(pd: number, lgd: number, M: number, pdpp: number): number {
         let dist = Gaussian(0, 1);
         let pdmin = Math.min(pd, pdpp);
         let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)));
         let b: number = funcB(pdmin);
         return lgd * (dist.cdf(rR(1, R) * dist.ppf(pd) + rR(R, R) * dist.ppf(0.999)) - pd) * (1 + (M - 2.5) * b) / (1 - 1.5 * b) + capitalPP(pdpp);
      }
   }

   export class SOV implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return SOV.calc(args.pd, args.lgd);
      }

      static calc(pd: number, lgd: number): number {
         let dist = Gaussian(0, 1);
         let R: number = 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-35.0)));
         let b: number = funcB(pd);
         return 1;  // TODO: what is this meant to be?
      }
   }

   export class CorrelationSOV implements ArgsAsJSON {
      /**
       * 
       * @param args 
       */
      asJSON(args: any) {
         return CorrelationSOV.calc(args.pd);
      }

      static calc(pd: number) {
         return 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-35.0)));
      }
   }
}