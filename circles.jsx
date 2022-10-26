main();
function main() {
    // prerequisite
    if (documents.length < 1) return;

    var paths = [];
    getPathItemsInSelection(2, paths);

    // processing for each path
    for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        var pps = p.pathPoints;

        // exclusion diagnosis
        var p3_idx = pps.length == 3 ? 0 : 3;
        if (
            arrEq(pps[0].anchor, pps[1].anchor) ||
            arrEq(pps[1].anchor, pps[2].anchor) ||
            arrEq(pps[2].anchor, pps[p3_idx].anchor)
        )
            continue;

        // calculation
        var t1 = getRad(pps[1].anchor, pps[0].anchor);
        var t2 = getRad(pps[1].anchor, pps[2].anchor);
        var t3 = t2 + Math.PI;
        var t4 = getRad(pps[2].anchor, pps[p3_idx].anchor);

        var line1 = getAngleLine(pps[1].anchor, (t1 + t2) / 2);
        var line2 = getAngleLine(pps[2].anchor, (t3 + t4) / 2);

        var o = getIntersection(line1, line2);
        var r = distPntLine(o, defline2(pps[0].anchor, pps[1].anchor));

        // drawing
        p.layer.pathItems.ellipse(o[1] + r, o[0] - r, r * 2, r * 2);
    }
}

// ------------------------------------------------
// return true if the contents of arr1 and arr2 is equal
// (the lengthes must be same)
function arrEq(arr1, arr2) {
    // array, array
    for (var i = 0; i < arr1.length; i++) if (arr1[i] != arr2[i]) return false;
    return true;
}
// ----------------------------------------------
// return the angle in radian
// of the line drawn from p1 to p2
function getRad(p1, p2) {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}
// ----------------------------------------------
// return [a, b, c] of ax+by+c=0
function defline(p1, p2) {
    // p1[x, y], p2[x, y]
    var a = p1[1] - p2[1];
    var b = p1[0] - p2[0];
    return [a, -b, b * p1[1] - a * p1[0]];
}
// -----------------------------------------------
// a^2+b^2=1
function defline2(p1, p2) {
    if (p1[0] == p2[0]) return [1, 0, -p1[0]];
    if (p1[1] == p2[1]) return [0, 1, -p1[1]];
    var a = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    var d = Math.sqrt(a * a + 1);
    return [a / d, -1 / d, (p1[1] - a * p1[0]) / d];
}

function distPntLine(pnt, k) {
    return k[0] * pnt[0] + k[1] * pnt[1] + k[2];
}

function getIntersection(p, q) {
    var d = p[0] * q[1] - p[1] * q[0];
    if (d == 0) return [];
    return [(q[2] * p[1] - p[2] * q[1]) / d, (p[2] * q[0] - q[2] * p[0]) / d];
}
// -----------------------------------------------
function getAngleLine(p1, t) {
    var p2 = [Math.cos(t) + p1[0], Math.sin(t) + p1[1]];
    return defline(p1, p2);
}

function getPathItemsInSelection(n, paths) {
    if (documents.length < 1) return;

    var s = activeDocument.selection;

    if (!(s instanceof Array) || s.length < 1) return;

    extractPaths(s, n, paths);
}

function extractPaths(s, pp_length_limit, paths) {
    for (var i = 0; i < s.length; i++) {
        if (s[i].locked || s[i].hidden) {
            continue;
        } else if (s[i].typename == "PathItem") {
            if (pp_length_limit && s[i].pathPoints.length <= pp_length_limit) {
                continue;
            }
            paths.push(s[i]);
        } else if (s[i].typename == "GroupItem") {
            // search for PathItems in GroupItem, recursively
            extractPaths(s[i].pageItems, pp_length_limit, paths);
        } else if (s[i].typename == "CompoundPathItem") {
            // searches for pathitems in CompoundPathItem, recursively
            // ( ### Grouped PathItems in CompoundPathItem are ignored ### )
            extractPaths(s[i].pathItems, pp_length_limit, paths);
        }
    }
}
