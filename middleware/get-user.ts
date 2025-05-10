export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server)
    return

  const walletInfo = useWalletInfo()
  const userContract = useUserContract()

  if (!walletInfo.connected)
    await walletInfo.connect()

  if (userContract.user === null) {
    try {
      await userContract.initContract()
      await userContract.getUserData()
    }
    catch (e) {
      console.error('Error initializing user contract:', e)
      return navigateTo('/connect')
    }
  }
})
