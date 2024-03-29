import Tour from "../models/tourModel.js";
import APIFeatures from '../utils/apiFeatures.js';

export const aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-price,ratingsAverage,ratingsQuantity';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

    next();
}

export const getAllTour = async (req, res) => {
    try {

        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination();


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

export const getTourStats = async (req,res) => {
    try{
        const tour = await Tour.aggregate([
            {
                $match : { ratingsAverage : { $gte: 4.5} }
            },
            {
                $group : {
                    _id: {$toUpper: '$diffuculty'},
                    numTours : { $sum: 1},
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }

                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch(err)
    {
        res.status(404).json({
            status: 'fail',
            data: {
                err
            }
        })
    }
};

export const getMonthlyPlan = async (req, res) => {
    try {
      const year = req.params.year * 1; // 2021
  
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
