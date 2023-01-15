import * as L from "leaflet";

//a hack so the map doesnt get drawn upside down
//https://stackoverflow.com/questions/47381346/how-to-set-up-leaflet-for-a-non-geographical-tile-grid-with-inverted-y-coordinat
export function tileUrlHack(tileLayer: L.TileLayer) {
    tileLayer.getTileUrl = function (coords) {
        coords.y = -coords.y - 1
        return L.TileLayer.prototype.getTileUrl.bind(tileLayer)(coords)
    }
}

export function tileUrlTemplate(plane: number, name: string): string {
    if(name === 'map'){//todo temp
        return 'https://raw.githubusercontent.com/dQw4w9WgXcQ/cdn/main/leaflet/' + name + '/{z}/' + plane + '_{x}_{y}.png'
    }
    return 'https://raw.githubusercontent.com/dQw4w9WgXcQ/cdn/main/leaflet/' + name + '/{z}/' + plane + '-{x}-{y}.png'
}
