export function HMS_converter(seconds) {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " H " : " H ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " M " : " M ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " S" : " S") : "";
    return hDisplay + mDisplay + sDisplay; 
}