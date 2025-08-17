const sequalize = require("../config/database");
const Student = require("../models/Student");
const Supervisor = require("../models/Supervisor");
const Request = require("../models/Request");
const Respose = require("../models/Response");

module.exports = class Migration {
  sync() {
    this.#relations();
    // this.#authorization();
    // this.#clients();
    // this.#authentication();
    sequalize
      .sync({ force: false }) //السينك وظيفتها عدم حذف الجداول بس بنضبف عليها عادي
      .then(() => {
        console.log("Synced Successfully");
      })
      .catch((err) => {
        console.error("Sync failed:", err?.parent?.sqlMessage || err);
        console.error("SQL:", err?.sql); //خطأ في بنية الجداول في السينتكس
      });
  }

  #relations() {
    Student.hasMany(Request, {
      foreignKey: "student_id",
      sourceKey: "id",
      onDelete: "Restrict",
      as: "requests",
    });
    Request.belongsTo(Student, {
      foreignKey: "student_id",
      targetKey: "id",
      onDelete: "Restrict",
      as: "student",
    });

    Supervisor.hasMany(Respose, {
      foreignKey: "supervisor_id",
      sourceKey: "id",
      onDelete: "Restrict",
      as: "response",
    });
    Respose.belongsTo(Supervisor, {
      foreignKey: "supervisor_id",
      targetKey: "id",
      onDelete: "Restrict",
      as: "supervisor",
    });

    // Respose.hasOne(Request, {
    //   foreignKey: "request_id",
    //   onDelete: "Restrict",
    //   as: "request",
    // });

    // Request.belongsTo(Respose, {
    //   foreignKey: "request_id",
    //   onDelete: "Restrict",
    //   as: "response",
    // });
    Respose.belongsTo(Request, {
      foreignKey: "request_id",
      onDelete: "RESTRICT",
      as: "request",
    });

    // والـ Request عنده Response واحد
    Request.hasOne(Respose, {
      foreignKey: "request_id",
      onDelete: "RESTRICT",
      as: "response",
    });
  }

  #authorization() {
    //شغال على مبدا البروتو تايب وهو اسلوب يستخدم لعملية الانجكشن على مستوى الاوبجكت ولكن من خلال الكلاس يعني بنضيف على الكلاس شغلات من خلال بروتو تايب اوف كلاس مشابه للاقريقيشن فنكشنز تبعت السيكوالايز
    Authorize.getInstance().defineAuthorization(Student); //بنضيف المودلز حسب الحاجة للاوثورايزيشن
  }

  #authentication() {
    ApiAuth.instance.useApiAuth(Student);
  }

  #clients() {
    ApiAuth.instance.createClient("student", "students"); //name , provider
  }
};
