import bcrypt from 'bcryptjs';
import Admin from '../models/admin';

const addRootAdmin = async () => {
    try {
        const rootAdminRegNo = process.env.ROOT_ADMIN_REGNO;
        const password = process.env.ROOT_ADMIN_PASSWORD;
        const email = process.env.ROOT_ADMIN_EMAIL;
        const name = "Root Admin";

        if (!rootAdminRegNo || !password || !email) {
            return {
                "success": false,
                "message": "Root user details are missing."
            };
        }

        const admin = await Admin.findOne({ registrationNumber: rootAdminRegNo }).select('registrationNumber');

        if (!admin) {
            let hashedPassword = await bcrypt.hash(password, 10);

            // Create a new Admin
            const newAdmin = new Admin({
                name,
                registrationNumber: rootAdminRegNo,
                password: hashedPassword,
                email
            });

            await newAdmin.save();
        }

        return {
            "success": true,
        };
    } catch (error) {
        return {
            "success": false,
            "message": error.message
        };
    }
}

export { addRootAdmin };
