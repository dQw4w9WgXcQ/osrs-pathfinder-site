import * as L from "leaflet";

export function toBounds(latlng: L.LatLng): L.LatLngBounds {
    let lat = Math.trunc(latlng.lat)
    let lng = Math.trunc(latlng.lng)
    return L.latLngBounds([lat, lng], [lat + 1, lng + 1])
}