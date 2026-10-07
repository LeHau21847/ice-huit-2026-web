$(function () {
    var $id = ".accordion-menu > ul";
    // Xây dựng css class cho danh mục.
    $($id + " > li > a").addClass("nav-link");
    $($id + " > li > ul").addClass("dropdown-menu");
    $($id + " ul.dropdown-menu li a").addClass("dropdown-item");
    // Thêm dấu mũi tên phải.
    $($id + " > li > ul .dropdown").children("ul").parent("li.dropdown").children("a").append("<i class='fa fa-chevron-right'></i>");
});
document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('.accordion-menu li a');    
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(link => {
                link.classList.remove('nav-link');
            });
            this.classList.add('active');
        });
    });
});