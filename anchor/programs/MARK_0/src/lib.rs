#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod MARK_0 {
    use super::*;

  pub fn close(_ctx: Context<CloseMARK0>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.MARK_0.count = ctx.accounts.MARK_0.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.MARK_0.count = ctx.accounts.MARK_0.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeMARK0>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.MARK_0.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeMARK0<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + MARK0::INIT_SPACE,
  payer = payer
  )]
  pub MARK_0: Account<'info, MARK0>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseMARK0<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub MARK_0: Account<'info, MARK0>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub MARK_0: Account<'info, MARK0>,
}

#[account]
#[derive(InitSpace)]
pub struct MARK0 {
  count: u8,
}
