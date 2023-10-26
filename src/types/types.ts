declare namespace Express {
    interface Request {
      userId: string; // Define la propiedad userId y su tipo aquí
    }
  }
  
  interface CustomRequest extends Request {
    userId: string;
  }