// Chuyển đổi định dạng JsonDate sang DateTime.
function convertJsonDateToDatetime(jsonDate, formatString)
{
    if (jsonDate != "undefined") {
        var date = new Date(parseInt(jsonDate.substr(6)));
        formatString = formatString.replace("dd", ("0" + date.getDate()).slice(-2));
        formatString = formatString.replace("MM", ("0" + (date.getMonth() + 1)).slice(-2));
        formatString = formatString.replace("yyyy", date.getFullYear());
        formatString = formatString.replace("hh", ("0" + date.getHours()).slice(-2));
        formatString = formatString.replace("mm", ("0" + date.getMinutes()).slice(-2));
        formatString = formatString.replace("ss", ("0" + date.getSeconds()).slice(-2));
        formatString = formatString.replace("fff", ("00" + date.getMilliseconds()).slice(-3));
    }
    else {
        console.log("Định dạng ngày tháng không đúng!");
    }
    return formatString;
}

// Get route value with index specified.
function getRouteValueAt(index) {
    const routeTokens = location.pathname.replace(/^\/+/g, '').split('/');
    return routeTokens.length > index ? routeTokens[index] : undefined;
}

// Thông tin phân trang.
function pagerInfo(element, table, currentPage, pageSize, totalRecord) {
    var $element = $(element);
    var rows = $(table + ' tbody > tr').length;
    var firstRowIndex = (parseInt(pageSize) * (parseInt(currentPage) - 1)) + 1;
    var lastRowIndex = (parseInt(pageSize) * parseInt(currentPage)) - (parseInt(pageSize) - rows);
    return $element.html("Mẫu tin từ <b>" + firstRowIndex + "</b> đến <b>" + lastRowIndex + "</b> trên tổng số <b>" + totalRecord + "</b> mẫu tin.");
}

// Nạp danh sách số lượng mẫu tin trong 1 trang.
function loadPageSizeSelect(element) {
    var html = '';
    html += '<option value="5">5</option>';
    html += '<option value="10" selected>10</option>';
    html += '<option value="25">25</option>';
    html += '<option value="50">50</option>';
    html += '<option value="100">100</option>';
    html += '<option value="0">All</option>';
    return $(element).append(html);
}

// Nạp danh sách ngôn ngữ.
function loadLanguageSelect(element) {
    var html = "";
    html += "<option value='*' selected>-- Tất cả --</option>";
    html += "<option value='vi-VN'>Tiếng việt</option>";
    html += "<option value='en-US'>English</option>";
    return $(element).append(html);
};

// Trạng thái mẫu tin.
function loadStatusSelect(element) {
    var html = "";
    html += "<option value='1'>Xuất bản</option>";
    html += "<option value='0'>Không xuất bản</option>";
    html += "<option value='-1'>Thùng rác</option>";
    return $(element).append(html);
};

// Biểu tượng trạng thái mẫu tin.
function renderStatusIcon(status) {
    var html = "";
    if (status == -1)
        html = "<i class=\"fas fa-trash text-secondary\" title=\"Thùng rác\"></i>";
    if (status == 0)
        html = "<i class=\"fas fa-eye-slash text-warning\" title=\"Không xuất bản\"></i>";
    if (status == 1)
        html = "<i class=\"fas fa-eye text-success\" title=\"Xuất bản\"></i>";
    return html;
}

// Loại điều hướng.
function loadBrowserNavigationSelect(element) {
    var html = "";
    html += "<option value='_self'>Mở liên kết với cửa sổ hiện tại.</option>";
    html += "<option value='_blank'>Mở liên kết với cửa sổ mới hoặc thẻ mới</option>";
    html += "<option value='_parent'>Mở liên kết với khung cửa sổ cha.</option>";
    html += "<option value='_top'>Mở liên kết toàn cửa sổ.</option>";
    html += "<option value='framename'>Mở liên kết cùng với tên của khung.</option>";
    return $(element).append(html);
}

// Sao chép chuỗi.
function renderCloneText(number, text) {
    var output = "";
    for (var i = 0; i < number; i++) {
        output += text;
    }
    return output;
}

// Bỏ dấu Tiếng Việt.
function unmarkVietnamese(str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/á|à|ạ|ả|ã|â|ấ|ầ|ậ|ẩ|ẫ|ă|ắ|ằ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/é|è|ẹ|ẻ|ẽ|ê|ế|ề|ệ|ể|ễ/g, "e");
    str = str.replace(/ó|ò|ọ|ỏ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/g, "u");
    str = str.replace(/í|ì|ị|ỉ|ĩ/g, "i");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ý|ỳ|ỵ|ỷ|ỹ/g, "y");
    // Một số bộ mã hóa coi dấu mũ và dấu phụ là các ký tự riêng biệt, vì vậy hãy thêm hai dòng này.
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Loại bỏ dấu chấm câu và các ký tự đặc biệt.
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, "-");
    // Loại bỏ khoảng trắng liền kề.
    str = str.replace(/ +/g, "-");
    // Thay thế khoảng trắng bằng ký tự -
    str = str.replace(/ /g, "-");
    // Chuyển nhiều ký tự - sang ký tự -
    str = str.replace(/-+/g, "-");
    // Loại bỏ ký tự - tại vị trí đầu và cuối chuỗi.
    str = trimString(str, '-');
    return str;
}

// Ajax post.
function ajaxPost(options) {
    // 1. Trích xuất done và fail ra khỏi options (nếu có)
    const successCallback = options.done;
    const errorCallback = options.fail;
    // 2. Xóa chúng khỏi object options gốc để $.ajax không bị nhầm
    delete options.done;
    delete options.fail;
    var token = $("input[name='__RequestVerificationToken']").val();
    var defaults = {
        type: "post",
        dataType: "json",
        headers: { "__RequestVerificationToken": token }
    };
    var settings = $.extend({}, defaults, options);
    // 3. Gửi AJAX và nhận Promise object
    const ajaxPromise = $.ajax(settings);
    // 4. Móc nối các hàm callback lại với Promise
    if (successCallback) {
        ajaxPromise.done(successCallback);
    }
    // Xử lý lỗi tập trung hoặc dùng callback truyền vào
    ajaxPromise.fail(function (xhr, status, error) {
        if (xhr.status == 401) {
            location.href = relativeUrl("");
        } else {
            if (errorCallback) {
                errorCallback(xhr, status, error);
            } else {
                console.log("AJAX Error: ", status);
            }
        }
    });
    return ajaxPromise;
}

// Ajax get.
function ajaxGet(options) {
    // 1. Trích xuất done và fail ra khỏi options (nếu có)
    const successCallback = options.done;
    const errorCallback = options.fail;
    // 2. Xóa chúng khỏi object options gốc để $.ajax không bị nhầm
    delete options.done;
    delete options.fail;
    var token = $("input[name='__RequestVerificationToken']").val();
    var defaults = {
        type: "get",
        dataType: "json",
        headers: { "__RequestVerificationToken": token }
    };
    var settings = $.extend({}, defaults, options);
    // 3. Gửi AJAX và nhận Promise object
    const ajaxPromise = $.ajax(settings);
    // 4. Móc nối các hàm callback lại với Promise
    if (successCallback) {
        ajaxPromise.done(successCallback);
    }
    // Xử lý lỗi tập trung hoặc dùng callback truyền vào
    ajaxPromise.fail(function (xhr, status, error) {
        if (xhr.status == 401) {
            location.href = relativeUrl("");
        } else {
            if (errorCallback) {
                errorCallback(xhr, status, error);
            } else {
                console.log("AJAX Error: ", status);
            }
        }
    });
    return ajaxPromise;
}

// Loại bỏ dữ liệu trùng lặp trong JsonData.
function removeDuplicateInJsonData(jsonData) {
    var arr = [],
        collection = [];

    $.each(jsonData, function (index, value) {
        if ($.inArray(value.id, arr) == -1) {
            arr.push(value.id);
            collection.push(value);
        }
    });
    return collection;
}

// Nhóm các dòng trong bảng.
function groupTable($rows, startIndex, total) {
    if (total === 0) {
        return;
    }

    var i, currentIndex = startIndex, count = 1, lst = [];
    var tds = $($rows).find('td:eq(' + currentIndex + ')');
    var ctrl = $(tds[0]);
    lst.push($rows[0]);
    for (i = 1; i <= tds.length; i++) {
        if (ctrl.text() == $(tds[i]).text()) {
            count++;
            $(tds[i]).addClass('deleted');
            lst.push($rows[i]);
        }
        else {
            if (count > 1) {
                ctrl.attr('rowspan', count);
                groupTable($(lst), startIndex + 1, total - 1)
            }
            count = 1;
            lst = [];
            ctrl = $(tds[i]);
            lst.push($rows[i]);
        }
    }
}

// Lấy các giá trị của các phần tử html theo định dạng json.
function getElementWithNoForm(element) {
    var elements = $(element).find("select, input, textarea");
    var frmData = new FormData();
    if (elements.length > 0) {
        $.each(elements, function (idx, key) {
            // Không nhận key rỗng.
            if (key.name != "")
                frmData.append(key.name, key.value);
        });        
    }
    else {
        console.log("Lỗi: không tìm thấy phần tử!");
    }

    return frmData;
}

// Duy trì phiên làm việc.
SessionUpdater = (function () {
    var clientMovedSinceLastTimeout = false;
    var keepSessionAliveUrl = null;
    var timeout = 5 * 1000 * 60; // 5 phút

    function setupSessionUpdater(actionUrl) {
        // Liên kết gọi hàm.
        keepSessionAliveUrl = actionUrl;
        // Kiểm tra trạng thái sử dụng bàn phím và chuột.
        listenForChanges();
        // Bắt đầu chạy với thời gian cho trước.
        checkToKeepSessionAlive();
    }

    function listenForChanges() {
        $("body").one("mousemove keydown", function () {
            clientMovedSinceLastTimeout = true;
        });
    }

    // Chạy với thời gian cho trước.
    function checkToKeepSessionAlive() {
        setTimeout(function () { keepSessionAlive(); }, timeout);
    }

    function keepSessionAlive() {
        if (clientMovedSinceLastTimeout && keepSessionAliveUrl != null) {
            ajaxGet({
                url: keepSessionAliveUrl,
                success: function (response) {
                    console.log(response);
                    // Đặt lại di chuyển.
                    clientMovedSinceLastTimeout = false;
                    // Bắt đầu lắng nghe sự thay đổi.
                    listenForChanges();
                    // Khởi động lại thời gian kiểm tra phiên làm việc.
                    checkToKeepSessionAlive();
                }
            });
        }
    }

    // Kết xuất.
    return {
        Setup: setupSessionUpdater
    };
})();

// Nhận dạng thiết bị di động.
function isMobile() {
    var _isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        _isMobile = true;
    } else {
        _isMobile = false;
    }
    return _isMobile;
}

function renderSpinerAjaxStatus(style, width, height) {
    // style: border | grow
    var html = "<div class='spinner-" + style + " ajax-status' style='width: " + width + "; height:" + height + "; margin-left: 5px' role='status'>";
    html += "<span class='sr-only'>Loading...</span>";
    html += "</div>";
    return html;
}

function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

// Kiểm tra chuỗi Json.
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Thêm tham s
function addParamsToUrl(url, data) {
    if (!$.isEmptyObject(data)) {
        // Check if the URL already contains a query string
        url += (url.indexOf('?') >= 0 ? '&' : '?') + $.param(data);
    }
    return url;
}

// Cập nhật tham số của url.
function updateUrlParameter(url, param, paramVal) {
    const tempArray = url.split("?");
    const baseURL = tempArray[0];
    let additionalURL = tempArray[1] || "";
    let newAdditionalURL = "";

    if (additionalURL) {
        const tempParams = additionalURL.split("&");
        for (let i = 0; i < tempParams.length; i++) {
            if (tempParams[i].split('=')[0] !== param) {
                newAdditionalURL += (newAdditionalURL ? "&" : "") + tempParams[i];
            }
        }
    }

    const updatedParam = (newAdditionalURL ? "&" : "") + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + updatedParam;
}

// Nạp ngôn ngữ
async function loadLanguageFile(paths = "") {
    // Biến cục bộ - Chỉ nằm CHỈ bên trong hàm này, an toàn tuyệt đối
    let localLanguageData = {};

    const pathArray = Array.isArray(paths) ? paths : [paths];
    const urlRequests = pathArray.map(path => {
        if (path === "") {
            return relativeUrl("assets/locales/" + ((getCookie("Language") != null && getCookie("Language") != "") ? getCookie("Language").substring(0, 2) : "vi") + "/translation.json");
        } else {
            return relativeUrl(path + "/assets/locales/" + ((getCookie("Language") != null && getCookie("Language") != "") ? getCookie("Language").substring(0, 2) : "vi") + "/translation.json");
        }
    });

    try {
        const ajaxPromises = urlRequests.map(url => $.ajax({ url: url, dataType: "json" }));
        const responses = await Promise.all(ajaxPromises);

        responses.forEach(response => {
            if (response) {
                // Gộp dữ liệu vào biến cục bộ
                localLanguageData = $.extend({}, localLanguageData, response);
            }
        });

        return function (key) {
            return localLanguageData[key] !== undefined ? localLanguageData[key] : key;
        };

    } catch (error) {
        console.error("Lỗi nạp file ngôn ngữ:", error);
        // Nếu lỗi, trả về một hàm rỗng để không làm sập ứng dụng
        return function (key) { return key; };
    }
}

function isBot() {
    const statusDiv = document.getElementById('status');

    let lastTime = null;
    let lastX = null;
    let lastY = null;
    const movementData = [];

    // Hàm phân tích dữ liệu
    function analyzeMovement() {
        if (movementData.length === 0) {
            return;
        }

        // Tính trung bình tốc độ
        const totalSpeed = movementData.reduce((sum, item) => sum + item.speed, 0);
        const avgSpeed = totalSpeed / movementData.length;

        // Kiểm tra tính đều đặn của tốc độ
        const isUniform = movementData.every(item => Math.abs(item.speed - avgSpeed) < 0.01);

        // Nếu tốc độ quá đều đặn, có thể là bot
        if (isUniform && avgSpeed > 0.5 && avgSpeed < 2.0) {
            return 'bot';
        } else {
            return 'no-bot';
        }
    }

    document.addEventListener('mousemove', function (e) {
        const currentTime = Date.now();

        if (lastTime !== null) {
            const deltaTime = (currentTime - lastTime) / 1000; // giây
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = distance / deltaTime; // px/giây

            // Lưu dữ liệu
            movementData.push({ speed, deltaX, deltaY, deltaTime });
            if (movementData.length > 50) {
                movementData.shift(); // giữ dữ liệu tối đa 50 phần tử
            }

            // Phân tích dữ liệu mỗi lần 50 mẫu
            if (movementData.length === 50) {
                if (analyzeMovement() == "bot")
                    return true;
                else return false;
            }
        }

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = currentTime;
    });
}
if (isBot()) {
    alert("Có thể là bot!");
    window.location.href = "index.html";
}