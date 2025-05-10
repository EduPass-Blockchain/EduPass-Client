export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface User {
  fullName: string
  dateOfBirth: string
  gender: Gender
}
