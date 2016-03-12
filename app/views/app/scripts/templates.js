define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/nav.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="right hide-on-med-and-down">\n  <li><a href="/">Home</a></li>\n  <li><a href="#!">Second Sidebar Link</a></li>\n</ul>\n<ul id="slide-out" class="side-nav">\n  <li><a href="/">Home</a></li>\n  <li><a href="#!">Second Sidebar Link</a></li>\n</ul>\n<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>\n';

}
return __p
};

this["JST"]["app/scripts/templates/official.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>Official View</h1>\n<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/officials.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n\n';
 for(var o in officials) {;
__p += '\n  <ul class="col s12 m4 l3">\n     <li>id: ' +
((__t = ( officials[o].id )) == null ? '' : __t) +
'</li>\n     <li>이름:  <a href="' +
((__t = ( officials[o].attributes.Person.name )) == null ? '' : __t) +
'" title="">' +
((__t = ( officials[o].attributes.Person.name )) == null ? '' : __t) +
'</a></li>\n     <li>년도: ' +
((__t = ( officials[o].attributes.year )) == null ? '' : __t) +
'년</li>\n     <li>소속: ' +
((__t = ( officials[o].attributes.Position.Org.title )) == null ? '' : __t) +
'</li>\n     <li>직위: ' +
((__t = ( officials[o].attributes.Position.title )) == null ? '' : __t) +
'</li>\n  </ul>\n';
 } ;
__p += '\n\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/search.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n  <form action="">\n    <div class="row">\n      <div class="input-field col s12 m4">\n        <input type="text" class="text">\n      </div>\n      <div class="input-field col s12 m4">\n        <select multiple>\n          <option value="" disabled selected>Choose your option</option>\n          <option value="1">Option 1</option>\n          <option value="2">Option 2</option>\n          <option value="3">Option 3</option>\n        </select>\n        <label>소속 선택</label>\n      </div>\n      <div class="input-field col s12 m4">\n        <select multiple>\n          <option value="" disabled selected>Choose your option</option>\n          <option value="2005">2005</option>\n          <option value="2006">2006</option>\n          <option value="2015">2015</option>\n        </select>\n        <label>연도 선택</label>\n      </div>\n    </div>\n    <div class="row">\n      <div class="input-field col s12">\n        <button class="btn waves-effect waves-light" type="submit" name="action">Submit\n          <i class="material-icons right">send</i>\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>\n\n';

}
return __p
};

  return this["JST"];

});