this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/about.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="page page-about container">\n  <div class="row about-newstapa">\n    <div class="col s8 m8">\n      <!--\n      <h5><span class="non-hightlight hide-mobile">언론사 기자, 시민단체 관계자를 포함한 일반 시민<br></span>누구나 관심있는 공직자를 검색하고,<br class="hide-mobile">재산 정보를 직접 확인<span class="non-hightlight">할 수 있도록 했습니다</span></h5>\n      -->\n      <h5>국회의원, 고위공무원 재산 검증하세요!</h5>\n\n    </div>\n    <div class="col s4 m4">\n      <img src="/img/about/image_1.png" alt="이미지 1">\n    </div>\n  </div><!-- /header -->\n  <div class="row">\n    <!--\n    <p>고위공직자 재산 공개 제도는 1993년 김영삼 대통령 때 처음 시작됐습니다. 공직자들의 재산을 공개함으로써 공직사회의 투명성을 늘리기 위한 취지로 도입된 제도입니다. 그러나 시민들이 이 자료를 활용해서 공직자를 감시하는 것은 매우 어려운 일입니다. 우선 이 자료는 전자관보 사이트를 통해 공개되는데, 사이트에서는 내용 검색을 하기가 어렵습니다. 불과 몇 해 전인 2010년 자료만 해도 pdf 자료가 문자 정보가 들어 있지 않은 스캔 파일로 되어 있어서, 내용 검색이 불가능합니다.</p>\n    <p>뉴스타파는 지난 2013년부터 그림으로 되어 있는 정보를 문자인식하고, 검증하는 작업을 반복하여 고위공직자 재산 자료를 데이터화하는 작업을 해왔습니다. 올해는 그 결과물을 온라인 상에 처음 공개합니다. 언론사 기자, 시민단체 관계자를 포함한 일반 시민 누구나 관심있는 공직자를 검색하고, 재산 정보를 직접 확인할 수 있도록 했습니다. 또한 저희가 만든 데이터를 인용 절차를 거쳐 누구나 사용할 수 있도록 CC라이선스로 공개할 예정입니다.</p>\n    -->\n    <p>\n      뉴스타파는 그동안 기관 별로 산발적으로 공개되던 고위공직자들의 재산 내역을 한데 모아 시민들이 쉽게 찾아 볼 수 있는 웹사이트를 제작했습니다. 특히 고위공직자의 경우 여러 해에 걸친 재산 형성 과정을 직접 추적해 볼 수 있습니다.\n    </p>\n    <p>\n      이번 고위공직자 재산 공개 내역에는 2006년부터 2016년까지 연인원 2만 3천여 명의 고위공직자들의 재산 신고 내용이 들어 있으며, 특히 이번에 치러진 20대 총선 당선인 300명의 재산을 별도로 분류해 확인이 용이하도록 했습니다.\n    </p>\n    <p>\n      기관별 재산 공개 공직자 수(연인원)<br />\n      <table>\n        <thead>\n          <tr>\n            <th>연도</th>\n            <th>국회</th>\n            <th>정부</th>\n            <th>대법원</th>\n            <th>헌법재판소</th>\n            <th>중앙선관위</th>\n            <th>20대 총선 당선인</th>\n            <th>합계</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>2006</td>\n            <td>335</td>\n            <td>640</td>\n            <td>124</td>\n            <td>12</td>\n            <td>25</td>\n            <td></td>\n            <td>1,136</td>\n          </tr>\n          <tr>\n            <td>2007</td>\n            <td>333</td>\n            <td>625</td>\n            <td>128</td>\n            <td></td>\n            <td>17</td>\n            <td></td>\n            <td>1,103</td>\n          </tr>\n          <tr>\n            <td>2008</td>\n            <td>337</td>\n            <td>1,738</td>\n            <td>140</td>\n            <td></td>\n            <td>13</td>\n            <td></td>\n            <td>2,228</td>\n          </tr>\n          <tr>\n            <td>2009</td>\n            <td>320</td>\n            <td>1,782</td>\n            <td>143</td>\n            <td>11</td>\n            <td>20</td>\n            <td></td>\n            <td>2,276</td>\n          </tr>\n          <tr>\n            <td>2010</td>\n            <td>330</td>\n            <td>1,851</td>\n            <td>128</td>\n            <td>11</td>\n            <td>15</td>\n            <td></td>\n            <td>2,335</td>\n          </tr>\n          <tr>\n            <td>2011</td>\n            <td>322</td>\n            <td>1,831</td>\n            <td>142</td>\n            <td>11</td>\n            <td>18</td>\n            <td></td>\n            <td>2,324</td>\n          </tr>\n          <tr>\n            <td>2012</td>\n            <td>326</td>\n            <td>1,844</td>\n            <td>148</td>\n            <td>12</td>\n            <td>17</td>\n            <td></td>\n            <td>2,347</td>\n          </tr>\n          <tr>\n            <td>2013</td>\n            <td>326</td>\n            <td>1,933</td>\n            <td>147</td>\n            <td>11</td>\n            <td>15</td>\n            <td></td>\n            <td>2,432</td>\n          </tr>\n          <tr>\n            <td>2014</td>\n            <td>336</td>\n            <td>1,868</td>\n            <td>144</td>\n            <td>12</td>\n            <td>20</td>\n            <td></td>\n            <td>2,380</td>\n          </tr>\n          <tr>\n            <td>2015</td>\n            <td>328</td>\n            <td>1813</td>\n            <td>162</td>\n            <td>13</td>\n            <td>18</td>\n            <td></td>\n            <td>2,338</td>\n          </tr>\n          <tr>\n            <td>2016</td>\n            <td>328</td>\n            <td>1,813</td>\n            <td>162</td>\n            <td>13</td>\n            <td>13</td>\n            <td>300</td>\n            <td>2,629</td>\n          </tr>\n          <tr>\n            <td>합계</td>\n            <td>3,621</td>\n            <td>17,750</td>\n            <td>1,560</td>\n            <td>106</td>\n            <td>191</td>\n            <td>300</td>\n            <td>23,528</td>\n          </tr>\n        </tbody>\n      </table>\n    </p>\n    <p>\n      공직자들의 재산 공개는 공직자윤리법에 근거해 1993년 처음 시행됐습니다. 재산공개제도는 고위공직자의 재산을 투명하게 공개함으로써 부정부패를 예방하기 위한 제도입니다. 공직자윤리법에 따라 정부, 국회, 대법원, 헌법재판소, 중앙선거관리위원회 등에는 각각 공직자윤리위원회가 설치되어 있고 이들 공직자윤리위원회는 관보나 공보를 통해 고위공직자들의 재산 내역을 공개하고 있습니다.\n    </p>\n    <p>\n      그러나 시민들이 각 기관의 공보나 관보를 직접 찾아 공직자들의 재산형성 과정을 확인한다는 것은 어려운 일이었습니다. 정보가 각 기관마다 산발적으로 공개되고, 관보 내용에서 사람을 직접 검색할 수 없었기 때문입니다.\n    </p>\n    <p>\n      뉴스타파는 앞으로 매년 공직자들의 재산이 공개될 때마다 이 사이트를 업데이트할 예정입니다. 99% 시민들의 후원으로 운영되는 뉴스타파는 시민들이 공공 데이터를 보다 효율적으로 이용할 수 있도록 하기 위해 더욱 노력하겠습니다.\n    </p>\n    <p>\n      이 프로젝트는 정보의 자유로운 공유를 추구하는 <a href="http://cckorea.org">크리에이티브 커먼즈 코리아와 공동작업</a>으로 추진하고 있습니다.\n    </p>\n\n  </div>\n  <div class="row about-newstapa">\n    <div class="col s8 m8">\n      <h5>\n        진실의 수호자가 되겠습니다.<br />\n        ‘성역없는 탐사보도’로<br />\n        한국언론의 희망을 만들겠습니다.\n    </div>\n    <div class="col s4 m4">\n      <img src="/img/about/image_1.png" alt="이미지 1">\n    </div>\n  </div><!-- /header -->\n  <div class="row">\n    <p>\n      한국탐사저널리즘센터/뉴스타파는 99% 시민을 위한 비영리, 비당파, 독립 언론기관입니다. 뉴스타파는 전국언론노동조합의 지원 하에 MB 정부 시기 해직 언론인과 탐사보도 전문 언론인들이 중심이 돼 설립됐습니다.\n    </p>\n    <p>\n      뉴스답지 않은 ‘가짜 뉴스’를 ‘타파’하고, 언론 본연의 임무인 권력 감시와 진실 보도를 지향하는 ‘진짜 뉴스’를 위해 뭉쳤습니다.<br />\n      뉴스타파는 2012년 1월 27일 첫 탐사보도를 내보낸 이래 3만여 명의 후원 회원의 성원을 바탕으로 우리 사회에서 가장 영향력 있고, 신뢰받는 언론기관으로 발돋움하고 있습니다.\n    </p>\n    <p>\n      한국탐사저널리즘센터/뉴스타파는 어떠한 압력이나 간섭에서도 자유롭기 위해 광고나 정부 또는 이익단체의 지원을 일체 배제하고 시민들의 자발적 후원으로 운영됩니다.\n    </p>\n  </div>\n  <div class="row about-codenamu">\n    <div class="col s4 m4">\n      <img src="/img/logo/codenamu.png" alt="코드나무" style="width: 100%;">\n    </div>\n    <div class="col s8 m8">\n      <h5>더 많은 데이터가 공개되고<br>\n      더 많은 사람들이 필요한 정보에 접근할 수 있는<br>\n      오픈 데이터를 위한 활동\n      </h5>\n    </div>\n  </div>\n  <div class="row">\n    <p>\n      <a href="http://cckorea.org" title="크리에이티브 커먼즈 코리아">크리에이티브 커먼즈 코리아</a>에서는 2011년 오픈데이터 프로젝트 <a href="http://codenamu.org" title="코드나무">코드나무</a>를 시작하였습니다.<br>우리 사회에 보다 많은 데이터가 공개되고 보다 많은 사람들이 데이터에 접근하고 활용할 수 있도록 아래와 같은 다양한 활동을 이어오고 있습니다.\n      <li>데이터를 활용하여 사회 문제를 해결하기 위한 <a href="http://codenamu.org/projects/hackathon/" title="코드나무 해커톤">해커톤</a></li>\n      <li>공공데이터 관련 <a href="http://codenamu.org/projects/publication/" title="코드나무 서적/보고서">정책 제언, 책 출판</a></li>\n      <li>IT기술로 사회 문제 해결을 위한 커뮤니티 <a href="http://codeforseoul.org" title="코드포서울">코드포서울</a></li>\n    </p>\n    <p>\n      시민단체와 미디어의 역할은 사람들에게 꼭 필요한 이야기를 전달하고자 노력하고 있습니다. 사람들을 중요한 사실과 메시지를 전달하는 것입니다. 중요한 사실을 대중들에게 인식 시키고 마음을 움직일때에 데이터는 중요한 역할을 합니다.  그러나 미디어, 시민 단체에서는  데이터를 관리하고 활용할 수 있는 기술, 데이터를 보다 쉽고 다양한 방법으로 읽고 전달할 수 있는 기술이부족한 경우가 있습니다.\n    </p>\n    <p>\n      그로 인해  중요한 데이터들이 관리되지 못하고 공개되지 못하거나 중요한 사실들이 효과적으로 전달되지 못하는 경우도 종종 있습니다. 그동안 데이터를 통한 다양한 프로젝트를 해온 코드나무는 다양한 시민단체, 미디어들과 협력하여 국내 오픈 데이터가 더욱 풍성해질 수 있도록 데이터를 공개하고 사람들에게 꼭 필요한 이야기를 데이터 저널리즘 활동을 통해 효과적으로 전달할 수 있는 프로젝트를 이어가고자 합니다.\n    </p>\n    <p>\n      그 첫번째 프로젝트로 뉴스타파와 함께 한 고위공직자 재산 데이터를 활용한 프로젝트입니다.<br>\n      우리 사회를 책임지고 있는 고위공직자 들의 재산 정보는 그 책임성과 청렴도로 비추어 보아 많은 시민들이 꼭 함께 지켜볼 필요가 있는 정보입니다. 2013년부터 데이터 형태로 보관해왔던 뉴스타파와 함께 누구나 사용할 수 있는 형태로 데이터를 공개하여 보다 다양한 언론 기관과 일반인들이 자유롭게 활용할 수 있게 되기를 바랍니다. 또한 누구나 접근 가능하고 검색 가능하도록 구현하여 데이터를 모르는 일반인들도 쉽게 활용할 수 있기를 바랍니다.\n    </p>\n  </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/card.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="col s12 m6 l4">\n  <div id="official-' +
__e( model.Person.uniqueId ) +
'" class="card">\n    <div class="card-content">\n      <span class="card-title">' +
__e( model.Person.name ) +
'</span>\n      <span class="card-subtitle">\n        ';
 if (model.isElec) { ;
__p += '\n          ' +
__e( model.mainOrg ) +
'<br>' +
__e( model.mainPos ) +
'\n        ';
 } else { ;
__p += '\n          ' +
__e( model.Position[model.Position.length - 1].title.split(' ')[0] ) +
'<br />\n          ' +
__e( model.Position[model.Position.length - 1].title.split(' ')[2] ? model.Position[model.Position.length - 1].title.split(' ')[1] + ' ' + model.Position[model.Position.length - 1].title.split(' ')[2] : model.Position[model.Position.length - 1].title.split(' ')[1] ) +
'\n        ';
 } ;
__p += '\n      </span>\n    </div>\n    <div class="card-action">\n        ';
 model.Position.forEach(function(p) {;
__p += '\n          <li class=\'position\'>' +
__e( p.title ) +
'<span class=\'year\'>';
 for (var y in p.year) { ;
__p += ' ' +
__e( p.year[y] + ' ' ) +
' ';
 } ;
__p += '</span></li>\n        ';
 }) ;
__p += '\n      <span class="card-link-to-btn">\n      <a class="btn btn-floating color-news">\n        <img src="/img/arrow.png" alt="arrow-right" />\n      </a>\n      </span>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/contact.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="page page-contact">\n  <section class="container">\n    <section class="card">\n      <div class="card-content row">\n        <form id="form-contact" method="POST">\n          <div class="row">\n              <div class="col s12 m1 offset-m1 form-label">\n                  <h6>구분</h6>\n              </div>\n              <div class="col s12 m9">\n                  <div class="input-field col s6 m3">\n                      <input name="contact-for" type="radio" id="contact-for-update" value="개선사항 제안하기" required/>\n                      <label for="contact-for-update">개선사항 제안하기</label>\n                  </div>\n                  <div class="input-field col s6 m3">\n                      <input name="contact-for" type="radio" id="contact-for-data" value="데이터 수정 요구" />\n                      <label for="contact-for-data">데이터 수정요구</label>\n                  </div>\n                  <div class="input-field col s6 m3">\n                      <input name="contact-for" type="radio" id="contact-for-article" value="기사 제보하기" />\n                      <label for="contact-for-article">기사 제보하기</label>\n                  </div>\n                  <div class="input-field col s6 m3">\n                      <input name="contact-for" type="radio" id="contact-for-etc" value="기타 문의" />\n                      <label for="contact-for-etc">기타 문의</label>\n                  </div>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col s12 m1 offset-m1 form-label">\n                  <h6>이메일</h6>\n              </div>\n              <div class="input-field col s12 m9">\n                  <input id="contact-email" class="validate" name="contact-email" type="email" placeholder="필수" required></input>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col s12 m1 offset-m1 form-label">\n                  <h6>연락처</h6>\n              </div>\n              <div class="input-field col s12 m9">\n                  <input id="contact-contact" name="contact-contact" type="tel"></input>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col s12 m1 offset-m1 form-label">\n                  <h6>내용</h6>\n              </div>\n              <div class="input-field col s12 m9">\n                  <textarea id="contact-content" class="materialize-textarea" name="contact-content" required></textarea>\n              </div>\n          </div>\n          <div class="row">\n              <div class="col s10 offset-s1 m4 offset-m4">\n                  <button class="btn btn-large color-news" type="submit">보내기</button>\n              </div>\n          </div>\n        </form>\n      </div>\n    </section>\n  </section>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/header.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="row">\n  <section class="col s12">\n    <h1><a href="/">고위공직자 재산 정보 공개</a></h1>\n    <div class="subtitle">\n      <p class="subtitle">크리에이티브 커먼즈 코리아 공동작업</p>\n      <p class="subtitle"><img src="/img/cc-gray.png" alt="CCKOREA"></p>\n    </div>\n  </section>\n  <nav class="nav-desktop col m6">\n    <div class="nav-wrapper">\n      <ul class="right hide-on-med-and-down">\n        <li><a href="/#about">소개</a></li>\n        <li><a href="http://newstapa.org/tag/%EA%B3%A0%EC%9C%84%EA%B3%B5%EC%A7%81%EC%9E%90%EC%9E%AC%EC%82%B0" target="_blank">보도사례</a></li>\n        <li><a href="#modal-data" class="modal-trigger">데이터</a></li>\n        <li><a href="/#contact">연락하기</a></li>\n      </ul>\n    </div>\n  </nav>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/nav.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="nav-wrapper">\n  <a href="/" class="brand-logo hide-mobile"><img src="/img/logo/newstapa.png" alt="뉴스타파"></a>\n  <a href="/" class="brand-logo logo-main hide-desktop">\n    <img class="main" src="/img/logo/newstapa-mobile.png" alt="뉴스타파">\n  </a>\n  <a href="/" class="brand-logo logo-normal hide-desktop">\n    고위공직자 재산 정보 공개\n  </a>\n  <ul id="slide-out" class="side-nav">\n    <li><a href="/#about">소개</a></li>\n    <li><a href="http://newstapa.org/tag/%EA%B3%A0%EC%9C%84%EA%B3%B5%EC%A7%81%EC%9E%90%EC%9E%AC%EC%82%B0" target="_blank">보도사례</a></li>\n    <li><a href="#modal-data" class="modal-trigger">데이터</a></li>\n    <li><a href="/#contact">연락하기</a></li>\n    <li class="nav-footer">\n      <img src="/img/logo/nav-footer.png" alt="뉴스타파 & CCKOREA">\n      <p>Copyright 2016<br>\n        Creative Commons Korea<br>\n        The Korea center For Investigation Journalism<br>\n        Some right reserved.\n      </p>\n      <img class="cc-by-license" src="/img/by.png" alt="CC BY">\n    </li>\n  </ul>\n  <ul class="right">\n    <li class="donate hide-mobile"><a class="donate" href="http://newstapa.org/donate" target="_blank"></a></li>\n    <li class="donate-mobile hide-desktop"><a href="http://newstapa.org/donate"><img src="/img/donate.png" alt="" target="_blank"></a></li>\n    <li class="twitter"><a href="https://twitter.com/newstapa" title=""><img src="/img/twitter.png" alt="" target="_blank"></a></li>\n    <li class="facebook"><a href="https://facebook.com/newstapa"><img src="/img/facebook.png" alt="" target="_blank"></a></li>\n    <li class="kakao"><a href="https://story.kakao.com/ch/newstapa" title=""><img src="/img/kakaostory.png" alt="" target="_blank"></a></li>\n  </ul>\n  <a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/official.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section id="page-official">\n    <div class="row">\n        <div class="col s12 m6 offset-m3">\n            <div class="row history-back">\n                <img src="/img/history-back.png" alt="뒤로가기" /> 목록보기\n            </div>\n            <div class="card ontop">\n                <div class="backnforth backward">\n\n                </div>\n                <div class="backnforth forward">\n\n                </div>\n                <div class="card-content">\n                    <span class="card-title">' +
__e( official.person.name ) +
'</span>\n                    <span class="card-subtitle">\n                        ';
 if (official.isElec) { ;
__p += '\n                            ' +
__e( official.mainOrg ) +
'<br>' +
__e( official.mainPos ) +
'\n                        ';
 } else { ;
__p += '\n                            ' +
__e( official.position[official.position.length - 1].Org3.title ) +
'<br>' +
__e( official.position[official.position.length - 1].title ) +
'\n                        ';
 } ;
__p += '\n\n                </span>\n                </div>\n                <div class="card-action">\n                    <div class="row official-total">\n                        <h5><li>재산 총액</li></h5>\n                        <span id="official-asset-total" class="value"><span class="number">' +
__e( official.assets.history[official.latestYear].totalText ) +
'</span><span class="year">' +
__e( official.latestYear ) +
'년</span></span>\n                    </div>\n                    <div class="row official-history">\n                        <h5><li>재산 총액의 변동 이력</li></h5>\n                        <div class="official-bar-chart">\n                            <div id="canvas-bar"></div>\n                        </div>\n                        <div class="official-pie-chart">\n                            <h6><li>자산 분류</li></h6>\n                            <!-- <div id="canvas-pie"></div> -->\n                            <table>\n                                <thead>\n                                  <tr>\n                                      <th data-field="category">항목</th>\n                                      <th data-field="percentage">비중</th>\n                                      <th data-field="amount">금액</th>\n                                  </tr>\n                                </thead>\n                                <tbody>\n                                </tbody>\n                              </table>\n                        </div>\n                    </div>\n                    <div class="row official-positions">\n                        <h5><li>재산 공개 이력</li></h5>\n                        <ul>\n                        ';
 for (var p in official.reorderedPosition) { ;
__p += '\n                            <li>- ' +
__e( official.reorderedPosition[p].title ) +
' <span class="year">\n                              ';
 for (var y in official.reorderedPosition[p].year) { ;
__p += '\n                                ';
 if (y === official.reorderedPosition[p].year.length - 1) { ;
__p += '\n                                  ' +
__e( official.reorderedPosition[p].year[y] + ', ' ) +
'\n                                ';
 } else { ;
__p += '\n                                  ' +
__e( official.reorderedPosition[p].year[y] ) +
'\n                                ';
 } ;
__p += '\n                              ';
 };
__p += '\n                            </span></li>\n                        ';
 } ;
__p += '\n                        </ul>\n                    </div>\n                    <div class="row">\n                      <h5><li>원본 보기</li></h5>\n                      <ul>\n                      ';
 for (var p in official.position) { ;
__p += '\n                          ';
 if (!official.position[p].isElec) { ;
__p += '\n                              <li><a href="' +
__e( official.position[p].pdfUrl ) +
'" target="_blank">- ' +
__e( official.position[p].year ) +
'년</a></li>\n                          ';
 } ;
__p += '\n                      ';
 } ;
__p += '\n                      </ul>\n                    </div>\n                    <div class="row">\n                      <div class="col s12 m6 offset-m3">\n                        <button id="btn-contact-official-' +
__e( official.person.uniqueId ) +
'" class="btn btn-large waves-effect color-news-light modal-trigger" type="button" data-target="contact-official-' +
__e( official.person.uniqueId ) +
'">제보하기</button>\n\n                        <div id="contact-official-' +
__e( official.person.uniqueId ) +
'" class="modal">\n                            <form id="form-contact-official" class="col s12">\n                                <div class="modal-content">\n                                  <div class="row">\n                                    <h5>제보하기</h5>\n                                    <p>' +
__e( official.person.name ) +
' 관련 정보 제보하기</p>\n                                  </div>\n                                  <div class="row">\n                                    <div class="input-field col s12">\n                                      <input id="contact-official-email" class="validate" type="email" name="contact-official-email" placeholder="이메일(필수)" required/>\n                                    </div>\n                                  </div>\n                                  <div class="row">\n                                    <div class="input-field col s12">\n                                      <input type="hidden" name="official-id-name" id="contact-official-type" value="' +
__e( official.person.uniqueId ) +
'-' +
__e( official.person.name ) +
'">\n                                      <textarea id="contact-official-content" name="contact-official-content" class="materialize-textarea"></textarea>\n                                      <label for="contact-official-content">내용</label>\n                                    </div>\n                                  </div>\n                                  <div class="row">\n                                    <div class="col s12 m4 offset-m4">\n                                      <button type="submit" class="btn btn-larget color-news">보내기</button>\n                                    </div>\n                                  </div>\n                                </div>\n                            </form>\n                        </div>\n                      </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/searchbox.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section class="row content">\n  <div id="search-tabs" class="col s12 m4 offset-m4">\n    <ul class="tabs">\n      <li class="tab col s3"><a class="active" href="#search-default">기본 검색</a></li>\n      <li class="tab col s3"><a href="#search-election">당선자 검색</a></li>\n    </ul>\n  </div>\n  <section id="search-default" class="col s12 tab-content">\n    <form id="form-search-default" class="container" action="/officials" method="GET">\n      <div class="row">\n          <div class="col s12 m10 offset-m1">\n              <div class="input-field col s12 m4 offset-m2">\n                  <select id="selected-orgs" name="org" multiple>\n                    <option value="" disabled selected>소속을 선택하세요</option>\n                  </select>\n                  <select id="selected-orgs-mobile" name="org" multiple>\n                  </select>\n                  <!-- <span id="selected-orgs-placeholder" class="hide-desktop">소속을 선택하세요</span> -->\n                  <span class="caret-mobile hide-desktop">▼</span>\n              </div>\n              <div class="input-field col s12 m4">\n                  <select id="selected-years" name="year" multiple>\n                    <option value="" disabled selected hidden>연도를 선택하세요</option>\n                    <option id="option-years-id-2006" value="2006">2006</option>\n                    <option id="option-years-id-2007" value="2007">2007</option>\n                    <option id="option-years-id-2008" value="2008">2008</option>\n                    <option id="option-years-id-2009" value="2009">2009</option>\n                    <option id="option-years-id-2010" value="2010">2010</option>\n                    <option id="option-years-id-2011" value="2011">2011</option>\n                    <option id="option-years-id-2012" value="2012">2012</option>\n                    <option id="option-years-id-2013" value="2013">2013</option>\n                    <option id="option-years-id-2014" value="2014">2014</option>\n                    <option id="option-years-id-2015" value="2015">2015</option>\n                    <option id="option-years-id-2016" value="2016">2016</option>\n                  </select>\n                  <select id="selected-years-mobile" name="year" multiple>\n                    <optgroup label="소속을 선택하세요">\n                      <option id="option-mobile-years-id-2006" value="2006">2006</option>\n                      <option id="option-mobile-years-id-2007" value="2007">2007</option>\n                      <option id="option-mobile-years-id-2008" value="2008">2008</option>\n                      <option id="option-mobile-years-id-2009" value="2009">2009</option>\n                      <option id="option-mobile-years-id-2010" value="2010">2010</option>\n                      <option id="option-mobile-years-id-2011" value="2011">2011</option>\n                      <option id="option-mobile-years-id-2012" value="2012">2012</option>\n                      <option id="option-mobile-years-id-2013" value="2013">2013</option>\n                      <option id="option-mobile-years-id-2014" value="2014">2014</option>\n                      <option id="option-mobile-years-id-2015" value="2015">2015</option>\n                      <option id="option-mobile-years-id-2016" value="2016">2016</option>\n                    </optgroup>\n                  </select>\n                  <!-- <span id="selected-years-placeholder" class="hide-desktop">연도를 선택하세요</span> -->\n                  <span class="caret-mobile hide-desktop">▼</span>\n              </div>\n          </div>\n      </div>\n      <div id="tags-default" class="row">\n        <div class="col s12 m8 offset-m2"></div>\n      </div>\n      <div class="row">\n        <div class="input-field input-field-integrated col s12 m5 offset-m3">\n          <input type="text" id="selected-keyword" class="text" name="keyword" placeholder="검색어(이름, 직위, 소속)를 입력하세요.">\n          <button class="btn btn-large color-news" type="submit" name="action">검색</button>\n        </div>\n      </div>\n    </form>\n  </section>\n  <div id="search-election" class="col s12 tab-content">\n    <form id="form-search-election" class="container" action="/officials" method="GET">\n      <div class="row">\n          <div class="col s12 m10 offset-m1">\n              <div class="input-field col s12 m4">\n                  <select id="selected-provinces" name="province">\n                    <option value="" disabled selected hidden>자치단체를 선택하세요</option>\n                  </select>\n                  <select id="selected-provinces-mobile" name="province">\n                    <option value="" disabled selected hidden>자치단체를 선택하세요</option>\n                  </select>\n                  <span class="caret-mobile hide-desktop">▼</span>\n              </div>\n              <div class="input-field col s12 m4">\n                  <select id="selected-municipals" name="municipal">\n                    <option value="" disabled selected hidden>시/군/구를 선택하세요</option>\n                  </select>\n                  <select id="selected-municipals-mobile" name="municipal">\n                    <option value="" disabled selected hidden>시/군/구를 선택하세요</option>\n                  </select>\n                  <span class="caret-mobile hide-desktop">▼</span>\n              </div>\n              <div class="input-field col s12 m4">\n                  <select id="selected-dongs" name="dong">\n                    <option value="" disabled selected hidden>읍/면/동을 선택하세요</option>\n                  </select>\n                  <select id="selected-dongs-mobile" name="dong">\n                    <option value="" disabled selected hidden>읍/면/동을 선택하세요</option>\n                  </select>\n                  <span class="caret-mobile hide-desktop">▼</span>\n              </div>\n          </div>\n      </div>\n      <div id="tags-election" class="row">\n        <div class="col s12 m8 offset-m2"></div>\n      </div>\n      <div class="row">\n        <div class="input-field input-field-integrated col s12 m5 offset-m3">\n          <input type="text" id="selected-keyword-election" class="text" name="keyword" placeholder="검색어(이름, 직위, 소속)를 입력하세요.">\n          <button class="btn btn-large color-news" type="submit" name="action">검색</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</section>\n';

}
return __p
};

this["JST"]["app/scripts/templates/searchresult.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section id="search-result">\n  <section class="container">\n    <div class="row search-message">\n      <div class="col s12">\n        <h5 class="col s8 m12">총 <span class="value">' +
__e( count ) +
'</span>개의 결과를 찾았습니다</h5>\n        <button id="btn-scroll-searchbox" class="btn color-news col s4 hide-desktop" type="button" name="button">다시 검색하기</button>\n      </div>\n      <!-- <div class="col s3">\n        <button id="btn-research" class="btn waves-effect color-news hide-desktop" type="button">다시 검색하기</button>\n      </div> -->\n    </div>\n    <div class="row search-cards" style="position: relative;">\n\n    </div>\n    <section class="search-loading">\n      <div class="preloader-wrapper small active">\n        <div class="spinner-layer spinner-green-only">\n          <div class="circle-clipper left">\n            <div class="circle"></div>\n          </div><div class="gap-patch">\n            <div class="circle"></div>\n          </div><div class="circle-clipper right">\n            <div class="circle"></div>\n          </div>\n        </div>\n      </div>\n    </section>\n  </section>\n</section>\n';

}
return __p
};