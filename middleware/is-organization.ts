export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server)
    return

  const walletInfo = useWalletInfo()

  if (!walletInfo.connected)
    await walletInfo.connect()

  const roleManagerContract = useRoleManagerContract()
  if (await roleManagerContract.getRole() !== 'org')
    return abortNavigation()
})
