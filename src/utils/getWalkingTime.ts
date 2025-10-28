export function getWalkingTime(
  cafe: { lat: number; lon: number },
  metro: { lat: number; lon: number },
) {
  const R = 6371; // км
  const dLat = ((metro.lat - cafe.lat) * Math.PI) / 180;
  const dLon = ((metro.lon - cafe.lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(cafe.lat * Math.PI / 180) *
      Math.cos(metro.lat * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  const walkingSpeedKmH = 4.5; // средняя скорость ходьбы
  const minutes = Math.round((distanceKm / walkingSpeedKmH) * 60);

  return `${minutes} minutes on foot`;
}
