export const redirectToRoleDashboard = (role : string) => {
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

    url = `${protocol}//${baseDomain}${portPart}/`
  }else{
    url = `${protocol}//${role}.${baseDomain}${portPart}/`

  }

  window.location.href = url
}