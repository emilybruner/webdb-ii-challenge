
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();

        tbl.string('VIN').notNullable().unique();

        tbl.string('make').notNullable().index();

        tbl.string('model').notNullable().index();

        tbl.integer('mileage').notNullable();

        tbl.string('transmission');

        tbl.string('title');

        tbl.timestamps(true, true); 

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
