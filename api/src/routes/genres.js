require('dotenv').config();

const axios = require('axios');
const { Router } = require('express');
const { Genre } = require('../db.js');

const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req, res)=>{
  try {
    let rs = await Genre.findAll();
    if (rs.length !== 0) {
      res.status(200).json(rs);
    }else{
      let ax = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      let { results } = ax.data;
      results = results.map(val=>{return {name: val.name, image_background: val.image_background}})
      await Genre.bulkCreate(results);
      rs = await Genre.findAll();
      res.status(200).json(rs);
    }
  } catch (error) {
    res.status(400).json({error});
  }
});

module.exports = router;