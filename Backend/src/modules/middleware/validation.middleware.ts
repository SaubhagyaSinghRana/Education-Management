import { Request,Response,NextFunction } from "express";


export const validate=(schema:any)=>(req:Request,res:Response,next:NextFunction)=>{
    try{
        if (schema.body){
            const result=schema.body.safeParse(req.body);

            if (!result.success){
                return res.status(400).json({
                success:false,
errors: result.error.errors,            });
        }
              req.body=result.data;
        }
        if(schema.params){
            const result=schema.params.safeParse(req.params);
            if(!result.success){
                return res.status(400).json({
                    success:false,
errors: result.error.errors,                });
            }
            req.params = result.data;

        }

     if (schema.query) {
      const result = schema.query.safeParse(req.query);

      if (!result.success) {
        return res.status(400).json({
          success: false,
errors: result.error.errors,        });
      }

      req.query = result.data;
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};