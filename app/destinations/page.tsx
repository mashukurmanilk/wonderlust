"use client";

import { useState } from "react";
import { Trash2, Save, ChevronDown } from "lucide-react";

export default function DestinationsPage() {
  const [formData, setFormData] = useState({
    destinationName: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Beach",
    "Adventure",
    "Mountain",
    "Cultural",
    "Wildlife & Safari",
    "City Break",
    "Luxury Retreat",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      destinationName: "",
      country: "",
      category: "Beach",
      price: "",
      duration: "",
      departureDate: "",
      imageUrl: "",
      description: "",
    });
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const form = e.currentTarget as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form).entries());
        const resposnse= await fetch("http://localhost:5000/destinations", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        if(!resposnse.ok){
            console.error("Failed to submit the form");
        }
    } catch (error) {
        console.error("An error occurred while submitting the form", error);
    }finally{
        setSubmitted(true);
        handleReset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 font-normal tracking-tight mb-8">
          Add New Travel Package
        </h1>

        {/* Card Form */}
        <div className="bg-white rounded-xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06),0_10px_10px_-5px_rgba(0,0,0,0.02)] border border-gray-100 p-8 sm:p-10">
          {submitted && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-sm flex items-center justify-between">
              <span>Travel package submitted successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination Name */}
            <div className="space-y-2">
              <label
                htmlFor="destinationName"
                className="block text-sm font-medium text-gray-800"
              >
                Destination Name
              </label>
              <input
                id="destinationName"
                name="destinationName"
                type="text"
                required
                value={formData.destinationName}
                onChange={handleChange}
                placeholder="Bali Paradise"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
              />
            </div>

            {/* Country & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Country */}
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-800"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Indonesia"
                  className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-800"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-11 px-4 pr-10 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 appearance-none focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Price */}
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-800"
                >
                  Price (USD)
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 1299"
                  className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-800"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days/6 Nights"
                  className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <label
                htmlFor="departureDate"
                className="block text-sm font-medium text-gray-800"
              >
                Departure Date
              </label>
              <input
                id="departureDate"
                name="departureDate"
                type="text"
                value={formData.departureDate}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-800"
              >
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-800"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the travel experience..."
                className="w-full p-4 bg-[#F8FAFC] border border-slate-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A9B5] focus:bg-white focus:ring-1 focus:ring-[#00A9B5] transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3.5 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-md border border-red-300 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-md bg-[#00A9B5] hover:bg-[#00929c] text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A9B5]/40"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Add Travel Package</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
