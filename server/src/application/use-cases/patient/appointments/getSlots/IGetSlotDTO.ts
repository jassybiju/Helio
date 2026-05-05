export type IGetSlotDTO = Record<
  string,
  { clinic: { times: string[]; location: string }; online: { times: string[] } }
>;
