const Application = require("../models/Application");
const bcrypt = require('bcryptjs');

const getAllApplications = async (req, res) => {
  try {
    const { page, limit, status, startDate, endDate } = req.query;

    const queryObject = {};

    if (status) {
      queryObject.status = status;
    }

    if (startDate && endDate) {
      queryObject.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const applications = await Application.find(queryObject)
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    const totalApplications = await Application.countDocuments(queryObject);

    res.status(200).json({
      success: true,
      applications,
      totalApplications,
      currentPage: pages,
      totalPages: Math.ceil(totalApplications / limits),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching applications",
      error: error.message,
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .select('-password'); // Exclude password from response
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching the application",
      error: error.message,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      email,
      password,
      personalInfo,
      firstName,
      lastName,
      dob,
      sex,
      practitioner,
      address,
      city,
      postalCode,
      province,
      cancerStage,
      cancerType,
      otherTreatments,
      otherMedications,
      documentUrls,
      ageConfirm,
      termsAgreed,
      endorsed
    } = req.body;

    // Check if user already exists
    const existingApplication = await Application.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "An application with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new application
    const application = new Application({
      email,
      password: hashedPassword,
      personalInfo,
      firstName,
      lastName,
      dob: new Date(dob),
      sex,
      practitioner,
      address,
      city,
      postalCode,
      province,
      cancerStage,
      cancerType,
      otherTreatments,
      otherMedications,
      documentUrls: documentUrls || [],
      ageConfirm,
      termsAgreed,
      endorsed
    });

    await application.save();

    // Remove password from response
    const applicationResponse = application.toObject();
    delete applicationResponse.password;

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: applicationResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while creating the application",
      error: error.message,
    });
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
};
