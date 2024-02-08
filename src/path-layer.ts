import * as L from "leaflet"
import { getMarker } from "./link-layer"
import { pointToLatLng } from "./util"
import { LinkStep, LinkType, Point, Step, WalkStep } from "./dto"

const layer = L.layerGroup()

export function addPathLayer(map: L.Map) {
  map.addLayer(layer)
}

export function clearPath() {
  layer.clearLayers()
}

export function setPath(steps: Step[], openTooltip: boolean) {
  clearPath()

  const walkPaths: Point[][] = []
  const teleportPaths: Point[][] = []
  const linkPaths: Point[][] = []
  for (const step of steps) {
    if (step.type === "LINK") {
      const linkStep = step as LinkStep
      addLinkMarker(linkStep.link.type, linkStep.link.id, openTooltip)
      linkPaths.push([linkStep.link.origin, linkStep.link.destination])
    } else if (step.type === "WALK") {
      const walkStep = step as WalkStep
      walkPaths.push(walkStep.path)
    } else if (step.type === "TELEPORT") {
      // let teleportStep = step as TeleportStep
      // addTeleportMarker(teleportStep.id)
      // linkPaths.push([linkStep.link.origin, linkStep.link.destination])
    } else {
      throw new Error(`Unknown step type: ${(step as Step).type}`)
    }
  }
  addMultiPolyLine(walkPaths, "blue")
  addMultiPolyLine(teleportPaths, "purple")
  addMultiPolyLine(linkPaths, "cyan")
}

function addMultiPolyLine(path: Point[][], color: string) {
  const latLngs = path.map((points) => points.map(pointToLatLng))
  L.polyline(latLngs, { color }).addTo(layer)
}

function addLinkMarker(type: LinkType, id: number, openTooltip: boolean) {
  const marker = getMarker(type, id)
  marker.addTo(layer)
  if (openTooltip) {
    marker.openTooltip()
  }
}
