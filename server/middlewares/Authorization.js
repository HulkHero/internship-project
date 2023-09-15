
const Manager = require("../models/Manager.model");
const Employee = require("../models/Employee.model")
const adminAuthz = async (req, res, next) => {

    try {
        if (req.systemRole === "admin") {
            next()
        }

    } catch (error) {
        return res.status(401).send({ error: "Authoization error" })
    }

}
const managerAuthz = async (req, res, next) => {

    try {
        if (req.systemRole === "manager") {
            next()
        }

    } catch (error) {
        return res.status(401).send({ error: "Authoization error" })
    }

}



const employeeAuthz = async (req, res, next) => {

    try {
        if (req.role === "employee") {
            next()
        }

    } catch (error) {
        return res.status(401).send({ error: "Authoization error" })
    }

}

const AdminOrManager = async (req, res, next) => {
    try {
        if (req.systemRole === "admin" || req.systemRole === "manager") {
            next()
        }
    } catch (error) {
        return res.status(401).send({ error: "Authoization error" })
    }
}



module.exports = {
    adminAuthz,
    managerAuthz,
    employeeAuthz,
    AdminOrManager
};