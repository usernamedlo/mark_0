'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useMARK0Program } from './MARK_0-data-access'
import { MARK0Create, MARK0List } from './MARK_0-ui'

export default function MARK0Feature() {
  const { publicKey } = useWallet()
  const { programId } = useMARK0Program()

  return publicKey ? (
    <div>
      <AppHero
        title="MARK0"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <MARK0Create />
      </AppHero>
      <MARK0List />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
