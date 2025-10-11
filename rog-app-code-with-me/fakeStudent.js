import { faker } from '@faker-js/faker';
import { students } from './models/index.js';

async function fakeStudents() {
    await students.create({
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName()
    });
}
fakeStudents(1)