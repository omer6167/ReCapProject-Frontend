export interface FakeCard {
    id?: number;
    customerId?:number;
    name: string;
    number: string;
    cvv: string;
    expirationDate: string;
    balance?: number;
  }