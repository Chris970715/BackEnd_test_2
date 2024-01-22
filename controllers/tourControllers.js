import Tour from "../models/tourModel.js";
import APIFeatures from '../utils/apiFeatures.js';


export const getAllTour = async (req, res) => {
    try {

        const features = new APIFeatures(Tour.find(), req.query)
            .filter();


        const tour = await features.query;

        res.status(200).json({
            status: 'success',
            data: {
              tour
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
        
    }
}

export const getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });  
    }
    catch(error)
    {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

export const createTour =  async (req, res) => {
    try{
        const tour = await Tour.create(req.body);
        res.status(200).json({
            status: 'sucess',
            data : {
                tour
            }
        });
    }
    catch(error){
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

export const updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data : {
                tour
            }
        });
    }
    catch(error)
    {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

export const deleteTour = async(req, res) => {
    try{
        const tour = await Tour.deleteOne(req.params.id);
        res.status(200).json({
            status: 'success',
            data : {
                tour
            }
        });
    }catch(error)
    {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}
