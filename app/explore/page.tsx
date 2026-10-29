"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import DestinationType from "../type/DestinationType";

// Promise-based fetch function from backend path '/destinations'
const fetchDestinations = async (): Promise<DestinationType[]> => {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${backendUrl}/destinations`);
  if (!res.ok) {
    throw new Error(`Failed to fetch destinations: ${res.statusText}`);
  }
  return res.json();
};

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("DEFAULT");
  const [loading, setLoading] = useState(false);

  // Fetch from backend using Promise (.then / .catch)
  useEffect(() => {
    setLoading(true);
    fetchDestinations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDestinations(data);
        }
      })
      .catch((error) => {
        console.warn("Could not connect to backend, displaying default curated destinations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Category filter
        if (
          selectedCategory !== "ALL" &&
          dest.category?.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Price range filter
        const priceNum = Number(String(dest.price).replace(/[^0-9.]/g, "")) || 0;
        if (selectedPriceRange === "UNDER_1000" && priceNum >= 1000) return false;
        if (
          selectedPriceRange === "1000_2500" &&
          (priceNum < 1000 || priceNum > 2500)
        )
          return false;
        if (
          selectedPriceRange === "2500_3500" &&
          (priceNum < 2500 || priceNum > 3500)
        )
          return false;
        if (selectedPriceRange === "ABOVE_3500" && priceNum <= 3500) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(String(a.price).replace(/[^0-9.]/g, "")) || 0;
        const priceB = Number(String(b.price).replace(/[^0-9.]/g, "")) || 0;

        if (selectedSort === "PRICE_ASC") return priceA - priceB;
        if (selectedSort === "PRICE_DESC") return priceB - priceA;
        if (selectedSort === "RATING_DESC") {
          const ratingA = Number(a.rating) || 0;
          const ratingB = Number(b.rating) || 0;
          return ratingB - ratingA;
        }
        return 0;
      });
  }, [destinations, selectedCategory, selectedPriceRange, selectedSort]);

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 font-normal tracking-tight">
            Explore All Destinations
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 font-normal">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* Filter Dropdowns Bar */}
        <div className="bg-white border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-6 shadow-sm overflow-hidden">
          
          {/* Category Dropdown */}
          <div className="relative flex items-center px-4 py-3 sm:py-3.5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold tracking-wider text-gray-600 uppercase focus:outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="ALL">CATEGORY</option>
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
              <option value="Wildlife & Safari">Wildlife & Safari</option>
              <option value="City Break">City Break</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
          </div>

          {/* Price Range Dropdown */}
          <div className="relative flex items-center px-4 py-3 sm:py-3.5">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold tracking-wider text-gray-600 uppercase focus:outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="ALL">PRICE RANGE</option>
              <option value="UNDER_1000">Under $1,000</option>
              <option value="1000_2500">$1,000 - $2,500</option>
              <option value="2500_3500">$2,500 - $3,500</option>
              <option value="ABOVE_3500">Above $3,500</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex items-center px-4 py-3 sm:py-3.5">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold tracking-wider text-gray-600 uppercase focus:outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="DEFAULT">SORT BY</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="RATING_DESC">Highest Rated</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" />
          </div>

        </div>

        {/* Result Count */}
        <div className="text-xs sm:text-sm text-gray-500 mb-8 font-medium">
          Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? "s" : ""}
          {loading && <span className="ml-2 text-xs text-gray-400">(Updating...)</span>}
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest, idx) => (
              <DestinationCard key={dest._id || idx} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-base">No destinations found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedPriceRange("ALL");
                setSelectedSort("DEFAULT");
              }}
              className="mt-4 text-sm font-semibold text-[#00A9B5] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
