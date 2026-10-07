$(function () {
    "use strict";
    $.validator.addMethod("checkExpressionEmail", function (value, element) { return ICE.ConferenceArticle.Validation.checkExpressionEmail(value, element) }, translateLanguage("PleaseEnterEmail") + "!");
    $.validator.addMethod("checkExpressionPhone", function (value, element) { return ICE.ConferenceArticle.Validation.checkExpressionPhone(value, element) }, translateLanguage("PleaseEnterPhoneNumber") + "!");
    $.validator.addMethod("checkExpressionFileDocument", function (value, element) { return ICE.ConferenceArticle.Validation.checkExpressionFileDocument(value, element) }, translateLanguage("FileIsNotInCorrectFormat") + "!");
    $.validator.addMethod("checkFileSize", function (value, element) { return ICE.ConferenceArticle.Validation.checkFileSize(value, element) }, translateLanguage("FileSizeMustBe") + " =< 100 MB!");

    tinymce.init({
        selector: "[name='submission_summaryArticleText']",
        height: 300,
        setup: function (editor) {
            // Lưu nội dung.
            editor.on("change", function (e) {
                editor.save();
            }),
                editor.on("keydown", function (e) {
                    // Phím Tab.
                    if (e.keyCode === 9) {
                        // Prevent the default behavior of the Tab key
                        e.preventDefault();

                        // Thêm nội dung vào khung soạn thảo.
                        editor.execCommand('mceInsertContent', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    }
                })
        },
        menubar: false,
        toolbar: "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview | template link anchor codesample | ltr rtl",
        verify_html: true,
    });

    // Xác thực.
    $("#submission_frmRegistry").validate({
        ignore: ":hidden:not(textarea)",// Không bỏ qua textarea.
        errorClass: "has-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element.is("textarea")) {
                error.insertAfter(element);
            } else if (element.prop("type") == "checkbox") {
                element.parent().append(error);
            } else if (element.parent().hasClass("input-group")) {
                element.parent().parent().append(error);
            } else {
                element.parent().append(error);
            }
        },
        rules: {
            submission_title: { required: true },
            submission_joinerName: { required: true },
            submission_joinerDateOfBirth: { required: true },
            submission_joinerPhone: { required: true, checkExpressionPhone: true },
            submission_joinerEmail: { required: true, checkExpressionEmail: true },
            submission_summaryArticleText: { required: true },
            submission_summaryArticle: { required: true, maxlength: 200 },
            submission_fileSummaryArticle: { checkFileSize: true, checkExpressionFileDocument: true, maxlength: 200 },
            submission_fullArticle: { maxlength: 200 },
            submission_fileFullArticle: { checkFileSize: true, checkExpressionFileDocument: true, maxlength: 200 }
        },
        messages: {
            submission_title: { required: translateLanguage("ThisFieldIsRequired") + "!" },
            submission_joinerName: { required: translateLanguage("ThisFieldIsRequired") + "!" },
            submission_joinerPhone: { required: translateLanguage("ThisFieldIsRequired") + "!", checkExpressionPhone: translateLanguage("PleaseEnterPhoneNumber") + "!" },
            submission_joinerEmail: { required: translateLanguage("ThisFieldIsRequired") + "!", checkExpressionEmail: translateLanguage("PleaseChooseAnotherEmail") + "!" },
            submission_summaryArticleText: { required: translateLanguage("ThisFieldIsRequired") + "!" },
            submission_summaryArticle: {
                required: translateLanguage("ThisFieldIsRequired") + "!",
                maxlength: translateLanguage("FileNameIsTooLong") + "!" + translateLanguage("FileNameAllowsUpTo") + " 200 " + translateLanguage("Characters").toLowerCase() + "."
            },
            submission_fileSummaryArticle: {
                checkFileSize: translateLanguage("FileSizeMustBe") + " =< 100 MB!",
                checkExpressionFileDocument: translateLanguage("FileIsNotInCorrectFormat") + "!",
                maxlength: translateLanguage("FileNameIsTooLong") + "!" + translateLanguage("FileNameAllowsUpTo") + " 200 " + translateLanguage("Characters").toLowerCase() + "."
            },
            submission_fullArticle: {
                maxlength: translateLanguage("FileNameIsTooLong") + "!" + translateLanguage("FileNameAllowsUpTo") + " 200 " + translateLanguage("Characters").toLowerCase() + "."
            },
            submission_fileFullArticle: {
                checkFileSize: translateLanguage("FileSizeMustBe") + " =< 100 MB!",
                checkExpressionFileDocument: translateLanguage("FileIsNotInCorrectFormat") + "!",
                maxlength: translateLanguage("FileNameIsTooLong") + "!" + translateLanguage("FileNameAllowsUpTo") + " 200 " + translateLanguage("Characters").toLowerCase() + "."
            },
        }
    });

    // Click thêm người tham gia.
    $("#submission_btnAddJoiner").click(function (e) {
        $(".js-joiners-message").html("");
        $(".js-load-joiners").append(renderJoinerInfo(new Date().getTime()));
    });

    $("#submission_fileSummaryArticle").change(function (e) {
        $("[name='submission_summaryArticle']").val($(this).val().replace("C:\\fakepath\\", ""));
    });

    $("#submission_fileFullArticle").change(function (e) {
        $("[name='submission_fullArticle']").val($(this).val().replace("C:\\fakepath\\", ""));
    });

    // Change xác nhận cam kết.
    $("#submission_ckbCommit").change(function () {
        if ($("#submission_ckbCommit").is(":checked")) {
            $("#submission_btnRegistry").prop("disabled", false);
        }
        else {
            $("#submission_btnRegistry").prop("disabled", true);
        }
    });

    // Click đăng ký.
    $("#submission_btnRegistry").click(function (e) {
        tinymce.triggerSave();

        if ($(".js-load-joiners").html() == "") {
            $(".js-joiners-message").html(translateLanguage("YouHaveNotAddedMembersYet") + "!");
        }
        if (hasDuplicateRole()) {
            toastr.error(translateLanguage("NoteRole"));
        }
        if ($("#submission_frmRegistry").valid() && $(".js-load-joiners").html() != "" && !hasDuplicateRole()) {
            var frmData = new FormData();
            frmData.append("submission_publishYear", $("[name='submission_publishYear']").val());
            frmData.append("submission_title", $("[name='submission_title']").val());
            frmData.append("submission_division", $("[name='submission_division']").val());
            frmData.append("submission_joiners", getElements(".js-load-joiners"));
            frmData.append("submission_summaryArticleText", encodeURI($("[name='submission_summaryArticleText']").val()));
            frmData.append("submission_summaryArticle", $("[name='submission_summaryArticle']").val());
            frmData.append("submission_fullArticle", $("[name='submission_fullArticle']").val());
            for (var i = 0; i < document.getElementById("submission_fileSummaryArticle").files.length; i++) {
                frmData.append("submission_summaryArticle", document.getElementById("submission_fileSummaryArticle").files[i]);
            }
            for (var i = 0; i < document.getElementById("submission_fileFullArticle").files.length; i++) {
                frmData.append("submission_fullArticle", document.getElementById("submission_fileFullArticle").files[i]);
            }
            ajaxPost({
                url: relativeUrl("com_ice/conferencearticle/ajax_submission"),
                processData: false,
                contentType: false,
                data: frmData,
                beforeSend: function () {
                    $(e.target).append(renderSpinerAjaxStatus("border", "20px", "20px"));
                    $(e.target).prop("disabled", true);
                },
                success: function (response) {
                    if (response.successMessage != "") {
                        $("#submission_frmRegistry").remove();
                        $(".notification").removeClass("visually-hidden");
                    }
                    $.each(response.errorMessage, function (idx, val) {
                        if (val != "") {
                            $(".js-registry-message").html(val);
                        }
                    });
                    
                    $(e.target).children(".spinner-border").remove();
                    $(e.target).prop("disabled", false);
                },
                error: function (xhr, status, error) {
                    if (status == "parsererror") {
                        window.location.href = relativeUrl("");
                    }
                    else {
                        toastr.error(error);
                    }
                }
            });
        }
        else {
            toastr.error(translateLanguage("PleaseCheckTheInformationAgain"));
        }
    });

    // Kết xuất thí sinh.
    function renderJoinerInfo(id) {
        var html = `<div class='submission_frmJoiner_${id}'>
        <div class='mb-3'>
            <label class='joiner-order col-form-label fw-bold font-weight-bold'><i class='fas fa-user'></i> ${translateLanguage("Member")}</label>
            <button type='button' class='btn btn-danger float-end' id='submission_btnRemoveJoiner_` + id + `' onclick='$(&quot;.submission_frmJoiner_` + id + `&quot;).remove();'>${translateLanguage("Delete")}</button>
        </div>
        <div class='row mb-3'>
            <div class='col-lg-6'>
                <label class='form-label'>${translateLanguage("Fullname")} <span class='text-danger'>*</span></label>
                <input type='text' name='submission_joinerName' class='form-control' />
            </div>
            <div class='col-lg-6'>
                <label class='form-label'>${translateLanguage("PhoneNumber")} <span class='text-danger'>*</span></label>
                <input type='text' class='form-control' name='submission_joinerPhone' />
            </div>
        </div>
        <div class='row mb-3'>
            <div class='col-lg-6'>
                <label class='form-label'>Email <span class='text-danger'>*</span></label>
                <input type='text' class='form-control' name='submission_joinerEmail' />
            </div>
            <div class='col-lg-6'>
                <label class="form-label">${translateLanguage("Role")} <span class='text-danger'>*</span></label>
                <select class="form-control" name="submission_role">
                    <option value="1">${translateLanguage("FirstAuthor")} + ${translateLanguage("CorrespondingAuthor")}</option>
                    <option value="2">${translateLanguage("FirstAuthor")}</option>
                    <option value="3">${translateLanguage("CorrespondingAuthor")}</option>
                    <option value="4">${translateLanguage("Member")}</option>
                </select>
                <div class="form-text text-danger fw-bold">${translateLanguage("Note")}: ${translateLanguage("NoteRole")}.</div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-lg-12">
                <label class="form-label">${translateLanguage("NameOfUniversity")}/${translateLanguage("Institute")}/${translateLanguage("Faculty")}</label>
                <input type="text" class="form-control" name="submission_joinerSchool" />
            </div>
        </div>
        <hr />
        </div></div>`;
        return html;
    }

    // Đếm phần tử html.
    function countElement(parentElement, childrenElements) {
        return $(parentElement).find(childrenElements).length + 1;
    }

    function getElements(element) {
        var html = ``;
        var frm = $(element).children();
        if (frm.length > 0) {
            html += `[`;
            $.each(frm, function (idx, val) {
                html += `{`;
                var currentRadio = "";
                $.each($(val).find("input, checkbox, select"), function (idx2, val2) {
                    switch ($(val2).attr("type")) {
                        case "checkbox":
                            if ($(val2).is(":checked")) {
                                html += `"` + $(val2).attr("name") + `":"true",`;
                            }
                            else {
                                html += `"` + $(val2).attr("name") + `":"false",`;
                            }
                            break;
                        case "radio":
                            // Lấy giá trị những radio đã check.
                            if ($(val2).is(":checked")) {
                                if ($(val2).is("[key]")) {
                                    html += `"` + $(val2).filter(":checked").attr("key") + `":"` + $(val2).filter(":checked").attr("value") + `",`;
                                }
                                else {
                                    html += `"` + $(val2).filter(":checked").attr("name") + `":"` + $(val2).filter(":checked").attr("value") + `",`;
                                }
                            }

                            break;
                        default:
                            if ($(val2).val().indexOf('"') > 0 || $(val2).val().indexOf("\\") > 0) {
                                html += `"` + $(val2).attr("name") + `":"` + encodeURIComponent($.trim($(val2).val().replace("C:\\fakepath", ""))) + `",`;
                            }
                            else
                                html += `"` + $(val2).attr("name") + `":"` + $.trim($(val2).val()) + `",`;
                            break;
                    }
                });
                html = html.substring(0, html.length - 1);
                html += `},`;
            });
            html = html.substring(0, html.length - 1);
            html += `]`;
        }

        return html;
    }

    // Tìm phần tử trùng lặp trong mảng.
    function findDuplicates(arr) {
        let seen = new Set();
        return arr.filter(item => {
            if (seen.has(item)) {
                return true;
            } else {
                seen.add(item);
                return false;
            }
        });
    }

    // Trùng lặp vai trò.
    function hasDuplicateRole() {
        let duplicate = false;
        let joinerRoles = [];
        $.each($(".js-load-joiners").find("[name='submission_role']"), function (idx, item) {
            if ($(item).val() == 1) {
                joinerRoles.push("2");
                joinerRoles.push("3");
            }
            else if ($(item).val() == 2 || $(item).val() == 3)
                joinerRoles.push($(item).val());
        });
        let duplicateRole = findDuplicates(joinerRoles);
        if (duplicateRole.length > 0)
            duplicate = true;
        return duplicate;
    }
});