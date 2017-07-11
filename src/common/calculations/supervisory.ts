import { ArgsAsJSON } from "./formula"
import { BetaDist } from "./beta-dist"

export interface SupervisoryArgs {
   formula: string;
   K: number;
   L: number;
   detach: number;
   N: number;
   LGD: number;
}

export class Supervisory implements ArgsAsJSON {
   log: any = {};

   asJSON(args: any): number {
      return this.calc(args.K, args.L, args.detach, args.N, args.LGD);
   }

   calc(K: number, L: number, Detach: number, N: number, LGD: number, tau: number = 1000, omega: number = 20): number {
      const dist = new BetaDist();

      const T = Detach - L;
      const H = Math.pow(1 - (K / LGD), N);
      const c = K / (1 - H);
      const V = (1 / N) * ((LGD - K) * K + 0.25 * (1 - LGD) * K);
      const F = (((V + Math.pow(K, 2)) / (1 - H)) - Math.pow(c, 2)) + ((1 - K) * K - V) / ((1 - H) * tau);
      const G = (((1 - c) * c) / F) - 1;
      const a = G * c;
      const b = G * (1 - c);
      const D = 1 - (1 - H) * (1 - dist.beta(K, a, b));
      const K_L = (1 - H) * ((1 - dist.beta(L, a, b)) * L + dist.beta(L, a + 1, b) * c);
      const K_KIRB = (1 - H) * ((1 - dist.beta(K, a, b)) * K + dist.beta(K, a + 1, b) * c);
      const K_L_T = (1 - H) * ((1 - dist.beta(L + T, a, b)) * (L + T) + dist.beta(L + T, a + 1, b) * c);

      let S_L: number;
      let S_L_T: number;
      if (L <= K) {
         S_L = L;
      } else {
         S_L = K + K_L - K_KIRB + (D * K / omega) * (1 - Math.exp((omega * (K - L) / K)));
      }

      if ((L + T) <= K) {
         S_L_T = L + T;
      } else {
         S_L_T = K + K_L_T - K_KIRB + (D * K / omega) * (1 - Math.exp(omega * (K - (L + T)) / K))
      }

      this.log.t = T;
      this.log.h = H;
      this.log.c = c;
      this.log.f = F;
      this.log.V = V;
      this.log.G = G;
      this.log.a = a;
      this.log.b = b;
      this.log.d = D;
      this.log.K_L = K_L;
      this.log.K_KIRB = K_KIRB;
      this.log.K_L_T = K_L_T;
      this.log.S_L = S_L;
      this.log.S_L_T = S_L_T;

      return Math.max(0.0056, (S_L_T - S_L) / T) * 12.5;
   }
}
