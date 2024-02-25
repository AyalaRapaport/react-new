const CalculateDistance = () => {
    function getNearbyLocations(singleLocation, multipleLocations) {
        // מערך לאחסון המיקומים הרחוקים עד 15 קילומטר מהמיקום הבודד
        var nearbyLocations = [];
    
        // ללולאה עבור כל מיקום במערך
        for (var i = 0; i < multipleLocations.length; i++) {
            // חשב את המרחק בין המיקום הבודד למיקום הנוכחי בלולאה
            var distance = calculateDistance(singleLocation, multipleLocations[i]);
    
            // אם המרחק פחות מ-15 קילומטרים, הוסף את המיקום למערך nearbyLocations
            if (distance <= 15) {
                nearbyLocations.push(multipleLocations[i]);
            }
        }
    
        // החזר את המיקומים הרחוקים עד 15 קילומטר מהמיקום הבודד
        return nearbyLocations;
    }
    
    // פונקציה לחישוב מרחק בין שני מיקומים בקואורדינטות
    function calculateDistance(location1, location2) {
        // חישוב מרחק בין שני נקודות בקואורדינטות עפ"י נוסחת ההוריזונטים
        var earthRadius = 6371; // רדיוס כדור הארץ בקילומטרים
        var lat1 = toRadians(location1.lat);
        var lon1 = toRadians(location1.lng);
        var lat2 = toRadians(location2.lat);
        var lon2 = toRadians(location2.lng);
        var dLat = lat2 - lat1;
        var dLon = lon2 - lon1;
    
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = earthRadius * c;
    
        return distance;
    }
    
    // פונקציה להמרת מעלות לרדיאנים
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    
    // דוגמה לשימוש בפונקציה
    var singleLocation = { lat: 0, lng: 0 };
    var multipleLocations = [
        // { lat: LATITUDE_1, lng: LONGITUDE_1 },
        // { lat: LATITUDE_2, lng: LONGITUDE_2 },
        // וכן הלאה...
    ];
    
    var nearbyLocations = getNearbyLocations(singleLocation, multipleLocations);
    console.log(nearbyLocations);
    
    return (<>

    </>);
}

export default CalculateDistance;