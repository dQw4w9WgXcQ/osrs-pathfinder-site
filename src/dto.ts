export type Point = {
  x: number
  y: number
}

export type Position = Point & {
  plane: number
}

export type Link = {
  type: LinkType
  id: number
  start: Position
  end: Position
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

export type ShipLink = Link

export type WildernessDitchLink = Link

export type SpecialLink = Link & {
  extra: unknown
}

export type LinkType = "DOOR" | "STAIR" | "DUNGEON" | "SHIP" | "WILDERNESS_DITCH" | "SPECIAL"

export type Links = {
  doorLinks: DoorLink[]
  stairLinks: StairLink[]
  dungeonLinks: DungeonLink[]
  shipLinks: ShipLink[]
  wildernessDitchLinks: WildernessDitchLink[]
  specialLinks: SpecialLink[]
}

export type StepType = "LINK" | "WALK" | "TELEPORT"

export type Step = {
  type: StepType
}

export type LinkStep = Step & {
  type: StepType
  link: Link
}

export type WalkStep = Step & {
  plane: number
  path: Point[]
}

export type TeleportStep = Step & {
  name: string
  start: Position
  end: Position
}

export type Agent = {
  magicLvl: number
  items: [number, number][]
  quests: string[]
}

export type PathfindingResult = {
  type: "SUCCESS" | "BLOCKED" | "UNREACHABLE"
  start: Position | undefined
  end: Position | undefined
  steps: Step[] | undefined
}

export type Algo = "A_STAR" | "BFS"

export type PathRequest = {
  start: Position
  end: Position
  agent?: Agent
  algo: Algo
}

export type PathResponse = {
  time: number
  result: PathfindingResult
}
