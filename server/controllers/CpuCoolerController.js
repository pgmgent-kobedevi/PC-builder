const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const SQL = require("@nearform/sql");

class CpuCoolerController {
	fetchCpuCoolers = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cpucoolers`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCpuCoolerById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT cpucoolers.*, manufacturers.manufacturerName FROM cpucoolers
				LEFT JOIN manufacturers ON cpucoolers.idManufacturer = manufacturers.idManufacturer
				WHERE cpucoolers.idCpuCooler=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU cooler does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	// TODO: Update this method
	patchCpuCoolerById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, modelName, height, width, depth, cpuSockets } =
			req.body;
		if (modelName && clockSpeed && cores) {
			try {
				const { id } = req.params;
				const manufacturer = await db
					.promise()
					.query(
						`select idManufacturer from manufacturers where idManufacturer = "${idManufacturer}"`
					);
				if (manufacturer[0].length === 0) {
					return res
						.status(400)
						.json({ message: "Given idManufacturer does not exist" });
				}

				const promises = [];
				cpuSockets.forEach(async (socket) => {
					const id = uuidv4();
					const sqlInsert =
						"INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES (?,?,?)";
					promises.push(
						await db
							.promise()
							.query(sqlInsert, [id, coolerId, socket.idCpuSocket])
					);
				});
				Promise.all(promises).then(() => {
					res.status(201).send({
						message: "CPU cooler added",
						id: coolerId,
					});
				});
				// TODO: CLEAN THIS SHIT UP for updating cpucooler has cpusockets

				const sql = `UPDATE cpucoolers SET idManufacturer = ?, modelName = ?, height = ?, width = ?, depth = ? WHERE idProcessor=?`;
				let data = [coolerId, idManufacturer, modelName, height, width, depth];

				// execute the UPDATE statement
				db.promise()
					.query(sql, data)
					.then(() => {
						res.status(201).send({
							message: "CPU updated",
							id,
							coolerId,
							idManufacturer,
							modelName,
							height,
							width,
							depth,
						});
					})
					.catch((e) => {
						next(e);
					});
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};

	createCpuCooler = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			modelName,
			height,
			width,
			depth,
			cpuSockets = [{ idCpuSocket: undefined, tempId: undefined }],
		} = req.body;
		try {
			const manufacturer = await db
				.promise()
				.query(
					SQL`select idManufacturer from manufacturers where idManufacturer = ${idManufacturer}`
				);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}

			const coolerId = uuidv4();
			const sqlInsert =
				"INSERT INTO cpucoolers (idCpuCooler, idManufacturer, modelName, height, width, depth) VALUES (?,?,?,?,?,?)";
			await db
				.promise()
				.query(sqlInsert, [
					coolerId,
					idManufacturer,
					modelName,
					height,
					width,
					depth,
				]);

			// OLD METHOD WITH MULTIPLE INSERTS
			// const promises = [];
			// cpuSockets.forEach(async (socket) => {
			// 	const id = uuidv4();
			// 	const sqlInsert =
			// 		"INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES (?,?,?)";
			// 	promises.push(
			// 		await db
			// 			.promise()
			// 			.query(sqlInsert, [id, coolerId, socket.idCpuSocket])
			// 	);
			// });

			// Promise.all(promises).then(() => {
			// 	res.status(201).send({
			// 		message: "CPU cooler added",
			// 		id: coolerId,
			// 	});
			// });
			const inserter = [];
			cpuSockets.forEach((socket) => {
				// only add valid cpusockets
				if (uuidValidate(socket.idCpuSocket)) {
					inserter.push(
						`('${uuidv4()}', '${coolerId}', '${socket.idCpuSocket}')`
					);
				}
			});
			if (inserter.length > 0) {
				const socketsSqlInsert = `INSERT INTO cpucooler_has_cpusockets (id, idCpuCooler, idCpuSocket) VALUES ${inserter.join(
					", "
				)}`;
				await db.promise().query(socketsSqlInsert);
			}
			res.status(201).send({
				message: "CPU cooler added",
				id: coolerId,
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = CpuCoolerController;
