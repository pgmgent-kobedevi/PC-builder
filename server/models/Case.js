const { check } = require("express-validator");

const caseModel = [
	check("idManufacturer")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given manufacturer does not exist"),
	check("idFormfactor")
		.notEmpty()
		.isString()
		.isLength({ min: 36, max: 36 })
		.withMessage("Given formfactor does not exist"),
	check("modelName")
		.notEmpty()
		.isLength({ max: 100 })
		.withMessage("modelName can not be empty"),
	check(["height", "width", "depth"])
		.isInt({ min: 1, max: 1000 })
		.optional({ nullable: true })
		.withMessage("Dimensions must be of type int, with a max size of 1000mm"),
	check(["2-5_slots", "3-5_slots"])
		.isInt({ min: 0, max: 100 })
		.optional({ nullable: true })
		.withMessage("Storage slots must be of type int, between 0 and 100"),
];

module.exports = {
	caseModel,
};
