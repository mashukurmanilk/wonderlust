import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  ShieldCheck,
  Compass,
  Headphones,
  Search,
} from "lucide-react";

export default function HomePage() {
  const destinations = [
    {
      id: "1",
      title: "Bali Paradise",
      location: "INDONESIA",
      price: "$2,700",
      rating: "4.9",
      duration: "7 DAYS / 6 NIGHTS",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Bora Bora Retreat",
      location: "MALDIVES",
      price: "$2,700",
      rating: "4.8",
      duration: "7 DAYS / 6 NIGHTS",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Santorini Sunset",
      location: "GREECE",
      price: "$2,700",
      rating: "4.9",
      duration: "7 DAYS / 6 NIGHTS",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* =========================================================================
          HERO SECTION WITH FLOATING SEARCH BAR
         ========================================================================= */}
      <section className="relative min-h-[640px] md:min-h-[720px] flex flex-col justify-between text-white overflow-hidden">
        
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Tropical Bay Coastline"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 pt-28 md:pt-36 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-white drop-shadow-md">
            Discover Your <br />
            <span className="italic font-normal">Next Adventure</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow font-light">
            Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/explore"
              className="bg-[#00A9B5] hover:bg-[#00929c] text-white px-7 py-3 rounded-md text-sm font-semibold tracking-wide flex items-center gap-2 transition-transform transform active:scale-95 shadow-lg"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#destinations"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-7 py-3 rounded-md text-sm font-semibold tracking-wide transition-colors"
            >
              VIEW DESTINATION
            </Link>
          </div>
        </div>

        {/* Floating Search / Filter Bar */}
        <div className="w-full max-w-6xl mx-auto px-4 pb-6 mt-16">
          <div className="bg-black/55 backdrop-blur-md rounded-lg border border-white/15 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden">
            
            {/* Location */}
            <div className="p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                Location
              </span>
              <input
                type="text"
                placeholder="Address, City Or Zip"
                className="bg-transparent text-sm font-medium text-white placeholder-gray-400 focus:outline-none mt-1"
              />
            </div>

            {/* Date/Duration */}
            <div className="p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                Date / Duration
              </span>
              <input
                type="text"
                placeholder="Anytime / 3 Days"
                className="bg-transparent text-sm font-medium text-white placeholder-gray-400 focus:outline-none mt-1"
              />
            </div>

            {/* Budget */}
            <div className="p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                Budget
              </span>
              <input
                type="text"
                placeholder="$0 - $3,000"
                className="bg-transparent text-sm font-medium text-white placeholder-gray-400 focus:outline-none mt-1"
              />
            </div>

            {/* People */}
            <div className="p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                People
              </span>
              <input
                type="text"
                placeholder="5 - 10"
                className="bg-transparent text-sm font-medium text-white placeholder-gray-400 focus:outline-none mt-1"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-stretch">
              <button
                type="button"
                className="w-full bg-[#00A9B5] hover:bg-[#00929c] text-white font-semibold text-base flex items-center justify-center gap-2 py-4 sm:py-0 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED DESTINATIONS SECTION
         ========================================================================= */}
      <section id="destinations" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Featured Destinations
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Hand-picked destinations for your next unforgettable adventure.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A9B5] hover:text-[#008f9a] transition-colors self-start md:self-auto"
          >
            <span>SEE ALL DESTINATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <span>{item.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#00A9B5]" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#00A9B5] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{item.price}</span>
                      <span className="text-xs text-gray-500 font-normal"> / Person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/destinations/${item.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A9B5] hover:text-[#008f9a] transition-colors"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Progress Bar & Controls */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <div className="flex-grow max-w-md bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-[#00A9B5] h-full w-1/3 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#00A9B5] hover:text-[#00A9B5] transition-colors"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#00A9B5] hover:text-[#00A9B5] transition-colors"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHY CHOOSE WANDERLAST SECTION
         ========================================================================= */}
      <section className="bg-[#F0F9FA] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Why Choose Wanderlast
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Your trusted travel partner for hand-crafted itineraries and carefree adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E6F7F8] text-[#00A9B5] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Safe & Secure</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your safety is our top priority. We partner exclusively with certified operators and adhere to strict international standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E6F7F8] text-[#00A9B5] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Expert Guides</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our seasoned local guides bring destinations to life with deep insider knowledge, hidden gems, and local warmth.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#E6F7F8] text-[#00A9B5] flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Round-the-clock dedicated customer assistance whenever and wherever your journey takes you across the globe.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT TRAVELERS SAY (TESTIMONIALS)
         ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              What Travelers Say
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Real stories and honest reviews from real adventurers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#00A9B5] hover:text-[#00A9B5] transition-colors"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#00A9B5] hover:text-[#00A9B5] transition-colors"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed italic">
                “The Bali trip was beyond anything I could have imagined. Everything from the private transfers to the bespoke villa was top tier. Unforgettable!”
              </p>
              <div>
                <h4 className="text-base font-bold text-[#00A9B5]">Sarah Jenkins</h4>
                <p className="text-xs text-gray-400">Solo Traveler</p>
              </div>
            </div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Sarah Jenkins"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed italic">
                “Our family vacation to the Maldives was seamless from start to finish. Wanderlast handled all the logistics so we could just relax.”
              </p>
              <div>
                <h4 className="text-base font-bold text-[#00A9B5]">Elena Rostova</h4>
                <p className="text-xs text-gray-400">Family Traveler</p>
              </div>
            </div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Elena Rostova"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BANNER CTA SECTION
         ========================================================================= */}

    </div>
  );
}