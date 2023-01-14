import * as L from "leaflet";

export function createComponentsImageLayer() {
    let tileLayer = L.tileLayer(
        'https://raw.githubusercontent.com/dQw4w9WgXcQ/cdn/main/leaflet/components/0-{x}-{y}.png',
        {
            tileSize: 512,
            maxNativeZoom: 1,
            minNativeZoom: 1,
            maxZoom: 8,
            minZoom: -3,
        }
    )

    //a hack so the map doesnt get drawn upside down
    //https://stackoverflow.com/questions/47381346/how-to-set-up-leaflet-for-a-non-geographical-tile-grid-with-inverted-y-coordinat
    tileLayer.getTileUrl = function (coords) {
        coords.y = -coords.y - 1
        return L.TileLayer.prototype.getTileUrl.bind(tileLayer)(coords)
    }

    return tileLayer
}
