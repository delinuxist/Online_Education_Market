const { S3 } = require("../config/aws.config");
const { BadRequest } = require("../errors");
const uniqId = require("uniqid");
const { StatusCodes } = require("http-status-codes");
const slugify = require("slugify");
const Course = require("../models/course");
const { readFileSync } = require("fs");
const User = require("../models/user");

// upload image
exports.uploadImage = async (req, res) => {
  const { image } = req.body;

  if (!image) {
    throw new BadRequest("No image...");
  }

  // prepare the image
  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  let type = image.split(";")[0];
  type = type.split("/")[1];

  // image params
  const params = {
    Bucket: "j-learn-bucket",
    Key: `${uniqId()}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  // upload to s3
  S3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      throw new BadRequest("Fail To upload image...");
    }
    // console.log(data);
    res.send(data);
  });
};

// delete image
exports.removeImage = async (req, res) => {
  const { image } = req.body;
  const { Key, Bucket } = image;

  const params = {
    Bucket,
    Key,
  };

  // remove image from s3 bucket
  S3.deleteObject(params, (err, data) => {
    if (err) {
      throw new BadRequest("Removing Image Failed");
    }

    res.status(StatusCodes.OK).json({
      success: true,
    });
  });
};

// create course
exports.createCourse = async (req, res) => {
  const alreadyExist = await Course.findOne({
    slug: slugify(req.body.name.toLowerCase()),
  });
  if (alreadyExist) {
    throw new BadRequest("Title is taken");
  }

  const course = await new Course({
    slug: slugify(req.body.name),
    instructor: req.user.userId,
    image: req.body.image,
    ...req.body,
  }).save();

  res.status(StatusCodes.CREATED).json({ course });
};

// upload video
exports.uploadVideo = async (req, res) => {
  const { video } = req.files;
  const { instructorId } = req.params;

  if (instructorId != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  if (!video) {
    throw new BadRequest("No video");
  }
  const params = {
    Bucket: "j-learn-bucket",
    Key: `${uniqId()}.${video.type.split("/")[1]}`,
    Body: readFileSync(video.path),
    ACL: "public-read",
    ContentType: video.type,
  };

  // Upload to S3
  S3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    res.send(data);
  });
};

// remove video
exports.removeVideo = async (req, res) => {
  const { video } = req.body;
  const { instructorId } = req.params;
  const { Key, Bucket } = video;

  if (instructorId != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  const params = {
    Bucket,
    Key,
  };

  // remove image from s3 bucket
  S3.deleteObject(params, (err, data) => {
    if (err) {
      throw new BadRequest("Removing Image Failed");
    }

    res.status(StatusCodes.OK).json({
      success: true,
    });
  });
};

//create lessons
exports.createLesson = async (req, res) => {
  const { instructorId, slug } = req.params;
  const { title, content, video, numberOfQuestions } = req.body;

  if (instructorId != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  if (!title) {
    throw new BadRequest("Title is required");
  }

  if (!content) {
    throw new BadRequest("Content is required");
  }

  if (!video) {
    throw new BadRequest("Video is required");
  }

  const updatedCourse = await Course.findOneAndUpdate(
    { slug },
    {
      $push: {
        lessons: {
          title,
          content,
          video,
          numberOfQuestions,
          slug: slugify(title),
        },
      },
    },
    { new: true }
  )
    .populate("instructor", "name _id")
    .exec();

  res.status(StatusCodes.CREATED).json({ updatedCourse });
};

// Update Course
exports.updateCourse = async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug }).exec();

  if (req.user.userId != course.instructor) {
    throw new BadRequest("Unauthorized");
  }

  const updateCourse = await Course.findOneAndUpdate({ slug }, req.body, {
    new: true,
  }).exec();

  res.status(StatusCodes.CREATED).json({ updateCourse });
};

// Delete Lesson
exports.deleteLesson = async (req, res) => {
  const { slug, lessonId } = req.params;

  const course = await Course.findOne({ slug }).exec();

  if (req.user.userId != course.instructor) {
    throw new BadRequest("Unauthorized");
  }

  const removedLesson = await Course.findByIdAndUpdate(course._id, {
    $pull: { lessons: { _id: lessonId } },
  });

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

// Update Lesson
exports.updateLesson = async (req, res) => {
  const { slug, lessonId } = req.params;

  const { title, content, video, free_preview } = req.body;
  const course = await Course.findOne({ slug }).select("instructor").exec();

  if (course.instructor._id != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  const updated = await Course.updateOne(
    { "lessons._id": lessonId },
    {
      $set: {
        "lessons.$.title": title,
        "lessons.$.content": content,
        "lessons.$.video": video,
        "lessons.$.free_preview": free_preview,
      },
    },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json({ success: true });
};

//publish course
exports.publish = async (req, res) => {
  const { courseId } = req.params;
  // console.log(courseId);

  const course = await Course.findById(courseId).select("instructor").exec();

  if (course.instructor._id != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  const updated = await Course.findByIdAndUpdate(
    courseId,
    {
      published: true,
      upcoming: false,
    },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json({ updated });
};

//unpuplish course
exports.unpublish = async (req, res) => {
  const { courseId } = req.params;
  // console.log(courseId);

  const course = await Course.findById(courseId).select("instructor").exec();

  if (course.instructor._id != req.user.userId) {
    throw new BadRequest("Unauthorized");
  }

  const updated = await Course.findByIdAndUpdate(
    courseId,
    {
      published: false,
    },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json({ updated });
};

// Get published Courses
exports.getPublishedCourses = async (req, res) => {
  const courses = await Course.find({ published: true })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    count: courses.length,
    courses,
  });
};

// get upcoming courses
exports.getUpcomingCourses = async (req, res) => {
  const courses = await Course.find({ upcoming: true })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    count: courses.length,
    courses,
  });
};

// set course upcoming
// exports.setUpcoming = async (req, res) => {
//   const { courseId } = req.params;
//   console.log(req.body);

//   const course = await Course.findById(courseId).select("instructor").exec();

//   if (course.instructor._id != req.user.userId) {
//     throw new BadRequest("Unauthorized");
//   }

//   const updated = await Course.findByIdAndUpdate(
//     courseId,
//     {
//       upcoming: req.body.enabled,
//     },
//     { new: true }
//   ).exec();

//   res.status(StatusCodes.OK).json(updated);
// };

// get single course
exports.singleCourse = async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    course,
  });
};

// check enroll
exports.checkEnroll = async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user.userId).exec();

  // check if courseId is found in users courses array
  let ids = [];

  let length = user.courses && user.courses.length;

  for (let i = 0; i < length; i++) {
    ids.push(user.courses[i].toString());
  }

  res.status(StatusCodes.OK).json({
    status: ids.includes(courseId),
    course: await Course.findById(courseId).exec(),
  });
};

// free enroll
exports.freeEnroll = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).exec();

  if (course.paid) return;

  const update = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $addToSet: { courses: course._id },
    },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json({
    message: "Congratulations! You have successfully enrolled",
    user: update,
    course,
  });
};

// delete Course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  // console.log(courseId);

  const course = await Course.findById(courseId);

  // console.log(course);

  // check if image object is not empty
  if (course.image) {
    const params = {
      Bucket: course.image.Bucket,
      Key: course.image.Key,
    };

    // delete course image
    S3.deleteObject(params, (err, data) => {
      if (err) {
        throw new BadRequest("Deleting Image failed");
      }
    });
  }

  if (course.lessons && course.lessons.length > 0) {
    for (let i = 0; i < course.lessons.length; i++) {
      // delete lessons video

      if (course.lessons[i].video) {
        const params = {
          Key: course.lessons[i].video.Key,
          Bucket: course.lessons[i].video.Bucket,
        };

        S3.deleteObject(params, (err, data) => {
          if (err) {
            throw new BadRequest("Deleting Video failed");
          }
        });
      }
    }
  }

  // remove course from user list
  const user = await User.findOneAndUpdate(
    { courses: courseId },
    {
      $pull: {
        courses: courseId,
      },
    },
    { new: true }
  ).exec();

  const deletedCourse = await Course.findByIdAndRemove(courseId, {
    new: true,
  }).exec();

  res.json({ success: true, deletedCourse });
};

// paid enroll
exports.paidEnroll = async (req, res) => {
  const { courseId } = req.params;
};
