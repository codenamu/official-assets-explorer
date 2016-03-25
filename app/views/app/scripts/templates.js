define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/card.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="col s12 m6 l4">\n  <div id="official-' +
__e( model.Person.uniqueId ) +
'" class="card">\n    <div class="card-content">\n      <span class="card-title">' +
__e( model.Person.name ) +
'</span>\n      <span class="card-subtitle">' +
((__t = ( model.Position[model.Position.length - 1].title )) == null ? '' : __t) +
'</span>\n    </div>\n    <div class="card-action">\n      ';
 model.Position.forEach(function(p) {;
__p += '\n        <li>' +
__e( p.year ) +
'년 ' +
__e( p.title ) +
'</li>\n      ';
 }) ;
__p += '\n      <span class="card-link-to-btn">\n      <a class="btn-floating btn-large waves-effect waves-light color-news"><i class="material-icons">trending_flat</i></a>\n      </span>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/nav.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="/" class="brand-logo"><img src="/img/logo/newstapa.png" alt="뉴스타파"></a>\n<ul id="slide-out" class="side-nav">\n  <li><a href="/">소개</a></li>\n  <li><a href="/">보도사례</a></li>\n  <li><a href="/">데이터</a></li>\n  <li><a href="/">연락하기</a></li>\n  <li class="nav-footer">\n    <img src="/img/logo/nav-footer.png" alt="뉴스타파 & CCKOREA">\n    <p>Copyright © 2016<br>\n      The Korea center For Investigation Journalism<br>\n      Some right reserved.\n    </p>\n  </li>\n</ul>\n<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>\n';

}
return __p
};

this["JST"]["app/scripts/templates/official.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section id="page-official">\n    <div class="row">\n        <div class="col s12 m6 offset-m3">\n            <div class="card">\n                <div class="card-content">\n                    <span class="card-title">' +
__e( official.person.name ) +
'</span>\n                    <span class="card-subtitle">' +
__e( official.position[official.position.length - 1].title ) +
'</span>\n                </div>\n                <div class="card-action">\n                    <div class="row official-total">\n                        <h5><li>재산 총액</li></h5>\n                        <span id="official-asset-total" class="value">' +
__e( official.assets.history[official.latestYear].totalText ) +
'원</span>\n                    </div>\n                    <div class="row official-history">\n                        <h5><li>재산 변동 이력</li></h5>\n                        <div class="official-bar-chart" style="width: 100%">\n                            <canvas id="canvas-bar" height="250" width="350"></canvas>\n                        </div>\n                        <div class="official-pie-chart" style="width: 100%">\n                            <h6>포트폴리오</h6>\n                            <canvas id="canvas-pie" height="350" width="350"></canvas>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <h5><li>경력</li></h5>\n                        <ul>\n                        ';
 for (var p in official.position) { ;
__p += '\n                            <li>- ' +
__e( official.position[p].year ) +
'년 ' +
__e( official.position[p].title ) +
'</li>\n                        ';
 } ;
__p += '\n                        </ul>\n                    </div>\n                    <div class="row">\n                      <h5><li>원본 보기</li></h5>\n                      <ul>\n                      ';
 for (var p in official.position) { ;
__p += '\n                        <li><a href="#">- ' +
__e( official.position[p].year ) +
'년</a></li>\n                      ';
 } ;
__p += '\n                      </ul>\n                    </div>\n                    <div class="row">\n                      <div class="col s12 m6 offset-m3">\n                          <button class="btn waves-effect color-news" type="button">제보하기</button>\n                      </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/officials.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="container">\n  <div class="row search-message">\n    <div class="col s12">\n      <h5>총 ' +
__e( count ) +
'개의 결과를 찾았습니다.</h5>\n    </div>\n    <!-- <div class="col s3">\n      <button id="btn-research" class="btn waves-effect color-news hide-desktop" type="button">다시 검색하기</button>\n    </div> -->\n  </div>\n  <div class="row search-cards">\n\n  </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/search.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section id="page-search">\n  <header class="row header">\n    <section class="col s12 m6">\n      <h1>고위공직자 재산 정보 공개</h1>\n      <p>크리에이티브 커먼즈 코리아 공동작업</p>\n    </section>\n    <nav class="nav-desktop col m6">\n      <div class="nav-wrapper">\n        <ul class="right hide-on-med-and-down">\n          <li><a href="#">소개</a></li>\n          <li><a href="#">보도사례</a></li>\n          <li><a href="#">데이터</a></li>\n          <li><a href="#">연락하기</a></li>\n        </ul>\n      </div>\n    </nav>\n  </header>\n  <section class="row content">\n    <div id="search-tabs" class="col s12 m4 offset-m4">\n      <ul class="tabs">\n        <li class="tab col s3"><a class="active" href="#search-default">기본 검색</a></li>\n        <li class="tab col s3"><a href="#search-election">총선 인물 검색</a></li>\n      </ul>\n    </div>\n    <section id="search-default" class="col s12 tab-content">\n      <form id="form-search-default" action="/officials" method="GET">\n        <div class="row">\n          <div class="input-field col s12 m4 offset-m2">\n            <select id="selected-orgs" name="org" multiple>\n              <option value="" disabled selected>소속을 선택하세요</option>\n            </select>\n          </div>\n          <div class="input-field col s12 m4">\n            <select id="selected-years" name="year" multiple>\n              <option value="" disabled selected>연도를 선택하세요</option>\n              <option id="option-years-id-2005" value="2005">2005</option>\n              <option id="option-years-id-2006" value="2006">2006</option>\n              <option id="option-years-id-2007" value="2007">2007</option>\n              <option id="option-years-id-2008" value="2008">2008</option>\n              <option id="option-years-id-2009" value="2009">2009</option>\n              <option id="option-years-id-2010" value="2010">2010</option>\n              <option id="option-years-id-2011" value="2011">2011</option>\n              <option id="option-years-id-2012" value="2012">2012</option>\n              <option id="option-years-id-2013" value="2013">2013</option>\n              <option id="option-years-id-2014" value="2014">2014</option>\n              <option id="option-years-id-2015" value="2015">2015</option>\n            </select>\n          </div>\n        </div>\n        <div id="tags-default" class="row">\n          <div class="col s12 m8 offset-m2"></div>\n        </div>\n        <div class="row">\n          <div class="input-field input-field-integrated col s12 m5 offset-m3">\n            <input type="text" id="selected-keyword" class="text" name="keyword" placeholder="검색어(이름, 직위, 소속)를 입력하세요.">\n            <button class="btn btn-large color-news" type="submit" name="action">검색</button>\n          </div>\n        </div>\n      </form>\n      <section id="search-default-result" class="cards">\n\n      </section>\n    </section>\n    <section id="search-election" class="col s12 tab-content">\n      <form id="form-search-election" action="/officials" method="GET">\n        <div class="row">\n          <div class="input-field col s12 m4">\n            <select id="selected-provinces" name="province">\n              <option value="" disabled selected>자치단체</option>\n            </select>\n          </div>\n          <div class="input-field col s12 m4">\n            <select id="selected-municipals" name="municipal" disabled>\n            </select>\n          </div>\n          <div class="input-field col s12 m4">\n            <select id="selected-dongs" name="dong" disabled>\n            </select>\n          </div>\n        </div>\n        <div id="tags" class="row">\n\n        </div>\n        <div class="row">\n          <div class="input-field input-field-integrated col s12 m5 offset-m3">\n            <input type="text" id="selected-keyword" class="text" name="keyword" placeholder="검색어(이름, 직위, 소속)를 입력하세요.">\n            <button class="btn btn-large color-news" type="submit" name="action">검색</button>\n          </div>\n        </div>\n      </form>\n      <section id="search-default-result" class="cards">\n\n      </section>\n    </section>\n  </section>\n</section>\n\n';

}
return __p
};

  return this["JST"];

});