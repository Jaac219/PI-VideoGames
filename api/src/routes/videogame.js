require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre, Platform } = require('../db.js');

const { API_KEY } = process.env;
const router = Router();


router.get('/:idVideogame', async (req, res)=>{
    let { idVideogame } = req.params;
    const regexUUIDv4 = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    
    try {
      let vd;
      if(idVideogame.match(regexUUIDv4)){
        vd = await Videogame.findOne({
          where: {id: idVideogame},
          include: [
            {model: Genre},
            {model: Platform}
          ]
        });
        if(vd) vd = vd.dataValues;
      }else if (Number.isInteger(Number.parseInt(idVideogame))) {
        vd = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
          .catch(err=>{return {error: err}});
          if(vd.data) vd = vd.data;
          if(vd.error) vd = null;
      }

      if (vd) res.status(200).json(vd)
      else res.status(204).json({data: 'No se obtubieron resultados'});
    }catch (error) {
      res.status(400).json({error})
    }
});


router.post('/', async (req, res)=>{
  try {
    const {name, description, released, rating, background_image, genres, platforms} = req.body;
    let gameCreate = await Videogame.create({name, description, released, rating, background_image});

    if(genres && genres[0]) genres.forEach(element => {gameCreate.setGenres(element.id)});
    if(platforms && platforms[0]) platforms.forEach(element => {gameCreate.setPlatforms(element.id)});
    
    res.status(201).send('Juego creado correctamente');
  } catch (error) {
    res.status(400).json({error});
  }
})

router.delete('/:id', async (req, res)=>{
  try {
    await Videogame.destroy({where: { id: req.params.id}});
    res.status(200).send('Eliminado correctamente')
  } catch (error) {
    res.status(400).send('Error')
  }
})

router.put('/', async (req, res)=>{
  try{
    const {id, name, description, released, rating, background_image, genres, platforms} = req.body;
    //Inicialmente busca el juego que se quiere modificar
    let findGame = await Videogame.findOne({where: {id: id}, include: [{model: Genre},{model: Platform}]})
    //Usando el modelo del juego encontrado se edita
    let gameUpdate = await findGame.update({name, description, released, rating, background_image})

    //Se crea un array de los ids de los generos y otro de las plataformas que tiene este juego
    let idsGenres = gameUpdate.genres.map((v)=>v.dataValues.id);
    let idsPlatfomrs = gameUpdate.platforms.map((v)=>v.dataValues.id);

    //Se eliminan todas las plataformas y generos que tiene asociado este juego enviando el array de ids
    await gameUpdate.removeGenres(idsGenres);
    await gameUpdate.removePlatforms(idsPlatfomrs);

    //Se crean las nuevas relaciones de generos y plataformas que llegan por el body
    if(genres && genres[0]) genres.forEach(element => {gameUpdate.setGenres(element.id)});
    if(platforms && platforms[0]) platforms.forEach(element => {gameUpdate.setPlatforms(element.id)});
    
    res.status(200).send('Juego modificado correctamente')
  }catch(error){
    res.status(400).send('Error al modificar el juego')
  }
})

module.exports = router;