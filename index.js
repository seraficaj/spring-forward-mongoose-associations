const db = require("./models");

const commentCrud = async () => {
    try {
        // CREATE
        // make a new blog to add new comments to
        // upsert blog
        // filter - to match
        const filter = {
            title: "i love mongoose!",
        };
        // data to insert
        const blog = {
            body: "you should rly try mongoose. it is the best ODM",
        };
        // upsert = update or insert
        const newBlog = await db.BlogPost.findOneAndUpdate(filter, blog, {
            upsert: true,
        });
        // console.log(newBlog);
        // READ
        // newBlog.comments.push({
        //     header: "additional comment",
        //     body: "when will R9 get released?",
        //     date: new Date(),
        // });
        // save the parent doc after pushing in subDoc
        await newBlog.save();
        console.log(newBlog);
        // UPDATE
        // change fields
        //find subdoc by ID
        // const foundComment = newBlog.comments.id("6233bc40e109d94697e80fcd")
        // foundComment.body += 'added content'
        // await newBlog.save();
        //DESTROY -- invoke the .remove() method on a subdoc and then save parent
        // remove 2nd comment from sudoc array
        newBlog.comments[1].remove();
        await newBlog.save();
        console.log(newBlog);
    } catch (err) {
        console.log(err);
    }
};

// commentCrud();

const userCrud = async () => {
    try {
        // CREATE USER
        const newUser = await db.User.create({
            name: "test1",
            email: "test1@gmail.com",
        });
        // find a blog
        const newBlog = await db.BlogPost.create({
            title: "Test Blog 1",
            body: "just like a circus",
        });
        // add user to the blog
        newBlog.blogger = newUser;
        // add the blog to the user
        newUser.blogs.push(newBlog);
        // save everything
        await newBlog.save();
        await newUser.save();
        // READ Queries
        // Find 1 User
        const foundUser = await db.User.findOne({ name: "Jason" }).populate({
            path: 'blogs',
            populate: {
                path: 'blogger'
            }
        }); //.populate fills in deets
        console.log(foundUser.blogs);
        // mongoose does not support update or destroy with built-in methods.
    } catch (err) {}
};
userCrud();
