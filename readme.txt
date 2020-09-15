Inicio el proyecto node

npm init --yes

luego instalo express y mysql

npm install express mysql

luego instalo nodemon como dependencia de desarrollo

npm install nodemon -D

+++++++++++++++++++++++++++++

crear cuenta en heroku

crea un proyecto en heroku

==================== DESPLEGANDO CON HEROKU CLI

instala heroku CLI (npm install -g heroku) o descargandolo

verifica la version (heroku --version)

logueate en browser (heroku login) ó en el CLI (heroku login -i)

OJO NO ES NECESARIO PERO SI DESEAS. agrega un archivo llamado "procfile" en el cual se agregara la aplicacion o comando de inicio: 

++ web: npm start

iniciar el repositorio git en el proyecto (git init)

conectarlo con el git de heroku (heroku git:remote -a nombre_del_app_en_heroku)

luego cada vez que se desee desplegar los cambios

se debe hacer commit 

++ git add .

++ git commit -am "make it better"

y subir los cambios a la rama en heroku

++ heroku git:remote -a nombre_del_app_en_heroku

==================== DESPLEGANDO DESDE GITHUB Y ES MUCHO MAS FACIL SIN INSTALAR EL HEROKU CLI

se asocia la cuenta git en el portal de heroku y listo

se presiona el boton de depslegar y desde que rama de desplegara

----- ojo para apps NODE

debe estar el archivo app.js en la raiz, fuera del src

y agregar en el package.json un script

"start":"node ."

NO ES NECESARIO AGREGAR EL ARCHIVO PROCFILE





