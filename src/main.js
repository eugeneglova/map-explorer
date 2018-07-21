const sum = n =>
  Math.abs(n)
    .toString()
    .split('')
    .reduce((item, acc) => parseInt(acc, 10) + item, 0)

const point = (x, y) => ({ x, y, _id: `${x},${y}` })

const getX = p => p.x

const getY = p => p.y

const [top, right, bottom, left] = [point(0, 1), point(1, 0), point(0, -1), point(-1, 0)]

const step = (p, d) => point(getX(p) + getX(d), getY(p) + getY(d))

const isMine = p => sum(getX(p)) + sum(getY(p)) > 21

const getPointsAround = p => [step(p, top), step(p, right), step(p, bottom), step(p, left)]

const rejectMines = points => points.filter(p => !isMine(p))

const isVisited = (p, points) => points[p._id]

const rejectVisited = (points, visited) => points.filter(p => !isVisited(p, visited))

const visited = {}
let acc = []

const main = p => {
  while (true) {
    const points = rejectVisited(rejectMines(getPointsAround(p)), visited)
    if (!points.length) {
      if (!acc.length) return Object.keys(visited).length
      const head = acc[acc.length - 1]
      visited[p._id] = true
      acc = acc.slice(0, -1)
      p = head
      continue
    }
    const head = points[0]
    if (points.length === 1) {
      visited[p._id] = true
      p = head
      continue
    }
    visited[p._id] = true
    acc = acc.concat(points.slice(1))
    p = head
  }
}

console.log(main(point(0, 0)))
