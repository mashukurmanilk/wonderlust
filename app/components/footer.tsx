import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";

export default function footer() {
  return (
          <section className="relative py-24 text-white overflow-hidden text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2000&q=85"
            alt="Tropical Island Drone View"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto">
            Let us help you book the trip of a lifetime today. Personalized itineraries tailored just for you.
          </p>
          <div className="pt-4">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-lg transition-transform transform active:scale-95"
            >
              <span>BOOK YOUR TRIP NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
  )
}
