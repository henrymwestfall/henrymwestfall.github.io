var allianceRed = true
var playingDefense = false

var hasPiece = false
var hasCone = false
var inLoadingZone = false
var inCommunity = false

var anyStopwatchActive = false
var stopwatchStartTime = 0
var stopwatchID

var scoringModeOn = false
var placements = []

// buttons
var coneAndHigh
var cubeAndMiddle
var scoreAndBottom
var loadingZone
var community

function toggleAlliance() {
    allianceRed = !allianceRed
    if (allianceRed) {
        document.getElementById("alliance").style.backgroundColor = "red"
    } else {
        document.getElementById("alliance").style.backgroundColor = "blue"
    }
}

function coneAndHighClick() {
    if (scoringModeOn) {
        hasPiece = false
        if (hasCone) placements.push("high cone")
        else placements.push("high cube")
        setToLoading()
    } else {
        if (hasPiece) {
            if (!hasCone) {
                cubeAndMiddle.style.backgroundColor = "lightgray"
                coneAndHigh.style.backgroundColor = "yellow"
                hasCone = true
            } else { // dropped a cone
                coneAndHigh.style.backgroundColor = "lightgray"
                hasPiece = false
            }
        } else {
            cubeAndMiddle.style.backgroundColor = "lightgray"
            coneAndHigh.style.backgroundColor = "yellow"
            hasPiece = true
            hasCone = true
        }
    }

    scoreAndBottom.disabled = !hasPiece
}

function cubeAndMiddleClick() {
    if (scoringModeOn) {
        hasPiece = false
        if (hasCone) placements.push("mid cone")
        else placements.push("mid cube")
        setToLoading()
    } else {
        if (hasPiece) {
            if (hasCone) {
                coneAndHigh.style.backgroundColor = "lightgray"
                cubeAndMiddle.style.backgroundColor = "mediumorchid"
                hasCone = false
            } else { // dropped a cone
                cubeAndMiddle.style.backgroundColor = "lightgray"
                hasPiece = false
            }
        } else {
            coneAndHigh.style.backgroundColor = "lightgray"
            cubeAndMiddle.style.backgroundColor = "mediumorchid"
            hasPiece = true
            hasCone = false
        }
    }

    scoreAndBottom.disabled = !hasPiece
}

function scoreAndBottomClick() {
    if (scoringModeOn) {
        hasPiece = false
        if (hasCone) placements.push("bottom cone")
        else placements.push("bottom cube")
        setToLoading()
    } else if (hasPiece) {
        setToScoring()
    }
}

function startStopwatch() {
    const d = new Date()
    stopwatchStartTime = d.getTime()

    if (!anyStopwatchActive) {
        stopwatchID = setInterval(stopwatchInterval, 50)
    }

    anyStopwatchActive = true
}

function stopStopwatch() {
    const d = new Date()
    let time = d.getTime() - stopwatchStartTime

    anyStopwatchActive = false
    clearInterval(stopwatchID)
}

function stopwatchInterval() {
    const d = new Date()
    let time = (d.getTime() - stopwatchStartTime) / 1000
    document.getElementById("stopwatch").innerHTML = Math.floor(time * 100) / 100
}

function loadingZoneClick() {
    if (inLoadingZone) { // clicked to exit
        loadingZone.innerHTML = "Enter Loading Zone"
        community.disabled = false
        inLoadingZone = false
        stopStopwatch()
    } else { // clicked to exit
        loadingZone.innerHTML = "Exit Loading Zone"
        community.disabled = true
        inLoadingZone = true
        startStopwatch()
    }
}

function communityClick() {
    if (inCommunity) { // clicked to exit
        community.innerHTML = "Enter Community"
        loadingZone.disabled = false
        inCommunity = false
        stopStopwatch()
    } else { // clicked to exit
        community.innerHTML = "Exit Community"
        loadingZone.disabled = true
        inCommunity = true
        startStopwatch()
    }
}

function setToLoading() {
    scoringModeOn = false
    coneAndHigh.innerHTML = "Cone"
    cubeAndMiddle.innerHTML = "Cube"
    scoreAndBottom.innerHTML = "SCORE"
}

function setToScoring() {
    scoringModeOn = true
    coneAndHigh.innerHTML = "High"
    cubeAndMiddle.innerHTML = "Middle"
    scoreAndBottom.innerHTML = "Bottom"
    
    coneAndHigh.style.backgroundColor = "lightgray"
    cubeAndMiddle.style.backgroundColor = "lightgray"
}

window.onload = () => {
    coneAndHigh = document.getElementById("coneAndHigh")
    cubeAndMiddle = document.getElementById("cubeAndMiddle")
    scoreAndBottom = document.getElementById("scoreAndBottom")
    loadingZone = document.getElementById("loadingStopwatch")
    community = document.getElementById("placementStopwatch")
}
