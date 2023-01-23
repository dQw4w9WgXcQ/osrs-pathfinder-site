import {PathRequest, PathResponse} from "./dto";
import {setPath} from "./path-layer";
import {setTileIndicators} from "./start-finish-markers";

const URL = 'http://localhost:8080/'

export async function requestPath(req: PathRequest) {
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
            console.log(error)
            throw error
        })
        .then(response => response.json())
        .then(data => data as PathResponse)
        .then(res => {
            setPath(res.steps!)
            setTileIndicators(res.start, res.finish)
        })
        .catch(error => console.log(error))
}