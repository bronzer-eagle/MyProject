myModule.factory("MyFactory", function () {
    return {
        MainFactory: function (MyData) {
            for (var i = 0; i < MyData.length; i++) {
                if (MyData[i]['Type'] == "firewall") {
                    MyData[i]['Image'] = "../../IMG/1339100181_wall-1.jpg";
                }
                else {
                    MyData[i]['Image'] = "../../IMG/thumb.jpg";
                }

                MyData[i]["State"] = "Pending";
                MyData[i]["ShowHide"] = false;

                MyData[i]["Timer"] = [0, 0, 0, 0];
                MyData[i]["RowColor"] = ['', '', '', ''];
            }

            return MyData;
        },  //add first parameters before you click on START button

        DoTests: function (MyCommit, type) {
            var objectParam;
            var colorRow = [];
            var retObj = [];
            var MetrParam = [];
            var n = 0;
            for (var key in MyCommit.Metrics) {

                if (MyCommit.Metrics[key] < 50) {
                    if (type == "firewall") {
                        objectParam = "Rejected";
                        colorRow[0] = "danger";
                        MetrParam[n] = "../../IMG/uplevel_no_text_3748.png"
                    }
                    else {
                        objectParam = "Failed";
                        colorRow[0] = "danger";
                        MetrParam[n] = "../../IMG/uplevel_no_text_3748.png"
                    }
                } else {
                    MetrParam[n] = "../../IMG/arrowright_8999.png"

                }
                n++;
            }

            for (key in MyCommit.Build) {

                if (MyCommit.Build[key] == false) {
                    if (type == "firewall") {
                        objectParam = "Rejected";
                        colorRow[1] = "danger"
                    }
                    else {
                        objectParam = "Failed";
                        colorRow[1] = "danger"
                    }
                }

            }
            if (MyCommit.UnitTest["Errors"] > 15) {
                if (type == "firewall") {
                    objectParam = "Rejected";
                    colorRow[2] = "danger"
                }
                else {
                    objectParam = "Failed";
                    colorRow[2] = "danger"
                }

            }

            if (MyCommit.FunctionalTest["Errors"] > 2500) {
                if (type == "firewall") {
                    objectParam = "Rejected";
                    colorRow[3] = "danger"
                }
                else {
                    objectParam = "Failed";
                    colorRow[3] = "danger"
                }

            }
            if (objectParam == undefined) {
                if (type == "firewall") {
                    objectParam = "Accepted";
                    colorRow = [];
                }
                else {
                    objectParam = "Complete";
                    colorRow = [];
                }
            }
            retObj = [colorRow, objectParam, MetrParam];
            return retObj;
        } //check out all tests in JSONs
    }
});