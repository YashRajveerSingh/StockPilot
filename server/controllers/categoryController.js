import Category from '../models/Category.js'

const addCategory = async (req, res) => {
    const { categoryName, categoryDescription, deleteCategory } = req.body;

    // Validate input
    if (!categoryName) {
        return res.status(400).json({ success: false, message: "Category name is required" });
    }

    try {
       const { categoryName, categoryDescription } = req.body;
      

       const existingCategory = await Category.findOne({categoryName});
       if(existingCategory){
        return res.status(400).json({ success: false, message: "Category already exists" });
       }

       const newCategory = new Category({
        categoryName,
        categoryDescription
       });

       await newCategory.save();

       return res.status(201).json({ success: true, message: "Category added successfully" });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

 const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory =
      await Category.findByIdAndUpdate(
        id,
        {
          categoryName: req.body.categoryName,
          categoryDescription:
            req.body.categoryDescription,
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category: updatedCategory,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error Updating Category",
    });
  }
};

export {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};