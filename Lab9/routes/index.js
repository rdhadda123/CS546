//Here you will import route files and export them as used in previous labs.
import arrayRoutes from './arraySort.js'

const constructorMethod = (app) => {
    app.use('/', arrayRoutes);
    app.use('*', (req, res) => {
        //Do I have to redirect to '/' page?
        return res.status(404).json({error: 'Not found'});
    });
  };
  
export default constructorMethod;