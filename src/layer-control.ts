import * as L from "leaflet";

export function createLayerControl(componentsImageLayer: L.Layer, regionIndicatorLayer: L.Layer): L.Control.Layers {
    const overlays = {
        "Contiguous Components": componentsImageLayer,
        "Region Indicator": regionIndicatorLayer
    }
    return L.control.layers(undefined, overlays, {collapsed: false})
}
