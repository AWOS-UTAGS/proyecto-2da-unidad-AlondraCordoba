// ----------------------- PUERTO -----------------------
// HEROKU, servidor. Tambien se puede usar otro servidor para deployar la app.
// El valor dek puerto se lo dara HEROKU.

// variable (process). env (enviroment) = Esto ya lo tiene HEROKU
// Despues ya somos libres de poner las constantes que queramos, siempre en mayudaculas.
// En conjunto esto significa que preguntara si estara en un servidor en productivo (puerto que el servidor le asigne)y sera a si misma ya que directamente la detectara.
// Si no existe entonces sera en el puerto 3000.
process.env.PORT = process.env.PORT || 3000;