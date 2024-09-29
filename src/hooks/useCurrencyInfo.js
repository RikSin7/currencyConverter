import React, { useState, useEffect } from 'react'

function useCurrencyInfo (currency) {
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      setLoading(true) // Reset loading state when fetching starts
      setError(null) // Clear any previous errors

      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${currency}`
        )
        if (!res.ok) {
          throw new Error(
            'The network response was not okay: ' + res.statusText
          )
        }
        const data = await res.json()
        setRates(data.rates)
      } catch (error) {
        setError('Issue while fetching API response: ' + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencyInfo()
  }, [currency])

  return { rates, loading, error }
}

export default useCurrencyInfo
