function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Lấy chuỗi truy vấn.
function getQueryString(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Ngắt chuỗi.
function trimString(str, chars) {
    var start = 0,
        end = str.length;

    while (start < end && chars.indexOf(str[start]) >= 0)
        ++start;

    while (end > start && chars.indexOf(str[end - 1]) >= 0)
        --end;

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

// Đường dẫn tương đối.
function relativeUrl(url) {
    var virtualPath = "";// Mặc định để rỗng. Đường dẫn ảo khi làm ứng dụng của site.
    if (virtualPath.length > 0)
        virtualPath = virtualPath + "/";
    return "/" + virtualPath + url;
}

// Chèn tập tin css.
function importCssFile(href) {
    var element = document.createElement("link");
    element.setAttribute("ref", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", relativeUrl(href));
    document.head.appendChild(element);
}

// Chèn khối lệnh css.
function importCssBlock(text) {
    var element = document.createElement("style");
    element.setAttribute("type", "text/css");
    element.innerHTML = text;
    document.head.appendChild(element);
}

// Chèn tập tin javascript.
function importJsFile(src, position) {
    var element = document.createElement("script");
    element.setAttribute("src", relativeUrl(src));
    if (position == "body")
        document.body.appendChild(element);
    if (position == "head")
        document.head.appendChild(element);
}

// Chèn khối lệnh javascript.
function importJsBlock(text, position) {
    var element = document.createElement("script");
    element.innerHTML = text;
    if (position == "body")
        document.body.appendChild(element);
    if (position == "head")
        document.head.appendChild(element);
}