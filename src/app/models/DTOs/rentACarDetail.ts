export interface RentACarDetail {
  carName: string;
  fullName: string;
  companyName: string;
  brandName: string; 
  rentDate:Date;
  returnDate?:Date;
  dailyPrice: number,
  description: string,
}
