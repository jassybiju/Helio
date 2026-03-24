export type IFetchByStartingCharacterRequestDTO = {
  char: string;
};

export type Users = {
  first_name: string;
  last_name: string;
  _id: string;
};

export type IFetchByStartingCharacterResponseDTO = {
  data: Users[];
};
