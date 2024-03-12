const app = require("express").Router();
const SessionService = require("../../services/SessionService");
const role = 1;
const db = require("../../models");

app.get(
  "/admin/terminate",
  SessionService.verifySessionMiddleware(role, "admin"),
  async function (req, res, next) {
    try {
      const terminateConfigurations =
        await db.terminate_configuration.findAll();

      const terminateData = terminateConfigurations?.map(
        (config) => config.dataValues
      )[0];

      // console.log(terminateData);

      res.render("admin/terminate", {
        get_page_name: () => "Terminate",
        _base_url: "/admin/terminate",
        terminateObj: terminateData,
      });
    } catch (error) {
      console.error("Error configurations:", error);
      res.status(500).send("Error configurations");
    }
  }
);

app.post(
  "/admin/terminate/edit",
  SessionService.verifySessionMiddleware(role, "admin"),
  async function (req, res, next) {
    try {
      const { title, disclaimer, count } = req.body;

      // Assuming you have some identifier for the configuration, such as an ID
      const configId = 1; // Adjust this according to your route

      const terminateConfiguration = await db.terminate_configuration.findByPk(
        configId
      );
      if (!terminateConfiguration) {
        return res.status(404).send("Configuration not found");
      }

      terminateConfiguration.title = title;
      terminateConfiguration.disclaimer = disclaimer;
      terminateConfiguration.count = count;
      await terminateConfiguration.save();

      res.redirect("/admin/terminate");
    } catch (error) {
      console.error("Error updating configuration:", error);
      res.status(500).send("Error updating configuration");
    }
  }
);

app.get("/api/v1/terminate", async function (req, res, next) {
  try {
    const terminateConfigurations = await db.terminate_configuration.findAll();

    const terminateData = terminateConfigurations?.map(
      (config) => config.dataValues
    )[0];

    return res.status(201).json({ success: true, data: terminateData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

module.exports = app;
