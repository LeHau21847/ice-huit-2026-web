var loadArticle = ajaxPost({
    url: relativeUrl("com_article/article/ajax_get_article"),
    contentType: 'application/json charset=utf-8',
    data: JSON.stringify({
        categoryAlias: $("[name='article_categoryAlias']").val(),
        alias: $("[name='article_alias']").val(),
        id: $("[name='article_id']").val()
    }),
    // beforeSend: function () {
    //     // $(".js-load-article").html(renderSpinerAjaxStatus("border", "40px", "40px"));
    // },
    error: function (xhr, status, error) {
        console.log(xhr.responseText);
    }
});
var viewPdfInArticle = function () {
    // Xem pdf.
    var iframes = $(".single-article").find("iframe");
    var extension = null;
    if (iframes.length > 0) {

        for (var i = 0; i < iframes.length; i++) {
            if (iframes[i].src != undefined && iframes[i].src.length > 0) {
                extension = iframes[i].src.split(".").pop();
                if (extension.toLowerCase() == "pdf") {
                    iframes[i].src = location.origin + "/viewdocument?url=" + iframes[i].src;
                    iframes[i].style = "margin-bottom:50px";
                }
            }
        }
    }
}

// Breadcrumb.
function getBreadcrumbByArticleId(categoryAlias, articleId) {
    var frmData = new FormData();
    frmData.append("categoryAlias", categoryAlias);
    frmData.append("articleId", articleId);
    return ajaxPost({
        url: relativeUrl("com_article/article/ajax_get_breadcrumb_by_article_id"),
        processData: false,
        contentType: false,
        data: frmData,
        error: function (xhr, status, error) {
            console.log("Lỗi lấy breadcrumb!");
        }
    });
}