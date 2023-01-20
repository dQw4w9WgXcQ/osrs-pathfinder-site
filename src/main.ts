import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import {createMapLayer} from "./map-layer";
import {createComponentsLayer} from "./components-layer";
import {createBlockedLayer} from "./blocked-layer";
import {createRegionIndicatorLayer} from './region-indicator-layer';
import {addHoveredTile} from "./hovered-tile";
import {addPlaneControl} from "./plane";
import {addStartFinishMarkers} from "./start-finish-markers";
import {addPathLayer, setPath} from "./path-layer";
import {addLinkLayer} from "./link-layer";

const map = L.map('map', {crs: L.CRS.Simple}).setView([3231.5, 3231.5], 2)

const mapLayer = createMapLayer()
const componentsLayer = createComponentsLayer();
const blockedLayer = createBlockedLayer();
const regionIndicatorLayer = createRegionIndicatorLayer(map);
const layerControl = L.control.layers(
    undefined,
    {
        "Map": mapLayer,
        "Contiguous Components": componentsLayer,
        "Blocked Tiles": blockedLayer,
        "Region Indicator": regionIndicatorLayer,
    },
    {collapsed: false}
)

map.addLayer(mapLayer)
map.addControl(layerControl)
addPlaneControl(map)

addHoveredTile(map)
addStartFinishMarkers(map)
addPathLayer(map)

setPath([[3200, 3200], [3250, 3110], [3220, 3300], [3330, 3350], [3220, 3220]])

document.getElementById("map")!.style.setProperty('cursor', 'url(/cursor-dragon-scimitar.png), auto')

addLinkLayer(map)