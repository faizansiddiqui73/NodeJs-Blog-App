const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


/*Routes
    * GET /
    * Post
*/

router.get('', async (req, res) => {
    // res.send("hello from nodejs Blog")
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 6;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]) //older one will be at up
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

        // res.render('index.ejs', { locals, data });
    } catch (error) {
        console.log(error);
    }

});
/*Routes
    * GET /
    * Post
*/

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Created the NodeJs Blog with MogoDB & Express"
        }

        res.render('post.ejs', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

/*Routes
    * POST /
    * Post
*/
router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Search",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
  
  
  /**
   * GET /
   * About
  */
  router.get('/about', (req, res) => {
    res.render('about', {
      currentRoute: '/about'
    });
  });

  /**
   * GET /
   * Contact
  */
  router.get('/contact', (req, res) => {
    res.render('contact', {
      currentRoute: '/contact'
    });
  });



// router.get('', async (req, res) => {
//     // res.send("hello from nodejs Blog")
//     const locals = {
//         title: 'NodeJs Blog',
//         description: "Created the NodeJs Blog with MogoDB & Express"
//     }
//     try {
//         const data = await Post.find();
//         res.render('index.ejs',{locals ,data});
//     } catch (error) {
//         console.log(error);
//     }
// });


module.exports = router;