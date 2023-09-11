import axios from 'axios'
import {useEffect,useState} from 'react'
import axiosInstance from '../utils/interceptor'

type Props<T> = {
    url:string
    body:T
}

const usePost =<T extends {}>({url,body}: Props<T>) => {
   const [data, setData] = useState(null)
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
  useEffect(() => {
    setIsLoading(true)
    axiosInstance.post(`${url}`,body).then((res)=>{
        console.log(res.data)
        setData(res.data)
        setIsLoading(false)
    }).catch((err)=>{
        console.log(err)
        setError(err.msg)
        setIsLoading(false)
    })
    
  }, [url,body])


  return {
    data,
    error,
    isLoading,
  }
}

export default usePost