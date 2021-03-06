/* eslint-disable camelcase, arrow-parens */

'use strict';

exports.seed = knex => {
  return knex('sessions').del()
    .then(() => {
      return knex('sessions').insert([
        {
          id: 1,
          game_id: 1,
          min_players: 2,
          max_players: 4,
          location_name: 'Galvanize',
          location_lat: 48.5989617,
          location_lng: -122.0337989,
          description: 'Lets Game yall!',
          owner_id: 1,
          time: 1488223678518,
          has_board: true
        },
        {
          id: 2,
          game_id: 3,
          min_players: 2,
          max_players: 3,
          location_name: 'Galvanize',
          location_lat: 47.5989617,
          location_lng: -122.3337989,
          description: 'Lets Game again yall!',
          owner_id: 3,
          time: 1488223876518,
          has_board: true
        },
        {
          id: 3,
          game_id: 1,
          min_players: 2,
          max_players: 4,
          location_name: 'Galvanize',
          location_lat: 47.8989617,
          location_lng: -122.0337989,
          description: 'Lets Game bros!',
          owner_id: 3,
          time: 1488223679518,
          has_board: false
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('sessions_id_seq', (SELECT MAX(id) FROM sessions));"
      );
    });
};
