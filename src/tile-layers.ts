import * as L from 'leaflet'
import { createRegionIndicatorLayer } from './region-indicator-layer'

export function addTileLayers(map: L.Map) {
  const mapLayer = createTileLayer(map, 'map', {
    maxNativeZoom: 2,
    minNativeZoom: -3,
    maxZoom: 5,
    minZoom: -3,
  })
  map.addLayer(mapLayer)

  const componentsLayer = createTileLayer(map, 'components', {
    maxNativeZoom: 0,
    minNativeZoom: 0,
    maxZoom: 5,
    minZoom: -1,
    opacity: 0.5,
  })

  const blockedLayer = createTileLayer(map, 'blocked', {
    maxNativeZoom: 0,
    minNativeZoom: 0,
    maxZoom: 5,
    minZoom: -1,
    opacity: 0.75,
  })

  const control = L.control.layers(
    undefined,
    {
      Map: mapLayer,
      'Contiguous Components': componentsLayer,
      'Blocked Tiles': blockedLayer,
      'Region Indicator': createRegionIndicatorLayer(map),
    },
    { collapsed: false, position: 'bottomright' }
  )

  map.addControl(control)

  return control
}

function createTileLayer(
  map: L.Map,
  name: string,
  options: L.TileLayerOptions
) {
  let tileLayer = L.tileLayer(createUrl(0, name), options)

  tileUrlHack(tileLayer)

  //listen on the map because the layer may not be added to the map (layer control)
  map.on('planechange', (e) => {
    const plane = (e as any).plane as number
    tileLayer.setUrl(createUrl(plane, name), false)
  })

  return tileLayer
}

//a hack so the map doesnt get drawn upside down
//https://stackoverflow.com/questions/47381346/how-to-set-up-leaflet-for-a-non-geographical-tile-grid-with-inverted-y-coordinat
function tileUrlHack(tileLayer: L.TileLayer) {
  tileLayer.getTileUrl = function (coords) {
    coords.y = -coords.y - 1
    return L.TileLayer.prototype.getTileUrl.bind(tileLayer)(coords)
  }
}

function createUrl(plane: number, name: string): string {
  if (name === 'map') {
    //todo temp
    return `/leaflet/${name}/{z}/${plane}_{x}_{y}.png`
  }
  return `/leaflet/${name}/{z}/${plane}-{x}-{y}.png`
}
