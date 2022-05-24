/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const juego = {
  name: 'juego de prueba',
  description: "cualquier cosa",
  released: "2022-04-05",
  rating: 4.00,
  background_image: null
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(juego)));

  it('GET/videogames', () =>
    agent.get('/videogames').expect(200)
  );
  it('GET/videogame', () =>
    agent.get('/videogame/123').expect(200)
  );
  it('GET/genres', () =>
    agent.get('/genres').expect(200)
  );
  it('POST/videogame', () =>
    agent.post('/videogame').send({
      name: 'juego de prueba',
      description: "cualquier cosa",
      released: "2022-04-05",
      rating: 4.00,
      background_image: null,
      genres: [],
      platforms: []
    }).expect(201)
  );
});
