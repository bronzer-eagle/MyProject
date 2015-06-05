myModule.controller("myController", function ($scope, $http, $timeout, $interval, MyFactory, $modal) {
    $http.get('https://demo6732873.mockable.io/Users').success(function (data) {
        MyData = data;
        $scope.Objects = MyFactory.MainFactory(MyData);
        $scope.GetCommits();
        for (var i = 0; i < $scope.Objects.length; i++) {
            $scope.Objects[i].UnitTest = [1, 2];
            $scope.Objects[i].FunctionalTest = [1, 2];
        }
    })  //get main JSON
        .error(function (data, status, headers, config) {
            alert("Sorry we have some troubles... Try another time");
        });

    $scope.labels = ["Errors", 'G-d Res']; // labels for diagrams

    $scope.GetCommits = function () {
        $scope.Objects.forEach(function (currentObject) {
            $http.get(currentObject["Commit"]).success(function (data) {
                currentObject["Commit"] = data;
            })
                .error(function (data, status, headers, config) {
                    alert("Sorry we have some troubles... Try another time");
                });
        })
    }; //get JSON for each row in the table


    $scope.Start = function (i, j) {
        //$scope.Objects[i]["RowColor"][j] = "";
        $scope.Objects[i].State = "Running";
        $scope.Objects[i].TimeSt = new Date();
        $scope.Anim(i, j);

    }; // button start


    $scope.Anim = function (i, j) {
        if (j != 4) {
            if ($scope.Objects[i]["Timer"][j] < 100) {
                $timeout(function () {
                    $scope.Objects[i]["Timer"][j] += 1;
                    $scope.Anim(i, j);
                }, 5);
            }
            else {
                j = j + 1;
                $scope.Anim(i, j);
            }
        }
        else {
            if (i >= $scope.Objects.length) {
                return;
            }
            $scope.Somefunc(i);
            j = 0;
            i = i + 1;
            $scope.Start(i, j);

        }
    }; //animate progress bars

    $scope.Somefunc = function (i) {
        $scope.Objects[i]["State"] = MyFactory.DoTests($scope.Objects[i]["Commit"], $scope.Objects[i]["Type"])[1];
        $scope.Rows(i);
        $scope.getIMGforMetrics(i);
        $scope.Objects[i].UnitTest = [$scope.Objects[i]["Commit"]["UnitTest"]['Errors'], $scope.Objects[i]["Commit"]["UnitTest"]['GoodRes']];
        $scope.Objects[i].FunctionalTest = [$scope.Objects[i]["Commit"]["FunctionalTest"]['Errors'], $scope.Objects[i]["Commit"]["FunctionalTest"]['GoodRes']];
        $scope.Objects[i]["Commit"]["Build"]["Timefin"] = new Date();

    }; //add to the objects some params that are needed to build a table

    $scope.getIMGforMetrics = function (i) {
        $scope.Objects[i]['IMGMETR'] = MyFactory.DoTests($scope.Objects[i]["Commit"], $scope.Objects[i]["Type"])[2];

    }; //add arrows for metrics' block

    $scope.Rows = function (i) {
        if ($scope.Objects[i]["State"] == "Rejected" || $scope.Objects[i]["State"] == "Failed") {
            for (var k = 0; k <= 3; k++) {
                if (MyFactory.DoTests($scope.Objects[i]["Commit"], $scope.Objects[i]["Type"])[0][k] != undefined) {
                    $scope.Objects[i]['RowColor'][k] = MyFactory.DoTests($scope.Objects[i]["Commit"], $scope.Objects[i]["Type"])[0][k];
                }
                else {
                    $scope.Objects[i]['RowColor'][k] = 'success';
                }

            }
        } else {
            for (k = 0; k <= 3; k++) {
                $scope.Objects[i]['RowColor'][k] = "success";
            }
        }
    };  // make different colors of progress bar

    //Clicker - work with clicks on a row

    $scope.Clicker = function (name) {
        if ($scope.Objects[FindNumber(name, $scope.Objects)]["ShowHide"] == false) {
            for (var i = 0; i < $scope.Objects.length; i++) {
                if ($scope.Objects[i]['ShowHide'] == true) {
                    $scope.Objects[i]['ShowHide'] = false;
                }
            }
            objs = $scope.Objects[FindNumber(name, $scope.Objects)];
            if (objs["State"] == "Pending" || objs["State"] == "Running") {
                $scope.Objects[FindNumber(name, $scope.Objects)]["ShowHide"] = false;
            }
            else {
                $scope.Objects[FindNumber(name, $scope.Objects)]["ShowHide"] = true;

            }
        }
        else {
            $scope.Objects[FindNumber(name, $scope.Objects)]["ShowHide"] = false;
        }

    };

    function FindNumber(name, Obj) {
        for (var i = 0; i < Obj.length; i++) {
            if (Obj[i].Name == name) {
                return i;
            }
        }
    } //some functions need the exact number of object, so i find it by name




    $scope.open = function (path, name) {
        $scope.animationsEnabled = true;
        $scope.ModalObj = $scope.Objects[FindNumber(name, $scope.Objects)];
        $scope.Mod = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: path,
            scope: $scope


        });


    }; //open modal window
    $scope.CloseModal = function(){
        $scope.Mod.close (

        )
    }


});
















