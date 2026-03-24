export function getValidSubdomain(host : string) : string {
  let subdomain : string |null = ''
  if(!host && typeof window !== 'undefined'){
    host = window.location.host

  }

  if(host && host.includes('.')){
    const candidate = host.split('.')[0]
    if(candidate && !candidate.includes('localhost')){
      subdomain = candidate
    }
  }
  return subdomain!

}