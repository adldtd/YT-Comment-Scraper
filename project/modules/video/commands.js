const path = require("path");
const errors = require(path.join(__dirname, "..", "..", "common", "errors"));

const subscribeDmodule = require(path.join(__dirname, "..", "..", "common", "subscribe-dmodule")).subscribeDmodule;
const subscribeMeta = require(path.join(__dirname, "..", "..", "common", "subscribe-meta")).subscribeMeta;

const comment_cli = require(path.join(__dirname, "comments", "cli")).cli;
const chat_cli = require(path.join(__dirname, "chat", "cli")).cli;

const comment_scraper = require(path.join(__dirname, "comments", "comment-scraper")).scraper;
const chat_scraper = require(path.join(__dirname, "chat", "chat-scraper")).scraper;


  /******************************************/
 /* The video module commands + submodules */
/******************************************/

var validModules = {comments: "", chat: ""}; //Reused by both --exclude and --focus


const cmd = {

  modules: { //Special commands that allow entrance to other subcommands/submodules
  //In this case, these need to be specified at the start
  
    "comments": {
      aliases: ["comments"],
      simpleDescription: "Module for scraping comments from a YouTube video",
      description: "The module for retrieving comment data inside a YouTube video. Will be ignored if 0 " +
      "comments are found.",
      examples: ["comments [argument 1] [argument 2] ... |"],
      cli: comment_cli,
      scrape: comment_scraper
    },

    "chat": {
      aliases: ["chat"],
      simpleDescription: "Module for scraping live chat replay from a YouTube video",
      description: "The module for retrieving chat data from a past livestream/premiere. Will be ignored " +
      "if the video was not live in the past (and if it is an ongoing livestream.)",
      examples: ["chat [argument 1] [argument 2] ... |"],
      cli: chat_cli,
      scrape: chat_scraper
    }

  },

  commands: {

    "-i": {redirect: "--input"},
    "--input": {
      aliases: ["--input", "-i"],
      simpleDescription: "The video from which to scrape",
      description: "A command which takes in a video link as input. Required argument for scraping to function. " +
      "Can be either a direct link, a \"youtu.be\" link, a shorts link, or a pure video ID.",
      examples: ["--input video"],
      call: inputCall,
      numArgs: 1
    }

  }

}

subscribeDmodule(validModules, cmd.commands);
subscribeMeta(cmd.commands);


function inputCall(parsed, currentState, settings) {

  let command = parsed.command;
  let argument = parsed.args[0];

  if (settings.video.input === "") {
      
    if (argument.substring(0, 32) === "https://www.youtube.com/watch?v=" || argument.substring(0, 24) === "www.youtube.com/watch?v=" || argument.substring(0, 20) === "youtube.com/watch?v=") {
      settings.video.input = argument;
    } else if (argument.substring(0, 31) === "https://www.youtube.com/shorts/" || argument.substring(0, 23) === "www.youtube.com/shorts/" || argument.substring(0, 19) === "youtube.com/shorts/") {
      settings.video.input = "https://youtube.com/watch?v=" + argument.split("shorts/", 2)[1]; //YouTube shorts are converted to videos this way
    } else if (argument.substring(0, 17) === "https://youtu.be/" || argument.substring(0, 9) === "youtu.be/") {
      settings.video.input = "https://youtube.com/watch?v=" + argument.split(".be/", 2)[1];
    } else if (argument.length === 11) { //Pure video ID
      settings.video.input = "https://youtube.com/watch?v=" + argument;
    } else
      currentState.error = errors.errorCodes(-2, command, argument);
        
  } else
    currentState.error = errors.errorCodes(-1, command, argument);
}


module.exports.cmd = cmd;