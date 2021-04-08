import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CarDetail } from 'src/app/models/DTOs/carDetail';
import { FakeCard } from 'src/app/models/fakeCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  rental: Rental;
  cars: CarDetail;
  customer: Customer;
  getCustomerId: number;

  amountOfPayment: number = 0;
  nameOnTheCard: string;
  
  cardNumber: string;
  cardCvv: string;
  expirationDate: string;


  fakeCards: FakeCard[];
  fakeCard: FakeCard;

  cardExist: Boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakeCardService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
      }
    });
  }

  // getCreditCardsByCustomerId(customerId:number) {
  //   this.fakeCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
  //     this.fakeCards = response.data;
  //   })
  // }


  getCustomerDetailById(customerId: number) {
    this.customerService.getById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }

  getCarDetail() {
    this.carService
      .getCarDetailById(this.rental.carId)
      .subscribe((response) => {
        this.cars = response.data;
        this.paymentCalculator();
      });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.cars.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  async rentACar() {
    let fakeCard: FakeCard = {
      customerId: this.getCustomerId,
      name: this.nameOnTheCard,
      number: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cardCvv,
    };
   
    this.cardExist = await this.isCardExist(fakeCard);
    if (this.cardExist) {
      this.fakeCard = await this.getFakeCardByCardNumber(this.cardNumber);
      if (this.fakeCard.balance >= this.amountOfPayment) {
        this.fakeCard.balance = this.fakeCard.balance - this.amountOfPayment;       
        let payment : Payment ={
          fakeCardId:this.fakeCard.id,      // Ödeme İşlemleri
          price:this.amountOfPayment
        }
        this.rental.fakeCardId=this.fakeCard.id // 0 olarak gönderdiğimiz card no yu eşleşen cardNo ile eşitliyoruz
          this.payTransact(payment,fakeCard,this.rental);
      } else {
        this.toastrService.error(
          'Kartınızda yeterli para bulunmamaktadır',
          'Hata'
        );
      }
    } else {
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı', 'Hata');
    }
  }

  async isCardExist(fakeCard: FakeCard) {
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise()) //To Promise
      .success;
  }

  async getFakeCardByCardNumber(cardNumber: string) {
    return (await this.fakeCardService.getCardByNumber(cardNumber).toPromise())
      .data[0];
  }


  //Transact Araştırılacak
  async payTransact(payment:Payment,fakeCard:FakeCard,rental:Rental){
    this.updateCard(fakeCard);   // Kart bakiyesinin Güncellenmesi
    if((await this.paymentService.pay(payment).toPromise()).success){  // Ödeme işleminin Gerçekleşmesi
      this.toastrService.success('Ödeme Gerçekleşti','')
    }; 
    if((await this.rentalService.rent(this.rental).toPromise()).success){   //Kiralık araba Tablosunun Güncellenmesi    
      this.toastrService.success('Arabayı kiraladınız', 'Işlem başarılı');
    }    
  }
  
  updateCard(fakeCard: FakeCard) {
    this.fakeCardService.updateCard(fakeCard);
    this.toastrService.success('Bakiyeniz Azalmıştır','')
  }
}