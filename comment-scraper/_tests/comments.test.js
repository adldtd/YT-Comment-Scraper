const path = require("path");
const entry_cli = require(path.join(__dirname, "..", "_entry", "cli")).cli;


  /********************************/
 /* Testing for the comments CLI */
/********************************/


test("No input", () => {
  expect(entry_cli(["", "", "comments"])[1]).toBe(-1);
});

test("Input 1", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp"])[1]).toBeInstanceOf(Object);
});

test("Input 2", () => {
  expect(entry_cli(["", "", "comments", "input=https://www.youtube.com/watch?v=fakeytlinkp"])[1]).toBeInstanceOf(Object);
});

test("Bad input 1", () => {
  expect(entry_cli(["", "", "comments", "i="])[1]).toBe(-1);
});

test("Bad input 2", () => {
  expect(entry_cli(["", "", "comments", "i=alalalalalalalalala"])[1]).toBe(-1);
});

test("Bad input 3", () => {
  expect(entry_cli(["", "", "comments", "i=https://facebook.com/19882hjnudnuoq2"])[1]).toBe(-1);
});



test("Sample arguments 1", () => {
  expect(entry_cli(["", "", "comments", "input=youtube.com/watch?v=fakeytlinkp", "lim=100"])[1]).toBeInstanceOf(Object);
});

test("Sample arguments 2", () => {
  expect(entry_cli(["", "", "comments", "-nrf", "input=fakeytlinkp", "lim=100", "-sf", "-np"])[1]).toBeInstanceOf(Object);
});

test("Sample arguments 3", () => {
  expect(entry_cli(["", "", "comments", "limfilter=7", "input=youtu.be/fakeytlinkp", "-NS", "-savefilter", "-pf", "-np", "-new"])[1]).toBeInstanceOf(Object);
});

test("Sample arguments 4", () => {
  expect(entry_cli(["", "", "comments", "lf=1", "filter={", "-cs", "check=text", "match=WOW", "}", "lim=32", "input=https://youtu.be/fakeytlinkp", "-nosave", "-newest", ("dest=" + __dirname), "-printfilter", "-nopretty"])[1]).toBeInstanceOf(Object);
});

test("Sample arguments 5", () => {
  expect(entry_cli(["", "", "comments", "ignore=text", "ignore=author", "lf=300000", "f={", "compare=greatereq", "check=votes", "match=2000", "}", "lim=3212", "i=fakeytlinkp", "-NS", "-savefilter", "-nopretty", "-pf", ("d=" + __dirname), "-newest"])[1]).toBeInstanceOf(Object);
});



test("Garbage 1", () => {
  expect(entry_cli(["", "", "comments", "-top"])[1]).toBe(-1);
});

test("Garbage 2", () => {
  expect(entry_cli(["", "", "comments", "}"])[1]).toBe(-1);
});

test("Multi input", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "i=anotherfake"])[1]).toBe(-1);
});

test("Unumerical 1", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "lim=wow"])[1]).toBe(-1);
});

test("Unumerical 2", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "lf=yay"])[1]).toBe(-1);
});

test("Invalid ignore", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "ignore=timestamp"])[1]).toBe(-1);
});

test("Invalid destination", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "dest=u3981i82je981j29he912"])[1]).toBe(-1);
});



test("Filter arg outside filter", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "compare"])[1]).toBe(-1);
});

test("Invalid filter", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter=}"])[1]).toBe(-1);
});

test("Unclosed filter", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=author"])[1]).toBe(-1);
});

test("Not enough filter args", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=author", "}"])[1]).toBe(-1);
});

test("Invalid check", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=string", "match=big", "}"])[1]).toBe(-1);
});

test("Compare should be defined", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=votes", "match=-829", "}"])[1]).toBe(-1);
});

test("Unumerical match value", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=votes", "match=eight hundred and twenty nine", "compare=less", "}"])[1]).toBe(-1);
});

test("Invalid compare", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=votes", "match=0", "compare=in", "}"])[1]).toBe(-1);
});

test("Non-filter arg inside filter", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=votes", "match=0", "compare=lesseq", "lim=100", "}"])[1]).toBe(-1);
});

test("Filter value ignored 1", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "ignore=votes", "filter={", "check=votes", "match=0", "compare=greater", "}"])[1]).toBe(-1);
});

test("Filter value ignored 2", () => {
  expect(entry_cli(["", "", "comments", "input=fakeytlinkp", "filter={", "check=votes", "match=010", "compare=eq", "}", "ignore=votes"])[1]).toBe(-1);
});