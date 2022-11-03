const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'rootroot',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
); 
//get request to list all the movies
app.get("/api/movies", (req, res)=>{
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER `
 //need to query to get the movies because the movies table has all the movies
  db.query('SELECT * FROM movies', function (err, results){
    console.log(results);
    res.json(results);
  });
});

//add a movie
app.post("/api/add-movie", ({body}, res) => {
const sql = `INSERT INTO movies (movie_name)
  VALUES(?)`;
  const params = [body.movie_name];
  
  
  db.query(sql, params, (err, result) =>{
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: "success",
      data: body
    });
  });
});


app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`)
});