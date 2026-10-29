export default interface DestinationType {
  _id?: string;
  name?: string;
  country?: string;
  description?: string;
  price: string | number;
  imageUrl?: string;
  category?: string;
  duration?: string;
  departureDate?: string;
  rating?: string | number;
}
