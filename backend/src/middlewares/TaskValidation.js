const TaskModel = require('../model/TaskModel');

const { isPast } = require("date-fns")

const TaskValidation = async(req, res, next) => {

    const { macaddress, type, tittle, description, when } = req.body;

    if (!macaddress)
        return res.status(400).json({ error: 'Error macaddress é obrigatório!' });
    else if (!type)
        return res.status(400).json({ error: 'Error type é obrigatório!' });
    else if (!tittle)
        return res.status(400).json({ error: 'Error tittle é obrigatório!' });
    else if (!description)
        return res.status(400).json({ error: 'Error description é obrigatório!' });
    else if (!when)
        return res.status(400).json({ error: 'Error data e hora é obrigatório!' });
    
    else {

        let exists;

        if (req.params.id) {
            exists = await TaskModel.findOne({
                '_id': { '$ne': req.params.id },
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress }
            })
        } else {
            if (isPast(new Date(when)))
                return res.status(400).json({ error: 'Error escolha uma data e hora futura' });
            exists = await TaskModel.findOne({
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress }
            })
        }


        if (exists) {
            return res.status(400).json({ error: 'Error já existe uma tarefa neste dia e horario' });
        }

        next();
    }
}


module.exports = TaskValidation;