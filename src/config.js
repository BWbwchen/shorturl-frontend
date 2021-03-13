var myjwt = "";

export function resetJWT() {
    myjwt = "";
}
export function setJWT(newJWT) {
    myjwt = newJWT;
}
export function getJWT() {
    return myjwt;
}