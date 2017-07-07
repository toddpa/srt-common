import { CapReqCalculator } from "./calculations/cap-req-calculator";
import { CapitalRequirements } from "./calculations/cap-req-lib";
import { Supervisory } from "./calculations/supervisory";

export {
   CapReqCalculator,
   Supervisory
}

export interface InternalRpl {
   sha1: string;
   bankCode: string;
   startDate: Date;
   element: number;
   testCase: number;
   value: number;
}
