// contains all the laundry related functions

import { Laundry } from "../models/Laundry.js";

/**
 * @desc    Get all laundry services
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/laundry
 * @access  Public
 */
export const getAllLaundryServices = async (req, res) => {
  try {
    const laundryServices = await Laundry.find().populate("owner", "name email phone");
    
    if (!laundryServices.length) {
      return res.status(200).json({ 
        success: true, 
        count: 0,
        message: "No laundry services found",
        data: [] 
      });
    }

    res.status(200).json({
      success: true,
      count: laundryServices.length,
      data: laundryServices
    });
  } catch (error) {
    console.error("Error fetching laundry services:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching laundry services",
      error: error.message
    });
  }
};

/**
 * @desc    Get laundry service by ID
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/laundry/:id
 * @access  Public
 */
export const getLaundryServiceById = async (req, res) => {
  try {
    // try to find laundry by its id and also fill the data of owner from Users collection
    // populate the owner field with name, email, and phone from the User model
    const laundryService = await Laundry.findById(req.params.id).populate("owner", "name email phone");
    
    if (!laundryService) {
      return res.status(404).json({
        success: false,
        message: "Laundry service not found"
      });
    }

    res.status(200).json({
      success: true,
      data: laundryService
    });
  } catch (error) {
    console.error("Error fetching laundry service:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while fetching laundry service",
      error: error.message
    });
  }
};

/**
 * @desc    Create new laundry service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   POST /api/laundry
 * @access  Private (Owner)
 */
export const createLaundryService = async (req, res) => {
  try {
    const { status, location } = req.body;
    
    // Validate location data
    if (!location || !location.coordinates || !location.type) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid location data with type and coordinates"
      });
    }

    // Create new laundry service
    const newLaundryService = new Laundry({
      status: status || true,
      location,
      owner: req.user.id // Assuming middleware sets req.user
    });

    const savedLaundryService = await newLaundryService.save();
    
    res.status(201).json({
      success: true,
      message: "Laundry service created successfully",
      data: savedLaundryService
    });
  } catch (error) {
    console.error("Error creating laundry service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating laundry service",
      error: error.message
    });
  }
};

/**
 * @desc    Update laundry service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   PUT /api/laundry/:id
 * @access  Private (Owner)
 */
export const updateLaundryService = async (req, res) => {
  try {
    const { status, location, rating } = req.body;
    
    // Find laundry service
    let laundryService = await Laundry.findById(req.params.id);
    
    if (!laundryService) {
      return res.status(404).json({
        success: false,
        message: "Laundry service not found"
      });
    }
    
    // Check ownership
    if (laundryService.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this laundry service"
      });
    }
    
    // Update fields
    if (status !== undefined) laundryService.status = status;
    if (location) laundryService.location = location;
    if (rating !== undefined && rating >= 0 && rating <= 5) laundryService.rating = rating;
    
    // Save updated service
    const updatedService = await laundryService.save();
    
    res.status(200).json({
      success: true,
      message: "Laundry service updated successfully",
      data: updatedService
    });
  } catch (error) {
    console.error("Error updating laundry service:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while updating laundry service",
      error: error.message
    });
  }
};

/**
 * @desc    Delete laundry service
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   DELETE /api/laundry/:id
 * @access  Private (Owner)
 */
export const deleteLaundryService = async (req, res) => {
  try {
    // Find laundry service
    const laundryService = await Laundry.findById(req.params.id);
    
    if (!laundryService) {
      return res.status(404).json({
        success: false,
        message: "Laundry service not found"
      });
    }
    
    // Check ownership
    if (laundryService.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this laundry service"
      });
    }
    
    // Delete service
    await laundryService.remove();
    
    res.status(200).json({
      success: true,
      message: "Laundry service deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting laundry service:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while deleting laundry service",
      error: error.message
    });
  }
};

/**
 * @desc    Get laundry services by proximity
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   GET /api/laundry/nearby
 * @access  Public
 * @param   {number} lat - Latitude
 * @param   {number} lng - Longitude
 * @param   {number} distance - Distance in meters (optional, default: 5000)
 */
export const getNearbyLaundryServices = async (req, res) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Please provide latitude and longitude coordinates"
      });
    }
    
    // Find laundry services within the specified radius
    const nearbyServices = await Laundry.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance)
        }
      },
      status: true // Only active services
    }).populate("owner", "name email phone");
    
    res.status(200).json({
      success: true,
      count: nearbyServices.length,
      data: nearbyServices
    });
  } catch (error) {
    console.error("Error finding nearby laundry services:", error);
    res.status(500).json({
      success: false,
      message: "Server error while finding nearby services",
      error: error.message
    });
  }
};



/**
 * @desc    Update laundry service rating
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   PATCH /api/laundry/:id/rating
 * @access  Private (Authenticated user)
 */
export const updateLaundryRating = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating === undefined || rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid rating between 0 and 5"
      });
    }
    
    // Find laundry service
    const laundryService = await Laundry.findById(req.params.id);
    
    if (!laundryService) {
      return res.status(404).json({
        success: false,
        message: "Laundry service not found"
      });
    }
    
    // Update rating
    laundryService.rating = rating;
    
    // Save updated service
    const updatedService = await laundryService.save();
    
    res.status(200).json({
      success: true,
      message: "Laundry service rating updated successfully",
      data: updatedService
    });
  } catch (error) {
    console.error("Error updating laundry rating:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while updating rating",
      error: error.message
    });
  }
};

/**
 * @desc    Toggle laundry service status (active/inactive)
 * @param  {import("express").Request} req - Express request object
 * @param  {import("express").Response} res - Express response object
 * @route   PATCH /api/laundry/:id/toggle-status
 * @access  Private (Owner)
 */
export const toggleLaundryServiceStatus = async (req, res) => {
  try {
    // Find laundry service
    const laundryService = await Laundry.findById(req.params.id);
    
    if (!laundryService) {
      return res.status(404).json({
        success: false,
        message: "Laundry service not found"
      });
    }
    
    // Check ownership
    if (laundryService.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this laundry service"
      });
    }
    
    // Toggle status
    laundryService.status = !laundryService.status;
    
    // Save updated service
    const updatedService = await laundryService.save();
    
    res.status(200).json({
      success: true,
      message: `Laundry service ${updatedService.status ? 'activated' : 'deactivated'} successfully`,
      data: updatedService
    });
  } catch (error) {
    console.error("Error toggling laundry service status:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while toggling service status",
      error: error.message
    });
  }
};
