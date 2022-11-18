const db = require('../utils/db');
const {validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');

class CpuController {
    
    fetchCpus = async (req, res, next) => {
        try {
            const results = await db.promise().query(`SELECT * FROM cpus`);
            res.status(201).send(results[0])
        } catch (e) {
            next(e);
        }
    }

    createCpu = async (req, res, next) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {idManufacturer, idCpuSocket, modelName, clockSpeed, cores} = req.body;
        if(modelName && clockSpeed && cores) {
            try {
                const manufacturer = await db.promise().query(`select * from manufacturers where idManufacturer = ${idManufacturer}`);
                if(manufacturer[0].length === 0) {
                    return res.status(400).json({message: "Given idManufacturer does not exist"});
                }
                const idProcessor =uuidv4()
                const sqlInsert = "INSERT INTO cpus (idProcessor, idManufacturer, idCpuSocket, modelName, clockSpeed, cores) VALUES (?,?,?,?,?,?)";
                db.promise().query(sqlInsert, [
                    idProcessor,
                    idManufacturer, 
                    idCpuSocket,
                    modelName, 
                    clockSpeed, 
                    cores
                ]);
                res.status(201).send({message: "Created CPU"})
            } catch (e) {
                next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
            }
        }
    }
}

module.exports = CpuController;