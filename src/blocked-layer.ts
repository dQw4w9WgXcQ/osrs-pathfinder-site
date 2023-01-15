import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as Plane from "./plane";

export function createBlockedLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'blocked'),
        {
            maxNativeZoom: 0,
            minNativeZoom: 0,
            maxZoom: 5,
            minZoom: -1,
            opacity: 0.75,
        }
    )

    tileUrlHack(layer)

    Plane.addTileLayer('blocked', layer)

    return layer
}