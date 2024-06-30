import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/



/**
 * Creates an event object for the AgreementCreated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { agreementCreatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  agreementCreatedEvent()
 * ],
 * });
 * ```
 */ 
export function agreementCreatedEvent() {
  return prepareEvent({
    signature: "event AgreementCreated(uint256 agreementId, address creator, string content)",
  });
};
  



/**
 * Creates an event object for the AgreementSigned event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { agreementSignedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  agreementSignedEvent()
 * ],
 * });
 * ```
 */ 
export function agreementSignedEvent() {
  return prepareEvent({
    signature: "event AgreementSigned(uint256 agreementId, address signer)",
  });
};
  



/**
 * Creates an event object for the AgreementValid event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { agreementValidEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  agreementValidEvent()
 * ],
 * });
 * ```
 */ 
export function agreementValidEvent() {
  return prepareEvent({
    signature: "event AgreementValid(uint256 agreementId, string firstpartyid, string secondpartyid)",
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "agreementCount" function on the contract.
 * @param options - The options for the agreementCount function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { agreementCount } from "TODO";
 * 
 * const result = await agreementCount();
 * 
 * ```
 */
export async function agreementCount(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbb7bb278",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "agreements" function.
 */
export type AgreementsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "agreements" function on the contract.
 * @param options - The options for the agreements function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { agreements } from "TODO";
 * 
 * const result = await agreements({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function agreements(
  options: BaseTransactionOptions<AgreementsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbd14de96",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "creator",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "content",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "secondPartyAddress",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "signed",
      "type": "bool"
    },
    {
      "internalType": "bool",
      "name": "validateSignature",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "getAgreementDetails" function.
 */
export type GetAgreementDetailsParams = {
  agreementId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_agreementId","type":"uint256"}>
};

/**
 * Calls the "getAgreementDetails" function on the contract.
 * @param options - The options for the getAgreementDetails function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAgreementDetails } from "TODO";
 * 
 * const result = await getAgreementDetails({
 *  agreementId: ...,
 * });
 * 
 * ```
 */
export async function getAgreementDetails(
  options: BaseTransactionOptions<GetAgreementDetailsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xb36f7753",
  [
    {
      "internalType": "uint256",
      "name": "_agreementId",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "creator",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "content",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "secondPartyAddress",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "firstPartyName",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "firstPartyValidId",
      "type": "string"
    },
    {
      "internalType": "bool",
      "name": "signed",
      "type": "bool"
    }
  ]
],
    params: [options.agreementId]
  });
};




/**
 * Calls the "getAllAgreements" function on the contract.
 * @param options - The options for the getAllAgreements function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAllAgreements } from "TODO";
 * 
 * const result = await getAllAgreements();
 * 
 * ```
 */
export async function getAllAgreements(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x4e6873c7",
  [],
  [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
  ]
],
    params: []
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "createAgreement" function.
 */
export type CreateAgreementParams = {
  content: AbiParameterToPrimitiveType<{"internalType":"string","name":"_content","type":"string"}>
secondPartyAddress: AbiParameterToPrimitiveType<{"internalType":"address","name":"_secondPartyAddress","type":"address"}>
firstPartyName: AbiParameterToPrimitiveType<{"internalType":"string","name":"_firstPartyName","type":"string"}>
firstPartyValidId: AbiParameterToPrimitiveType<{"internalType":"string","name":"_firstPartyValidId","type":"string"}>
};

/**
 * Calls the "createAgreement" function on the contract.
 * @param options - The options for the "createAgreement" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { createAgreement } from "TODO";
 * 
 * const transaction = createAgreement({
 *  content: ...,
 *  secondPartyAddress: ...,
 *  firstPartyName: ...,
 *  firstPartyValidId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function createAgreement(
  options: BaseTransactionOptions<CreateAgreementParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe7590d79",
  [
    {
      "internalType": "string",
      "name": "_content",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "_secondPartyAddress",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "_firstPartyName",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_firstPartyValidId",
      "type": "string"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.content, options.secondPartyAddress, options.firstPartyName, options.firstPartyValidId]
  });
};


/**
 * Represents the parameters for the "signAgreement" function.
 */
export type SignAgreementParams = {
  agreementId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_agreementId","type":"uint256"}>
fullname: AbiParameterToPrimitiveType<{"internalType":"string","name":"_fullname","type":"string"}>
validId: AbiParameterToPrimitiveType<{"internalType":"string","name":"_validId","type":"string"}>
};

/**
 * Calls the "signAgreement" function on the contract.
 * @param options - The options for the "signAgreement" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { signAgreement } from "TODO";
 * 
 * const transaction = signAgreement({
 *  agreementId: ...,
 *  fullname: ...,
 *  validId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function signAgreement(
  options: BaseTransactionOptions<SignAgreementParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x46246466",
  [
    {
      "internalType": "uint256",
      "name": "_agreementId",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_fullname",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_validId",
      "type": "string"
    }
  ],
  []
],
    params: [options.agreementId, options.fullname, options.validId]
  });
};


/**
 * Represents the parameters for the "validateSignature" function.
 */
export type ValidateSignatureParams = {
  agreementId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_agreementId","type":"uint256"}>
};

/**
 * Calls the "validateSignature" function on the contract.
 * @param options - The options for the "validateSignature" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { validateSignature } from "TODO";
 * 
 * const transaction = validateSignature({
 *  agreementId: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function validateSignature(
  options: BaseTransactionOptions<ValidateSignatureParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x2d99b5b4",
  [
    {
      "internalType": "uint256",
      "name": "_agreementId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.agreementId]
  });
};


