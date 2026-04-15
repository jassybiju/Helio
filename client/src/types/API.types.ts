export enum HTTP_METHOD {
  POST = 'POST',
  GET = "GET",
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = "PUT"
}

export type APIResponse<T> =  {
  success : boolean,
  data : T,
  message : string
}