// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import MARK0IDL from '../target/idl/MARK_0.json'
import type { MARK0 } from '../target/types/MARK_0'

// Re-export the generated IDL and type
export { MARK0, MARK0IDL }

// The programId is imported from the program IDL.
export const MARK0_PROGRAM_ID = new PublicKey(MARK0IDL.address)

// This is a helper function to get the MARK0 Anchor program.
export function getMARK0Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...MARK0IDL, address: address ? address.toBase58() : MARK0IDL.address } as MARK0, provider)
}

// This is a helper function to get the program ID for the MARK0 program depending on the cluster.
export function getMARK0ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the MARK0 program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return MARK0_PROGRAM_ID
  }
}
