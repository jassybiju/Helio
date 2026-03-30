export enum HTTP_METHOD {
  POST = 'POST',
  GET = "GET",
  PATCH = 'PATCH'
}

export type APIResponse<T> =  {
  success : boolean,
  data : T,
  message : string
}