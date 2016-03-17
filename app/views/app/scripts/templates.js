define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/nav.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul id="slide-out" class="side-nav">\n  <li><a href="/">홈</a></li>\n  <li><a href="/">소개</a></li>\n  <li><a href="/">보도사례</a></li>\n  <li><a href="/">데이터</a></li>\n  <li><a href="/">제작진에게 연락하기</a></li>\n  <li class="nav-footer">\n    <img src="/img/logo/nav-footer.png" alt="뉴스타파 & CCKOREA">\n    <p>Copyright © 2016<br>\n      The Korea center For Investigation Journalism<br>\n      Some right reserved.\n    </p>\n  </li>\n</ul>\n<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>\n';

}
return __p
};

this["JST"]["app/scripts/templates/official.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section id="page-official">\n    <div class="row">\n        <div class="col s12 m7">\n            <div class="card">\n                <div class="card-content">\n                    <span class="card-title">' +
__e( official.person.name ) +
'</span>\n                    <span class="card-subtitle">' +
__e( official.position[official.position.length - 1].title ) +
'</span>\n                </div>\n                <div class="card-action">\n                    <div class="row">\n                        <h5><li>재산 총액</li></h5>\n                        <span class="value">' +
__e( official.assets.total ) +
'</span>\n                    </div>\n                    <div class="row">\n                        <h5><li>재산 변동 이력</li></h5>\n                        <div style="width: 100%">\n                            <canvas id="canvas" height="450" width="600"></canvas>\n                        </div>\n                        <div style="width: 100%">\n                            <h6>포트폴리오</h6>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <h5><li>경력</li></h5>\n                        <ul>\n                        ';
 for (var p in official.position) { ;
__p += '\n                            <li>- ' +
__e( official.position[p].year ) +
'년 ' +
__e( official.position[p].Org.title ) +
' ' +
__e( official.position[p].title ) +
'</li>\n                        ';
 } ;
__p += '\n                        </ul>\n                    </div>\n                    <div class="row">\n                        <div class="row">\n                            <div class="col s12">\n                                <button class="btn waves-effect color-news" type="button">원본 PDF 보기</button>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col s12">\n                                <button class="btn waves-effect color-news" type="button">제보하기</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/officials.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section id="page-result" class="container">\n  <div class="row">\n    <h5>총 ' +
((__t = ( officials.length )) == null ? '' : __t) +
'개의 결과를 찾았습니다.</h5>\n  </div>\n  <div class="row">\n\n  ';
 officials.forEach(function(o) {;
__p += '\n    <div class="col s12 m6">\n      <div id="official-' +
__e( o.Person.uniqueId ) +
'" class="card">\n        <div class="card-content">\n          <span class="card-title">' +
__e( o.Person.name ) +
'</span>\n          <span class="card-subtitle">' +
((__t = ( o.Position[o.Position.length - 1].title )) == null ? '' : __t) +
'</span>\n        </div>\n        <div class="card-action">\n          ';
 o.Position.forEach(function(p) {;
__p += '\n            <li>' +
__e( p.year ) +
'년 ' +
__e( p.title ) +
'</li>\n          ';
 }) ;
__p += '\n          <span class="card-link-to-btn">\n          <a class="btn-floating btn-large waves-effect waves-light color-news"><i class="material-icons">trending_flat</i></a>\n          </span>\n        </div>\n      </div>\n    </div>\n  ';
 }) ;
__p += '\n  </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/search.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section id="page-search">\n  <header>\n    <div class="container">\n      <h3>고위공직자 재산정보 공개</h3>\n      <p>크리에이티브 커먼즈 코리아 공동 작업</p>\n    </div>\n  </header>\n  <section class="container">\n    <div class="col s12">\n      <ul class="tabs">\n        <li class="tab col s3"><a class="active" href="#search-default">기본 검색</a></li>\n        <li class="tab col s3"><a href="#search-election">총선 후보자 검색</a></li>\n      </ul>\n    </div>\n    <div id="search-default" class="col s12">\n      <form id="search" action="/officials" method="GET">\n        <div class="row">\n          <div class="input-field col s12 m4">\n            <select id="selected-orgs" name="org" multiple>\n              <option value="" disabled selected>소속을 선택하세요</option>\n              <option value="국회">국회</option>\n              <option value="대통령 비서실">대통령 비서실</option>\n            </select>\n            <label>소속 선택</label>\n          </div>\n          <div class="input-field col s12 m4">\n            <select id="selected-years" name="year" multiple>\n              <option value="" disabled selected>연도를 선택하세요</option>\n              <option value="2005">2005</option>\n              <option value="2006">2006</option>\n              <option value="2007">2007</option>\n              <option value="2008">2008</option>\n              <option value="2009">2009</option>\n              <option value="2010">2010</option>\n              <option value="2011">2011</option>\n              <option value="2012">2012</option>\n              <option value="2013">2013</option>\n              <option value="2014">2014</option>\n              <option value="2015">2015</option>\n            </select>\n            <label>연도 선택</label>\n          </div>\n          <div class="input-field col s12 m4">\n            <input type="text" class="text" name="name">\n          </div>\n        </div>\n        <div class="row">\n          <div class="input-field col s12">\n            <button class="btn waves-effect color-news" type="submit" name="action">검색하기</button>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div id="search-election" class="col s12">Test 2</div>\n  </section>\n</section>\n\n';

}
return __p
};

  return this["JST"];

});