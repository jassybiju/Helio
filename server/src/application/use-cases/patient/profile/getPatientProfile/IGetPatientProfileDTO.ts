export type IGetPatientProfileDTO = {
  id : string,
  email : string,
  firstName : string,
  lastName : string | null,
  gender : string | null,
  dob: string | null,
  bloodGroup : string | null,
  phone : string | null,
}