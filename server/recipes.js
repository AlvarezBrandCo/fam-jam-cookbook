var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "famjam"
});

const add = (req) => {
  const { name, tags, cooks, recipeInfo } = req.body;
  console.log(req.body)
  const generateInsertRecipeQuery = () => {
    const columns = `(name, recipe_info, ${tags.join(", ")})`
    const generateOnes = tags.map(tag => '1').join(", ");
    const values = `('${name}', '${recipeInfo}', ${generateOnes})`
    return `INSERT INTO recipes ${columns} values ${values}`;
  }
  const generateChefToRecipeQuery = () => {
    const recipeIdQuery = `SELECT id from recipes where name = '${name}'`
    const chefs = cooks.map(c => `'${c}'`).join(", ");
    const chefIdsQuery = `SELECT id from chefs where chef_name in (${cooks})`

    return `INSERT INTO
            chef_to_recipe (chef_id, recipe_id) with chef_ids as (
    SELECT
      id
    FROM
      chefs
    WHERE
      chef_name in (${chefs})
  )
SELECT
  ci.id,
  r.id
FROM
  chef_ids ci
  INNER JOIN recipes r on r.name = '${name}';`

  }
  con.query(generateInsertRecipeQuery(), function (err, result, fields) {
    if (err) throw err;
  });
  con.query(generateChefToRecipeQuery(), function (err, result, fields) {
    if (err) throw err;
  });
  // base('Recipes').create([
  //   {
  //     "fields": {
  //       "Name": name,
  //       "Tags": renderTags,
  //       "Who makes/made it?": renderCooks,
  //       "Recipe Info": recipeInfo.join("\n\n"),
  //       "Who submitted": ["Casey"],
  //       "Date": moment()
  //     }
  //   },
  // ], {typecast: true}, function(err, records) {
  //   if (err) {
  //     res.json(err);
  //     return;
  //   }
  //   records.forEach(function (record) {
  //     res.json({status: 200})
  //   });
  // });
}

module.exports = { add };
