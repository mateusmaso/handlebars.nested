if (typeof window === "undefined") {
  var jsdom = require("jsdom").jsdom;
  var document = global.document = jsdom("test");
  var window = global.window = document.defaultView;
  var chai = require("chai");
  var Handlebars = require("handlebars");
  require("../lib").default(Handlebars);
}

describe("handlebars.nested", function() {
  beforeEach(function() {
    Handlebars.registerHelper("join", function(first, second, options) {
      return first + (options.hash.separate || " ") + second;
    });

    Handlebars.registerHelper("lowercase", function(string) {
      return string.toLowerCase();
    });
  });

  it("should nest arguments", function() {
    var template = Handlebars.compile("{{join 'H{{foo}}' 'W{{bar}}' separate='{{lowercase space}}'}}");
    var context = {foo: "ell", bar: "orld", space: "O "};
    chai.expect(template(context)).to.equal("Hello World");
  });
});
