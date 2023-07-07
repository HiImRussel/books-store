/** Seeders */
import seedUsers from "./users.seeder";
import seedBooks from "./books.seeder";

const seeders = async () => {
    await seedUsers();
    await seedBooks();
};

seeders();
