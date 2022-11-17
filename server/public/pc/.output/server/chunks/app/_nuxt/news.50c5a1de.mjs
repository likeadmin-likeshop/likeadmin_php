function getArticleCate() {
  return $request.get({ url: "/article/cate" });
}
function getArticleList(params) {
  return $request.get({ url: "/article/lists", params });
}
function getArticleCenter() {
  return $request.get({ url: "/pc/infoCenter" });
}
function getArticleDetail(params) {
  return $request.get({ url: "/pc/articleDetail", params });
}
function addCollect(params) {
  return $request.post({ url: "/article/addCollect", params });
}
function cancelCollect(params) {
  return $request.post({ url: "/article/cancelCollect", params });
}
function getCollect(params) {
  return $request.get({ url: "/article/collect", params });
}

export { getArticleDetail as a, addCollect as b, cancelCollect as c, getArticleCenter as d, getCollect as e, getArticleCate as f, getArticleList as g };
//# sourceMappingURL=news.50c5a1de.mjs.map
