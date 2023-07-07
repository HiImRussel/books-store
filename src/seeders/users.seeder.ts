/** Sequelize */
import sequelize from "../configs/db.config";

/** Models */
import User from "../models/user.model";

const seedUsers = async () => {
    await User.destroy({
        where: {},
        truncate: true,
    });

    //password: test123
    await User.create({
        email: "test@test.com",
        password:
            "$2b$10$MyK6pq/9lY4Hp4Okfic09eYvPHFcVJ0o2VgqNPrbno.Enwb1wLUfO",
        address: "address",
        city: "city",
        postalCode: "64-510",
        phoneNumber: 123456789,
        isAdmin: true,
    });

    await User.create({
        email: "test2@test.com",
        password:
            "$2b$10$MyK6pq/9lY4Hp4Okfic09eYvPHFcVJ0o2VgqNPrbno.Enwb1wLUfO",
        address: "address",
        city: "city",
        postalCode: "64-510",
        phoneNumber: 123456789,
        isAdmin: false,
    });

    console.log("Users seeded ended!");
};

export default seedUsers;
