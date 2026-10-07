// Breadcrumb.
function loadBreadcrumbForArticleByLink() {
    var frmData = new FormData();
    frmData.append("link", window.location.pathname);
    return ajaxPost({
        url: relativeUrl("com_article/article/ajax_get_breadcrumb_for_article_by_link"),
        processData: false,
        contentType: false,
        data: frmData,
        error: function (xhr, status, error) {
            console.log("Lỗi lấy breadcrumb!");
        }
    });
}