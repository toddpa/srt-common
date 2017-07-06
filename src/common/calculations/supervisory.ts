import { Formula } from "./formula"
import { BetaDist } from "./beta-dist"

export class Supervisory extends Formula {
   log: any = {};

   calc(K: number, L: number, Detach: number, N: number, LGD: number, tau: number = 1000, omega: number = 20) {
      let dist = new BetaDist();
      let T: number;
      let H: number;
      let c: number;
      let V: number;
      let F: number;
      let G: number;
      let a: number;
      let b: number;
      let D: number;
      let K_L: number;
      let K_KIRB: number;
      let K_L_T: number;
      let S_L: number;
      let S_L_T: number;

      T = Detach - L;
      H = Math.pow(1 - (K / LGD), N);
      this.log.h = H;
      c = K / (1 - H);
      this.log.c = c;
      V = (1 / N) * ((LGD - K) * K + 0.25 * (1 - LGD) * K);
      this.log.V = V;
      F = (((V + Math.pow(K, 2)) / (1 - H)) - Math.pow(c, 2)) + ((1 - K) * K - V) / ((1 - H) * tau);
      this.log.f = F;
      G = (((1 - c) * c) / F) - 1;
      this.log.G = G;
      a = G * c;
      this.log.a = a;
      b = G * (1 - c);
      this.log.b = b;
      D = 1 - (1 - H) * (1 - dist.beta(K, a, b));
      this.log.d = D;
      K_L = (1 - H) * ((1 - dist.beta(L, a, b)) * L + dist.beta(L, a + 1, b) * c);
      this.log.K_L = K_L;
      K_KIRB = (1 - H) * ((1 - dist.beta(K, a, b)) * K + dist.beta(K, a + 1, b) * c);
      this.log.K_KIRB = K_KIRB;
      K_L_T = (1 - H) * ((1 - dist.beta(L + T, a, b)) * (L + T) + dist.beta(L + T, a + 1, b) * c);
      this.log.K_L_T = K_L_T;

      if (L <= K) {
         S_L = L;
         this.log.S_L = S_L;
      } else {
         S_L = K + K_L - K_KIRB + (D * K / omega) * (1 - Math.exp((omega * (K - L) / K)));
         this.log.S_L = S_L;
      }

      if ((L + T) <= K) {
         S_L_T = L + T;
         this.log.S_L_T = S_L_T;
      } else {
         S_L_T = K + K_L_T - K_KIRB + (D * K / omega) * (1 - Math.exp(omega * (K - (L + T)) / K))
         this.log.S_L_T = S_L_T;
      }
      return Math.max(0.0056 * T, S_L_T - S_L);
   }

   static capitalCorrelationSOV(pd: number) {
      return 0.12 * (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-50.0)) + 0.24 * (1 - (1 - Math.exp(-50.0 * pd)) / (1 - Math.exp(-35.0)));
   }

}
