const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Videogame.sync({ force: true }));
  it('Deberia lanzar un error si el nombre es null', (done) => {
    Videogame.create({
      name: null,
      description: "cualquier cosa",
      released: "2022-04-05",
      rating: 4.00,
      background_image: null
    })
      .then(() => done(new Error('Se requiere un nombre valido')))
      .catch(() => done());
  });
  it('Deberia lanzar un error si el descripcion es null', (done) => {
    Videogame.create({
      name: 'juego de prueba',
      description: null,
      released: "2022-04-05",
      rating: 4.00,
      background_image: null
    })
      .then(() => done(new Error('Se requiere una descripcion valida ')))
      .catch(() => done());
  });
  it('Deberia lanzar un error si el formato de fecha esta mal', (done) => {
    Videogame.create({
      name: 'juego de prueba',
      description: "cualquier cosa",
      released: "fecha mala",
      rating: 4.00,
      background_image: null
    })
      .then(() => done(('Formato de fecha incorrecto')))
      .catch(() => done());
  });
  it('Deberia lanzar un error si el rating no es un numero', (done) => {
    Videogame.create({
      name: 'juego de prueba',
      description: "cualquier cosa",
      released: "2022-04-05",
      rating: "rating malo",
      background_image: null
    })
      .then(() => done(new Error('Rating debe ser un numero')))
      .catch(() => done());
  });
});
