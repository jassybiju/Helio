import { useEffect, useState } from "react"
import { initializeRuntimeConfig } from "../libs/config"

export function ApiConfigProvider({children} : {children : React.ReactNode}){

    const [initialized, setInitialized] = useState(false)

    useEffect(()=>{
        initializeRuntimeConfig().then(()=>setInitialized(true))
        .catch(err=>console.error('Failed to initialize API Client', err))
    })

    if(!initialized){
        return null
    }

    return children
}