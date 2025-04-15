//Here you will import route files and export them as used in previous labs.
import arrayRoutes from './arraySort.js'

const constructorMethod = (app) => {
    app.use('/', arrayRoutes);
    app.use('*', (req, res) => {
        res.redirect('/')
    });
  };
  
export default constructorMethod;