// Used for skeleton loaders. Enforce minimum fetch duration to prevent skeleton flicker.
const withMinLoadingTime = async <T>(
  promise: Promise<T>,
  minDelay = 500,
): Promise<T> => {
  const start = Date.now()
  const result = await promise
  const elapsed = Date.now() - start
  if (elapsed < minDelay) {
    await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed))
  }
  return result
}

export default withMinLoadingTime
