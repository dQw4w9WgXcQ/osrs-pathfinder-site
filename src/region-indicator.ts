import * as L from "leaflet";
import {PolylineOptions} from "leaflet";

const REGION_X_MAX = 66
const REGION_Y_MAX = 196
const REGION_SIZE = 64
const Y_MAX = (REGION_X_MAX + 1) * REGION_SIZE
const X_MAX = (REGION_Y_MAX + 1) * REGION_SIZE

let regionInfoTooltip: L.Tooltip | undefined = undefined

export function createRegionIndicatorLayer(map: L.Map): L.LayerGroup {
    let layer = L.layerGroup()

    map.on('mousemove', (e) => {
        let regionX = Math.trunc(e.latlng.lat / REGION_SIZE)
        let regionY = Math.trunc(e.latlng.lng / REGION_SIZE)
        let latLng = L.latLng(regionX * REGION_SIZE + REGION_SIZE / 2 + 0.5, regionY * REGION_SIZE + REGION_SIZE / 2 + 0.5)
        if (regionInfoTooltip === undefined) {
            regionInfoTooltip = L.tooltip({permanent: true, direction: 'center'})
            regionInfoTooltip.setLatLng(latLng)
            regionInfoTooltip.addTo(layer)
        }

        regionInfoTooltip.setLatLng(latLng)
        regionInfoTooltip.setContent('(' + regionX + ', ' + regionY + ')')
    })

    const opts: PolylineOptions = {color: 'black', weight: 1, interactive: false}

    for (let x = 0; x <= REGION_X_MAX + 1; x++) {
        L.polyline([[0, x * REGION_SIZE], [X_MAX, x * REGION_SIZE]], opts)
            .addTo(layer)
    }

    for (let y = 0; y <= REGION_Y_MAX + 1; y++) {
        L.polyline([[y * REGION_SIZE, 0], [y * REGION_SIZE, Y_MAX]], opts)
            .addTo(layer)
    }

    return layer
}
