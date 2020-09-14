import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PostmateServicesService } from '../postmate-services.service';
import { Quote, DeliveryResponse } from '../Models/models';
@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss']
})
export class CreateDeliveryComponent implements OnInit {

  form: FormGroup;
  fb: FormBuilder;
  service: PostmateServicesService;
  quoteCreated = false;
  quote: Quote;
  deliveryCreated = false;
  deliveryResponse: DeliveryResponse;
  constructor(fb: FormBuilder,
              service: PostmateServicesService) {
    this.fb = fb;
    this.service = service;
    this.form = fb.group({
          pickUpFirstName: ['', Validators.required],
          pickUpLastName: ['', Validators.required],
          pickUpBusinessName: ['', Validators.required],
          pickUpPhoneNumber: ['', Validators.required],
          dropOffFirstName: ['', Validators.required],
          dropOffLastName: ['', Validators.required],
          dropOffBusinessName: ['', Validators.required],
          dropOffPhoneNumber: ['', Validators.required],
          pickUpAddress: ['', Validators.required],
          dropOffAddress: ['', Validators.required],
          orderId: ['', Validators.required],
          order_items: fb.array([fb.group({item: '', quantity: '', size: ''})])
      });
   }
  get orderItems() {
    return this.form.get('order_items') as FormArray;
  }
  addSellingPoint() {
    this.orderItems.push(this.fb.group({item: '', quantity: '', size: ''}));
  }
  ngOnInit() {
  }
  public async onSubmit(): Promise<void> {
    this.quote = await this.service.getQuote(this.form.value.pickUpAddress, this.form.value.dropOffAddress);
    this.quoteCreated = this.quote.id ? true : false;
    this.deliveryCreated = false;
    this.quoteCreated = true;
  }

  public async createDelivery(): Promise<void> {
    this.deliveryResponse = await this.service.createDelivery(
      this.form.value.dropOffAddress,
      this.form.value.dropOffFirstName + ' ' + this.form.value.dropOffLastName,
      this.form.value.dropOffPhoneNumber,
      this.form.value.pickUpAddress,
      this.form.value.pickUpFirstName + ' ' + this.form.value.pickUpLastName,
      this.form.value.pickUpPhoneNumber,
      'Things',
      '[{"item":"12312312","quantity":"2","size":"small"}]',
      this.quote.id);
    this.deliveryCreated = true;
    this.quoteCreated = false;
  }
}
