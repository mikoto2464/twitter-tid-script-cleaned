let _2DArray;
function encode(n) {
  return btoa(Array.from(n)["map"](n => String["fromCharCode"](n))["join"](""))["replace"](/=/g, "")
}
function getKey() {
  // <meta name="twitter-site-verification" content="mentUHYU4+1yPz30fM6/IcNS+stghA1baFhBkGzE7075BPd15lUcDqC/RaF4jR+b"/>
  return n = document.querySelectorAll("[name^=tw]")[0].getAttribute("content"), new Uint8Array(atob(n)["split"]("")["map"](n => n["charCodeAt"](0)))
}
function get2DArray(name, KEY) {
  // loading-x-anim-0, loading-x-anim-1, etc. to 3
  return _2DArray = _2DArray || getElements(document.querySelectorAll(name))[KEY[5] % 4]["childNodes"][0]["childNodes"][1].getAttribute("d")["substring"](9)["split"]("C")["map"](n => n["replace"](/[^\d]+/g, " ")["trim"]()["split"](" ")["map"](Number))
}
function toHex(n) {
  return (n < 16 ? "0" : "") + n["toString"](16)
}
function getElements(n) {
  return Array.from(n)["map"](n => {
    var W;
    return null != (W = n["parentElement"]) && W["removeChild"](n), n;
  })
}
function createDiv() {
  const n = document["createElement"]("div");
  return document["body"]["append"](n), [n, () => getElements([n])];
}
function doAnimation(newDiv, numArr, frameTime) {
  if (!newDiv["animate"]) return;
  const r = newDiv["animate"]({
    color: ["#" + toHex(numArr[0]) + toHex(numArr[1]) + toHex(numArr[2]), "#" + toHex(numArr[3]) + toHex(numArr[4]) + toHex(numArr[5])],
    transform: ["rotate(0deg)", "rotate(" + _r(numArr[6], 60, 360, !0) + "deg)"],
    easing: "cubic-bezier(" + Array.from(numArr["slice"](7))["map"]((n, W) => _r(n, W % 2 ? -1 : 0, 1))["join"]() + ")"
  }, 4096);
  r["pause"]()
  r["currentTime"] = Math.round(frameTime / 10) * 10;
}
const XOR = (n, W, t) => W ? n ^ t[0] : n,
  _r = (n, W, t, r) => {
    const o = n * (t - W) / 255 + W;
    return r ? Math.floor(o) : o["toFixed"](2);
  }
let animationStr;
const setAnimationStr = KEY => {
    const [index, frameTime] = [KEY[2] % 16, KEY[12] % 16 * (KEY[14] % 16) * (KEY[7] % 16)],
    arr = get2DArray(".r-32hy0", KEY);
    const [newDiv, deleteDiv] = createDiv();
    doAnimation(newDiv, arr[index], frameTime);
    const style = getComputedStyle(newDiv);
    animationStr = Array.from(("" + style["color"] + style["transform"])["matchAll"](/([\d.-]+)/g))["map"](n => Number(Number(n[0])["toFixed"](2))["toString"](16))["join"]("")["replace"](/[.-]/g, "")
    deleteDiv();
};
function getTextEncoder(text) {
  return typeof text == "string" ? new TextEncoder()["encode"](text) : text
}
function sha256(textEncoder) {
  return crypto.subtle["digest"]("sha-256", textEncoder)
}
return async (path, method) => {
  const time = Math.floor((Date["now"]() - 1682924400 * 1e3) / 1e3),
    timeBuffer = new Uint8Array(new Uint32Array([time])["buffer"]),
    KEY = getKey()
    if(!animationStr) {
      setAnimationStr(KEY)
    }
    let XOR_BYTE = [Math.random() * 256]
    let sha256Hash = await sha256(getTextEncoder([method, path, time]["join"]("!") + "bird" + animationStr))
    let shaBytes = Array.from(new Uint8Array(sha256Hash))
  return encode(new Uint8Array(XOR_BYTE["concat"](Array.from(KEY), Array.from(timeBuffer), shaBytes.slice(0, 16), [1]))["map"](XOR));
};