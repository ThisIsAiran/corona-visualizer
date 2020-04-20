const express = require('express')
const ejs = require('ejs')
const path = require('path')
const request = require('request');
const router = new express.Router()

const fs = require('fs')
const csv = require('csv-parser');

router.get("/ageGroup", async (req, res)=>{
	try{
		let output = []	
		var data = await fs.createReadStream('./AgeGroupDetails.csv')
		data.pipe(csv()).on('data',(row)=>{
			output.push([row['AgeGroup'], parseInt(row['TotalCases']), parseFloat(row['Percentage'])])
		}).on('end',()=>{
			res.render("ageGroup",{output:output})
		})
	}
	catch(e)
	{
		res.send(e);
	}
	
})

router.get("/stateWiseCorona", (req, res)=>{
	 request(
    { url: 'http://localhost:8000/TrochWS/Projects/Corona/templates/topojson-master/countries/india/india-states.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      var data = JSON.parse(body)
      data = JSON.stringify(data)
      res.render("stateWiseCase", {data:data});
    }
  )
})


module.exports = router

