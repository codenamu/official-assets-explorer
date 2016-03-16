define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/nav.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="right hide-on-med-and-down">\n  <li><a href="/">Home</a></li>\n</ul>\n<ul id="slide-out" class="side-nav">\n  <li><a href="/">Home</a></li>\n</ul>\n<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>\n';

}
return __p
};

this["JST"]["app/scripts/templates/official.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n    <h3>' +
((__t = ( official[0].Person.name )) == null ? '' : __t) +
'</h3>\n</div>\n<div class="row">\n    <div style="width: 50%">\n        <canvas id="canvas" height="450" width="600"></canvas>\n    </div>\n</div>\n\n<div class="row">\n';
 Object.keys(official).forEach(function(o) { ;
__p += '\n    <p>' +
__e( o ) +
'</p>\n    <h4>' +
__e( official[o].year ) +
'년</h4>\n\n    ';
 for (var a in official[o].Assets) { ;
__p += '\n        <p>' +
__e( official[o].Assets[a]['Cat_2']['Cat_1'].title ) +
'</p>\n        <p>' +
__e( official[o].Assets[a]['Cat_2'].title ) +
'</p>\n        <p>' +
__e( official[o].Assets[a].total ) +
'</p>\n    ';
 } ;
__p += '\n';
 }) ;
__p += '\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/officials.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n  <h5>총 ' +
((__t = ( officials.length )) == null ? '' : __t) +
'개의 결과를 찾았습니다.</h5>\n</div>\n<div class="row">\n\n';
 officials.forEach(function(o) {;
__p += '\n  <div class="col s12 m6">\n    <div id="official-' +
__e( o.Person.uniqueId ) +
'" class="card">\n      <div class="card-content">\n        <span class="card-title">' +
__e( o.Person.name ) +
'</span>\n      </div>\n      <div class="card-action">\n        <li>id: ' +
__e( o.Person.uniqueId ) +
'</li>\n        ';
 o.Position.forEach(function(p) {;
__p += '\n          <li>년도: ' +
__e( p.year ) +
'년</li>\n          <li>소속: ' +
__e( p.Org.title ) +
'</li>\n          <li>직위: ' +
__e( p.title ) +
'</li>\n        ';
 }) ;
__p += '\n        <span class="card-link-to-btn">\n        <a class="btn-floating btn-large waves-effect waves-light color-news"><i class="material-icons">trending_flat</i></a>\n        </span>\n      </div>\n    </div>\n  </div>\n';
 }) ;
__p += '\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/search.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row">\n  <div class="col s12">\n    <ul class="tabs">\n      <li class="tab col s3"><a class="active" href="#search-default">기본 검색</a></li>\n      <li class="tab col s3"><a href="#search-election">총선 후보자 검색</a></li>\n    </ul>\n  </div>\n  <div id="search-default" class="col s12">\n    <form id="search" action="/officials" method="GET">\n    <div class="row">\n      <div class="input-field col s12 m4">\n        <input type="text" class="text" name="name">\n      </div>\n      <div class="input-field col s12 m4">\n        <select id="selected-orgs" name="org" multiple>\n          <option value="" disabled selected>소속을 선택하세요</option>\n          <option value="국회">국회</option>\n          <option value="대통령 비서실">대통령 비서실</option>\n        </select>\n        <label>소속 선택</label>\n      </div>\n      <div class="input-field col s12 m4">\n        <select id="selected-years" name="year" multiple>\n          <option value="" disabled selected>연도를 선택하세요</option>\n          <option value="2005">2005</option>\n          <option value="2006">2006</option>\n          <option value="2007">2007</option>\n          <option value="2008">2008</option>\n          <option value="2009">2009</option>\n          <option value="2010">2010</option>\n          <option value="2011">2011</option>\n          <option value="2012">2012</option>\n          <option value="2013">2013</option>\n          <option value="2014">2014</option>\n          <option value="2015">2015</option>\n        </select>\n        <label>연도 선택</label>\n      </div>\n    </div>\n    <div class="row">\n      <div class="input-field col s12">\n        <button class="btn waves-effect waves-light" type="submit" name="action">Submit\n          <i class="material-icons right">send</i>\n        </button>\n      </div>\n    </div>\n\n  </form>\n  </div>\n  <div id="search-election" class="col s12">Test 2</div>\n</div>\n\n';

}
return __p
};

  return this["JST"];

});