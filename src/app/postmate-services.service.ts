import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Quote, DeliveryResponse } from './Models/models';
@Injectable({
  providedIn: 'root'
})
export class PostmateServicesService {
  private httpClient: HttpClient;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('df2215c3-1b08-4f6d-8fe5-98003a262592:')
    })
  };
  constructor( httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getQuote(dropOffAddress: string, pickUppAddress: string): Promise<Quote> {
    const body = new HttpParams()
    .set('dropoff_address', dropOffAddress)
    .set('pickup_address', pickUppAddress);
    return this.httpClient.post<Quote>
    ('https://api.postmates.com/v1/customers/cus_MpfQYpQg7rxBS-/delivery_quotes',
    body.toString(),
    this.httpOptions)
    .toPromise();
  }

  public async createDelivery(dropOffAddress: string,
                              dropOffName: string,
                              dropOffPhoneNumber: string,
                              pickUpAddress: string,
                              pickUpName: string,
                              pickUpPhoneNumber: string,
                              manifest: string,
                              manifestItems: string,
                              quoteId: string): Promise<DeliveryResponse> {
    const body = new HttpParams()
    .set('dropoff_address', dropOffAddress)
    .set('dropoff_name', dropOffName)
    .set('dropoff_phone_number', dropOffPhoneNumber)
    .set('pickup_address', pickUpAddress)
    .set('pickup_name', pickUpName)
    .set('pickup_phone_number', pickUpPhoneNumber)
    .set('manifest', manifest)
    .set('manifest_items', manifestItems);
    // .set('quote_id', quoteId);

    return this.httpClient.post<DeliveryResponse>
    ('https://api.postmates.com/v1/customers/cus_MpfQYpQg7rxBS-/deliveries',
    body.toString(),
    this.httpOptions)
    .toPromise();
  }
}
