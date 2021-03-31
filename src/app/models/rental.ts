export interface Rental{
    id?:number
    carId:number
    fakeCardId:number
    customerId?:number
    rentDate:Date
    returnDate:Date
    price:number
}