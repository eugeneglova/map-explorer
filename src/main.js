export const sum = (n, acc = 0) => (n === 0 ? Math.abs(acc) : sum((n / 10) | 0, acc + (n % 10)))

export const point = (x, y) => [x, y]

export const getX = p => p[0]

export const getY = p => p[1]

export const [top, right, bottom, left] = [point(0, 1), point(1, 0), point(0, -1), point(-1, 0)]

export const step = (p, d) => point(getX(p) + getX(d), getY(p) + getY(d))

export const isMine = p => sum(getX(p)) + sum(getY(p)) > 21

export const getPointsAround = p => [step(p, top), step(p, right), step(p, bottom), step(p, left)]

export const rejectMines = points => points.filter(p => !isMine(p))

export const isPositive = p => getX(p) >= 0 && getY(p) >= 0

export const filterPositive = points => points.filter(isPositive)

export const isVisited = (p, points) => points[p]

export const rejectVisited = (points, visited) => points.filter(p => !isVisited(p, visited))

export const getAllPoints = p => {
  const points = [p]
  const [x, y] = [getX(p), getY(p)]
  if (x === 0 && y === 0) return points
  if (x === 0) return points.concat([point(x, -y)])
  if (y === 0) return points.concat([point(-x, y)])
  return points.concat([point(x, -y), point(-x, -y), point(-x, y)])
}

export const getVisitedCount = visited => Object.values(visited).reduce((acc, p) => acc + getAllPoints(p).length, 0)

const visited = {}
let acc = []

export const main = p => {
  while (true) {
    const points = rejectVisited(rejectMines(filterPositive(getPointsAround(p))), visited)
    if (!points.length) {
      if (!acc.length) return getVisitedCount(visited)
      const head = acc.pop()
      visited[p] = p
      p = head
      continue
    }
    const head = points.shift()
    if (points.length === 0) {
      visited[p] = p
      p = head
      continue
    }
    visited[p] = p
    acc = acc.concat(points)
    p = head
  }
}
