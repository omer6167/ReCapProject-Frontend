import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CarDetail } from 'src/app/models/DTOs/carDetail';
import { UserDetail } from 'src/app/models/DTOs/userDetail';
import { FakeCard } from 'src/app/models/fakeCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentAddForm: FormGroup;

  rental: Rental;
  cars: CarDetail;
  customer: Customer;
  getCustomerId: number;

  amountOfPayment: number = 0;
  //nameOnTheCard: string;

  cardNumber: string;
  cardCvv: string;
  expirationDate: string;

  userDetail: UserDetail;

  cards: FakeCard[];
  card: FakeCard;
  selectedCard: FakeCard;

  cardExist: Boolean = false;
  saveCard: Boolean = false;
  registeredCard:Boolean = false

  //currentCustomerId:number

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakeCardService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.userDetail = this.localStorageService.getCurrentCustomer(); // ??yile??tirilecek
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId; //??yile??tirilecek
        this.getCustomerDetailById(this.userDetail.id);
        this.getCarDetail();
        this.createPaymentAddForm();
      }
    });
  }

  // getCreditCardsByCustomerId(customerId:number) {
  //   this.fakeCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
  //     this.fakeCards = response.data;
  //   })
  // }

  //Kart??n save durumu de??i??tirilebilir
  onSaveCardChanged(value: boolean) {
    this.saveCard = value;
  }

  //??yile??tirilecek
  getCustomerDetailById(customerId: number) {
    this.customerService.getById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }

  getFakeCards() {
    let customerId = this.localStorageService.getCurrentCustomer().id;
    if (customerId) {
      this.registeredCard=true
    }
    this.fakeCardService
      .getCreditCardsByCustomerId(customerId)
      .subscribe((response) => {
        this.cards = response.data;
      },()=>{
        this.toastrService.error('Kredi kart bilgileriniz gelmedi','hata')
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

      //zamanFark de??i??keni ile elde edilen saati g??ne ??evirmek i??in a??a????daki y??ntem kullan??labilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.cars.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Ara?? listesine y??nlendiriliyorsunuz',
          'Hatal?? i??lem'
        );
      }
    }
  }

  createPaymentAddForm() {
    if (this.selectedCard) {
      this.paymentAddForm = this.formBuilder.group({
        name: [this.selectedCard.name, Validators.required],
        number: [this.selectedCard.number, Validators.required],
        expirationDate: [this.selectedCard.expirationDate, Validators.required],
        cvv: [this.selectedCard.cvv, Validators.required], // ??yile??tirilecek
      });
    } else {
      this.paymentAddForm = this.formBuilder.group({
        name: ['', Validators.required],
        number: ['', Validators.required],
        expirationDate: ['', Validators.required],
        cvv: [0, Validators.required],
      });
    }
  }

  //Se??ili kard??n id sini al??p form de??erlerini ona g??re doldurmam??z gerek
  setCurrentCard(id: number) {
    this.fakeCardService.getById(id).subscribe((response) => {
      this.selectedCard = response.data[0];
      this.localStorageService.setItem('activeCard', this.selectedCard.name); //Se??ili Kart??n de??erlerini local storageye de y??kledik,service de iyile??tirmeler yap??lacak ///JSON.stringify(this.selectedCard
      this.createPaymentAddForm();
      console.log(this.selectedCard); //Kontrol?? sa??lanmal??
    });
  }

  //??yile??tirilecek,Kullan??mda de??il
  get??fSelectedCar() {
    return this.localStorageService.getItem('activeCard');
  }

  //Kiralama i??lemi yap??ld??????nda banka kart??,payment tablosu ve rentals tablosuun ubdate edilmesi gerekiyor
  async rentACar() {
    if (this.paymentAddForm.valid) {
      let fakeCard = Object.assign({}, this.paymentAddForm.value);

      this.cardExist = await this.isCardExist(fakeCard);
      if (this.cardExist) {
        this.card = await this.getFakeCardByCardNumber(this.cardNumber);
        if (this.card.balance >= this.amountOfPayment) {
          this.card.balance = this.card.balance - this.amountOfPayment;
          // ??deme ????lemleri
          let payment: Payment = {
            fakeCardId: this.card.id,
            price: this.amountOfPayment,
          };

          this.rental.fakeCardId = this.card.id; // 0 olarak g??nderdi??imiz card no yu e??le??en cardNo ile e??itliyoruz

          if (this.userDetail.findeksScore > this.cars.MinFindeksScore) {
            this.payTransactWithSaveCard(payment, fakeCard, this.rental);
          } else {
            this.toastrService.error(
              'Findeks Puan??n??z Arabay?? almak i??in yeterli de??il',
              'Hata'
            );
          }
        } else {
          this.toastrService.error(
            'Kart??n??zda yeterli para bulunmamaktad??r',
            'Hata'
          );
        }
      } else {
        this.toastrService.error('Bankan??z bilgilerinizi onaylamad??', 'Hata');
      }
    }else{
      this.toastrService.warning('Bilgilerinizi kontrol ediniz','uyar??')
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

  //Transact Ara??t??r??lacak
  async payTransactWithSaveCard(
    payment: Payment,
    fakeCard: FakeCard,
    rental: Rental
  ) {
    this.updateCard(fakeCard); // Kart bakiyesinin G??ncellenmesi
    if ((await this.paymentService.pay(payment).toPromise()).success) {
      // ??deme i??leminin Ger??ekle??mesi
      this.toastrService.info('??deme Ger??ekle??ti', '????lem ba??ar??l??');
    }
    if ((await this.rentalService.rent(rental).toPromise()).success) {
      //Kiral??k araba Tablosunun G??ncellenmesi
      this.toastrService.success('Arabay?? kiralad??n??z', '????lem ba??ar??l??');
    }
  }

  //LOCAL STORAGE SERV??STE G??R???? YAPAN KULLANICININ ??D DE??ER??N?? ALDIK
  async updateCard(fakeCard: FakeCard) {
    if (this.saveCard) {
      fakeCard.customerId = this.userDetail.id;
    }
    this.fakeCardService.updateCard(fakeCard);
    this.toastrService.info('Bakiyeniz Azalm????t??r', '');
  }
}
