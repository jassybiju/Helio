export const redirectToRole = (role : string,path : string = '/') => {
  const protocol = window.location.protocol
  const hostParts = window.location.hostname.split(".")
  const port = window.location.port

  if(hostParts.length > 2){
    hostParts.shift()
  }

  const baseDomain = hostParts.join('.')
  const portPart = port? `:${port}` : ''
  let url 
  if(role === 'patient'){

    url = `${protocol}//${baseDomain}${portPart}${path}`
  }else{
    url = `${protocol}//${role}.${baseDomain}${portPart}${path}`

  }

  window.location.href = url
}