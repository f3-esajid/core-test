export function setLocalAccount(accountId: string | string[]) {
  localStorage.setItem('ph_accountId', String(accountId))
}
export function getLocalAccount() {
  return localStorage.getItem('ph_accountId')
}
