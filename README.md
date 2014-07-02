_ fallando estrepitosamente _
#PintxApp
Una vez más ... las tapas al poder (y al buche)

Descubre desde tu navegador dónde se celebran los eventos gastronómicos del momento y los detalles más importantes. Olvidate de los engorrosos PDF´s y a disfrutar.

En esta ocasión el juguete tiene las siguientes características:

  1. Express 4
  2. MongoDB
  3. AngularJS

##Si quieres jugar
Bájate el código
````
  git clone
````
Instala dependencias
````
  npm install
````
````
  bower install
````
Y échalo a andar
````
  cd server
  
  nodemon app.js
````
Por cierto, la estructura de datos podría ser parecida a esta:
````
  name: "Nombre del evento",
  region: "Region/Comunidad/...",
  location: "Ciudad",
  date: ISODate("2014-05-30T10:50:42.389Z"),
  info: "Descripción",
  price: "X.00€",
  locals:[
        {
          id: 47,
          name: "Taberna Salcedo",
          snack: "Ensalada primavera",
          address: "C/Bermudez de Castro, 38",
          loc: {
            lon: -5.837140999999974,
            lat: 43.370952
          },
          schedule: "Horario: de 13:00 a 16:00 y de 20:15 a 24:00 h.",
          additional: "Cierra: lunes",
          phone: "",
          visits: 0
        }
      ]
````