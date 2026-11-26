import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    type: { type: String, enum: ['LOST', 'FOUND'], required: [true, 'Type is required'] },
    category: {
      type: String,
      enum: ['Electronics', 'Documents', 'Wallets & Purses', 'Keys', 'Luggage & Bags', 'Clothing', 'Jewellery', 'Others'],
      required: [true, 'Category is required'],
    },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    primaryColor: { type: String, default: '' },

    // Location
    state: { type: String, required: [true, 'State is required'], trim: true },
    city: { type: String, required: [true, 'City is required'], trim: true },
    specificLocation: { type: String, required: [true, 'Specific location is required'], trim: true },

    // Date
    incidentDate: { type: Date, required: [true, 'Incident date is required'] },

    // Contact
    contactName: { type: String, required: [true, 'Contact name is required'], trim: true },
    contactPhone: { type: String, required: [true, 'Phone number is required'], trim: true },
    contactEmail: { type: String, required: [true, 'Email is required'], trim: true },

    // Extra
    imageUrl: { type: String, default: '' },
    status: { type: String, enum: ['OPEN', 'MATCHED', 'RESOLVED'], default: 'OPEN' },
    reward: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
