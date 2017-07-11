import { CapReq } from "./calculations/cap-req-calculator";
import { CapitalRequirements } from "./calculations/cap-req-lib";
import { Supervisory, SupervisoryArgs } from "./calculations/supervisory";

export {
   CapReq,
   Supervisory,
   SupervisoryArgs
}

export interface InternalRpl {
   sha1: string;
   bankCode: string;
   startDate: Date;
   element: number;
   testCase: number;
   value: number;
}
