const jwt = require('jsonwebtoken');

// isAuth Middleware to verify usr
exports.isAuth = async (req, res, next) => {
    
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("request hitted in isAuth with token ", token)
        
        if(!token) {
            return res.status(400).json({
                success: false,
                message: 'Token Required!',
            })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decoded token in isAuth', decoded);
            console.log("i am here 1 isAuth");
            req.user = decoded;
            console.log("i am here 2 isAuth");
        }catch(err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token!',
            })
        }
        next();
    }catch(err) {
        console.log('Error in isAuth middleware: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while verifying user!',
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        const user = req.user;
        if(user.accountType !== 'Student') {
            return res.status(403).json({
                success: false,
                message: 'This is protected route for only students',
            });
        };
        next();
    }catch(err) {
        console.log(`Error in isStudent middleware: ${err}`);
        
        return res.status(500).json({
            success: false,
            message: 'Error while verifying user',
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try {
        const user = req.user;
        if(user.accountType !== 'Instructor') {
            return res.status(403).json({
                success: false,
                message: 'This is protected route for only Instructors',
            });
        };
        next();
    }catch(err) {
        console.log(`Error in isInstructor middleware: ${err}`);
        
        return res.status(500).json({
            success: false,
            message: 'Error while verifying user',
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if(user.accountType !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'This is protected route for only Admins',
            });
        };
        next();
    }catch(err) {
        console.log(`Error in isAdmin middleware: ${err}`);
        
        return res.status(500).json({
            success: false,
            message: 'Error while verifying user',
        })
    }
}