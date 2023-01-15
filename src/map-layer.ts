import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as PlaneControl from "./plane-control";

export function createMapLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'map'),
        {
            maxNativeZoom: 2,
            minNativeZoom: -3,
            maxZoom: 5,
            minZoom: -3,
            opacity: 0.5,
        }
    )

    tileUrlHack(layer)

    PlaneControl.addTileLayer('map', layer)

    return layer
}
