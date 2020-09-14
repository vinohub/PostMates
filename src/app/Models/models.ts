export interface Quote {
        kind: string;
        id: string;
        created: string;
        expires: string;
        fee: number;
        currency: string;
        currency_type: string;
        dropoff_eta: string;
        duration: number;
        pickup_duration: number;
  }

export interface DetailedAddress {
        street_address_1: string;
        street_address_2: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
        sublocality_level_1: string;
    }

export interface Location {
        lat: number;
        lng: number;
    }

export interface Pickup {
        name: string;
        phone_number: string;
        address: string;
        detailed_address: DetailedAddress;
        notes: string;
        location: Location;
        verification?: any;
    }

export interface DetailedAddress2 {
        street_address_1: string;
        street_address_2: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
        sublocality_level_1: string;
    }

export interface Location2 {
        lat: number;
        lng: number;
    }

export interface Dropoff {
        name: string;
        phone_number: string;
        address: string;
        detailed_address: DetailedAddress2;
        notes: string;
        location: Location2;
        verification?: any;
    }

export interface Manifest {
        reference: string;
        description: string;
    }

export interface ManifestItem {
        name: string;
        quantity: string;
        size: string;
    }

export interface DeliveryResponse {
        id: string;
        quote_id: string;
        status: string;
        complete: boolean;
        kind: string;
        pickup: Pickup;
        dropoff: Dropoff;
        manifest: Manifest;
        manifest_items: ManifestItem[];
        created: Date;
        updated: Date;
        pickup_ready: Date;
        pickup_deadline: Date;
        dropoff_ready: Date;
        dropoff_deadline: Date;
        pickup_eta: Date;
        dropoff_eta: Date;
        related_deliveries: any[];
        fee: number;
        currency: string;
        tip?: any;
        dropoff_identifier: string;
        tracking_url: string;
        undeliverable_action?: any;
        courier_imminent: boolean;
        courier?: any;
        live_mode: boolean;
        undeliverable_reason?: any;
        uuid: string;
        fences: any[];
    }


