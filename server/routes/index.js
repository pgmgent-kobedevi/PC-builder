const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');
const { cpuModel } = require("../models/Cpu");
const { manufacturerModel } = require("../models/Manufacturer");
const { cpuSocketModel } = require("../models/CpuSocket");
const { formfactorModel } = require("../models/Formfactor");
const { motherboardModel } = require("../models/motherboard");
const { caseModel } = require("../models/Case");
const { ramModel } = require("../models/Ram");
const CpuController = require("../controllers/CpuController");
const CpuSocketController = require("../controllers/CpuSocketController");
const ManufacturerController = require("../controllers/ManufacturerController");
const FormfactorController = require("../controllers/FormfactorController");
const MotherboardController = require("../controllers/MotherboardController");
const CaseController = require("../controllers/CaseController");
const RamController = require("../controllers/RamController");

const cpuController = new CpuController();
const manufacturerController = new ManufacturerController();
const cpuSocketController = new CpuSocketController();
const formfactorController = new FormfactorController();
const motherboardController = new MotherboardController();
const caseController = new CaseController();
const ramController = new RamController();

const registerRoutes = (app, db) => {
	// CPUS
	app.get("/cpu", cpuController.fetchCpus);
	app.post("/cpu", cpuModel, cpuController.createCpu);

	// Motherboards
	app.get("/motherboard", motherboardController.fetchMotherboards);
	app.post(
		"/motherboard",
		motherboardModel,
		motherboardController.createMotherboard
	);

	// Cases
	app.get("/case", caseController.fetchCases);
	app.post("/case", caseModel, caseController.createCase);

	// RAM
	app.get("/ram", ramController.fetchRam);
	app.post("/ram", ramModel, ramController.createRam);

	// Manufacturers
	app.get("/manufacturer", manufacturerController.fetchManufacturers);
	app.post(
		"/manufacturer",
		manufacturerModel,
		manufacturerController.createManufacturer
	);

	// CPU sockets
	app.get("/cpusocket", cpuSocketController.fetchCpuSockets);
	app.post("/cpusocket", cpuSocketModel, cpuSocketController.createCpuSocket);

	// Formfactors
	app.get("/formfactor", formfactorController.fetchFormfactors);
	app.post(
		"/formfactor",
		formfactorModel,
		formfactorController.createFormfactor
	);

	// default 404
	app.use(function (req, res, next) {
		next(new NotFoundError());
	});

	// error handler
	app.use(function (err, req, res, next) {
		res.status(err.statusCode || 500);
		res.json(err);
	});
};

module.exports = {
	registerRoutes,
};
