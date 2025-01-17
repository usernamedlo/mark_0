'use client'

import { getMARK0Program, getMARK0ProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useMARK0Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getMARK0ProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getMARK0Program(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['MARK_0', 'all', { cluster }],
    queryFn: () => program.account.MARK_0.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['MARK_0', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ MARK_0: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useMARK0ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useMARK0Program()

  const accountQuery = useQuery({
    queryKey: ['MARK_0', 'fetch', { cluster, account }],
    queryFn: () => program.account.MARK_0.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['MARK_0', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ MARK_0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['MARK_0', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ MARK_0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['MARK_0', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ MARK_0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['MARK_0', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ MARK_0: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
