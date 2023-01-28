import {PathRequest, PathResponse} from "./dto";
import {setPath} from "./path-layer";
import {setTileIndicators} from "./start-finish-markers";

const URL = 'https://pathfinder.dqw4w9wgxcq.dev:8080'

// const URL = 'http://localhost:8080'

export function requestPath(req: PathRequest) {
    fetch(
        URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                //todo handle timeout
            }
            throw error
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response as Response
        })
        .then(response => response.json())
        .then(data => data as PathResponse)
        .then(res => {
            setPath(res.steps!)
            setTileIndicators(res.start, res.finish)
        })
        .catch(error => console.log(error))
}