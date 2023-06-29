const postModels = require("../models/postModels");
const {
  postValidation,
  postUpdateValidation,
  getPostsValidation,
} = require("../validationSchema/validation");

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const { title, body, status, latitude, longitude } = data;
    const userId = req.tokenDetails.userId;

    const { error, value } = await postValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const geoLocation = {
      latitude: latitude,
      longitude: longitude,
    };
    const post = {
      title,
      body,
      createdBy: userId,
      status,
      geoLocation: geoLocation,
    };

    const create = await postModels.create(post);

    return res
      .status(201)
      .json({ data: create, message: "post created successfully" });
  } catch (error) {
    console.log("error in createPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const data = req.body;
    const { latitude, longitude } = data;

    const { error, value } = await getPostsValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const posts = await postModels
      .find({
        "geoLocation.latitude": latitude,
        "geoLocation.longitude": longitude,
      })
      .populate("createdBy");

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    const activeCount = posts.filter((x) => {
      return x.status == "active";
    }).length;

    console.log(activeCount);
    const nonActiveCount = posts.length - activeCount;

    return res
      .status(200)
      .json({ data: { ...posts, activeCount, nonActiveCount } });
  } catch (error) {
    console.log("error in getPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const data = req.body;

    const { title, body, status, latitude, longitude } = data;
    const postId = req.params.postId;

    const { error, value } = await postUpdateValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let updatePost = {};

    if (title) updatePost.title = title;
    if (body) updatePost.body = body;
    if (status) updatePost.status = status;
    if (latitude) updatePost.geoLocation.latitude = latitude;
    if (longitude) updatePost.geoLocation.longitude = longitude;

    const update = await postModels.findOneAndUpdate(
      { _id: postId },
      updatePost,
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: "No post found" });
    }
    return res
      .status(201)
      .json({ data: update, message: "post Updated successfully" });
  } catch (error) {
    console.log("error in editpost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await postModels.findOneAndDelete({ _id: req.params.postId });
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log("error in editpost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  editPost,
  deletePost,
};
