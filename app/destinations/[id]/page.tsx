import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Plane,
  Sparkles,
  Award,
  Users,
  Compass,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fallback curated destination catalogue
const fallbackDestinations: Record<string, any> = {
  "1": {
    _id: "1",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach & Culture",
    price: "$2,700",
    rating: "4.9",
    duration: "7 Days / 6 Nights",
    departureDate: "November 15, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Immerse yourself in the spiritual sanctuary and tropical elegance of Bali. Experience sunrise over majestic volcano calderas, explore ancient moss-draped temples in Ubud, relax on secluded white-sand beaches, and savor authentic Balinese farm-to-table cuisine surrounded by lush emerald rice terraces.",
  },
  "2": {
    _id: "2",
    name: "Bora Bora Retreat",
    country: "French Polynesia",
    category: "Luxury Retreat",
    price: "$3,400",
    rating: "4.8",
    duration: "7 Days / 6 Nights",
    departureDate: "December 01, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Step into the ultimate South Pacific dreamscape with private overwater bungalows, crystal lagoon waters, and towering peaks of Mount Otemanu. Indulge in private boat excursions, vibrant coral reef snorkeling, and world-class Polynesian spa wellness therapies.",
  },
  "3": {
    _id: "3",
    name: "Santorini Sunset",
    country: "Greece",
    category: "Romantic Coastal",
    price: "$2,700",
    rating: "4.9",
    duration: "7 Days / 6 Nights",
    departureDate: "October 10, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    description:
      "Perched atop dramatic volcanic cliffs overlooking the sparkling Aegean Sea, Santorini is the quintessential Mediterranean escape. Stroll through charming whitewashed alleys, admire iconic blue domes, enjoy wine tasting at sun-drenched vineyards, and witness the world's most romantic sunsets in Oia.",
  },
};

// Fetch destination data from backend or fallback
async function fetchDestination(id: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/destinations/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn(`Could not fetch destination ${id} from backend, checking fallback catalogue:`, error);
  }

  // Fallback to static data if ID exists in local mock
  if (fallbackDestinations[id]) {
    return fallbackDestinations[id];
  }

  return null;
}

export default async function DestinationDetailPage({ params }: PageProps) {
  // In Next.js 15/16, params is a Promise that must be awaited
  const { id } = await params;
  const destination = await fetchDestination(id);

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50/50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Destination Not Found</h2>
          <p className="text-gray-500 text-sm mt-2">
            The travel package you are looking for does not exist or has been retired.
          </p>
          <div className="mt-6">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00A9B5] hover:bg-[#008f9a] text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore All Destinations</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = destination.name || destination.destinationName || "Scenic Getaway";
  const country = destination.country || "Global Destination";
  const category = destination.category || "Adventure & Leisure";
  const duration = destination.duration || "7 Days / 6 Nights";
  const departureDate = destination.departureDate || "Available Weekly";
  const rating = destination.rating ? String(destination.rating) : "4.9";
  const image =
    destination.imageUrl ||
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80";

  // Clean and format price
  const rawPrice = String(destination.price || "2700").replace(/[^0-9.]/g, "");
  const priceDisplay = rawPrice ? `$${rawPrice}` : "$2,700";

  const description =
    destination.description ||
    "Discover the beauty of this destination with our curated package designed for relaxation, culture, and adventure. Includes premium hotel stays, experienced local tour guides, and seamless transport.";

  const inclusions = [
    "5-Star Deluxe Hotel Accommodations",
    "Daily Gourmet Breakfast & Select Dinners",
    "Airport Transfers & Private Local Chauffeur",
    "Expert Certified Multilingual Guide",
    "All Sightseeing & National Park Entry Tickets",
    "24/7 Dedicated Concierge Support",
  ];

  return (
    <div className="min-h-screen bg-gray-50/40 pb-20">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#00A9B5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#00A9B5]" />
            <span>{country}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-sm">
          <Image
            src={image}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges & Hero Details */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  {category}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-900 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {rating} (120+ Reviews)
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight drop-shadow-md">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-gray-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00A9B5]" />
                <span>{country}</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 self-start sm:self-auto">
              <div>
                <span className="text-xs text-gray-200 block">Package Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-white font-serif">
                    {priceDisplay}
                  </span>
                  <span className="text-xs text-gray-300">/ Person</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Additional Information Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Trip Highlights Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A9B5]/10 text-[#00A9B5] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Duration</span>
                  <span className="text-sm font-bold text-gray-800">{duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A9B5]/10 text-[#00A9B5] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Departure</span>
                  <span className="text-sm font-bold text-gray-800">{departureDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A9B5]/10 text-[#00A9B5] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Group Size</span>
                  <span className="text-sm font-bold text-gray-800">2 - 12 Guests</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A9B5]/10 text-[#00A9B5] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Experience</span>
                  <span className="text-sm font-bold text-gray-800">Premium Tour</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Destination Story / Description */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00A9B5]" />
                <h2 className="text-2xl font-bold text-gray-900 font-serif">
                  About this Destination
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {description}
              </p>
            </div>

            {/* What's Included / Package Inclusions */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">
                What&apos;s Included in This Package
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Safety Guarantee */}
            <div className="bg-[#00A9B5]/5 border border-[#00A9B5]/20 rounded-2xl p-6 flex items-start gap-4">
              <Shield className="w-8 h-8 text-[#00A9B5] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900">
                  Wanderlust Safe & Flexible Guarantee
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enjoy complimentary free cancellation up to 7 days before departure, 100% verified luxury stays, and 24/7 round-the-clock emergency assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Booking Action Card (Right col) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-lg space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Price</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-bold text-gray-900 font-serif">
                      {priceDisplay}
                    </span>
                    <span className="text-xs text-gray-500">/ person</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                </div>
              </div>

              {/* Booking Details Summary */}
              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Destination:</span>
                  <span className="font-semibold text-gray-800">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Duration:</span>
                  <span className="font-semibold text-gray-800">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Departure:</span>
                  <span className="font-semibold text-gray-800">{departureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Taxes & Fees:</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/my-bookings"
                className="w-full flex items-center justify-center gap-2 bg-[#00A9B5] hover:bg-[#008f9a] text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <Plane className="w-4 h-4" />
                <span>Reserve Package Now</span>
              </Link>

              <p className="text-[11px] text-gray-400 text-center">
                Instant confirmation • No hidden fees
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
