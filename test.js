const checkboxTest = document.getElementsByName("level");
console.log(checkboxTest);

const levels = [];

for (let i = 0; i < checkboxTest.length; i++) {
    checkboxTest[i].addEventListener("change", function () {
        const index = levels.indexOf(checkboxTest[i].id);
        if (checkboxTest[i].checked) {
            levels.push(checkboxTest[i].id);
        }
        if (!checkboxTest[i].checked) {
            levels.splice(index, 1);
        }
        console.log(levels);
    });
    if (levels.length <= 0) {
        console.log("no filter");
    } else {
        console.log("filter is" + levels);
    }
}
