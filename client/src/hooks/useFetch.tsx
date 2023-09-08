import React from 'react'
import axiosInstance from '../utils/interceptor'
type Props = {
    endPoint:string
    params?:string
}

const useFetch=<T extends {}>({endPoint,params}: Props) => {
    const [data, setData] = React.useState<T|null>(null)
    const [error, setError] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
    axiosInstance.get(`${endPoint}${params}`)
    .then((res) => {
        console.log(res.data)
        setIsLoading(false)
      setData(res.data.roles)
    })
    .catch((err) => {
        setIsLoading(false)
      setError(err.msg)
    })
  }, [endPoint,params])

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetch