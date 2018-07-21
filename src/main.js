export const sum = (n, acc = 0) => (n === 0 ? Math.abs(acc) : sum((n / 10) | 0, acc + (n % 10)))

export const point = (x, y) => [x, y]

export const getX = p => p[0]

export const getY = p => p[1]

export const [top, right, bottom, left] = [point(0, 1), point(1, 0), point(0, -1), point(-1, 0)]

export const step = (p, d) => point(getX(p) + getX(d), getY(p) + getY(d))

export const isMine = p => sum(getX(p)) + sum(getY(p)) > 21

export const getPointsAround = p => [step(p, top), step(p, right), step(p, bottom), step(p, left)]

export const rejectMines = points => points.filter(p => !isMine(p))

export const isVisited = (p, points) => points[p]

export const rejectVisited = (points, visited) => points.filter(p => !isVisited(p, visited))

const visited = {}
let acc = []

export const main = p => {
  while (true) {
    const points = rejectVisited(rejectMines(getPointsAround(p)), visited)
    if (!points.length) {
      if (!acc.length) return Object.keys(visited).length
      const head = acc.pop()
      visited[p] = true
      p = head
      continue
    }
    const head = points.shift()
    if (points.length === 0) {
      visited[p] = true
      p = head
      continue
    }
    visited[p] = true
    acc = acc.concat(points)
    p = head
  }
}
