const { raw } = require('express')
const Task = require('../models/Task')

module.exports = class TaskController{
    static createTask(req,resp){
        resp.render('tasks/create')
    }

    static async createTaskSave(req,resp){
        const task = {
            title : req.body.title,
            description : req.body.description,
            done : false
        }

        await Task.create(task)
        resp.redirect('/tasks')
    }

    static  async showTasks(req,resp){
       const tasks = await Task.findAll({raw:true})
        resp.render('tasks/all',{tasks})
    }

    static async view(req,resp){
        const id = req.params.id
        const task = await Task.findOne({raw:true,where:{id:id}})

        resp.render('tasks/see',{task})
    }

    static async removeTask(req,resp){
        const id = req.body.id
        await Task.destroy({where:{id:id}})
        
        resp.redirect('/tasks')
    }

    static async updateTask(req,resp){
        const id = req.params.id

        const task = await Task.findOne({raw:true,where:{id:id}})
        resp.render('tasks/edit',{task})
    }

    static async updateTaskPost(req,resp){
        const id = req.body.id

        const updatedTask = {
            title:req.body.title,
            description:req.body.description
        }

        await Task.update(updatedTask,{where:{id:id}})
        resp.redirect('/tasks')
    }

    static async toggleTaskStatus(req,resp){
        const id = req.body.id

        const toggleStatus ={
            done: req.body.done ==='0' ? true : false
        }

        await Task.update(toggleStatus,{where:{id:id}})
        resp.redirect('/tasks')
    }
}