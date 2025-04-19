const Supervisors = require("../models/Supervisor");

exports.auth = {
  defaults: {
    guard: "supervisor",
    passwordReset: "supervisor",
  },
  guards: {
    //بدنا نعرف انواع المستحدمين الي عنا في النظام
    supervisor: {
      driver: "session", //sessions or token , token for api , session for wep and spa  //للكوكيز في الاس يس اي
      provider: "supervisores", //لازم نعرفو تحت
    },
  },
  providers: {
    //provider is the name of the table wiht s
    //data sourse
    supervisores: {
      modelname: "Supervisor",
      model: Supervisors,
      driver: "Sequelize",
    },
  },
};

