var userModel = require("./userModel");

module.exports.getDataFromDBService = () => {
  return new Promise(function checkURL(resolve, reject) {
    userModel.find({}, function returnData(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.createUserDBService = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    var userModelData = new userModel();

    userModelData.task = userDetails.task;
    userModelData.description = userDetails.description;
    userModelData.date = userDetails.date;

    userModelData.save(function resultHandle(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.updateUserDBService = (id, userDetails) => {
  console.log(userDetails);
  return new Promise(function myFn(resolve, reject) {
    userModel.findByIdAndUpdate(
      id,
      userDetails,
      function returnData(error, result) {
        if (error) {
          reject(false);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports.removeUserDBService = (id) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findByIdAndDelete(id, function returnData(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(result);
      }
    });
  });
};
function myFn(userDetails) {
  userModelData.task = userDetails.task; // This line is causing the error
  userModelData.description = userDetails.description;
  userModelData.date = userDetails.date;
}
