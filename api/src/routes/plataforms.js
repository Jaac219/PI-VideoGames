const { Router } = require('express');
const { Plataform } = require('../db.js');

const router = Router();

router.get('/', async (req, res)=>{
  try {
    const rs = await Plataform.findAll();
    res.status(200).json(rs);
  } catch (error) {
    res.status(400).json({error});
  }
});



module.exports = router;