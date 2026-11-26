'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, User, Phone, Mail, FileText, Tag, Palette } from 'lucide-react';

const CATEGORIES = [
  'Electronics', 'Documents', 'Wallets & Purses',
  'Keys', 'Luggage & Bags', 'Clothing', 'Jewellery', 'Others',
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];

const COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Brown', 'Silver', 'Gold', 'Yellow', 'Pink', 'Orange', 'Grey', 'Mixed'];

const initialState = {
  title: '',
  category: '',
  description: '',
  primaryColor: '',
  state: '',
  city: '',
  specificLocation: '',
  incidentDate: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  reward: '',
};

export default function ItemForm({ type }) {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isLost = type === 'LOST';
  const accentColor = isLost ? 'red' : 'emerald';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.category) newErrors.category = 'Please select a category';
    if (!form.description.trim() || form.description.trim().length < 20)
      newErrors.description = 'Please write a detailed description (at least 20 characters)';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.specificLocation.trim()) newErrors.specificLocation = 'Specific location is required';
    if (!form.incidentDate) newErrors.incidentDate = 'Date is required';
    if (!form.contactName.trim()) newErrors.contactName = 'Your name is required';
    if (!form.contactPhone.trim() || form.contactPhone.trim().length < 10)
      newErrors.contactPhone = 'Valid 10-digit phone number is required';
    if (!form.contactEmail.trim() || !form.contactEmail.includes('@'))
      newErrors.contactEmail = 'Valid email address is required';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push(`/items/${data.data._id}`);
        }, 2000);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className={`w-16 h-16 ${isLost ? 'bg-red-100' : 'bg-emerald-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <span className="text-3xl">{isLost ? '📢' : '🤝'}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isLost ? 'Lost Item Reported!' : 'Found Item Reported!'}
        </h2>
        <p className="text-slate-600">
          Your report has been submitted. Redirecting to item details where AI will show potential matches...
        </p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Item Details Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-amber-500" />
          Item Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Item Name / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={isLost ? 'e.g., Black HP Laptop 15 inch' : 'e.g., Found: Blue Leather Wallet'}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.title ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Tag size={14} className="inline mr-1" />
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white ${errors.category ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            >
              <option value="">-- Select Category --</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Palette size={14} className="inline mr-1" />
              Primary Color
            </label>
            <select
              name="primaryColor"
              value={form.primaryColor}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option value="">-- Select Color --</option>
              {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the item in detail — brand, model, any unique marks, stickers, contents, serial numbers, etc. The more detail you give, the better the AI matching works."
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${errors.description ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            <div className="flex justify-between mt-1">
              {errors.description
                ? <p className="text-red-500 text-xs">{errors.description}</p>
                : <p className="text-slate-400 text-xs">More detail = better AI match accuracy</p>
              }
              <span className="text-slate-400 text-xs">{form.description.length} chars</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-amber-500" />
          Location Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white ${errors.state ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            >
              <option value="">-- Select State --</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g., New Delhi, Mumbai, Jalandhar"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.city ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Specific Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="specificLocation"
              value={form.specificLocation}
              onChange={handleChange}
              placeholder="e.g., Platform 3, New Delhi Railway Station / Near Gate B, Connaught Place Metro"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.specificLocation ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.specificLocation && <p className="text-red-500 text-xs mt-1">{errors.specificLocation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Calendar size={14} className="inline mr-1" />
              Date {isLost ? 'Lost' : 'Found'} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="incidentDate"
              value={form.incidentDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.incidentDate ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.incidentDate && <p className="text-red-500 text-xs mt-1">{errors.incidentDate}</p>}
          </div>

          {isLost && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Reward (Optional)
              </label>
              <input
                type="text"
                name="reward"
                value={form.reward}
                onChange={handleChange}
                placeholder="e.g., Rs. 500 reward"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <User size={20} className="text-amber-500" />
          Your Contact Details
        </h2>
        <p className="text-slate-500 text-sm mb-4">
          Your contact info helps others reach you. Only your name will be shown publicly; phone/email are protected.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <User size={14} className="inline mr-1" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.contactName ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Phone size={14} className="inline mr-1" />
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.contactPhone ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Mail size={14} className="inline mr-1" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.contactEmail ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all flex items-center justify-center gap-2 ${
          loading
            ? 'opacity-70 cursor-not-allowed'
            : isLost
              ? 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-200'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200'
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Submitting...
          </>
        ) : (
          <>
            {isLost ? '📢 Submit Lost Item Report' : '🤝 Submit Found Item Report'}
          </>
        )}
      </button>
    </form>
  );
}
