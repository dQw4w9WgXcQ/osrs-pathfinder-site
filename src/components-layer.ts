import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as Plane from "./plane";

export function createComponentsLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'components'),
        {
            maxNativeZoom: 0,
            minNativeZoom: 0,
            maxZoom: 5,
            minZoom: -3,
            opacity: 0.5,
        }
    )

    tileUrlHack(layer)

    Plane.addTileLayer('components', layer)

    return layer
}
