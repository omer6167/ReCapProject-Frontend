import { Component, OnInit } from '@angular/core';
import { FakeCard } from 'src/app/models/fakeCard';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-fake-card-list',
  templateUrl: './fake-card-list.component.html',
  styleUrls: ['./fake-card-list.component.css']
})
export class FakeCardListComponent implements OnInit {

  cards:FakeCard[]

  constructor(
    private fakeCardService:FakeCardService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getFakeCards();
  }

  getFakeCards() {
    let customerId = this.localStorageService.getCurrentCustomer().id;
    this.fakeCardService
      .getCreditCardsByCustomerId(customerId)
      .subscribe((response) => {
        this.cards = response.data;
      });
  }

}
