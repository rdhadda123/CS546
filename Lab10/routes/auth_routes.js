//import express, express router as shown in lecture code

router.route('/').get(async (req, res) => {
  //code here for GET
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
});

router.route('/superuser').get(async (req, res) => {
  //code here for GET
});

router.route('/signout').get(async (req, res) => {
  //code here for GET
});
