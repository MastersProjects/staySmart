export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    /* Haversine: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    formula:
    c = 2 ⋅ atan2( √a, √(1−a) )
    d = R ⋅ c
    where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
    note that angles need to be in radians to pass to trig functions! */

    const R = 6371; // Radius of the earth in km
    const distanceLat = deg2rad(lat2 - lat1);  // deg2rad
    const distanceLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(distanceLon / 2) * Math.sin(distanceLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in km
    return R * c;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}