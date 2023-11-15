const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts, _] = await Post.findAll();

    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let post = new Post(title, body);

    post = await post.save();

    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let [post, _] = await Post.findById(postId);

    res.status(200).json({ post: post[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateWithId = async (req, res, next) => {
  //let postId = req.params.id;
  //let paivitetty = await Post.update(postId);
  //res.send(paivitetty, "Päivitetty");
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    // jos ei löydy
    if (!post) {
      return res.status(404).json({ message: `ei löydy id:llä ${id}` });
    }
    const paivitetty = await Post.findById(id);
    res.status(200).json(paivitetty);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteWithId = async (req, res, next) => {
  //let postId = req.params.id;
  //let poistettu = await Post.delete(postId);
  //res.send(poistettu, "Poistettu");
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: `ei löydy id:llä ${id}` });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
