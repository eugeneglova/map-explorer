import {
  sum,
  point,
  getX,
  getY,
  top,
  right,
  bottom,
  left,
  step,
  isMine,
  rejectMines,
  isPositive,
  getPointsAround,
  isVisited,
  rejectVisited,
  getAllPoints,
  getVisitedCount
} from './main'

test('sum', () => {
  expect(sum(1)).toBe(1)
  expect(sum(19)).toBe(10)
  expect(sum(999)).toBe(9 + 9 + 9)
  expect(sum(-5979)).toBe(30)
})

test('point', () => {
  const p = point(0, 1)
  expect(p).toEqual([0, 1])
  expect(p.toString()).toEqual('0,1')
})

test('getX', () => {
  expect(getX(point(0, 1))).toEqual(0)
})

test('getY', () => {
  expect(getY(point(0, 1))).toEqual(1)
})

describe('step', () => {
  const p = point(0, 0)

  test('step top', () => {
    expect(step(p, top)).toEqual(point(0, 1))
  })
  test('step right', () => {
    expect(step(p, right)).toEqual(point(1, 0))
  })
  test('step bottom', () => {
    expect(step(p, bottom)).toEqual(point(0, -1))
  })
  test('step left', () => {
    expect(step(p, left)).toEqual(point(-1, 0))
  })
})

test('isMine', () => {
  expect(isMine(point(59, -79))).toBeTruthy()
  expect(isMine(point(0, 0))).toBeFalsy()
})

describe('getPointsAround', () => {
  expect(getPointsAround(point(0, 0))).toEqual([point(0, 1), point(1, 0), point(0, -1), point(-1, 0)])
  expect(getPointsAround(point(28, 29))).toEqual([point(28, 30), point(29, 29), point(28, 28), point(27, 29)])
})

test('rejectMines', () => {
  expect(rejectMines([point(59, -79), point(0, 0), point(29, 29), point(1, 1)])).toEqual([point(0, 0), point(1, 1)])
})

test('isPositive', () => {
  expect(isPositive(point(0, 0))).toBeTruthy()
  expect(isPositive(point(0, 1))).toBeTruthy()
  expect(isPositive(point(1, 0))).toBeTruthy()
  expect(isPositive(point(-1, 0))).toBeFalsy()
  expect(isPositive(point(0, -1))).toBeFalsy()
})

test('isVisited', () => {
  const visited = { [point(0, 0)]: true, [point(29, 29)]: true, [point(1, 1)]: true }
  expect(isVisited(point(0, 0), visited)).toBeTruthy()
  expect(isVisited(point(1, 1), visited)).toBeTruthy()
  expect(isVisited(point(0, 1), visited)).toBeFalsy()
})

test('rejectVisited', () => {
  const visited = { [point(0, 0)]: true, [point(29, 29)]: true, [point(1, 1)]: true }
  expect(rejectVisited([point(59, -79), point(0, 0), point(29, 29), point(0, 0)], visited)).toEqual([point(59, -79)])
})

test('getAllPoints', () => {
  expect(getAllPoints(point(0, 0))).toEqual([point(0, 0)])
  expect(getAllPoints(point(0, 1))).toEqual([point(0, 1), point(0, -1)])
  expect(getAllPoints(point(1, 0))).toEqual([point(1, 0), point(-1, 0)])
  expect(getAllPoints(point(1, 1))).toEqual([point(1, 1), point(1, -1), point(-1, -1), point(-1, 1)])
})

test('getVisitedCount', () => {
  const p1 = point(0, 0)
  const p2 = point(1, 1)
  const visited = { [p1]: p1, [p2]: p2 }
  expect(getVisitedCount(visited)).toBe(5)
})
