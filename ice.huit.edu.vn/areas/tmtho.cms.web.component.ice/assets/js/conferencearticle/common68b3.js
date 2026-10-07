var ICE = ICE || {};
ICE.ConferenceArticle = ICE.ConferenceArticle || {}
ICE.ConferenceArticle.Validation = ICE.ConferenceArticle.Validation || {};

ICE.ConferenceArticle.Validation.checkExpressionEmail = function (value, element) {
    if (value === "") return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
};

ICE.ConferenceArticle.Validation.checkExpressionPhone = function (value, element) {
    return value.match(/^[0-9]{10,13}$/);
};

//ICE.ConferenceArticle.Validation.checkExpressionFileDocument = function (value, element) {
//    if ($(element).val() === "") return true;
//    var fileName = value.split(/(\\|\/)/g).pop(); // Lấy phần tên file
//    return /^[^\\/:*?"<>|]+\.(doc|docx|pdf)$/i.test(fileName);
//};

ICE.ConferenceArticle.Validation.checkExpressionFileDocument = function (value, element) {
    if ($(element).val() === "") return true;

    var fileName = value.split(/(\\|\/)/g).pop();

    // Regex kiểm tra tên file hợp lệ trên Windows
    var regex = /^(?!\s|.*\s$)(?!.*\.$)(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$)[^\\/:*?"<>|\x00-\x1F]+\.(doc|docx|pdf)$/i;

    return regex.test(fileName);
};

ICE.ConferenceArticle.Validation.checkFileSize = function (value, element) {
    if (!element.files || !element.files.length)
        return true;

    const file = element.files[0];

    if (!file.size) return true;

    const fileSize = file.size / 1024 / 1024;

    return fileSize <= 100;
};

ICE.ConferenceArticle.Validation.checkExpressionBirthday = function (value, element) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
};