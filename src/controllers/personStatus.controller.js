import personStatusModel from '../models/personStatus.model.js';

export const createPersonStatus = async (req, res) => {
    try {
        const dataPersonStatus = req.body;

        // Validación de los campos requeridos
        if (!dataPersonStatus.status_name || !dataPersonStatus.status_description) {
            return res.status(400).json({
                message: 'Missing required fields: status_name or status_description',
                status: 400,
            });
        }

        await personStatusModel.sync();

        const createPerson = await personStatusModel.create({
            personStatus_name: dataPersonStatus.status_name,
            personStatus_description: dataPersonStatus.status_description,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Create Person Status',
            id: createPerson.personStatus_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the consultation',
            status: 500,
            error: error.message,
        });
    }
};

export const showPersonStatus = async (req, res) => {
    try {
        const Persons = await personStatusModel.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Persons Status',
            body: Persons,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the consultation',
            status: 500,
            error: error.message,
        });
    }
};

export const showIdPersonStatus = async (req, res) => {
    try {
        const idStatus = req.params.id;
        const person = await personStatusModel.findOne({
            where: {
                personStatus_id: idStatus,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Show Person Status id',
            body: person,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
            error: error.message,
        });
    }
};

export const updatePersonStatus = async (req, res) => {
    try {
        const dataPersonStatus = req.body;
        const idStatus = req.params.id;

        // Validación de los campos requeridos
        if (!dataPersonStatus.status_name || !dataPersonStatus.status_description) {
            return res.status(400).json({
                message: 'Missing required fields: status_name or status_description',
                status: 400,
            });
        }

        await personStatusModel.sync();

        const updatePerson = await personStatusModel.update({
            personStatus_name: dataPersonStatus.status_name,
            personStatus_description: dataPersonStatus.status_description,
        }, {
            where: {
                personStatus_id: idStatus,
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Update Person Status',
            body: updatePerson,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
            error: error.message,
        });
    }
};

export const deletePersonStatus = async (req, res) => {
    try {
        const idStatus = req.params.id;

        await personStatusModel.sync();

        const deletePerson = await personStatusModel.destroy({
            where: {
                personStatus_id: idStatus,
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Delete Person Status :)',
            body: deletePerson,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the request',
            status: 500,
            error: error.message,
        });
    }
};
