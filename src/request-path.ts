import { PathRequest, PathResponse } from "./dto"
import { clearPath, setPath } from "./path-layer"
import { setTileIndicators } from "./start-end-markers"

// const URL = "http://localhost:8080/find-path"
const URL = "https://osrspathfinder.com/find-path"

export function doPath(req: PathRequest) {
	processPathResponse(requestPath(req), true)
}

export async function requestPath(req: PathRequest) {
	return fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req),
	})
		.catch((error) => {
			if (error.name === "AbortError") {
				//todo handle timeout
			}
			throw error
		})
		.then((response) => {
			if (!response.ok) throw new Error(response.status + ":" + response.statusText)
			return response as Response
		})
		.then((response) => response.json())
		.then((data) => data as PathResponse)
}

export function processPathResponse(pendingPathResponse: Promise<PathResponse>, openTooltip: boolean) {
	pendingPathResponse
		.then((res) => {
			const result = res.result
			if (result.type !== "SUCCESS") {
				console.log("Pathfinding failed: " + result.type) //todo toast user
			}

			if (result.steps) {
				setPath(result.steps, openTooltip)
			} else {
				clearPath()
			}

			setTileIndicators(result.start, result.end)
		})
		.catch((e) => console.error(e))
}
