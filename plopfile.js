const config = require("./setting.js");

module.exports = function (plop) {
  plop.setHelper("toLowerCase", function (text) {
    return text.toLowerCase();
  });

  plop.setHelper("addClass", function (mainClass) {
    return `<div className={style.${mainClass.toLowerCase()}}></div>`;
  });

  //приводим название к привильной форме компаненты React
  plop.setActionType("correctNameCompanent", function (answers) {
    answers.name = answers.name.charAt(0).toUpperCase() + answers.name.slice(1);
    answers.folder = answers.name.toLowerCase();
    if (answers.ts) {
      answers.ext = ".tsx";
    } else {
      answers.ext = ".jsx";
    }
  });

  plop.setActionType("createFolder", function (answers) {
    if (answers.newFolder) {
      answers.path = answers.path + "/" + answers.name.toLowerCase();
    }
  });
  plop.setGenerator("React", {
    description: "Геннрация компанента React + module.css",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Имя компаненты React",
      },
      {
        type: "input",
        name: "path",
        message: `Путь создания компаненты, текущий '${config.path}'. Изменить в setting.js`,
      },
      {
        type: "confirm",
        name: "newFolder",
        message: "Создать отдельную папку для компанеты",
      },
      {
        type: "confirm",
        name: "ts",
        message: "Для typescript",
      },
    ],
    actions: [
      {
        type: "correctNameCompanent",
      },
      {
        type: "createFolder",
      },
      {
        type: "add",
        path: `${config.path}{{path}}/{{name}}{{ext}}`,
        templateFile: "template/React.hbs",
      },
      {
        type: "add",
        path: `${config.path}{{path}}/{{name}}.module.css`,
        templateFile: "template/cssmodule.hbs",
      },
    ],
  });
  plop.setGenerator("ReactFC", {
    description: "Геннрация функциональной компанента React + module.css",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Имя компаненты React",
      },
      {
        type: "input",
        name: "path",
        message: `Путь создания компаненты, текущий '${config.path}'. Изменить в setting.js`,
      },
      {
        type: "confirm",
        name: "newFolder",
        message: "Создать отдельную папку для компанеты",
      },
      {
        type: "confirm",
        name: "ts",
        message: "Для typescript",
      },
    ],
    actions: [
      {
        type: "correctNameCompanent",
      },
      {
        type: "createFolder",
      },
      {
        type: "add",
        path: `${config.path}{{path}}/{{name}}{{ext}}`,
        templateFile: "template/ReactFC.hbs",
      },
      {
        type: "add",
        path: `${config.path}{{path}}/{{name}}.module.css`,
        templateFile: "template/cssmodule.hbs",
      },
    ],
  });
};
