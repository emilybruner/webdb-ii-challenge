
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: "1GNEK13ZX3R298984",
          make: "Toyota",
          model: "Tacoma",
          mileage: 70000,
          transmission: 'automatic',
          title: 'clean'
        },
        {
          VIN: "1GNEK13ZX3R298985",
          make: "Honda",
          model: "Pilot",
          mileage: 120000,
          transmission: 'automatic',
          title: 'clean'
        },
        {
          VIN: "1GNEK13ZX3R298986",
          make: "Ford",
          model: "Fusion",
          mileage: 150000,
          transmission: 'automatic',
          title: 'salvage'
        }
      ]);
    });
};
