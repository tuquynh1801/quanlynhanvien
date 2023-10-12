$(document).ready(function () {
    var employees = []; 

    // Hiển thị danh sách nhân viên
    function renderEmployeeList() {
        var table = $("#tableDanhSach");
        table.empty();

        employees.forEach(function (employee, index) {
            var row = $("<tr>");
            row.append($("<td>").text(employee.taiKhoan));
            row.append($("<td>").text(employee.hoTen));
            row.append($("<td>").text(employee.email));
            row.append($("<td>").text(employee.ngayLam));
            row.append($("<td>").text(employee.chucVu));
            row.append($("<td>").text(employee.tongLuong));
            row.append($("<td>").text(employee.loaiNhanVien));
            var actions = $("<td>");
            actions.append($("<button>").text("Xóa").click(function () {
                deleteEmployee(index);
            }));
            actions.append($("<button>").text("Cập nhật").click(function () {
                openUpdateModal(index);
            }));
            row.append(actions);
            table.append(row);
        });
    }

    // Thêm nhân viên mới
    function addEmployee(employee) {
        employees.push(employee);
        renderEmployeeList();
    }

    // Xóa nhân viên
    function deleteEmployee(index) {
        employees.splice(index, 1);
        renderEmployeeList();
    }

    // Hiển thị modal cập nhật nhân viên
    function openUpdateModal(index) {
        var employee = employees[index];
        $("#tknv").val(employee.taiKhoan);
        $("#name").val(employee.hoTen);
        $("#email").val(employee.email);
        $("#password").val(employee.matKhau);
        $("#datepicker").val(employee.ngayLam);
        $("#luongCB").val(employee.luongCB);
        $("#chucvu").val(employee.chucVu);
        $("#gioLam").val(employee.gioLam);
        $("#btnCapNhat").off("click").on("click", function () {
            updateEmployee(index);
        });

        $("#myModal").modal("show");
    }

    // Cập nhật thông tin nhân viên
    function updateEmployee(index) {
        var employee = employees[index];
        employee.taiKhoan = $("#tknv").val();
        employee.hoTen = $("#name").val();
        employee.email = $("#email").val();
        employee.matKhau = $("#password").val();
        employee.ngayLam = $("#datepicker").val();
        employee.luongCB = parseInt($("#luongCB").val());
        employee.chucVu = $("#chucvu option:selected").text();
        employee.gioLam = parseInt($("#gioLam").val());

        // Tính toán tổng lương và xếp loại
        calculateSalaryAndRating(employee);
        $("#myModal").modal("hide");
        renderEmployeeList();
    }

    // Tính toán tổng lương và xếp loại cho nhân viên
    function calculateSalaryAndRating(employee) {
        if (employee.chucVu === "Sếp") {
            employee.tongLuong = employee.luongCB * 3;
        } else if (employee.chucVu === "Trưởng phòng") {
            employee.tongLuong = employee.luongCB * 2;
        } else {
            employee.tongLuong = employee.luongCB;
        }

        if (employee.gioLam >= 192) {
            employee.loaiNhanVien = "Xuất sắc";
        } else if (employee.gioLam >= 176) {
            employee.loaiNhanVien = "Giỏi";
        } else if (employee.gioLam >= 160) {
            employee.loaiNhanVien = "Khá";
        } else {
            employee.loaiNhanVien = "Trung bình";
        }
    }

    // Sự kiện thêm nhân viên
    $("#btnThemNV").click(function () {
        var taiKhoan = $("#tknv").val();
        var hoTen = $("#name").val();
        var email = $("#email").val();
        var matKhau = $("#password").val();
        var ngayLam = $("#datepicker").val();
        var luongCB = parseInt($("#luongCB").val());
        var chucVu = $("#chucvu option:selected").text();
        var gioLam = parseInt($("#gioLam").val());

        // Validation
        if (validateForm(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam)) {
            var newEmployee = {
                taiKhoan: taiKhoan,
                hoTen: hoTen,
                email: email,
                matKhau: matKhau,
                ngayLam: ngayLam,
                luongCB: luongCB,
                chucVu: chucVu,
                gioLam: gioLam,
                tongLuong: 0,
                loaiNhanVien: "Trung bình"
            };

            calculateSalaryAndRating(newEmployee);

            addEmployee(newEmployee);
            $("#myModal").modal("hide");
        }
    });

    // Validation
    function validateForm(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
        // Viết mã kiểm tra theo yêu cầu

        return true;
    }

    // Tìm nhân viên theo loại
    $("#btnTimNV").click(function () {
        var loaiNhanVien = $("#searchName").val();
        var result = employees.filter(function (employee) {
            return employee.loaiNhanVien === loaiNhanVien;
        });

        renderEmployeeList(result);
    });
});
