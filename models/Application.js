const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    personalInfo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    practitioner: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    cancerStage: {
      type: String,
      required: true,
    },
    cancerType: {
      type: String,
      required: true,
    },
    otherTreatments: {
      type: String,
      required: false,
    },
    otherMedications: {
      type: String,
      required: false,
    },
    documentUrls: [{
      type: String
    }],
    ageConfirm: {
      type: Boolean,
      required: true,
    },
    termsAgreed: {
      type: Boolean,
      required: true,
    },
    endorsed: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
