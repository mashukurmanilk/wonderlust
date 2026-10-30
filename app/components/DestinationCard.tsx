"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import DestinationType from "../type/DestinationType";

interface DestinationCardProps {
  destination: DestinationType;
}

// Helper to convert Unsplash webpage URLs to direct CDN image URLs
function resolveImageUrl(url?: string): string {
  if (!url || typeof url !== "string") {
    return "/assets/destinations/image1.png";
  }

  // If user pasted an Unsplash webpage URL like:
  // https://unsplash.com/photos/beach-and-limestone-cliffs-in-nusa-penida-exFdOWkYBQw
  if (url.includes("unsplash.com/photos/")) {
    const cleanUrl = url.split("?")[0].replace(/\/+$/, "");
    const parts = cleanUrl.split("/");
    const slug = parts[parts.length - 1];
    const photoId = slug.includes("-") ? slug.split("-").pop() : slug;
    if (photoId) {
      return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;
    }
  }

  return url;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  // Normalize fields
  const title = destination.name || "Bali Paradise";
  const location = destination.country || "Nepal";
  const duration = destination.duration || "7 Days/6 Nights";
  const rating = destination.rating ? String(destination.rating) : "4.5";

  // Format price
  const rawPrice = String(destination.price || "2700").replace(/[^0-9.]/g, "");
  const priceDisplay = rawPrice ? `$${rawPrice}` : "$2,700";

  // Image source with fallback state
  const initialImage = resolveImageUrl(destination.imageUrl);
  const [imgSrc, setImgSrc] = useState(initialImage);

  const destinationId = destination._id || "1";

  return (
    <Link
      href={`/destinations/${destinationId}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
    >
      {/* Destination Image with Rating Pill */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={imgSrc}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc("/assets/destinations/image1.png")}
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
          <span>{rating}</span>
          <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-3 pb-2 space-y-1.5 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>{location}</span>
        </div>

        {/* Title and Price */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight truncate group-hover:text-[#00A9B5] transition-colors">
            {title}
          </h3>
          <div className="text-right whitespace-nowrap">
            <span className="text-lg font-bold text-gray-900">{priceDisplay}</span>
            <span className="text-xs text-gray-500 font-normal">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{duration}</span>
        </div>

        {/* Book Now Button */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00A9B5] group-hover:text-[#008f9a] tracking-wider transition-colors">
            <span>BOOK NOW</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
