import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as Plane from "./plane";

export function createMapLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'map'),
        {
            maxNativeZoom: 2,
            minNativeZoom: -3,
            maxZoom: 5,
            minZoom: -3,
        }
    )

    tileUrlHack(layer)

    Plane.addTileLayer('map', layer)

    return layer
}
