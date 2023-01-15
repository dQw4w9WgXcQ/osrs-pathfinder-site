import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as PlaneControl from "./plane-control";

export function createBlockedLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'blocked'),
        {
            maxNativeZoom: 0,
            minNativeZoom: -3,
            maxZoom: 5,
            minZoom: -3,
            opacity: 0.5,
        }
    )

    tileUrlHack(layer)

    PlaneControl.addTileLayer('blocked', layer)

    return layer
}
