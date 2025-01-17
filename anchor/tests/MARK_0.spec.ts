import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {MARK0} from '../target/types/MARK_0'

describe('MARK_0', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.MARK0 as Program<MARK0>

  const MARK_0Keypair = Keypair.generate()

  it('Initialize MARK0', async () => {
    await program.methods
      .initialize()
      .accounts({
        MARK_0: MARK_0Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([MARK_0Keypair])
      .rpc()

    const currentCount = await program.account.MARK_0.fetch(MARK_0Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment MARK0', async () => {
    await program.methods.increment().accounts({ MARK_0: MARK_0Keypair.publicKey }).rpc()

    const currentCount = await program.account.MARK_0.fetch(MARK_0Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment MARK0 Again', async () => {
    await program.methods.increment().accounts({ MARK_0: MARK_0Keypair.publicKey }).rpc()

    const currentCount = await program.account.MARK_0.fetch(MARK_0Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement MARK0', async () => {
    await program.methods.decrement().accounts({ MARK_0: MARK_0Keypair.publicKey }).rpc()

    const currentCount = await program.account.MARK_0.fetch(MARK_0Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set MARK_0 value', async () => {
    await program.methods.set(42).accounts({ MARK_0: MARK_0Keypair.publicKey }).rpc()

    const currentCount = await program.account.MARK_0.fetch(MARK_0Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the MARK_0 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        MARK_0: MARK_0Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.MARK_0.fetchNullable(MARK_0Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
