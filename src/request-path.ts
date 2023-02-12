import { PathRequest, PathResponse } from './dto'
import { setPath } from './path-layer'
import { setTileIndicators } from './start-finish-markers'

// const URL = 'http://localhost:8080'
const URL = 'https://pathfinder.dqw4w9wgxcq.dev:8080'

export function doPath(req: PathRequest) {
  processPathResponse(requestPath(req), true)
}

export async function requestPath(req: PathRequest) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .catch((error) => {
      if (error.name === 'AbortError') {
        //todo handle timeout
      }
      throw error
    })
    .then((response) => {
      if (!response.ok) throw new Error(response.status + ':' + response.statusText)
      return response as Response
    })
    .then((response) => response.json())
    .then((data) => data as PathResponse)
}

export function processPathResponse(pendingPathResposne: Promise<PathResponse>, openTooltip: boolean) {
  pendingPathResposne
    .then((res) => {
      setPath(res.steps, openTooltip)
      setTileIndicators(res.start, res.finish)
    })
    .catch((e) => console.error(e)) //todo toast user
}
