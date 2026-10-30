"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Check,
  X,
  LogOut,
  Compass,
  Luggage,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSession, signOut } from "../lib/auth-client";

interface UserProfileData {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  phone?: string;
  bio?: string;
  address?: string;
  createdAt?: string | Date;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = (session as any)?.user;

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form edit state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    address: "",
  });

  // Fetch complete profile from backend
  useEffect(() => {
    if (!user) return;

    // Initialize with session user first
    const initialUser: UserProfileData = {
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
      role: user.role || "user",
      createdAt: user.createdAt,
    };
    setProfile(initialUser);
    setFormData({
      name: initialUser.name || "",
      phone: "",
      bio: "",
      address: "",
    });

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${backendUrl}/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.user) {
          setProfile(data.user);
          setFormData({
            name: data.user.name || "",
            phone: data.user.phone || "",
            bio: data.user.bio || "",
            address: data.user.address || "",
          });
        }
      })
      .catch((err) => {
        console.warn("Could not fetch extended profile from backend:", err);
      });
  }, [user]);

  const handleSignOut = async () => {
    try {
      await (signOut as any)();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${backendUrl}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setProfile((prev) => ({
        ...prev,
        ...formData,
      }));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#00A9B5] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-800">Loading your profile...</h2>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-[#00A9B5]/10 text-[#00A9B5] rounded-full flex items-center justify-center mx-auto mb-5">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Profile Access</h1>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            You need to be logged in to view your profile, manage bookings, and edit your personal travel details.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full bg-[#00A9B5] hover:bg-[#008f9a] text-white py-2.5 rounded-lg font-semibold transition-colors shadow-sm text-center"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold transition-colors text-center"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User initials for avatar
  const initials = (profile?.name || user.name || "User")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recent Member";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Alerts */}
        {successMessage && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm shadow-sm transition-all">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm shadow-sm transition-all">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#00A9B5] via-[#21b7c2] to-[#45c3cd] relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                <Sparkles className="w-3.5 h-3.5" />
                {profile?.role === "admin" ? "Admin Access" : "Travel Explorer"}
              </span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-md">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#00A9B5] to-[#71d3db] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold tracking-wider">
                      {initials}
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="space-y-1 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
                    {profile?.name || user.name || "Adventurer"}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profile?.email || user.email}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-[#00A9B5] hover:border-[#00A9B5] rounded-xl text-sm font-medium transition-all shadow-sm cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profile?.name || "",
                        phone: profile?.phone || "",
                        bio: profile?.bio || "",
                        address: profile?.address || "",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Member Since
                </span>
                <span className="text-sm font-medium text-gray-800 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-[#00A9B5]" />
                  {formattedDate}
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Account Status
                </span>
                <span className="text-sm font-medium text-emerald-600 flex items-center gap-1.5 mt-1">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Verified Active
                </span>
              </div>

              <Link
                href="/my-bookings"
                className="bg-gray-50 hover:bg-[#00A9B5]/5 border border-transparent hover:border-[#00A9B5]/20 rounded-2xl p-4 transition-all group"
              >
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Bookings
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-[#00A9B5] flex items-center gap-1.5 mt-1">
                  <Luggage className="w-4 h-4 text-[#00A9B5]" />
                  View Trips &rarr;
                </span>
              </Link>

              <Link
                href="/destinations"
                className="bg-gray-50 hover:bg-[#00A9B5]/5 border border-transparent hover:border-[#00A9B5]/20 rounded-2xl p-4 transition-all group"
              >
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Wishlist
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-[#00A9B5] flex items-center gap-1.5 mt-1">
                  <Compass className="w-4 h-4 text-[#00A9B5]" />
                  Find Places &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Details & Edit Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-serif">
                {isEditing ? "Edit Personal Details" : "Personal Information"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {isEditing
                  ? "Update your travel contact info and bio below."
                  : "Manage your profile details and preferences."}
              </p>
            </div>
          </div>

          {!isEditing ? (
            /* View Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {profile?.name || "Not provided"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {profile?.email || user.email}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {profile?.phone || "No phone number added"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location / Address
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {profile?.address || "No address provided"}
                </p>
              </div>

              <div className="md:col-span-2 space-y-1 pt-2">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Bio & Travel Interests
                </span>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  {profile?.bio ||
                    "No bio written yet. Click 'Edit Profile' to introduce your travel style or bucket-list destinations!"}
                </p>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9B5]/30 focus:border-[#00A9B5] text-sm text-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || user.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Email is associated with your login account and cannot be modified directly.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 000-1234"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9B5]/30 focus:border-[#00A9B5] text-sm text-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Location / Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, USA"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9B5]/30 focus:border-[#00A9B5] text-sm text-gray-900 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Bio & Travel Interests
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us what you love to explore (e.g. Hiking trails, tropical beaches, culinary tours)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9B5]/30 focus:border-[#00A9B5] text-sm text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#00A9B5] hover:bg-[#008f9a] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
