import * as L from "leaflet";

let cursorTile: L.Rectangle | undefined = undefined
let cursorTooltip: L.Tooltip | undefined = undefined
export function registerHoveredTile(map: L.Map) {
    map.on('mousemove', (e) => {
        let lat = Math.trunc(e.latlng.lat)
        let lng = Math.trunc(e.latlng.lng)
        let bounds = L.latLngBounds([lat, lng], [lat + 1, lng + 1])

        if (cursorTile === undefined) {
            cursorTile = L.rectangle(bounds, {color: 'yellow', weight: 2, interactive: false})
            cursorTile.addTo(map)
        }

        cursorTile.setBounds(bounds)

        let tooltipLatLng = L.latLng(lat + 1, lng + 0.5)
        if (cursorTooltip === undefined) {
            cursorTooltip = L.tooltip({permanent: true, direction: 'top'})
            cursorTooltip.setLatLng(tooltipLatLng)
            cursorTooltip.addTo(map)
        }

        cursorTooltip.setLatLng(tooltipLatLng)
        cursorTooltip.setContent('(' + lat + ', ' + lng + ')')
    })
}
