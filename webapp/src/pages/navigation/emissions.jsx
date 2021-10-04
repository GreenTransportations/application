
const getEmissions = (v, distance) => {
    /*
    Find the emissions of a vehicle based on travelled distance, GVM and GCM,
    and the time taken.

    param: v: [(Object)] : This is a Js Object that maps to the Vehicle model
    param: distance: Number : This is a number that is Kilometres travelled
    return: Number: metric tonnes of CO2 emitted for this trip
    */

    const KMILES = (km) => km/1.609; // Km to Miles Conversion rate (Division)
    const KPOUNDS = (kg) => kg*2.205; // Kg to Pounds conversion (Multiplication)
    const truck_ef = 161.8; // grams per short ton-mile. See lookup table of Emissions Factors
    const SHORTTON = 2000; // Pounds
    const single_v = v.length ? v[0]: null;

    // Find short-tons for the trip based on GCM (kilograms)
    // total emissions (metric tonnes) = (Distance * Weight * EF)/1,000,000;
    if (single_v){
        const checkResult = ((KPOUNDS(single_v.gcm)/SHORTTON)*KMILES(distance)*truck_ef)/1000000;
        return checkResult;
    }
    else{
        throw new Error('Vehicle not supplied to emissions calculator.');
    }
    
}

export default getEmissions;