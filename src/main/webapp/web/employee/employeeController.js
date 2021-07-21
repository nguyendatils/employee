

webapp.controller('employeeController', function ($scope,$http,$timeout){


    $scope.deleteEmployee = function (id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:8082/api/employee/' + id,
        })
        $("div.k-window-actions > a.k-window-action > span.k-i-close").click();
        // $("#grid").data("kendoGrid").dataSource.refresh();

        // doSearchGrid(grid, { pageSize: grid.dataSource.pageSize()});

        $timeout(reload,100)
    }
    reload = function (){
        var grid = $("#grid").data("kendoGrid");
        grid.dataSource.read();
    }
    $scope.editEmployee = function (id, employee){
        $http({
            method: 'PUT',
            url: 'http://localhost:8082/api/employee/' + id,
            data: {
                name: employee.name,
                phone_number: employee.phone_number,
                email: employee.email,
            }
        });
        $scope.editPopup.close();
        $timeout(reload,100)
    };

    var searchForm = {}
    var record = 0
    $scope.listEmployee = {
        editable: false,
        selectable: true,
        sortable: true,
        dataBinding: function (){
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        pageable: {
            pageSizes: [5,10,15,20],
            refresh: false,
            messages: {
                display: "{0} - {1} của {2} kết quả",
                itemsPerPage: "ddd kết quả / trang",
            }
        },

        toolbar:[
            {
                name: 'actions',
                template:
                    '    <div kendo-window="addPopup"\n' +
                    '         k-modal="true"\n' +
                    '         k-title="\'Add employee\'"\n' +
                    '         k-width="400"\n' +
                    '         k-resizable="true"\n' +
                    '         k-height="350"\n' +
                    '         k-visible="false">\n' +
                    '\n' +
                    '        <div ng-controller="addPopup">\n' +
                    '            <form class="col-md-10" ng-submit="saveEmployee(employee)">\n' +
                    '                <div class="form-group">\n' +
                    '                    <label for="employeeName">Employee Name</label> <input type="text"\n' +
                    '                                                                           ng-model="employee.name" class="form-control"\n' +
                    '                                                                           id="employeeName"\n' +
                    '                                                                           placeholder="Employee Name" required>\n' +
                    '                </div>\n' +
                    '                <div class="form-group">\n' +
                    '                    <label for="employeePhone">Phone number</label> <input type="text"\n' +
                    '                                                                           ng-model="employee.phone_number"\n' +
                    '                                                                           class="form-control"\n' +
                    '                                                                           id="employeePhone" placeholder="Phone number" required>\n' +
                    '                </div>\n' +
                    '\n' +
                    '                <div class="form-group">\n' +
                    '                    <label for="employeeEmail">Email</label> <input type="email"\n' +
                    '                                                                    ng-model="employee.email" class="form-control"\n' +
                    '                                                                    id="employeeEmail" placeholder="Email" required>\n' +
                    '                </div>\n' +
                    '\n' +
                    '                <button type="submit" class="btn btn-default">Submit</button>\n' +
                    '                <button type="reset" class="btn btn-default" ng-click="addPopup.close()">Cancel</button>\n'+
                    '\n' +
                    '            </form>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <button class="btn btn-primary" ng-click="addPopup.open().center()">Add employee</button>\n' +
                    '</div>'


            }
        ],
        dataSource: {
            transport: {
                read: {
                    url: 'api/employee/get',
                    type: 'GET',
                },
                // parameterMap: function(data, type) {
                //     if (type == "read") {
                //         // send take as "$top" and skip as "$skip"
                //         return {
                //             $top: data.take,
                //             $skip: data.skip
                //         }
                //     }
                // }
            },

            pageSize: 10,
        },

        filterable: {
            mode: 'row',
        },
        autoBind: true,
        columns: [
            {
                field: 'id',
                title: 'ID',
                headerAttributes: {style: 'font-weight:bold'},
                width: '40px',
                filterable: false,
                template: function (){
                    return ++record;
                }
            },
            {
                field: 'name',
                title: 'Name',
                headerAttributes: {style: 'font-weight:bold'},
                width: '33%',
            },
            {
                field: 'phone_number',
                title: 'Phone number',
                headerAttributes: {style: 'font-weight:bold'},
                width: '33%',
            },
            {
                field: 'email',
                title: 'Email',
                headerAttributes: {style: 'font-weight:bold'},
                width: '33%',
            },
            {
                field: 'action',
                title: 'Actions',
                headerAttributes: {style: "font-weight:bold"},
                attributes: {
                    style: "text-align:center;"
                },
                filterable: false,
                width: '120px',
                template: function (){
                    return (
                        '    <div kendo-window="confirmDelete"\n' +
                        '         k-modal="true"\n' +
                        '         k-title="\'Confirm delete employee\'"\n' +
                        '         k-width="300"\n' +
                        '         k-resizable="true"\n' +
                        '         k-height="200"\n' +
                        '         k-visible="false">\n' +
                        '    \n' +
                        '        <div>\n' +
                        '            <p>Xác nhận xóa</p>\n' +
                        '        </div>\n' +
                        '        <div>\n' +
                        '            <button type="button" class="btn btn-default" ng-click="deleteEmployee(dataItem.id)">Delete</button>\n' +
                        '            <button type="button" class="btn btn-default" ng-click="confirmDelete.close()">Cancel</button>\n' +
                        '        </div>\n' +
                        '    </div>'+
                        '    <div kendo-window="editPopup"\n' +
                        '         k-modal="true"\n' +
                        '         k-title="\'Edit employee\'"\n' +
                        '         k-width="400"\n' +
                        '         k-resizable="true"\n' +
                        '         k-height="350"\n' +
                        '         k-visible="false">\n' +
                        '    \n' +
                        '        <div>\n' +
                        '            <form class="col-md-10" ng-submit="editEmployee(dataItem.id, dataItem)">\n' +
                        '                <div class="form-group">\n' +
                        '                    <label>Employee Name</label> <input type="text"\n' +
                        '                                                        value="{{dataItem.name}}" class="form-control"\n' +
                        '                                                        ng-model="dataItem.name" ng-model-options="{updateOn:\'kepress\'}" \n' +
                        '                                                        placeholder="Employee Name" required>\n' +
                        '                </div>\n' +
                        '                <div class="form-group">\n' +
                        '                    <label>Phone number</label> <input type="text"\n' +
                        '                                                       value="{{dataItem.phone_number}}"\n' +
                        '                                                       class="form-control" ng-model="dataItem.phone_number" ng-model-options="{updateOn:\'kepress\'}"\n' +
                        '                                                       placeholder="Phone number" required>\n' +
                        '                </div>\n' +
                        '    \n' +
                        '                <div class="form-group">\n' +
                        '                    <label>Email</label> <input type="email"\n' +
                        '                                                value="{{dataItem.email}}" class="form-control" ng-model-options="{updateOn:\'kepress\'}"\n' +
                        '                                                ng-model="dataItem.email" placeholder="Email" required>\n' +
                        '                </div>\n' +
                        '    \n' +
                        '                <button type="submit" class="btn btn-default">Submit</button>\n' +
                        '                <button type="reset" class="btn btn-default" ng-click="editPopup.close()">Cancel</button>\n' +
                        '    \n' +
                        '            </form>\n' +
                        '        </div>\n' +
                        '    </div>'+
                        '    <button type="button" class="btn btn-default"\n' +
                        '                ng-click="editPopup.open().center()">\n' +
                        '            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>\n' +
                        '    </button>\n' +
                        '    <button class="btn btn-default"\n' +
                        '                ng-click="confirmDelete.open().center()">\n' +
                        '            <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>\n' +
                        '    </button>\n' +
                        '</div>'
                    )
                }
            }
        ],
    }
})

webapp.controller('addPopup', function ($scope, $http, $timeout){
    $scope.saveEmployee = function (employee) {
        $http({
            method: 'POST',
            url: 'http://localhost:8082/api/employee',
            data: {
                name: employee.name,
                phone_number: employee.phone_number,
                email: employee.email,
            }
        });
        $scope.addPopup.close();
        window.alert("Add employee:" + employee.name);
        $timeout(reload,100);
    };

    reload = function (){
        var grid = $("#grid").data("kendoGrid");
        grid.dataSource.read();
    }
})
