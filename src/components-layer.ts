import * as L from "leaflet";
import {tileUrlHack, tileUrlTemplate} from "./layer-util";
import * as PlaneControl from "./plane-control";

export function createComponentsLayer(): L.TileLayer {
    let layer = L.tileLayer(
        tileUrlTemplate(0, 'components'),
        {
            maxNativeZoom: 0,
            minNativeZoom: -3,
            maxZoom: 5,
            minZoom: -3,
            opacity: 0.5,
        }
    )

    tileUrlHack(layer)

    PlaneControl.addTileLayer('components', layer)

    return layer
}
