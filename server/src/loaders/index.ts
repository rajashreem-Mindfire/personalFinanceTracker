
import expressLoader from './express';
import swaggerLoader from './swagger';
export default async (app: any) => {

  // load swagger doc
  swaggerLoader(app);

  // load express app
  expressLoader(app);
};

