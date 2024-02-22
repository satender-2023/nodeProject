const userModel = require("./userModel");

module.exports.getDataFromDBService = () => {
  return userModel.find({}).exec()
    .catch(error => {
      console.error('Error fetching data from the database:', error);
      throw error; // rethrow the error to be caught by the calling code
    });
};

module.exports.createUserDBService = (userDetails) => {
  return new Promise((resolve, reject) => {
    if (!userDetails || !userDetails.task || !userDetails.description || !userDetails.date) {
      reject(new Error('Invalid user details'));  // Reject if userDetails is undefined or missing required properties
      return;
    }

    const userModelData = new userModel({
      task: userDetails.task,
      description: userDetails.description,
      date: userDetails.date
    });

    userModelData.save()
      .then(result => resolve(result))
      .catch(error => {
        console.error('Error creating user:', error);
        reject(error);
      });
  });
};

module.exports.updateUserDBService = (id, userDetails) => {
  return userModel.findByIdAndUpdate(id, userDetails)
    .exec()
    .catch(error => {
      console.error('Error updating user:', error);
      throw error;
    });
};

module.exports.removeUserDBService = (id) => {
  return userModel.findByIdAndDelete(id)
    .exec()
    .catch(error => {
      console.error('Error deleting user:', error);
      throw error;
    });
};

function myFn(userDetails) {
  userModelData.task = userDetails.task; // This line is causing the error
  userModelData.description = userDetails.description;
  userModelData.date = userDetails.date;
}
module.exports.getDataFromDBService = () => {
  return userModel.find({}).exec()
    .catch(error => {
      console.error('Error fetching data from the database:', error);
      throw error; // rethrow the error to be caught by the calling code
    });
};