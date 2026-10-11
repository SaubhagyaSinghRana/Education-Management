import { Request, Response } from "express";
import Fees from "./fees.model";


export const createFees = async (
  req: Request,
  res: Response
) => {
  try {
    
    const fees = await Fees.create(req.body);
const populatedFees = await Fees.findById(fees._id)
      .populate("studentId", "name");

    res.status(201).json({
      success: true,
      data: populatedFees
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    });

  }
};


export const getFees = async (
  req: Request,
  res: Response
) => {
  try {

    const fees = await Fees.find()
      .populate("studentId", "name");

    res.status(200).json({
      success: true,
      data: fees
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    }); 

  }
};
export const getFeesById = async (
  req: Request,
  res: Response
) => {

  try {

    const fees = await Fees.findById(
      req.params.id
    ).populate("studentId");


    if(!fees){

      return res.status(404).json({
        success:false,
        message:"Fees not found"
      });

    }


    res.status(200).json({
      success:true,
      data:fees
    });


  } catch(error){

    res.status(400).json({
      success:false,
      message:"filed Error"
    }); 

  }

};



export const payFees = async (
  req: Request,
  res: Response
) => {
  try {
    const { paymentMode } = req.body;

    const fees = await Fees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        status: "paid",
        paymentMode,
        paidDate: new Date()
      },
     
    ).populate("studentId");
    


    if (!fees) {
      return res.status(404).json({
        success: false,
        message: "Fees not found"
      });
    }


    res.status(200).json({
      success: true,
      data: fees
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    });

  }
};


export const getPendingFees = async (
  req: Request,
  res: Response
) => {
  try {

    const fees = await Fees.find({
      status: "pending"
    })
      .populate("studentId");


    res.status(200).json({
      success: true,
      data: fees
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed error"
    });

  }
};

export const deleteFees = async (
  req: Request,
  res: Response
) => {
  try {
    const fees = await Fees.findByIdAndDelete(req.params.id);

    if (!fees) {
      return res.status(404).json({
        success: false,
        message: "Fees not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fees deleted successfully",
    });
  } catch (error: any) {
    console.log("DELETE FEES ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};