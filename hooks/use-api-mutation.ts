import { useState } from 'react'
import { useMutation } from 'convex/react'

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState<boolean>(false)
  const apiMutation = useMutation(mutationFunction)

  const mutate = (payload: unknown) => {
    setPending(true)

    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((results) => {
        return results
      })
      .catch((error) => {
        throw error
      })
  }

  return { mutate, pending }
}
