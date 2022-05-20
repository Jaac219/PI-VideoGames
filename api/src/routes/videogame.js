require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre, Plataform } = require('../db.js');

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
            {model: Plataform}
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
    const {name, description, released, rating, image_url, genres, plataforms} = req.body;
    let gameCreate = await Videogame.create({name, description, released, rating, image_url});

    if(genres[0]) genres.forEach(element => {gameCreate.setGenres(element)});
    if(plataforms[0]) plataforms.forEach(element => {gameCreate.setPlataforms(element)});
    
    res.status(201).send('Juego creado correctamente');
  } catch (error) {
    res.status(400).json({error});
  }
})

module.exports = router;