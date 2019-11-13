'use strict';
export default function getPBEId(value) {
    /* value is in the form of below, returing res[6] which contains the id.
    /services/data/v42.0/sobjects/PricebookEntry/01uB0000000nn98IAA
    */
    var res = value.split("/");
    return res[6];
}

