export const HMS_converter = (seconds) => {
    // Convert seconds (Number) to an Hours Minutes (String)
    const HMS = [seconds]
        .map(s => ({
            h: Math.floor(s / (60 * 60)),
            next_s: s % (60 * 60)
        }))
        .map(s => ({
            ...s,
            m: Math.floor(s.next_s / 60),
            s: s.next_s % 60
        }))
        .reduce((_, i) => i, {});
    // Get the string
    if (HMS.h > 0){
        return String(HMS.h) + " Hours, " + String(HMS.m) + " Minutes";
    }
    else{
        return String(HMS.m) + " Minutes";
    }
}