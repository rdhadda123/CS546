//Here you will import route files and export them as used in previous labs
import characterRoutes from './characters.js'

const constructorMethod = (app) => {
    app.use('/', characterRoutes);
    app.use('/searchmarveluniverse', characterRoutes);
    app.use('/character', characterRoutes);
    app.use('*', (req, res) => {
        return res.status(404).json({error: 'Not found'});
    });
  };
  
export default constructorMethod;