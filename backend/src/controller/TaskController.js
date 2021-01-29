const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');
const { response } = require('express');
const { model } = require('../model/TaskModel')
const TaskModel = require('../model/TaskModel')

const currente = new Date()
class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async all(req, res) {
        await TaskModel.find({ macaddress: { '$in': req.params.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show(req, res) {
        await TaskModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response)
                else
                    return res.status(404).json({ error: 'Tarefa não encontrada' });

            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res) {
        await TaskModel.deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async done(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, { 'done': req.params.done }, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async late(req, res) {
        await TaskModel.find({
                'when': { '$lt': currente },
                'macaddress': { '$in': req.params.macaddress }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async today(req, res) {
        await TaskModel.find({ 'macaddress': { '$in': req.params.macaddress }, 'when': { '$gte': startOfDay(currente), '$lte': endOfDay(currente) } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async week(req, res) {
        await TaskModel.find({ 'macaddress': { '$in': req.params.macaddress }, 'when': { '$gte': startOfWeek(currente), '$lte': endOfWeek(currente) } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async month(req, res) {
        await TaskModel.find({ 'macaddress': { '$in': req.params.macaddress }, 'when': { '$gte': startOfMonth(currente), '$lte': endOfMonth(currente) } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async year(req, res) {
        await TaskModel.find({ 'macaddress': { '$in': req.params.macaddress }, 'when': { '$gte': startOfYear(currente), '$lte': endOfYear(currente) } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }
}

module.exports = new TaskController();