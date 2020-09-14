const express = require("express"); //requiero express

const fileUpload = require("express-fileupload"); //requiero el modulo de manejo de archivos

const FincasController = require("../controllers/fincas");

const router = express.Router(); //utilizo el modulo rutas de express

router.use(fileUpload()); //uso el modulo de subir archivos en router

router.get("/fincas", FincasController.allFincas); // todas las fincas
router.get("/fincas/prueba", FincasController.prueba); // crear finca
router.get("/fincas/:id", FincasController.getFincaById); // una finca por Id
router.post("/fincas", FincasController.saveFinca); // crear finca

module.exports = router;

/* //recuperar un registro
router.get('/:id', (req, res) => {
    //requiero el id que viene el el request params
    const {
        id
    } = req.params
    //otra forma seria const id=req.params.id
    //otra forma `select * from employees where id=${id}`
    //se hace de esta manera para evitar inyeccion y ataques
    mysqlConnection.query(`select * from employees where id=?`, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0])
        } else {
            console.log(err)
        }
    })
})

//agregar nuevo registro
router.post('/', (req, res) => {
    //recuperar valores
    const {
        name,
        salary
    } = req.body;
    //const query = 'UPDATE employees SET name=?,salary=? WHERE id=?';
    const query = 'INSERT INTO employees VALUES(NULL, ?, ?)';
    //ejecucion del query
    mysqlConnection.query(query, [name, salary], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Empleado guardado'
            })
        } else {
            console.log(err)
        }
    })
})

//editar registro
router.put('/', (req, res) => {
    //recuperar valores
    const {
        id,
        name,
        salary
    } = req.body;
    //query ejecutar
    const query = 'UPDATE employees SET name=?,salary=? WHERE id=?';
    //ejecucion del query
    mysqlConnection.query(query, [name, salary, id], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Empleado editado'
            })
        } else {
            console.log(err)
        }
    })
})

//eliminar un registro
router.delete('/:id', (req, res) => {
    //recuperar valores
    const {
        id
    } = req.params;
    //querya ejecutar
    const query = 'DELETE FROM employees WHERE id=?';
    //ejecucion del query
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Empleado Eliminado'
            })
        } else {
            console.log(err)
        }
    })
})

//recibir y almacenar archivos
router.post('/upload', (req, res) => {
    //recuperar valores      
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('NO hay archivos adjuntos.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let Archivo = req.files.imagen;
    let filename = Date.now()
    let mimeType = Archivo.mimetype.split('/')
    console.log(mimeType[1])
    // Use the mv() method to place the file somewhere on your server
    Archivo.mv(__dirname + `../../../filesUploads/${filename}.${mimeType[1]}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('File uploaded!');
        }
    });
})

module.exports = router; */
