interface Property {
  id: string;
  name: string;
  place: string;
  area: string;
  address: string;
  bathrooms: number;
  likes: number;
  bedrooms: number;
  price: number;
  amenities: string;
  description: string;
  nearByColleges: string;
  nearByHospitals: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | number | any;
}
