import * as fs from 'fs';

// Function to check if a coordinate is within the Taiwan polygon
function isCoordinateWithinTaiwan(coordinate, taiwanPolygon) {
  for (const polygon of taiwanPolygon) {
    const taiwanGeometry = polygon.geometry;
    if (taiwanGeometry.type === 'Polygon') {
      if (isPointInPolygon(coordinate, taiwanGeometry.coordinates))
        return true;
    } else if (taiwanGeometry.type === 'MultiPolygon') {
      for (const coordinates of taiwanGeometry.coordinates) {
        if (isPointInPolygon(coordinate, coordinates)) {
          return true;
        }
      }
    }
  }

  return false;
}

// Helper function to check if a point is within a polygon
function isPointInPolygon(point, polygonCoordinates) {
  var x = point.longitude,
      y = point.latitude;
  
  var inside = false;
  for (var i = 0, j = polygonCoordinates[0].length - 1; i < polygonCoordinates[0].length; j = i++) {
    var xi = polygonCoordinates[0][i][0],
        yi = polygonCoordinates[0][i][1];
    var xj = polygonCoordinates[0][j][0],
        yj = polygonCoordinates[0][j][1];
    
    var intersect = ((yi > y) !== (yj > y)) &&
                    (x < ((xj - xi) * (y - yi) / (yj - yi)) + xi);
    
    if (intersect) inside = !inside;
  }
  return inside;
}

function generateRandomCoordinate(taiwanPolygon) {
  let coordinate = null;

  // Loop until a valid coordinate within Taiwan is generated
  const bbox = [ // from topojson
    118.21707123169105,
    21.89671606253262,
    122.00657456079266,
    26.27675065458175
  ]
  while (!coordinate) {
    const latitude = Math.random() * (bbox[3] - bbox[1]) + bbox[1];
    const longitude = Math.random() * (bbox[2] - bbox[0]) + bbox[0];
    const generatedCoordinate = { latitude, longitude };

    console.log(`Try coordinate: ${latitude}, ${longitude}`);

    if (isCoordinateWithinTaiwan(generatedCoordinate, taiwanPolygon)) {
      coordinate = generatedCoordinate;
    }
  }

  return coordinate;
}

// Example usage
fs.readFile('src/geo.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading topo.json file:', err);
    return;
  }

  const geoData = JSON.parse(data);
  const taiwanPolygon = geoData.features;

  const randomCoordinate = generateRandomCoordinate(taiwanPolygon);
  console.log(`Random Coordinate: ${randomCoordinate.latitude}, ${randomCoordinate.longitude}`);
});
