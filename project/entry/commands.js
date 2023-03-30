const path = require("path");

const video_cli = require(path.join(__dirname, "..", "modules", "video", "cli")).cli;
const search_cli = require("../modules/search/cli").cli;
const playlist_cli = require("../modules/playlist/cli").cli;
const channel_cli = require("../modules/channel/cli").cli;

const video_scraper = require(path.join(__dirname, "..", "modules", "video", "video-scraper")).scrape;
const search_scraper = require("../modules/search/search-scraper").scrape;
const playlist_scraper = require("../modules/playlist/playlist-scraper").scrape;
const channel_scraper = require("../modules/channel/channel-scraper").scrape;


  /*******************************************************************/
 /* The "location" modules; specify which part of YouTube to scrape */
/*******************************************************************/


const cmd = {

  modules: { //Special commands that allow entrance to other subcommands/submodules
  //In this case, these need to be specified at the start
  
    "video": {
      aliases: ["video"],
      simpleDescription: "Module for scraping data from a YouTube video",
      description: "The module for retrieving info inside a YouTube video. Requires one video as input (see " +
      "\"video --help --input\" for a more detailed description.) Records video metadata, live chat replay, " +
      "comments, and video recommendations.",
      examples: ["video -i https://www.youtube.com/watch?v=1fueZCTYkpA"],
      cli: video_cli,
      scrape: video_scraper
    },

    "search": {
      aliases: ["search"],
      simpleDescription: "Module for scraping data from a YouTube search",
      description: "The module for retrieving info queried by a YouTube search. Requires a search term as " +
      "input (see \"search --help --input\" for a more detailed description.) Records fetched videos, " +
      "shorts, playlists, mixes, channels, and movies. Unlike other modules, all of this information is stored in a " +
      "collective list (by default). NOTE: Search data can be highly dependent on location (IP address) and time.",
      examples: ["search -i \"hit the road jack\""],
      cli: search_cli,
      scrape: search_scraper
    },

    "playlist": {
      aliases: ["playlist"],
      simpleDescription: "Module for scraping data from a YouTube playlist",
      description: "The module for retrieving info inside a YouTube playlist. Requires a playlist link as input " +
      "(see \"playlist --help --input\" for a more detailed description.)",
      examples: ["playlist -i https://www.youtube.com/playlist?list=PLFsQleAWXsj_4yDeebiIADdH5FMayBiJo"],
      cli: playlist_cli,
      scrape: playlist_scraper
    },

    "channel": {
      aliases: ["channel"],
      simpleDescription: "Module for scraping data from a YouTube channel",
      description: "The module for retrieving info in the sections of a YouTube channel. Requires a channel link " +
      "as input (see \"channel --help --input\" for a more detailed description.)",
      examples: ["channel -i https://www.youtube.com/@jawed"],
      cli: channel_cli,
      scrape: channel_scraper
    }

  },

  commands: {

    "-h": {redirect: "--help"},
    "--help": {
      aliases: ["--help", "-h"],
      simpleDescription: "Displays command information",
      description: "A command which takes in a command/module as the next input. By specifiying a valid " +
      "command, the program will print some info as well as the usability of that cmd. All modules have their " +
      "own help commands, which can be accessed by typing \"ytscr [module] --help\".",
      examples: ["--help video", "-h search"],
      numArgs: 1
    }

  }

}

module.exports.cmd = cmd;