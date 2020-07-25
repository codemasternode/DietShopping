function getSpecificationFromXKomPage() {
    const fullSpecification = []
    const specificationList = document.querySelectorAll(".sc-13p5mv-0")
    for (let i = 0; i < specificationList.length; i++) {
        fullSpecification.push({
            parameter: specificationList[i].querySelector("div").querySelector("div").innerText.trim(),
            value: specificationList[i].querySelectorAll("div")[2].querySelector("div").innerText.trim()
        })
    }
    console.log(JSON.stringify(fullSpecification, undefined, 5))
}

function getBulletPoints() {
    const bulletpoints = []
    const list = document.querySelector(".jSFGJL").querySelectorAll("li")
    for (let i = 0; i < list.length; i++) {
        bulletpoints.push({
            parameter: list[i].querySelector("span").innerText.trim().split(":")[0],
            value: list[i].querySelectorAll("span")[1].innerText.trim()
        })
    }
    console.log(JSON.stringify(bulletpoints, undefined, 5))
}