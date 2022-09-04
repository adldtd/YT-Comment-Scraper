const path = require("path");
const helpers = require(path.join(__dirname, "..", "..", "common", "helpers"));
const errors = require(path.join(__dirname, "..", "..", "common", "errors"));

const cmd = require(__dirname + "/commands").cmd;
const verifyFilterable = require(path.join(__dirname, "..", "..", "common", "subscribe-filterable")).verifyFilterable;


//*********************************************************************************
//Video module CLI; passes currentState onward to other CLIs
//*********************************************************************************
function cli(args, index) {

  //Setup settings for both this module and others
  let settings = {

    video: {
      input: "",
      prettyprint: true,

      focus: {
        comments: true,
        chat: true
      },

      output: "",
      timeout: 1000
    },

    comments: {
      savefilter: false,
      newest: false,
      replies: true,
      nrf: true,

      printfilter: false,
      lim: Number.POSITIVE_INFINITY,
      limfilter: Number.POSITIVE_INFINITY,

      filter: [],
      ignore: {
        author: false,
        text: false,
        id: false,
        published: false,
        votes: false,
        picture: false,
        channel: false
      }
    },

    chat: {
      topchat: false,

      savefilter: false,
      printfilter: false,

      lim: Number.POSITIVE_INFINITY,
      limfilter: Number.POSITIVE_INFINITY,

      filter: [],
      ignore: {
        author: false,
        text: false,
        id: false,
        timestamp: false,
        picture: false,
        channel: false
      }
    }

  }

  //Set up currentState for this module, and other submodules
  let currentState = {

    error: false, //Used by all modules/submodules
    index: index,

    video: {
      focusList: {}, //Used to keep track of and deal with focus + exclude collisions
      excludeList: {},
      modulesCalled: {},
      firstFocusCalled: false
    },

    comments: {
      usedFilterCheckValues: {}, //Used to track collisions with ignore
      inFilter: false,
      currentFilter: {}
    },

    chat: {
      usedFilterCheckValues: {},
      inFilter: false,
      currentFilter: {}
    }

  };

  verifyFilterable(currentState.comments, settings.comments); /////////////////////Debugging
  verifyFilterable(currentState.chat, settings.chat); /////////////////////Debugging
  
  //Loop through the CLI
  while (currentState.index < args.length) {

    let parsed = helpers.parseArgs(args, currentState.index, cmd, currentState);
    if (currentState.error) return -1;
    currentState.index = parsed.currentIndex;

    if (parsed.isModule) {
    
      let result = parsed.commandBox.cli(args, currentState, settings);
      if (result === -1 || result === 1) return result;
      
    } else {

      if (parsed.command === ";")
        currentState.error = errors.errorCodesScope(0, "video"); //To help avoid user confusion
      else if (parsed.command === "--help" || parsed.command === "-h") {
        
        if (parsed.args.length === 0) {
          helpers.outputHelpAll(cmd);
          return 1;
        } else {
          let result = helpers.parseHelp(cmd, currentState, parsed);
          return result;
        }

      } else //Default; non-meta commands
        parsed.commandBox.call(parsed, currentState, settings);
    }

    if (currentState.error)
      return -1;
  }

  //Check for required inputs/errors after the fact
  if (settings.video.input === "")
    currentState.error = errors.errorCodesNums(4, "--input", 1, 0);

  if (currentState.error)
    return -1;

  if (settings.video.output === "") { //Default destination
    let filename = "video_" + settings.video.input.split("?v=", 2)[1] + ".json";
    settings.video.output = path.join(__dirname, "..", "..", "SAVES", filename);
  }

  return settings;
}


module.exports.cli = cli;