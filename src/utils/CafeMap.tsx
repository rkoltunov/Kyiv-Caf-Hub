import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

type CafeMapProps = {
  lat: number;
  lng: number;
};

export default function CafeMap({ lat, lng }: CafeMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCvs6KQ9HUhtpRyYICULw-fQL_c96O5aV8"
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={17}
      options={{
        streetViewControl: false,       // убираем Pegman
        mapTypeControl: false,          // убираем кнопки карта/спутник
        fullscreenControl: false,       // убираем на весь экран
        zoomControl: false,             // убираем масштаб
        clickableIcons: false,          // убираем POI
        disableDefaultUI: true,
        styles: [
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [{ visibility: "off" }] // убираем надписи мелких бизнесов
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [{ visibility: "on" }] // оставляем парки
    },
    {
      featureType: "poi.school",
      elementType: "all",
      stylers: [{ visibility: "on" }] // оставляем школы
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "simplified" }] // упрощаем остальные POI
    }
  ]
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}