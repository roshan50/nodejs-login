var faker = require('faker');

let createRecord = (knex, id) => {
    return knex('users').insert({
        id,
        username: faker.internet.userName(),
        email: faker.internet.exampleEmail(),
        created_at: new Date(),
        updated_at: new Date()
    })
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
      .then(() => {
          let records = [];

          for (let i = 1; i < 10; i++) {
              records.push(createRecord(knex, i))
          }

          return Promise.all(records);
      });
};
