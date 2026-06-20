import Profile from "../models/profileModel.js";

// Get Profile
export const getProfile = async (
  req,
  res
) => {
  try {
    const profile =
      await Profile.findOne();

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Profile
export const updateProfile =
  async (req, res) => {
    try {
      let profile =
        await Profile.findOne();

      if (!profile) {
        profile =
          await Profile.create(
            req.body
          );
      } else {
        profile =
          await Profile.findByIdAndUpdate(
            profile._id,
            req.body,
            { new: true }
          );
      }

      res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };