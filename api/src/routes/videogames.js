require('dotenv').config();

const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre, Plataform } = require('../db.js');

const { API_KEY } = process.env;
const router = Router();



router.get('/', async (req, res)=>{
  if (req.query.name) {
    try {
      let rs = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`);
      let videoGames = await Videogame.findAll({ include: [{model: Genre},{model: Plataform}] });
      let mix = [...rs.data.results, ...videoGames];
      if (mix[0]) res.status(200).json(mix.slice(0, 15))
      else  res.status(204).json({data: 'No se obtubieron resultados'});
    } catch (error) {
      res.status(400).json({error})
    }
  }else{
    try {
      let videoGames = await Videogame.findAll({ include: [{model: Genre},{model: Plataform}] });
      videoGames = videoGames.map(val=>val.dataValues);
    
      for (let i = 1; i <= 5; i++) {
        let rs = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        videoGames = [...rs.data.results, ...videoGames];
      }
      // console.log(videoGames.length);
      res.status(200).json(videoGames)
    } catch (error) {
      res.status(400).json({error})
    }
  }
})

module.exports = router;