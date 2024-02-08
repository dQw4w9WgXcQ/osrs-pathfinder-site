import * as L from "leaflet"
import { PLANE_COUNT } from "./plane-control"
import { pointToLatLng, prettyString } from "./util"
import { Link, Links, LinkType, Position } from "./dto"

const stairIcon = L.icon({ iconUrl: "/stair.png", iconSize: [32, 32] })
const doorIcon = L.icon({ iconUrl: "/door.png", iconSize: [16, 32] })
const dungeonIcon = L.icon({ iconUrl: "/dungeon.png", iconSize: [32, 32] })
const shipIcon = L.icon({ iconUrl: "/ship.png", iconSize: [24, 32] })
const wildernessDitchIcon = L.icon({
  iconUrl: "/ditch.png",
  iconSize: [17, 32],
})
const specialIcon = L.icon({ iconUrl: "/special.png", iconSize: [32, 32] })

const doorMarkers: L.Marker[] = []
const stairMarkers: L.Marker[] = []
const dungeonMarkers: L.Marker[] = []
const shipMarkers: L.Marker[] = []
const specialMarkers: L.Marker[] = []
const wildernessDitchMarkers: L.Marker[] = []

const doorPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())
const stairPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())
const dungeonPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())
const shipPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())
const wildernessDitchPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())
const specialPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT)
  .fill(null)
  .map(() => L.layerGroup())

export function addLinkLayer(map: L.Map) {
  const doorLayer = L.layerGroup([doorPlaneLayers[0]])
  const stairLayer = L.layerGroup([stairPlaneLayers[0]])
  const dungeonLayer = L.layerGroup([dungeonPlaneLayers[0]])
  const shipLayer = L.layerGroup([shipPlaneLayers[0]])
  const wildernessDitchLayer = L.layerGroup([wildernessDitchPlaneLayers[0]])
  const specialLayer = L.layerGroup([specialPlaneLayers[0]])

  map.on("planechange", (e) => {
    doorLayer.clearLayers()
    stairLayer.clearLayers()
    dungeonLayer.clearLayers()
    shipLayer.clearLayers()
    wildernessDitchLayer.clearLayers()
    specialLayer.clearLayers()

    const plane = (e as any).plane as number
    doorLayer.addLayer(doorPlaneLayers[plane])
    stairLayer.addLayer(stairPlaneLayers[plane])
    dungeonLayer.addLayer(dungeonPlaneLayers[plane])
    shipLayer.addLayer(shipPlaneLayers[plane])
    wildernessDitchLayer.addLayer(wildernessDitchPlaneLayers[plane])
    specialLayer.addLayer(specialPlaneLayers[plane])
  })

  const control = L.control.layers(
    undefined,
    {
      Doors: doorLayer,
      "Stairs & Ladders": stairLayer,
      Dungeons: dungeonLayer,
      Ship: shipLayer,
      "Wilderness Ditch": wildernessDitchLayer,
      Special: specialLayer,
    },
    { collapsed: false, position: "bottomright" }
  )

  map.addControl(control)
}

export function getMarker(type: LinkType, id: number) {
  switch (type) {
    case "DOOR":
      return doorMarkers[id]
    case "STAIR":
      return stairMarkers[id]
    case "DUNGEON":
      return dungeonMarkers[id]
    case "SHIP":
      return shipMarkers[id]
    case "WILDERNESS_DITCH":
      return wildernessDitchMarkers[id]
    case "SPECIAL":
      return specialMarkers[id]
    default:
      throw new Error(`unknown link type: ${type}`)
  }
}

function addLinks(links: Link[], type: LinkType, markers: L.Marker[], icon: L.Icon, planeLayers: L.LayerGroup[]) {
  links.forEach((link) => {
    const marker = L.marker(pointToLatLng(link.origin), { icon: icon })
    marker.bindTooltip(linkDescription(type, link, link.origin.plane !== link.destination.plane))
    markers.push(marker)
    marker.addTo(planeLayers[link.origin.plane])
  })
}

function toCoordString(position: Position, includePlane: boolean) {
  return `(${position.x}, ${position.y}${includePlane ? `, ${position.plane}` : ""})`
}

function linkDescription(type: LinkType, link: Link, includePlane: boolean) {
  // let objectId: string | undefined;
  // if ((link as any).objectId) {
  //   objectId = (link as any).objectId;
  // } else if ((link as any).extra?.objectId) {
  //   objectId = (link as SpecialLink).extra.objectId;
  // }
  //
  // let objectIdMessage = objectId ? `Object ID: ${objectId}<br>` : "";
  //
  // return `${prettyString(type)}#${link.id}<br>
  // ${objectIdMessage}
  // From: ${toCoordString(link.origin, includePlane)}<br>
  // To: ${toCoordString(link.destination, includePlane)}`;
  return `${prettyString(type)}#${link.id}<br>
To: ${toCoordString(link.destination, includePlane)}`
}

export async function fetchLinks() {
  return fetch("/links.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((data) => data as Links)
}

export function initLinks(links: Links) {
  addLinks(links.doorLinks, "DOOR", doorMarkers, doorIcon, doorPlaneLayers)
  addLinks(links.stairLinks, "STAIR", stairMarkers, stairIcon, stairPlaneLayers)
  addLinks(links.dungeonLinks, "DUNGEON", dungeonMarkers, dungeonIcon, dungeonPlaneLayers)
  addLinks(links.shipLinks, "SHIP", shipMarkers, shipIcon, shipPlaneLayers)
  addLinks(
    links.wildernessDitchLinks,
    "WILDERNESS_DITCH",
    wildernessDitchMarkers,
    wildernessDitchIcon,
    wildernessDitchPlaneLayers
  )
  addLinks(links.specialLinks, "SPECIAL", specialMarkers, specialIcon, specialPlaneLayers)
}
