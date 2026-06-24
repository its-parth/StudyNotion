const Category = require('../models/Category');
const Course = require('../models/Course');

// crate category
exports.createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name and description is required'
            });
        }

        const category = await Category.create({
            name, description, courses:[]
        });

        return res.status(200).json({
            success: true,
            message: 'Category created successfully!',
            data: category,
        })
    }catch(err) {
        console.log('Error in category ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in creating cateogry',
        })
    }
}

// get all categories handler
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, {name:true, description: true, courses: true});

        return res.status(200).json({
            success: true,
            message: 'All categories fetched successfully!',
            data: categories
        });
    }catch(err) {
        console.log('Error in getting all category: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in getting all cateogry',
        })
    }
}

// get category page details
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const {categoryId} = req.params;
        if(!categoryId) {
            return res.status(400).json({
                success: false,
                message: 'Category id is required!',
            })
        }
        const categoryDetails = await Category.findById(categoryId)
        .populate({
            path: "courses",
            // match: {status: "Published"},
            populate: [
                {
                    path: "instructor",
                    populate: "additionalDetails"
                },
                {
                    path: "ratingAndReviews"
                }
            ]
        })
        .exec(); 
        
        if(!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category!',
            });
        }

        // get courses from diff category 
        const differentCourses = await Course.find({
        category: { $ne: categoryId },
        status: "Published",
        })
        .populate({
            path: "instructor",
            populate: "additionalDetails"
        })
        .limit(10);
        console.log("category details: ", categoryDetails);
        console.log("different courses: ", differentCourses);

        // get top 10 selling courses
        // Todo practice mongo db queries
        var topCourses = await Course.aggregate([
            {
                $match: {
                status: "Published"
                }
            },
            {
                $addFields: {
                studentsCount: {
                    $size: "$studentsEnrolled"
                }
                }
            },
            {
                $sort: {
                studentsCount: -1
                }
            },
            {
                $limit: 10
            }
            ]);

            // todo instead of doing below thing we can use lookup study this
        topCourses = await Course.populate(topCourses, {
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        });

        // change differentCategory to differentCourses from diff category in backend and frontend also
        return res.status(200).json({
            success: true,
            message: 'Fetched category page details successfully',
            data:{
                selectedCategory: categoryDetails,
                differentCategory: differentCourses,
                mostSellingCourses: topCourses,
            }
        })
    }catch(err) {
        console.log('Error in getting category page details: ',err);        
        return res.status(500).json({
            success: false,
            message: 'Error in getting category page details hie',
        })
    }
}   