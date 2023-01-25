export type Point = {
    x: number
    y: number
}

export type Position = Point & {
    plane: number
}

export type Link = {
    id: number
    origin: Position
    destination: Position
}

export type DoorLink = Link & {
    objectId: number
}

export type StairLink = Link & {
    objectId: number
}

export type DungeonLink = Link & {
    objectId: number
    action: string
}

export type LinkType = 'DOOR' | 'STAIR' | 'DUNGEON'

export type Links = {
    doorLinks: DoorLink[]
    stairLinks: StairLink[]
    dungeonLinks: DungeonLink[]
}

export type Path = {
    steps: PathStep[]
}

export type StepType = LinkType | 'WALK' | 'TELEPORT'

export type PathStep = {
    type: StepType
}

export type LinkStep = PathStep & {
    type: LinkType
    link: Link
}

export type WalkStep = PathStep & {
    plane: number
    path: Point[]
}

export type TeleportStep = PathStep & {
    name: string
    origin: Position
    destination: Position
}

export type Agent = {
    magicLvl: number
    items: [number, number][]
    quests: string[]
}

export type PathRequest = {
    start: Position
    finish: Position
    agent?: Agent
}

export type PathResponse = {
    start: Position
    finish: Position
    steps: PathStep[] | null
}