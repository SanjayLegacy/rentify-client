export enum UserRole {
  BUYER = "buyer",
  SELLER = "seller",
}

export interface OptionsType {
  label: string;
  value: string;
}

export interface RegisterFormInputs {
  username: string;
  firstName: string;
  lastName: string;
  contactInfo: string;
  password: string;
  role: UserRole;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface CardData {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface NewPropertyFormInputs {
  name: string;
  place: string;
  area: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  price: number;
  amenities: string;
  description: string;
  nearByColleges: string;
  nearByHospitals: string;
}
